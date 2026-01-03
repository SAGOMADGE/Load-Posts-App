// state - источник правды

const state = {
  posts: [],
  skip: 0,
  limit: 5,
  isLoading: false,
  hasMore: true,
  error: null,
};

// передаем модулям shallow copy State
// {...object} - shallow copy
export function getState() {
  return { ...state };
}

// функция для присваивания новых данных state
// Object.assign(object, newObject)
export function setState(newState) {
  Object.assign(state, newState);
}
