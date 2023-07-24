import edit from "./icons/square-edit-outline.svg";
import trash from "./icons/trash-can-outline.svg";
import tasks from "./tasks";
import projects from "./projects";

function taskItem(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");

    const taskItemLeft = document.createElement("div");
    taskItemLeft.classList.add("taskItemLeft");
    const taskItemRight = document.createElement("div");
    taskItemRight.classList.add("taskItemRight");

    taskItem.setAttribute("data-index", task.index);

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;
    taskItemLeft.appendChild(taskTitle);

    const formattedDescription = task.description.replace(/\n/g, '<br>');
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("hidden");
    taskDescription.innerHTML = formattedDescription;
    taskItemLeft.appendChild(taskDescription);

    taskItemLeft.appendChild(taskDescription);

    const taskDueDate = document.createElement("p");

    if (daysDifference(task.dueDate) < 0) {
        taskDueDate.textContent = "Task is overdue!";
        taskDueDate.className = "taskDueDate";
    } else if (daysDifference(task.dueDate) === 0) {
        taskDueDate.textContent = "Due today!!";
        taskDueDate.className = "taskDueDate";
        taskDueDate.classList.add("highPriority");
    } else if (daysDifference(task.dueDate) === 1) {
        taskDueDate.textContent = "Due tomorrow";
        taskDueDate.className = "taskDueDate";
        taskDueDate.classList.add("mediumPriority");
    } else if (daysDifference(task.dueDate) > 10) {
        taskDueDate.textContent=task.dueDate;
        taskDueDate.className = "taskDueDate";
    }
    else {
        taskDueDate.textContent = `Due in ${daysDifference(task.dueDate)} days`;
        taskDueDate.className = "taskDueDate";
    }
    taskItemRight.appendChild(taskDueDate);

    const taskPriority = document.createElement("p");
    taskPriority.classList.add("hidden");
    switch (task.priority) {
        case "High":
            taskPriority.classList.add("highPriority");
            break;
        case "Medium":
            taskPriority.classList.add("mediumPriority");
            break;
        case "Low":
            taskPriority.classList.add("lowPriority");
            break;
        default:
            taskPriority.textContent = "No priority";
    }
    taskPriority.textContent = `${task.priority} priority task`;
    taskItemLeft.appendChild(taskPriority);

    const taskButtons= document.createElement("div");
    taskButtons.classList.add("taskButtons");
    taskButtons.classList.add("hidden");
    taskItemRight.appendChild(taskButtons);

    const taskEdit = new Image(30, 30);
    taskEdit.src = edit;
    taskButtons.appendChild(taskEdit);

    const taskDelete = new Image(30, 30);
    taskDelete.src = trash;
    taskButtons.appendChild(taskDelete);

    taskItem.appendChild(taskItemLeft);
    taskItem.appendChild(taskItemRight);

    taskItem.addEventListener('click', function(e) {
        tasks.taskIndex = e.currentTarget.getAttribute("data-index");
        taskDescription.classList.toggle("hidden");
        taskButtons.classList.toggle("hidden");
        taskPriority.classList.toggle("hidden");
    });

    taskEdit.addEventListener('click', function(e) {
        document.querySelector("#taskModifier").classList.remove("hidden");
        document.querySelector("#overlay").classList.remove("hidden");

        document.querySelector("#TaskModifierTitle").value = task.title;
        document.querySelector("#TaskModifierDescription").value = task.description;
        document.querySelector("#TaskModifierDueDate").value = task.dueDate;
        document.querySelector("#TaskModifierPriority").value = task.priority;

        e.stopPropagation();
    });

    taskDelete.addEventListener('click', function(e) {
        tasks.removeTask(task.index);
        tasks.renderTasks(projects.projectIndex);
        e.stopPropagation();
    });

    return taskItem;
}

function daysDifference(inputDateStr) {
    // Parse the input date string
    const parts = inputDateStr.split('/');
    const month = parseInt(parts[0], 10) - 1; // months are 0-based in JavaScript
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const inputDate = new Date(year, month, day);

    // Get today's date and set the time to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = inputDate - today;

    // Convert the difference to days
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

export default taskItem;