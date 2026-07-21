import { countUpdater, render } from "./DomHandler.js";
import { toggleFunc } from "./nav.js";
import { getItem, setItem } from "./storage.js";
import { addTask, completeTask, deleteTask, saveTask } from "./taskManager.js";

toggleFunc();





let input = document.querySelector("input");
let btn = document.querySelector(".addbtn");
let inputvalue = "";
let tasks = getItem("tasks", []);
let list = document.querySelector(".task-container")

// Get input
input.addEventListener("input", (dets) => {
    inputvalue = dets.target.value;
})

let totaltaskcount = getItem("totaltaskcount", 0)

// add task to localStorage
btn.addEventListener('click', (dets) => {
    let { Newtasks, Newtotaltaskcount } = addTask(inputvalue);
    tasks = Newtasks;
    totaltaskcount = Newtotaltaskcount;
    getallTasks();
   countUpdater({total : totaltaskcount , completed : comp_Count , pending :tasks.length});


})


// GET ALL TASK ON EVERY UPDATE
let editingId = null;

function getallTasks() {
    list.innerHTML = tasks.map((e) => {
        let {id , text , time } = e;
       return render(id , text , time ,editingId);
    }).join("");
}
getallTasks();


let dlt_Count = getItem("delete_count", 0);
let comp_Count = getItem("complete_count", 0);


// DELETE, COMPLETE, EDIT, SAVE
list.addEventListener("click", (e) => {
    if (e.target.dataset.action === 'delete') {
        let card = e.target.closest(".task-cards");
        let { id } = card.dataset;
        let { Newtasks, Newdlt_Count } = deleteTask(id);

        tasks = Newtasks;
        dlt_Count = Newdlt_Count;
        getallTasks();
       countUpdater({total : totaltaskcount , completed : comp_Count , pending :tasks.length});

    }

    if (e.target.dataset.action === 'complete') {
        let card = e.target.closest('.task-cards');
        let { id } = card.dataset;
        let { Newtasks, Newcomp_Count } = completeTask(id);
        tasks = Newtasks;
        comp_Count = Newcomp_Count;
        getallTasks()
        countUpdater({total : totaltaskcount , completed : comp_Count , pending :tasks.length});

    }

    if (e.target.dataset.action === 'edit') {
        let card = e.target.closest(".task-cards");
        editingId = card.dataset.id;
        getallTasks();
    }

    if (e.target.dataset.action === 'save') {
        let card = e.target.closest(".task-cards");
        let id = card.dataset.id;
        let editInput = card.querySelector(".edit-input");
        tasks = saveTask(id, editInput.value);
        editingId = null;
        getallTasks();
    }
});


countUpdater({total : totaltaskcount , completed : comp_Count , pending :tasks.length});
