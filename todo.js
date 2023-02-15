//this function creates random id
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function getLocalStorage() {
  return localStorage.getItem("toDoList")
    ? JSON.parse(localStorage.getItem("toDoList"))
    : [];
}

function setLocalStorage(list) {
  localStorage.setItem("toDoList", JSON.stringify(list));
}

function deleteTask(id, li) {
  const toDoList = getLocalStorage();
  const filteredToDoList = toDoList.filter((element) => element.id !== id);

  // Удаляем li и обновляем localStorage
  li.remove();
  setLocalStorage(filteredToDoList);
}

function editTask(id, span) {
  const toDoList = getLocalStorage();

  // Небольшой трюк, вместо добавления text input я просто делаю спан редактируемым и ставлю ему фокус. Когда фокус пропадает (blur) я обновляю массив данных
  span.setAttribute("contenteditable", true);
  span.focus();

  span.addEventListener(
    "blur",
    () => {
      const editableItem = toDoList.map((element) =>
        element.id === id ? { ...element, text: span.textContent } : element
      );

      span.setAttribute("contenteditable", false);
      setLocalStorage(editableItem);
    },
    { once: true } // Нужно что бы не добавлялись лишние листнеры
  );
}

function createLi() {
  const liBtn = document.createElement("li");

  return liBtn;
}

function createSpan(text) {
  const span = document.createElement("span");
  span.textContent = text;

  return span;
}

function createEditBtn(id, span) {
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.textContent = "Edit";
  // classList.add - добавляет класс
  editBtn.addEventListener("click", () => {
    // Передаем id и li дальше
    editTask(id, span);
  });

  return editBtn;
}

function createDeleteBtn(id, li) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    // Передаем id и li дальше
    deleteTask(id, li);
  });

  return deleteBtn;
}

function renderLi(id, text) {
  const li = createLi();
  const span = createSpan(text);
  // Передаем только что созданные: span для редактирования текста, li для дальнейшего удаления, id нужен для обновления массива данных в localStorage
  const editBtn = createEditBtn(id, span);
  const deleteBtn = createDeleteBtn(id, li);

  li.append(span, editBtn, deleteBtn);

  return li;
}

function renderList() {
  const taskTable = document.querySelector(".taskTable");
  const toDoList = getLocalStorage();

  toDoList.forEach((element) => {
    taskTable.append(renderLi(element.id, element.text));
  });
}

function formSubmit(e) {
  e.preventDefault();

  const inputTask = document.querySelector(".inputTask");
  const taskTable = document.querySelector(".taskTable");
  const inputVal = inputTask.value;
  const id = uuidv4();
  const toDoList = getLocalStorage();

  toDoList.push({
    id: id,
    text: inputVal,
  });
  taskTable.append(renderLi(id, inputVal));
  inputTask.value = "";
  setLocalStorage(toDoList);
}

window.addEventListener("load", () => {
  const form = document.querySelector(".form");

  renderList();
  form.addEventListener("submit", formSubmit);
});
