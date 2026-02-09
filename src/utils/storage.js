export function loadFromStorage(key, fallbackValue) {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null) {
      return fallbackValue;
    }

    return JSON.parse(rawValue);
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error);
    return fallbackValue;
  }
}

export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar dados no localStorage:', error);
  }
}
