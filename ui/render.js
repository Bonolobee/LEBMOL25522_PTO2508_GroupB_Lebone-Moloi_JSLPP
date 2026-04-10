import { createTaskElement } from "./taskElement.js";
import { sortTasks } from "./sortTasks.js";

/**
 * Removes all currently rendered task cards from the board.
 * @param {HTMLElement} board
 * @returns {void}
 */
function clearBoard(board) {
  board.querySelectorAll(".tasks").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Updates the task totals displayed in each column heading.
 * @param {HTMLElement} board
 * @param {Array<{ status: string }>} tasks
 * @returns {void}
 */
function updateColumnCounts(board, tasks) {
  board.querySelectorAll(".column").forEach((column) => {
    const count = tasks.filter((task) => task.status === column.dataset.status).length;
    column.querySelector("[data-count]").textContent = String(count);
  });
}

/**
 * Renders tasks into the correct board columns based on each task status.
 * @param {Array<{ title: string, status: string, priority?: string }>} tasks
 * @param {HTMLElement} board
 * @returns {void}
 */
export function renderBoard(tasks, board) {
  clearBoard(board);

  const sortedTasks = sortTasks(tasks);

  sortedTasks.forEach((task) => {
    const taskColumn = board.querySelector(`.column[data-status="${task.status}"] .tasks`);

    if (!taskColumn) {
      return;
    }

    taskColumn.appendChild(createTaskElement(task));
  });

  updateColumnCounts(board, tasks);
}
