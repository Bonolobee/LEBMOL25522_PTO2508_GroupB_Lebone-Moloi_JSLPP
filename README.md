# Kanban Task Management App

A responsive Kanban board built with HTML, CSS, and modular JavaScript. The app allows users to create, edit, and delete tasks, organize them by workflow status, and keep their progress saved with local storage. For the portfolio-piece requirements, the app also loads its initial task data from an API, shows a loading state while data is being fetched, and displays an error message if the request fails.

## Preview

[Watch on Loom] Presentation video 1: (https://www.loom.com/share/e08149d0ba444e19b67a533812597cf1)
- Presentation video 2: (https://www.loom.com/share/dc90402d024c4654bf65e7e2df99617a)
[Link to the Netlify app] https://lebmol25522-pto2508-jslpp.netlify.app

## Project Overview

This project was developed as a front-end Kanban task manager inspired by a Figma design. It focuses on combining clean UI implementation with practical JavaScript features such as asynchronous data fetching, local storage persistence, modal-based editing, and responsive layout behavior for desktop and mobile devices.

Users can:

- view tasks grouped into `Todo`, `Doing`, and `Done`
- add new tasks from a modal form
- edit existing tasks by clicking a task card
- delete tasks from the edit modal
- switch between light and dark mode
- hide and show the desktop sidebar
- keep task changes saved across refreshes

## Features

- API-based initial task loading
- loading state while tasks are being fetched
- error messaging when fetching fails
- local storage persistence
- add, edit, and delete task flows
- task status updates across columns
- responsive mobile layout
- desktop and mobile-friendly controls
- modular JavaScript structure
- JSDoc comments for maintainability

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Local Storage API
- Fetch API

## How It Works

When the app starts, it first checks local storage for previously saved tasks. If tasks already exist, they are loaded immediately. If no saved tasks are found, the app fetches initial task data from an API, maps that data into the Kanban structure, and then stores it locally for future use.

From there, users can create, update, and delete tasks through the modal interface. Any change made to the board is saved back to local storage so the latest task list remains available after refreshing or reopening the app.

## Project Structure

```text
.
|-- assets/
|-- scripts/
|   `-- main.js
|-- tasks/
|   |-- formUtils.js
|   `-- taskManager.js
|-- ui/
|   |-- modalHandlers.js
|   |-- render.js
|   `-- taskElement.js
|-- utils/
|   |-- localStorage.js
|   `-- taskApi.js
|-- index.html
|-- style.css
|-- initialData.js
`-- README.md
```

## Setup and Run

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Run the project with Live Server, or open `index.html` in a browser.
4. Make sure you are connected to the internet the first time you load the app so the initial API request can complete.

## API and Persistence

- Initial tasks are fetched with the Fetch API.
- If the fetch succeeds, the tasks are saved to local storage.
- If the fetch fails, the app falls back to local starter data and shows an error message.
- After the first successful load, all task changes are stored locally in the browser.

## Responsive Design

The interface is designed to work across desktop and mobile screen sizes:

- desktop includes the full sidebar and theme controls
- mobile uses a simplified top bar and compact add-task button
- task columns stack vertically on smaller screens for easier reading

## Code Quality

The application is organized into small modules with clear responsibilities:

- rendering logic is separated from task-management logic
- storage and API behavior are handled in utility modules
- modal interactions are managed independently from rendering
- major functions are documented with JSDoc comments

This structure makes the project easier to maintain, scale, and review.

## Future Improvements

- add task priority levels with sorting
- connect to a dedicated Kanban API with richer task fields
- add drag-and-drop task movement between columns
- improve accessibility with keyboard interaction enhancements

## Author

- Lebone Moloi

