//this function creates random id
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
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



  li.append(span, editBtn, deleteBtn);

  return li;
}

