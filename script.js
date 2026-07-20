let ul = document.querySelector("nav ul")
let bars = document.querySelectorAll(".bars")

bars.forEach((bar) => {

    bar.addEventListener('click', (dets) => {
        if (ul.classList.contains("hidden")) {
            ul.classList.remove('hidden')
            ul.classList.add("show")
        } else {
            ul.classList.remove('show')
            ul.classList.add("hidden")
        }
    })

})





let input = document.querySelector("input");
let btn = document.querySelector(".addbtn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let h2 = document.querySelector(".task h2");
let p = document.querySelector(".task p");
let list = document.querySelector(".task-container")
let li = document.querySelector(".task-cards")


// Get input
input.addEventListener("input", (dets) => {
    inputvalue = dets.target.value;
})


let totaltaskcount = JSON.parse(localStorage.getItem("totaltaskcount"));
// add task to localStorage
btn.addEventListener('click', (dets) => {
    if (inputvalue.trim() !== "") {
        let task = {
            id: Date.now(),
            text: inputvalue,
            time: new Date().toLocaleTimeString()
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        inputvalue = "";
        input.textContent = "";
        totaltaskcount += 1;
        localStorage.setItem("totaltaskcount", totaltaskcount);
        getallTasks()
        countUpdater();
    }
})



// GET ALL TASK ON EVERY UPDATE
let editingId = null;

function getallTasks() {
    list.innerHTML = tasks.map((e) => {

        let taskContent = (e.id == editingId)
            ? `<input type="text" class="edit-input" value="${e.text}">`
            : `<h2>${e.text}</h2>`;

        let editOrSaveBtn = (e.id == editingId)
            ? `<button class="btn total" data-action="save">Save</button>`
            : `<button class="btn total" data-action="edit">Edit</button>`;

        return `<li class="task-cards" data-id="${e.id}">
            <div class="task">
                ${taskContent}
                <p>${e.time}</p>
            </div>
            <div class="status">
                ${editOrSaveBtn}
                <button class="btn pending" data-action="delete">Delete</button>
                <button class="btn completed" data-action="complete">Completed</button>
            </div>
        </li>`
    }).join("");
}
getallTasks();


let dlt_Count = JSON.parse(localStorage.getItem("delete_Count"));
let comp_Count = JSON.parse(localStorage.getItem("complete_count"));





// DELETE TASK  Complete and update task
list.addEventListener("click", (e) => {
    if (e.target.dataset.action === 'delete') {
        let card = e.target.closest(".task-cards");
        let id = card.dataset.id;
        tasks = tasks.filter((e) => e.id != id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        dlt_Count += 1;
        localStorage.setItem("delete_count", dlt_Count);
        getallTasks();
        countUpdater();
    }


    if (e.target.dataset.action === 'complete') {

        let card = e.target.closest('.task-cards');
        let id = card.dataset.id;
        tasks = tasks.filter((e) => e.id != id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        comp_Count += 1;
        localStorage.setItem("complete_count", comp_Count)
        console.log(comp_Count);
        getallTasks()
        countUpdater();
    }

    if (e.target.dataset.action === 'edit') {
        let card = e.target.closest(".task-cards");
        editingId = card.dataset.id;
        getallTasks();
    }

    if (e.target.dataset.action === 'save') {
        let card = e.target.closest(".task-cards");
        let id = card.dataset.id;
        let input = card.querySelector(".edit-input");

        let task = tasks.find((t) => t.id == id);
        task.text = input.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        editingId = null;
        getallTasks();
    }
});


let navTotal = document.querySelector(".nav-total span");
let navCompleted = document.querySelector(".nav-completed span");
let navPending = document.querySelector(".nav-pending span");

let statTotal = document.querySelector(".stat-total span");
let statCompleted = document.querySelector(".stat-completed span");
let statPending = document.querySelector(".stat-pending span");

function countUpdater() {
    navTotal.textContent = totaltaskcount;
    navCompleted.textContent = comp_Count;
    navPending.textContent = tasks.length;

    statTotal.textContent = totaltaskcount;
    statCompleted.textContent = comp_Count;
    statPending.textContent = tasks.length;
}