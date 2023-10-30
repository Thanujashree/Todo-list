document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    let selectedTask = null;

    function highlightTask(task) {
        if (selectedTask) {
            selectedTask.classList.remove("selected");
        }
        selectedTask = task;
        if (selectedTask) {
            selectedTask.classList.add("selected");
        }
    }

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();

        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <span class="delete">X</span>
        `;

        taskList.appendChild(li);
        taskInput.value = "";

        highlightTask(li);

        const deleteButton = li.querySelector(".delete");
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(li);
            if (li === selectedTask) {
                selectedTask = null;
            }
        });
    });

    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            const tasks = taskList.querySelectorAll("li");
            const currentIndex = Array.from(tasks).indexOf(selectedTask);

            if (event.key === "ArrowUp" && currentIndex > 0) {
                highlightTask(tasks[currentIndex - 1]);
            } else if (event.key === "ArrowDown" && currentIndex < tasks.length - 1) {
                highlightTask(tasks[currentIndex + 1]);
            }
        }
    });
});
