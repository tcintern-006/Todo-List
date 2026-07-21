
export const render = (id, text, time, editingId) => {

    let taskContent = (id == editingId)
        ? `<input type="text" class="edit-input" value="${text}">`
        : `<h2>${text}</h2>`;

    let editOrSaveBtn = (id == editingId)
        ? `<button class="btn total" data-action="save">Save</button>`
        : `<button class="btn total" data-action="edit">Edit</button>`;

    return `<li class="task-cards" data-id="${id}">
            <div class="task">
                ${taskContent}
                <p>${time}</p>
            </div>
            <div class="status">
                ${editOrSaveBtn}
                <button class="btn pending" data-action="delete">Delete</button>
                <button class="btn completed" data-action="complete">Completed</button>
            </div>
        </li>`
}

let navTotal = document.querySelector(".nav-total span");
let navCompleted = document.querySelector(".nav-completed span");
let navPending = document.querySelector(".nav-pending span");

let statTotal = document.querySelector(".stat-total span");
let statCompleted = document.querySelector(".stat-completed span");
let statPending = document.querySelector(".stat-pending span");

export const countUpdater = ({total , completed , pending})=>{
    
    navTotal.textContent = total;
    navCompleted.textContent = completed;
    navPending.textContent = pending;

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = pending;
}
