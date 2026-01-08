// src/communication.ts
// ToolMuse Editor Communication Contract v1.0

const EDITOR_ID = import.meta.env.VITE_EDITOR_ID || 'new-editor';
const CONTRACT_VERSION = '1.0';

let messageSent = false; // Защита от дублирования

export type EditorPayload = {
  status: 'success' | 'cancel';
  preview: string;
  link: string;
};

export type EditorMessage = {
  type: 'editor-message';
  editorId: string;
  version: string;
  payload: EditorPayload;
};

/**
 * Отправляет результат работы editor в ToolMuse
 * @param payload - результат работы (success или cancel)
 */
export function sendResult(payload: EditorPayload): void {
  // Проверка на дублирование
  if (messageSent) {
    console.warn(`[${EDITOR_ID}] Результат уже отправлен — игнорируем дубль`);
    return;
  }

  // Проверка на наличие window.opener
  if (!window.opener) {
    console.warn(
      `[${EDITOR_ID}] No window.opener — editor открыт напрямую по URL, результат не отправлен`
    );
    return;
  }

  // Формируем сообщение по контракту v1.0
  const message: EditorMessage = {
    type: 'editor-message',
    editorId: EDITOR_ID,
    version: CONTRACT_VERSION,
    payload,
  };

  // Отправляем сообщение (ToolMuse проверяет origin)
  window.opener.postMessage(message, '*');
  messageSent = true;

  // Диагностика
  if (payload.status === 'success') {
    console.log(`[${EDITOR_ID}] Success отправлен:`, payload.preview);
  } else {
    console.log(`[${EDITOR_ID}] Cancel отправлен`);
  }
}

/**
 * Проверка: было ли сообщение уже отправлено
 */
export function isMessageSent(): boolean {
  return messageSent;
}

/**
 * Сброс флага отправки (только для тестов, не использовать в production)
 */
export function __resetSentFlagForTests(): void {
  messageSent = false;
}

/**
 * Получить текущий EDITOR_ID
 */
export function getEditorId(): string {
  return EDITOR_ID;
}
