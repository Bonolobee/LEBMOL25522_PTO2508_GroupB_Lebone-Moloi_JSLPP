const TASK_API_URL = "https://jsl-kanban-api.vercel.app/";
const FALLBACK_PRIORITIES = ["high", "medium", "low"];

/**
 * Maps the fetched API payload into the Kanban task structure used by the app.
 * The helper supports both direct task arrays and nested payloads returned by the portfolio API.
 * @param {Array<Object>} todos
 * @returns {Array<{ id: number, title: string, description: string, status: string, priority: string }>}
 */
function mapFetchedTodos(todos) {
  return todos.map((todo, index) => {
    const rawStatus = (todo.status ?? todo.column ?? "").toString().toLowerCase();
    const rawPriority = (todo.priority ?? "").toString().toLowerCase();
    let status = "todo";
    let priority = "medium";

    if (rawStatus === "doing" || rawStatus === "in progress") {
      status = "doing";
    }

    if (rawStatus === "done" || rawStatus === "complete" || rawStatus === "completed") {
      status = "done";
    }

    if (!rawStatus) {
      if (index >= 4 && index < 6) {
        status = "doing";
      }

      if (index >= 6) {
        status = "done";
      }
    }

    if (rawPriority === "high" || rawPriority === "medium" || rawPriority === "low") {
      priority = rawPriority;
    } else if (status === "todo") {
      priority = "low";
    } else {
      priority = FALLBACK_PRIORITIES[index % FALLBACK_PRIORITIES.length];
    }

    return {
      id: todo.id ?? index + 1,
      title: todo.title ?? todo.todo ?? "Untitled Task",
      description: todo.description ?? "",
      status,
      priority,
    };
  });
}

/**
 * Fetches the initial task list from the API for the portfolio piece.
 * @returns {Promise<Array<{ id: number, title: string, description: string, status: string, priority: string }>>}
 */
export async function fetchInitialTasks() {
  const response = await fetch(TASK_API_URL);

  if (!response.ok) {
    throw new Error(`Task API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const tasks =
    (Array.isArray(data) ? data : null) ??
    data.tasks ??
    data.todos ??
    data.data ??
    data.board?.tasks ??
    data.columns?.flatMap((column) =>
      (column.tasks ?? []).map((task) => ({
        ...task,
        status: task.status ?? column.name ?? column.status,
      }))
    ) ??
    [];

  return mapFetchedTodos(tasks);
}
