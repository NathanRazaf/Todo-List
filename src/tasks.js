import projects from "./projects";
import taskItem from "./taskItem";


const tasks = (() => {
    let taskIndex = 0;
    const task = (title, description, dueDate, priority, index) => {
        return { title, description, dueDate, priority, index};
    }

    function addTaskWithForm() {
        const title = document.getElementById('TaskTitle').value;
        const description = document.getElementById('TaskDescription').value;
        const dueDate = document.getElementById('TaskDueDate').value;
        const priority = document.getElementById('TaskPriority').value;
        const index = projects.projectArray[projects.projectIndex].taskArray.length;
        projects.projectArray[projects.projectIndex].taskArray.push(task(title, description, dueDate, priority, index));
    }

    function modifyTaskWithForm(taskChosen) {
        const title = document.getElementById('TaskModifierTitle').value;
        const description = document.getElementById('TaskModifierDescription').value;
        const dueDate = document.getElementById('TaskModifierDueDate').value;
        const priority = document.getElementById('TaskModifierPriority').value;


        removeTask(taskChosen.index);
        projects.projectArray[projects.projectIndex].taskArray.splice(taskChosen.index,0,task(title, description, dueDate, priority, taskChosen.index));
    }

    function removeTask(index) {
        if (projects.projectArray[projects.projectIndex].taskArray.length === 1) {
            projects.projectArray[projects.projectIndex].taskArray = [];
        }
        else {
            projects.projectArray[projects.projectIndex].taskArray.splice(index, 1);
            projects.projectArray[projects.projectIndex].taskArray.forEach((task) => {
                if (task.index > index) {
                    task.index--;
                }
            });

        }
    }

    function renderTasks(index){
        const taskList = document.querySelector("#taskList");
        taskList.innerHTML = "";
        projects.projectArray[index].taskArray.forEach(task => {
            taskList.appendChild(taskItem(task));
        });

        localStorage.setItem("projectArray", JSON.stringify(projects.projectArray));
        console.log("JSON array 2 = " + localStorage.getItem("projectArray"));
    }

    return {
        taskIndex,
        task,
        addTaskWithForm,
        removeTask,
        renderTasks,
        modifyTaskWithForm
    };
})();

export default tasks;