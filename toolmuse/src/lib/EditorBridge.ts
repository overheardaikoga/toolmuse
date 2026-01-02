// EditorBridge.ts
type EditorId = 'event' | string;

type EditorPayload = {
  status: 'success' | 'cancel';
  preview: string;
  link: string;
};

type EditorMessage = {
  type: 'editor-message';
  editorId: EditorId;
  version: '1.0';
  payload: EditorPayload;
};

type EditorConfig = {
  id: EditorId;
  prodOrigin: string;
  devOriginsPattern?: string;
};

type EditorStatus = 'idle' | 'connecting' | 'ready' | 'error';

const TIMEOUT_MS = 10_000;

export class EditorBridge {
  private static timeoutId: number | null = null;
  private static currentEditor: EditorConfig | null = null;
  private static handler: ((event: MessageEvent) => void) | null = null;

  static open(
    editor: EditorConfig,
    onResult: (payload: EditorPayload) => void,
    onError: () => void
  ) {
    this.currentEditor = editor;

    window.open(editor.prodOrigin, '_blank');
    this.attachListener(onResult, onError);

    this.timeoutId = window.setTimeout(() => {
      this.cleanup();
      onError();
    }, TIMEOUT_MS);
  }

  private static attachListener(
    onResult: (payload: EditorPayload) => void,
    onError: () => void
  ) {
    if (this.handler) return;

    this.handler = (event: MessageEvent) => {
      if (!this.currentEditor) return;

      // Security: validate message structure
      if (!event.data || typeof event.data !== 'object') return;

      // Contract Rule 2: origin validation
      if (!this.isOriginAllowed(event.origin, this.currentEditor)) return;

      const msg = event.data as EditorMessage;

      // Contract Rule 1: message format validation
      if (
        msg?.type !== 'editor-message' ||
        msg.editorId !== this.currentEditor.id ||
        msg.version !== '1.0'
      ) {
        return;
      }

      this.cleanup();
      onResult(msg.payload);
    };

    window.addEventListener('message', this.handler);
  }

  private static isOriginAllowed(origin: string, editor: EditorConfig): boolean {
    // Always allow prodOrigin (dev or prod mode)
    if (origin === editor.prodOrigin) return true;

    // In dev mode, also allow devOriginsPattern
    const isDev = window.location.hostname === 'localhost';
    
    if (isDev && editor.devOriginsPattern) {
      const pattern = new URLPattern(
        editor.devOriginsPattern.replace('*', ':*')
      );
      return pattern.test(origin);
    }

    return false;
  }

  private static cleanup() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.handler) {
      window.removeEventListener('message', this.handler);
      this.handler = null;
    }

    this.currentEditor = null;
  }
}