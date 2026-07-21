export const setItem = (key , value)=>{

    localStorage.setItem(key ,JSON.stringify(value));

}

export const getItem = (key , fallback)=>{
    const stored = localStorage.getItem(key);
    return JSON.parse(stored) ?? fallback
 }