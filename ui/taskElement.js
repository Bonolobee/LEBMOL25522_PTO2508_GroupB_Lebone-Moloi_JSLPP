const PRIORITY_EMOJI = {
  high: "🔴",
  medium: "🟠",
  low: "🟢",
};

/**
 * Creates the DOM structure for a single task card.
 * @param {{ id: number, title: string, priority?: string }} task
 * @returns {HTMLElement}
 */
export function createTaskElement(task) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "task-card";
  card.dataset.taskId = String(task.id);

  const header = document.createElement("div");
  header.className = "task-card-header";

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const priorityDot = document.createElement("span");
  priorityDot.className = "priority-dot";
  priorityDot.textContent = PRIORITY_EMOJI[task.priority ?? "medium"] ?? PRIORITY_EMOJI.medium;
  priorityDot.setAttribute("aria-hidden", "true");

  header.append(title, priorityDot);
  card.appendChild(header);
  return card;
}
