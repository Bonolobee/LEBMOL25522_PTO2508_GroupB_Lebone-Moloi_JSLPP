import { fetchInitialTasks } from "../scripts/api/taskApi.js";
import { initialTasks } from "../initialData.js";

const STORAGE_KEY = "kanban-portfolio-tasks-v4";

/**
 * Saves the full task list to local storage.
 * @param {Array<Object>} tasks
 * @returns {void}
 */
export function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Reads any previously saved tasks from local storage.
 * @returns {Array<Object>}
 */
export function getStoredTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  try {
    return JSON.parse(storedTasks);
  } catch (error) {
    console.error("Could not parse stored tasks:", error);
    return [];
  }
}

/**
 * Loads the task list for startup. If saved tasks exist they are reused,
 * otherwise the initial board is fetched from the API and then persisted.
 * @returns {Promise<Array<Object>>}
 */
export async function initializeTasks() {
  const storedTasks = getStoredTasks();

  if (storedTasks.length) {
    return storedTasks;
  }

  try {
    const fetchedTasks = await fetchInitialTasks();
    saveTasksToStorage(fetchedTasks);
    return fetchedTasks;
  } catch (error) {
    console.error("Task API fetch failed:", error);
    saveTasksToStorage(initialTasks);
    throw error;
  }
}
