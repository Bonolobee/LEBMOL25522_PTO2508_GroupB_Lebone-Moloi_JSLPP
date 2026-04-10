/**
 * Defines the priority weight used to sort tasks within the same status.
 */
const PRIORITY_WEIGHT = {
  high: 0,
  medium: 1,
  low: 2,
};

/**
 * Returns a new task array sorted by status grouping and priority order.
 * @param {Array<{status:string,priority:string}>} tasks
 * @returns {Array}
 */
export function sortTasks(tasks) {
  return [...tasks].sort((firstTask, secondTask) => {
    if (firstTask.status !== secondTask.status) {
      return 0;
    }

    const firstWeight = PRIORITY_WEIGHT[firstTask.priority ?? "medium"] ?? 1;
    const secondWeight = PRIORITY_WEIGHT[secondTask.priority ?? "medium"] ?? 1;
    return firstWeight - secondWeight;
  });
}
