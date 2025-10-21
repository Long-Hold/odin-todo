export function saveToLocalStorage(key, item) {
  if (item instanceof Object === false) {
    throw new TypeError(`Expect item to be instanceof Object. Received ${typeof(item)}`);
  }

  if (typeof(key) !== 'string') {
    throw new TypeError(`Key must be string. Received ${typeof(key)}`);
  }

  const trimKey = key.trim();
  if (!trimKey) {
    throw new Error('Key cannot be a blank or whitespace-only string');
  }

  localStorage.setItem(trimKey, JSON.stringify(item));
}

export function getTodoObject(key) {
  if (typeof(key) !== 'string') {
    throw new TypeError(`Key must be string. Received ${typeof(key)}`);
  }

  const trimKey = key.trim();
  if (!trimKey) {
    throw new Error('Key cannot be a blank or whitespace-only string');
  }

  const todoJSON = localStorage.getItem(key);
  const todoObj = JSON.parse(todoJSON);

  return todoObj;
}

export function getAllTodoObjects() {
  const todoObjectsArray = [];

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);

    if (localStorage.hasOwnProperty(key)) {
      const todoObj = JSON.parse(localStorage.getItem(key));
      todoObjectsArray.push(todoObj);
    }
  }

  return todoObjectsArray;
}