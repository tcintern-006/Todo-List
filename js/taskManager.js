import { getItem, setItem } from "./storage.js";


let Newtasks = getItem('tasks', []);
let Newtotaltaskcount = getItem('totaltaskcount', 0);

export const addTask = (text) => {
    
    if (text.trim() !== "") {
        let task = {
            id: Date.now(),
            text: text,
            time: new Date().toLocaleTimeString()
        }
        Newtasks.push(task);
        setItem("tasks", Newtasks);
        Newtotaltaskcount += 1;
        setItem("totaltaskcount", Newtotaltaskcount);
        return {
            Newtasks,
            Newtotaltaskcount,
        };
    }
}




let Newdlt_Count = getItem("delete_count", 0);

export const deleteTask = (id) => {

    Newtasks = Newtasks.filter((e) => e.id != id);
    Newdlt_Count += 1;
    setItem('tasks', Newtasks);
    setItem('delete_count', Newdlt_Count);
    return {
        Newtasks,
        Newdlt_Count,
    };
}

let Newcomp_Count = getItem("complete_count", 0);

export const completeTask = (id) => {

    Newtasks = Newtasks.filter((t) => t.id != id);
    setItem("tasks", Newtasks);
    Newcomp_Count += 1;
    setItem("complete_count", Newcomp_Count)
    return {
        Newtasks,
        Newcomp_Count
     };
}


export const saveTask = (id , value)=>{
   Newtasks = Newtasks.map((e) => (e.id == id ? { ...e, text: value } : e));
    setItem("tasks", Newtasks);
    return Newtasks;
}