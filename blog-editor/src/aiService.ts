// Локальная версия AI сервиса без внешних API
// Использует простые правила для улучшения текста

export const refineText = async (currentText: string, context: string): Promise<string> => {
  // Имитируем задержку для UX (чтобы казалось что происходит обработка)
  await new Promise(resolve => setTimeout(resolve, 800));

  let refined = currentText.trim();

  // Базовая очистка
  refined = refined.replace(/\s+/g, ' '); // убираем лишние пробелы
  refined = refined.replace(/\.{2,}/g, '...'); // нормализуем многоточия
  
  // Контекстно-зависимые улучшения
  switch (context) {
    case 'headline':
      // Делаем заголовок более эффектным
      if (!refined.match(/[!?✨🚀⚡🌟💫]/)) {
        refined = `✨ ${refined}`;
      }
      // Капитализация первой буквы каждого слова
      refined = refined.split(' ').map(word => {
        if (word.length > 3) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      }).join(' ');
      break;

    case 'subline':
      // Добавляем стильности
      if (!refined.endsWith('.') && !refined.endsWith('!') && !refined.endsWith('?')) {
        refined += '.';
      }
      break;

    case 'authorName':
      // Форматируем имя
      refined = refined.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
      break;

    case 'authorDesc':
      // Делаем описание более профессиональным
      if (!refined.includes('|') && refined.length > 20) {
        const words = refined.split(' ');
        const mid = Math.floor(words.length / 2);
        refined = words.slice(0, mid).join(' ') + ' | ' + words.slice(mid).join(' ');
      }
      break;

    case 'intro':
      // Улучшаем вступительный текст
      refined = refined.charAt(0).toUpperCase() + refined.slice(1);
      if (!refined.endsWith('.') && !refined.endsWith('!') && !refined.endsWith('?')) {
        refined += '.';
      }
      // Добавляем немного киберпанк флёра
      const cyberWords = ['explore', 'discover', 'dive into', 'experience', 'journey through'];
      const hasAction = cyberWords.some(word => refined.toLowerCase().includes(word));
      if (!hasAction && refined.length < 100) {
        refined = 'Explore ' + refined.charAt(0).toLowerCase() + refined.slice(1);
      }
      break;

    case 'cta':
      // Call-to-action должен быть кратким и мощным
      refined = refined.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
      // Убираем точку в конце CTA
      refined = refined.replace(/\.$/, '');
      break;

    default:
      // Общее улучшение
      refined = refined.charAt(0).toUpperCase() + refined.slice(1);
  }

  // Финальная очистка
  refined = refined.trim();

  return refined;
};

// Альтернативная функция с готовыми шаблонами
export const getTextSuggestions = (context: string): string[] => {
  const suggestions: Record<string, string[]> = {
    headline: [
      '✨ Welcome to the Future',
      '🚀 Digital Horizons Await',
      '⚡ The Next Generation',
      '🌟 Beyond Tomorrow',
      '💫 Infinite Possibilities'
    ],
    subline: [
      'Exploring the digital frontier.',
      'Where technology meets creativity.',
      'Building tomorrow, today.',
      'Innovation in motion.',
      'Crafting digital experiences.'
    ],
    authorName: [
      'Alex Quantum',
      'Nova Cipher',
      'Echo Byte',
      'Pixel Nexus',
      'Data Forge'
    ],
    authorDesc: [
      'Digital Architect | Creative Technologist',
      'Code Artist | Future Builder',
      'Tech Visionary | Innovation Catalyst',
      'Creative Developer | Design Thinker',
      'Digital Creator | Tech Enthusiast'
    ],
    intro: [
      'Dive into a collection of cutting-edge projects that blend art, technology, and innovation.',
      'Experience the intersection of design and technology in ways you\'ve never imagined.',
      'Explore groundbreaking work that pushes the boundaries of digital creation.',
      'Discover projects that redefine what\'s possible in the digital realm.',
      'Journey through innovative experiments at the forefront of technology and art.'
    ],
    cta: [
      'Explore Projects',
      'View Portfolio',
      'Get Started',
      'Learn More',
      'See My Work',
      'Contact Me',
      'Hire Me',
      'Read More'
    ]
  };

  return suggestions[context] || [];
};