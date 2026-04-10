import {
  getStoredTasks,
  initializeTasks,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { renderBoard } from "../ui/render.js";
import { setupModalHandlers } from "../ui/modalHandlers.js";
import { setupThemeControls } from "../ui/theme.js";
import { setupSidebarControls } from "../ui/sidebarManager.js";
import { createTask, deleteTaskById, updateTask } from "../tasks/taskManager.js";

/**
 * Collects the shared DOM elements used throughout the application.
 * @returns {Object<string, HTMLElement>}
 */
function getDomElements() {
  return {
    board: document.getElementById("board"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    openModalBtn: document.getElementById("openModalBtn"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    taskForm: document.getElementById("taskForm"),
    taskTitle: document.getElementById("taskTitle"),
    taskDescription: document.getElementById("taskDescription"),
    taskStatus: document.getElementById("taskStatus"),
    taskPriority: document.getElementById("taskPriority"),
    modalTitle: document.getElementById("modalTitle"),
    submitTaskBtn: document.getElementById("submitTaskBtn"),
    deleteTaskBtn: document.getElementById("deleteTaskBtn"),
    titleError: document.getElementById("titleError"),
    descriptionError: document.getElementById("descriptionError"),
    themeToggle: document.getElementById("themeToggle"),
    mobileThemeToggle: document.getElementById("mobileThemeToggle"),
    sidebar: document.getElementById("sidebar"),
    hideSidebarBtn: document.getElementById("hideSidebarBtn"),
    showSidebarBtn: document.getElementById("showSidebarBtn"),
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    mobileMenuBackdrop: document.getElementById("mobileMenuBackdrop"),
    mobileMenuCloseBtn: document.getElementById("mobileMenuCloseBtn"),
    boardStatus: document.getElementById("boardStatus"),
  };
}

/**
 * Updates the board status message for loading and fetch errors.
 * @param {ReturnType<typeof getDomElements>} elements
 * @param {string} message
 * @param {"info" | "error"} [type="info"]
 * @returns {void}
 */
function setBoardStatus(elements, message, type = "info") {
  elements.boardStatus.textContent = message;
  elements.boardStatus.classList.remove("hidden", "status-error");

  if (type === "error") {
    elements.boardStatus.classList.add("status-error");
  }
}

/**
 * Hides the board status message.
 * @param {ReturnType<typeof getDomElements>} elements
 * @returns {void}
 */
function clearBoardStatus(elements) {
  elements.boardStatus.textContent = "";
  elements.boardStatus.classList.add("hidden");
  elements.boardStatus.classList.remove("status-error");
}

/**
 * Registers the layout interactions such as theme switching and sidebar visibility.
 * @param {ReturnType<typeof getDomElements>} elements
 * @returns {void}
 */
function setupLayoutControls(elements) {
  setupThemeControls(elements);
  setupSidebarControls(elements);
}

/**
 * Starts the application by loading tasks, rendering the board, and wiring the modules together.
 * @returns {void}
 */
async function initTaskBoard() {
  const elements = getDomElements();
  setBoardStatus(elements, "Loading tasks...");
  let tasks = [];

  /**
   * Re-renders the current task state into the board columns.
   * @returns {void}
   */
  function render() {
    renderBoard(tasks, elements.board);
  }

  setupModalHandlers(elements, {
    getTaskById(taskId) {
      return tasks.find((task) => task.id === taskId) ?? null;
    },
    onCreateTask(taskInput) {
      const newTask = createTask(tasks, taskInput);
      tasks = [...tasks, newTask];
      saveTasksToStorage(tasks);
      render();
    },
    onUpdateTask(taskId, taskInput) {
      tasks = updateTask(tasks, taskId, taskInput);
      saveTasksToStorage(tasks);
      render();
    },
    onDeleteTask(taskId) {
      tasks = deleteTaskById(tasks, taskId);
      saveTasksToStorage(tasks);
      render();
    },
  });

  setupLayoutControls(elements);
  try {
    tasks = await initializeTasks();
    clearBoardStatus(elements);
  } catch (error) {
    console.error("Unable to initialize tasks:", error);
    tasks = getStoredTasks();
    setBoardStatus(elements, "Could not fetch tasks. Showing saved tasks instead.", "error");
  }
  render();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
