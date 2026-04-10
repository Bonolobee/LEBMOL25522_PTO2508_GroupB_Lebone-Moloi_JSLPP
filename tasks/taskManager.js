/**
 * Calculates the next available numeric task id from the current task list.
 * @param {Array<{ id: number }>} tasks
 * @returns {number}
 */
function getNextTaskId(tasks) {
  return tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
}

/**
 * Creates a normalized task object from submitted form input.
 * @param {Array<{ id: number }>} tasks
 * @param {{ title: string, description: string, status: string, priority?: string }} taskInput
 * @returns {{ id: number, title: string, description: string, status: string, priority: string }}
 */
export function createTask(tasks, taskInput) {
  return {
    id: getNextTaskId(tasks),
    title: taskInput.title,
    description: taskInput.description,
    status: taskInput.status,
    priority: taskInput.priority ?? "medium",
  };
}

/**
 * Returns a new task list with one task updated by id.
 * @param {Array<{ id: number, title: string, description: string, status: string, priority?: string }>} tasks
 * @param {number} taskId
 * @param {TaskInput} taskInput
 * @returns {Array<Task>}
 */
export function updateTask(tasks, taskId, taskInput) {
  return tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          title: taskInput.title,
          description: taskInput.description,
          status: taskInput.status,
          priority: taskInput.priority ?? task.priority ?? "medium",
        }
      : task
  );
}

/**
 * Returns a new task list with one task removed by id.
 * @param {Array<Task>} tasks
 * @param {number} taskId
 * @returns {Array<Task>}
 */
export function deleteTaskById(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}
