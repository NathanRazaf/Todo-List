import tasks from "./tasks";
import edit from "./icons/square-edit-outline.svg";
import trash from "./icons/trash-can-outline.svg";
import projects from "./projects";

function projectItem(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("projectItem");
    projectItem.setAttribute("data-index", project.index);

    const projectItemTop = document.createElement("div");
    projectItemTop.classList.add("projectItemTop");
    projectItem.appendChild(projectItemTop);

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project.title;
    projectItemTop.appendChild(projectTitle);

    const projectButtons = document.createElement("div");
    projectButtons.classList.add("projectButtons");
    projectItemTop.appendChild(projectButtons);

    const projectEdit = new Image(28, 28);
    projectEdit.src = edit;
    projectButtons.appendChild(projectEdit);

    const projectDelete = new Image(28, 28);
    projectDelete.src = trash;
    projectButtons.appendChild(projectDelete);

    const projectItemBottom= document.createElement("div");
    projectItemBottom.classList.add("projectItemBottom");
    projectItem.appendChild(projectItemBottom);

    const projectDueDate = document.createElement("p");
    projectDueDate.textContent = `Due date : ${project.dueDate}`;
    projectItemBottom.appendChild(projectDueDate);

    const projectPriority = document.createElement("p");
    projectPriority.textContent = `${project.priority} priority`;
    switch (project.priority) {
        case "High":
            projectPriority.classList.add("highPriority");
            break;
        case "Medium":
            projectPriority.classList.add("mediumPriority");
            break;
        case "Low":
            projectPriority.classList.add("lowPriority");
            break;
        default:
            projectPriority.textContent = "No priority";
    }
    projectItemBottom.appendChild(projectPriority);

    projectItem.addEventListener('click', function(e) {
        projects.projectIndex = e.currentTarget.getAttribute("data-index");

        const allProjects = document.querySelectorAll(".projectItem");
        allProjects.forEach((proj) => proj.classList.remove("active"));

        projectItem.classList.add("active");

        tasks.renderTasks(projects.projectIndex);
    });

    projectEdit.addEventListener('click', function(e) {
        document.querySelector("#projectModifier").classList.remove("hidden");
        document.querySelector("#overlay").classList.remove("hidden");

        document.querySelector("#ProjectModifierTitle").value = project.title;
        document.querySelector("#ProjectModifierDueDate").value = project.dueDate;
        document.querySelector("#ProjectModifierPriority").value = project.priority;

        e.stopPropagation();
    });

    projectDelete.addEventListener('click', function(e) {
        projects.removeProject(project.index);
        projects.renderProjects();
        e.stopPropagation();
    });

    return projectItem;
}

export default projectItem;