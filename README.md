# To-Do App

A simple, responsive to-do list built with HTML, CSS, and vanilla JavaScript. No frameworks, no build tools — just the DOM and `localStorage`. Built as a revision exercise on JavaScript fundamentals: variables, functions, arrays/objects, loops, and conditionals.

## Features

- Add new tasks with a timestamp
- Edit a task's text inline (click Edit, the text becomes an input, click Save)
- Mark a task as completed
- Delete a task
- Tasks persist across page refreshes using `localStorage`
- Live counters for total, completed, and pending tasks
- Collapsible nav drawer for smaller screens
- Responsive layout (phone / tablet / desktop breakpoints)

## Tech Stack

- HTML5
- CSS3 (custom properties, Flexbox, media queries)
- Vanilla JavaScript (ES6+)
- `localStorage` for persistence — no backend, no database

No libraries or frameworks were used on purpose. The goal of this project was to revise core JS concepts, and pulling in something like React would have skipped past the parts I actually needed to practice: DOM manipulation, event handling, and array methods.

## Project Structure

```
├── index.html
├── style.css
├── script.js
└── README.md
```

## How It Works

### Data model

Each task is stored as an object:

```js
{
  id: 1721490812345,
  text: "Buy groceries",
  time: "3:45:12 PM"
}
```

`id` is generated with `Date.now()`. It's simple and good enough for a single-user, client-side app — no two tasks get created in the same millisecond in normal use, and it avoids pulling in a UUID library for something this small.

### Rendering

The whole task list is rebuilt on every change using `Array.prototype.map()` combined with `.join("")`, and written to the container in one shot via `innerHTML`. This was a deliberate choice over creating and appending individual DOM nodes with `createElement`, for two reasons:

1. It's far less code, and keeps the render logic in one place.
2. Since the entire list re-renders on every add/edit/delete, there's no need to track and update individual nodes — the array is always the single source of truth, and the DOM is just a reflection of it.

The trade-off is that this approach touches the DOM more than a fine-grained update would, which matters at a much larger scale than a personal to-do list. For this project size, the simplicity was worth it.

### Finding the right task: event delegation

Instead of attaching a click listener to every Edit/Delete/Complete button individually, a single listener sits on the parent task list (`<ul class="task-container">`). Every click bubbles up to that one listener, which checks `e.target` (or its closest matching ancestor) to figure out what was clicked and which task it belongs to, using a `data-id` attribute placed on each task's `<li>`.

This matters because the list re-renders from scratch on every change. Listeners attached directly to individual buttons would be destroyed and need re-attaching every time `innerHTML` is reset. One listener on the parent, set up once, keeps working no matter how many times the list is redrawn.

### Editing a task

Rather than opening a separate popup/modal, editing happens inline: clicking Edit swaps that task's `<h2>` for an `<input>` pre-filled with its current text, and swaps the Edit button for a Save button. A single `editingId` variable tracks which task (if any) is currently in edit mode, and the render function checks against it for every task on every re-render. Clicking Save reads the input's current value, updates that task's `text` field in the array, saves to `localStorage`, and resets `editingId` back to `null`.

### Persistence

`localStorage` only stores strings, so the task array is serialized with `JSON.stringify()` before saving and parsed back out with `JSON.parse()` on load:

```js
localStorage.setItem("tasks", JSON.stringify(tasks));
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
```

The `|| []` fallback matters on a first-ever visit, when `localStorage.getItem()` returns `null` — without it, the app would throw trying to call array methods on `null`.

## Known Limitations

- No unique constraint beyond the timestamp-based `id` — collisions are theoretically possible but extremely unlikely in practice
- Task text is inserted via template strings without escaping, so a task containing `"` could break the rendered markup
- Filtering by All / Pending / Completed is on the roadmap but not yet implemented — currently, marking a task complete removes it rather than tagging it

## Possible Improvements

- Add a `status` field (`pending` / `completed`) instead of deleting on complete, to support filter tabs
- Escape user input before inserting into `innerHTML`
- Replace timestamp IDs with a small unique-id utility if this ever needs to scale beyond a single browser session

## Running Locally

Clone the repo and open `index.html` in a browser, or serve it with a local dev server (e.g. VS Code's Live Server extension) so relative paths resolve correctly.

```bash
git clone <repo-url>
cd todo-app
# open index.html, or run it through a local server
```
