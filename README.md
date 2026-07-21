# To-Do List App — ES6+ Refactor

A simple browser-based to-do list app, refactored from a single-file script into a modular, ES6+ codebase as part of a Web Development internship task (Think and Code Pvt Ltd).

## 🎯 Project Goal

The original version of this app was written as one large `script.js` file, using older JavaScript patterns (`function` keyword, string concatenation, direct localStorage calls scattered everywhere, and a single blob of logic mixing UI and data together).

This refactor rewrites the same functionality using **Modern JavaScript (ES6+)** features and **ES Modules**, with the goal of making the code cleaner, easier to debug, and easier to extend.

## 📁 Project Structure

```
todo-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js          # Entry point — wires everything together
│   ├── taskManager.js   # Task data logic (add/delete/complete/edit)
│   ├── domHandler.js    # Rendering tasks + updating counters on screen
│   ├── storage.js       # localStorage read/write helpers
│   └── nav.js           # Hamburger menu toggle logic
└── assets/
    └── icons/
```

## 🧩 Why Split Into Multiple Files? (Separation of Concerns)

A common question when moving from one file to many is: **"doesn't this make the app heavier?"**

It doesn't, in any way that matters. Splitting one large file into several smaller ones doesn't increase the total amount of code — the browser just fetches a few small files instead of one big one, which costs a negligible amount of time. In real production apps, bundlers (like Vite or Webpack) usually recombine everything anyway before deployment.

The real reason to split files isn't performance — it's **maintainability**. This is a core software engineering principle called **separation of concerns**: each file should have exactly one job.

| File | Responsibility |
|---|---|
| `storage.js` | Knows *only* about reading/writing localStorage. Doesn't know what a "task" is. |
| `taskManager.js` | Knows *only* about task data — adding, deleting, completing, editing. Doesn't know about the DOM at all. |
| `domHandler.js` | Knows *only* about rendering HTML and updating the screen. Doesn't know how tasks are stored. |
| `nav.js` | Knows *only* about the hamburger menu toggle. Fully independent of tasks. |
| `main.js` | The entry point. Doesn't contain logic itself — just imports the other modules and wires them together via event listeners. |

### Real benefits experienced while building this:

- **Bugs are easier to isolate.** During development, nearly every bug was traceable to a single file (e.g. a missing `return` in `main.js`, a mutation issue in `taskManager.js`) rather than being buried in one long script.
- **Each file can be reasoned about on its own.** You don't need to understand rendering logic to fix a storage bug, or vice versa.
- **Reusability.** `storage.js`'s `getItem`/`setItem` helpers don't know anything about tasks — they could be dropped into a completely different project as-is.
- **Swappable internals.** If this app ever moved from `localStorage` to a real backend/database, only `storage.js` would need to change — no other file depends on *how* storage works, only *that* it works.
- **This mirrors real-world codebases.** Professional JavaScript projects — and frameworks like React — are built around this exact idea: small, focused files/components rather than one giant script.

## ✅ ES6+ Features Used

### 1. Arrow Functions
All functions across the project use arrow function syntax (`const fn = () => {}`) instead of the `function` keyword, including event listener callbacks.

```js
export const toggleFunc = () => {
  const bars = document.querySelectorAll(".bars");
  bars.forEach((bar) => {
    bar.addEventListener("click", () => {
      ul.classList.toggle("hidden");
      ul.classList.toggle("show");
    });
  });
};
```

### 2. Destructuring
Used throughout to pull values out of objects/DOM datasets cleanly instead of accessing properties one by one.

```js
// Destructuring an object straight out of a .map() callback
const { id, text, time } = task;

// Destructuring a DOM element's dataset
const { id } = card.dataset;

// Destructuring directly in a function parameter
export const countUpdater = ({ total, completed, pending }) => { ... };
```

### 3. Spread & Rest Operators
Used to update task objects **immutably** — instead of mutating an existing object directly, a new object is built with the updated field.

```js
export const editTaskText = (id, value) => {
  Newtasks = Newtasks.map((t) =>
    t.id == id ? { ...t, text: value } : t
  );
  setItem("tasks", Newtasks);
  return Newtasks;
};
```
Here, `{ ...t }` copies every existing property of the task, and `text: value` overwrites just the one field that changed — the original task object is never directly modified.

### 4. Template Literals
Used to build HTML strings and replace old-style string concatenation (`'<li>' + text + '</li>'`).

```js
return `<li class="task-cards" data-id="${id}">
  <div class="task">
    <h2>${text}</h2>
    <p>${time}</p>
  </div>
</li>`;
```

### 5. Modules (`import` / `export`)
Each file exports only the functions other files need, and `main.js` imports them to wire the app together.

```js
// taskManager.js
export const addTask = (text) => { ... };

// main.js
import { addTask } from "./taskManager.js";
```

> ⚠️ Note: `index.html` must load the entry script with `type="module"`, and the app must be served through a local server (e.g. VS Code's Live Server) — opening `index.html` directly via `file://` will block ES modules due to CORS restrictions.

```html
<script type="module" src="js/main.js"></script>
```

## 🛠️ Features

- Add tasks with a timestamp
- Edit task text in-place
- Mark tasks as completed
- Delete tasks
- Live counters (total / completed / pending) shown in both the nav bar and stats section
- Data persisted in `localStorage`, so tasks survive a page refresh

## ▶️ Running the Project

1. Clone the repository
2. Open the project folder in VS Code
3. Install and run the **Live Server** extension (or any local server) on `index.html`
4. Do **not** open `index.html` directly by double-clicking — ES modules require a real server

## 📚 What I Learned

- The difference between mutation and immutability, and why `.map()` + spread is preferred over directly changing an object's properties
- Why DOM logic and data logic should be kept in separate files
- How `import`/`export` actually work in the browser, including the `type="module"` requirement
- How closures let event listener callbacks keep access to variables from an outer function, even after that outer function has finished running
- The difference between `||` and `??` when supplying fallback/default values
