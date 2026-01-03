// присваиваю переменной API URL для безопасности и для удобства переиспользования
const API_URL = "https://dummyjson.com/posts";

// делаю API запрос через fetch
export async function fetchPosts({ limit = 5, skip = 0 } = {}) {
  try {
    // получаю response с помощью await fetch
    const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);

    // если response != 200-299
    if (!response.ok) {
      throw new Error("Ошибка HTTP запроса");
    }
    // парсим response, получаемый готовый js обьект
    const data = await response.json();

    // возвращаем только необходимые свойсва обьекта для других модулей
    return {
      posts: data.posts,
      total: data.total,
    };
  } catch (error) {
    // обрабатываем ошибки запроса
    console.error(error.message);
    throw error;
  }
}
