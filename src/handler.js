// ----------------------------------
// IMPORTS
// ----------------------------------
import { fetchPosts } from "./api.js";
import { getState, setState } from "./state.js";
import { renderPosts } from "./render.js";

// ----------------------------------
// ЭЛЕМЕНТЫ DOM
// ----------------------------------
const getPostsBtn = document.getElementById("getPostsBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const postsContainer = document.getElementById("postsContainer");
const emptyState = document.getElementById("emptyState");

// ----------------------------------
// HANDLER ФУНКЦИИ
// ----------------------------------

// Get Posts Button handler
export async function handleGetPostsBtn() {
  // читаем текущий state(до fetch запроса)
  const { limit, skip, posts, total, isLoading } = getState();

  // если загрузка инцииализировна - выходим
  if (isLoading) return;

  // ставим флаг загрузки
  setState({ isLoading: true });
  renderPosts(getState(), postsContainer, getPostsBtn, emptyState);

  // пытаемся подключиться к API
  try {
    // получаемы новые посты и общее количество постов
    const { posts: NewPosts, total: totalPosts } = await fetchPosts({
      skip,
      limit,
    });

    // вычисляем следующий skip и наличие постов
    const nextSkip = skip + limit;
    const hasMore = nextSkip < totalPosts;

    // обновляем state
    setState({
      posts: [...posts, ...NewPosts],
      skip: nextSkip,
      total: totalPosts,
      isLoading: false,
      hasMore,
    });

    console.log(getState());

    // рендерим UI
    renderPosts(getState(), postsContainer, getPostsBtn, emptyState);
  } catch (error) {
    setState({ isLoading: false, error });
    console.error(error.message);
  }
}

// Delete All button handler
export function handleDeleteAllBtn() {
  setState({
    posts: [],
    skip: 0,
    hasMore: true,
  });

  renderPosts(getState(), postsContainer, getPostsBtn, emptyState);

  console.log(getState());

  //  кнопка сброса
  getPostsBtn.textContent = "Get Posts";
  getPostsBtn.disabled = false;
}

// ----------------------------------
// СЛУШАТЕЛИ СОБЫТИЙ
// ----------------------------------

// Get Posts Btn listener
getPostsBtn.addEventListener("click", handleGetPostsBtn);

// Delete All Btn listener
deleteAllBtn.addEventListener("click", handleDeleteAllBtn);
