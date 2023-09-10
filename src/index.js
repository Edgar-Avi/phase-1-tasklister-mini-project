document.addEventListener("DOMContentLoaded", () => {
  // your code here
  addingEventListeners()
});

let taskObjArray = []

function addingEventListeners() {
  document
  .getElementById("create-task-form")
  .addEventListener("submit", handleFormSubmit)
  document.getElementById("sort-tasks").addEventListener("change", sortTasks)
}

function handleFormSubmit(event) {
  event.preventDefault()
  console.log(event)
  const task = event.target[0].value.toUpperCase()
  const taskUrgency = parseInt(event.target.priority.value)

  const taskObj = {task, taskUrgency}
  taskObjArray.push(taskObj)

  console.log(taskObjArray)

  sortTasks()
  displayTask()
}

function displayTask() {
  const taskUl = document.getElementById("tasks")
  taskUl.innerHTML = ""

  taskObjArray.forEach((task) => {
    const taskLi = document.createElement("li")
    const taskDelete = document.createElement("button")
  
    taskDelete.textContent = "x"
    taskDelete.addEventListener("click", (event) => deleteTask(event, task))
  
    taskLi.textContent = task.task + " "
    taskLi.style.color = taskUrgentColor(task.taskUrgency)
    taskLi.appendChild(taskDelete)
    taskUl.appendChild(taskLi)
  })
}

function deleteTask(event, task) {
  console.log(event)
  taskObjArray = taskObjArray.filter((element) => element.task !== task.task)
  event.target.parentNode.remove()
}

function taskUrgentColor(taskUrgency) {
  if (taskUrgency === 1) {
    return "red"
  } else if (taskUrgency === 2) {
    return "orange"
  } else {
    return "green"
  }

}

function sortTasks() {
  console.log("in sort tasks")
  const sortTasksSelect = document.getElementById("sort-tasks")
  if (sortTasksSelect.value === "high") {
    taskObjArray.sort((a, b) => a.taskUrgency - b.taskUrgency)
  } else {
    taskObjArray.sort((a, b) => b.taskUrgency - a.taskUrgency)
  }
  console.log(taskObjArray)
  displayTask()
}