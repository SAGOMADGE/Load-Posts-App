/* render.js — это только отображение UI, он не делает fetch, не меняет state напрямую, он просто читает state и строит DOM. */

/* Независим от handler — получает всё через аргументы.
Обновляет DOM — создаёт элементы, добавляет/удаляет их.
Обрабатывает UI-фичи — loader, кнопки, empty state. */

export function renderPosts(state, postsContainer, getPostBtn, emptyState) {
  // очистка контейнера перед рендером
  postsContainer.innerHTML = "";

  // Empty state
  if (!state.isLoading && state.posts.length === 0) {
    emptyState.style.display = "flex";
  } else {
    emptyState.style.display = "none";
  }

  // 2. Loading
  if (state.isLoading) {
    const loadingEl = document.createElement("div");
    loadingEl.textContent = "Loading...";
    loadingEl.classList.add("loading");
    postsContainer.append(loadingEl);

    // кнопка дизейблится
    getPostBtn.disabled = true;
    return;
  }

  // рендерим посты
  // проходим по массиву постов из state
  // state.posts - {[]}
  // 3. posts
  state.posts.forEach((post) => {
    const postel = document.createElement("div");
    postel.classList.add("post");

    // заголовок поста
    // post.title = {title:}
    const postElTitle = document.createElement("h3");
    postElTitle.textContent = post.title;

    // текст поста
    // post.body - {body:}
    const postElBody = document.createElement("p");
    postElBody.textContent = post.body;

    // append in postEl
    postel.append(postElTitle, postElBody);
    // append in PostsContainer
    postsContainer.append(postel);
  });

  // button state
  // работа с кнопкой и empty state
  if (state.posts.length >= state.total) {
    getPostBtn.textContent = "All Posts Are Shown";
    getPostBtn.disabled = true;
  } else {
    getPostBtn.textContent =
      state.posts.length === 0 ? "Get Posts" : "Load More Posts";
    getPostBtn.disabled = false;
  }
}
