export const toggleFunc = () => {
    let ul = document.querySelector("nav ul")
    let bars = document.querySelectorAll(".bars")

    bars.forEach((bar) => {
        bar.addEventListener('click', (dets) => {
            ul.classList.toggle("hidden")
            ul.classList.toggle("show")
        })
    })
}