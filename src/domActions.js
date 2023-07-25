import tasks from "./tasks";
import projects from "./projects";
import datepicker from 'js-datepicker/dist/datepicker.min.js';
import 'js-datepicker/dist/datepicker.min.css';

const domActions = (() => {
    const projectList = document.querySelector("#projectList");
    const content = document.querySelector("#content");
    const menu= document.querySelector("#menu-icon");
    const sidebar = document.querySelector("#sidebar");
    const addTaskBtn = document.querySelector("#addTask");
    const addProjectBtn = document.querySelector("#addProject");
    const closeTaskMakerBtn = document.querySelector("#TaskMakerClose");
    const closeProjectMakerBtn = document.querySelector("#ProjectMakerClose");
    const closeTaskModifierBtn = document.querySelector("#TaskModifierClose");
    const closeProjectModifierBtn = document.querySelector("#ProjectModifierClose");
    const taskForm = document.querySelector("#taskForm");
    const projectForm = document.querySelector("#projectForm");
    const taskModifierForm = document.querySelector("#taskModifierForm");
    const projectModifierForm = document.querySelector("#projectModifierForm");
    function triggerMaker(show, maker) {
        const overlay = document.querySelector("#overlay");
        const chosenMaker = document.querySelector(maker);
        if (show) {
            overlay.classList.remove("hidden");
            chosenMaker.classList.remove("hidden");
        } else {
            overlay.classList.add("hidden");
            chosenMaker.classList.add("hidden");
        }
    }

    function manageTriggers() {
        addTaskBtn.addEventListener('click', () => triggerMaker(true, "#taskMaker"));
        closeTaskMakerBtn.addEventListener('click', () => triggerMaker(false, "#taskMaker"));
        addProjectBtn.addEventListener('click', () => triggerMaker(true, "#projectMaker"));
        closeProjectMakerBtn.addEventListener('click', () => triggerMaker(false, "#projectMaker"));
        closeTaskModifierBtn.addEventListener('click', () => triggerMaker(false, "#taskModifier"));
        closeProjectModifierBtn.addEventListener('click', () => triggerMaker(false, "#projectModifier"));

        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            projects.addProjectWithForm();
            triggerMaker(false, "#projectMaker");
            projectForm.reset();
            projects.renderProjects();
        });

        taskForm.addEventListener('submit', function(e) {
            e.preventDefault()
            tasks.addTaskWithForm();
            triggerMaker(false, "#taskMaker");
            taskForm.reset();
            tasks.renderTasks(projects.projectIndex);
        });

        taskModifierForm.addEventListener('submit', function(e) {
            e.preventDefault();
            tasks.modifyTaskWithForm(projects.projectArray[projects.projectIndex].taskArray[tasks.taskIndex]);
            triggerMaker(false, "#taskModifier");
            taskModifierForm.reset();
            tasks.renderTasks(projects.projectIndex);
        });

        projectModifierForm.addEventListener('submit', function(e) {
            e.preventDefault();
            projects.modifyProjectWithForm(projects.projectArray[projects.projectIndex]);
            triggerMaker(false, "#projectModifier");
            projectModifierForm.reset();
            projects.renderProjects();
        });

        menu.addEventListener('click', () => {
            if (sidebar.classList.contains("hidden")) {
                sidebar.classList.remove("hidden");
                content.style.gridColumn= "2 / 3";
            }
            else {
                sidebar.classList.add("hidden");
                content.style.gridColumn= "1 / 3";
            }
        });
    }

    function initialize() {

        if (localStorage.getItem("projectArray")) {
            projects.projectArray.push(projects.project(
                "Default Project",
                "07/24/2023",
                "High",
                [tasks.task("Default Task",
                    "Default Description",
                    "07/24/2023",
                    "High",
                    0)],
                0));

        } else {
            projects.projectArray = JSON.parse(localStorage.getItem("projectArray"));
        }

        projects.renderProjects();
        manageTriggers();
        projectList.firstElementChild.classList.add("active");

        const dp = datepicker('#TaskDueDate',{
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString()
                input.value = value // => '1/1/2099'
            }
        });

        const dp2 = datepicker('#ProjectDueDate',{
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString()
                input.value = value // => '1/1/2099'
            }
        });

        const dp3 = datepicker('#TaskModifierDueDate',{
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString()
                input.value = value // => '1/1/2099'
            }
        });

        const dp4 = datepicker('#ProjectModifierDueDate',{
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString()
                input.value = value // => '1/1/2099'
            }
        });
    }

    return {
        initialize
    };
})();

export default domActions;