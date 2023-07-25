import tasks from './tasks';
import projectItem from "./projectItem";

const projects = (() => {
    let projectIndex = 0;
    const projectArray = [];

    const project = (title, dueDate, priority, taskArray, index) => {
        return { title, dueDate, priority, taskArray, index };
    }

    function addProjectWithForm() {
        const title = document.getElementById('ProjectTitle').value;
        const dueDate = document.getElementById('ProjectDueDate').value;
        const priority = document.getElementById('ProjectPriority').value;
        const taskArray = [];
        const index = projectArray.length;
        projectArray.push(project(title, dueDate, priority, taskArray, index));
    }

    function modifyProjectWithForm(projectChosen) {
        const title = document.getElementById('ProjectModifierTitle').value;
        const dueDate = document.getElementById('ProjectModifierDueDate').value;
        const priority = document.getElementById('ProjectModifierPriority').value;

        removeProject(projectChosen.index);
        projectArray.splice(projectChosen.index,0,project(title, dueDate, priority, projectChosen.taskArray, projectChosen.index));
    }

    function removeProject(index) {
        projectArray.splice(index, 1);
        projectArray.forEach((project) => {
            if (project.index > index) {
                project.index--;
            }
        });
        projectIndex = 0;
        const projectList = document.querySelector("#projectList");
        Array.from(projectList.children).forEach((project) => {
            if (project.getAttribute("data-index") > index) {
                project.setAttribute("data-index", project.getAttribute("data-index")-1);
            }
        });

        renderProjects();
    }

    function renderProjects() {
        const projectList = document.querySelector("#projectList");
        projectList.innerHTML = "";

        if (projectArray.length === 0) {
            const taskList = document.querySelector("#taskList");
            taskList.innerHTML = "";
            localStorage.setItem("projectArray", JSON.stringify(projectArray));
            console.log("JSON array 1 = " + JSON.parse(localStorage.getItem("projectArray")));

        }
        else {
            projectArray.forEach(project => {
                projectList.appendChild(projectItem(project));
            });
            projectList.firstElementChild.classList.add("active");
            tasks.renderTasks(projectIndex);
        }




    }

    return {
        projectArray,
        projectIndex,
        project,
        addProjectWithForm,
        modifyProjectWithForm,
        removeProject,
        renderProjects
    }

})();
export default projects;