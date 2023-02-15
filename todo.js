//this function creates random id
function uuidv4() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
}

function deleteTask(li) {
	const li = e.currentTarget.closest("li");
	const taskId = li.getAttribute("data-id");
	const index = toDoList.findIndex((task) => task.id === taskId);
	toDoList.splice(index, 1);
	li.remove();
	localStorage.setItem("toDoList", JSON.stringify(toDoList));}

function editTask() {}

function createLi() {
	const liBtn = document.createElement("li");

	return liBtn;
}

function createSpan(text) {
	const spanBtn = document.createElement("span");
	spanBtn.textContent = text;

	return spanBtn;
}

function createEditBtn(id) {
	const editBtn = document.createElement("button");
	editBtn.classList.add("editBtn");
	editBtn.textContent = "Edit";
	// classList.add - добавляет класс
	editBtn.addEventListener("click", editTask);

	return editBtn;
}

function createDeleteBtn(id) {
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("deleteBtn");
	deleteBtn.textContent = "Delete";
	deleteBtn.addEventListener("click", function (e) {
		deleteTask(e); // call deleteTask with the event object as an argument

	return deleteBtn;
}

function renderLi(text, id) {
	const li = createLi();
	const span = createSpan(text);
	const editBtn = createEditBtn(id);
	const deleteBtn = createDeleteBtn(id);
li.setAttribute("data-id", id); // set the data-id attribute to the ID of the task
		
	li.append(span, editBtn, deleteBtn);

	return li;
}

window.addEventListener("load", (event) => {
	const taskTable = document.querySelector(".taskTable");
	const inputTask = document.querySelector(".inputTask");
	const form = document.querySelector(".form");
	const toDoList = localStorage.getItem("toDoList")
		? JSON.parse(localStorage.getItem("toDoList"))
		: [];

	toDoList.forEach((element) => {
		taskTable.append(renderLi(element.text));
	});

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		const inputVal = inputTask.value;
		const id = uuidv4();
		toDoList.push({
			id: id,
			text: inputVal,
		});
		taskTable.append(renderLi(inputVal, id));
		inputTask.value = "";
		localStorage.setItem("toDoList", JSON.stringify(toDoList));
	});
});
