import { clearFormErrors, resetTaskForm, validateTaskForm } from "../tasks/formUtils.js";

/**
 * Opens the add-task modal and focuses the title field.
 * @param {Object} elements
 * @param {string} title
 * @returns {void}
 */
function openModal(elements, title) {
  elements.modalTitle.textContent = title;
  elements.modalBackdrop.classList.remove("hidden");
  elements.taskTitle.focus();
}

/**
 * Closes the add-task modal and resets it back to its default state.
 * @param {Object} elements
 * @returns {void}
 */
function closeModal(elements) {
  elements.modalBackdrop.classList.add("hidden");
  resetTaskForm(elements);
  elements.taskForm.dataset.mode = "create";
  elements.taskForm.dataset.taskId = "";
  elements.modalTitle.textContent = "Add New Task";
  elements.submitTaskBtn.querySelector(".button-label").textContent = "Create Task";
  elements.deleteTaskBtn.classList.add("hidden");
}

/**
 * Registers the modal open, close, validation, and submit handlers.
 * @param {Object} elements
 * @param {{
 *   getTaskById: (taskId: number) => ({ id: number, title: string, description: string, status: string, priority?: string } | null),
 *   onCreateTask: (taskInput: {title: string, description: string, status: string, priority: string}) => void,
 *   onUpdateTask: (taskId: number, taskInput: {title: string, description: string, status: string, priority: string}) => void,
 *   onDeleteTask: (taskId: number) => void
 * }} handlers
 * @returns {void}
 */
export function setupModalHandlers(elements, handlers) {
  elements.taskForm.dataset.mode = "create";
  elements.taskForm.dataset.taskId = "";

  elements.openModalBtn.addEventListener("click", () => {
    openModal(elements, "Add New Task");
  });

  elements.closeModalBtn.addEventListener("click", () => {
    closeModal(elements);
  });

  elements.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === elements.modalBackdrop) {
      closeModal(elements);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.modalBackdrop.classList.contains("hidden")) {
      closeModal(elements);
    }
  });

  elements.board.addEventListener("click", (event) => {
    const taskCard = event.target.closest(".task-card");

    if (!taskCard) {
      return;
    }

    const taskId = Number(taskCard.dataset.taskId);
    const task = handlers.getTaskById(taskId);

    if (!task) {
      return;
    }

    elements.taskForm.dataset.mode = "edit";
    elements.taskForm.dataset.taskId = String(task.id);
    elements.taskTitle.value = task.title;
    elements.taskDescription.value = task.description;
    elements.taskStatus.value = task.status;
    elements.taskPriority.value = task.priority ?? "medium";
    elements.submitTaskBtn.querySelector(".button-label").textContent = "Save Changes";
    elements.deleteTaskBtn.classList.remove("hidden");
    openModal(elements, "Task");
  });

  elements.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormErrors(elements);

    if (!validateTaskForm(elements)) {
      return;
    }

    const taskInput = {
      title: elements.taskTitle.value.trim(),
      description: elements.taskDescription.value.trim(),
      status: elements.taskStatus.value,
      priority: elements.taskPriority.value,
    };

    if (elements.taskForm.dataset.mode === "edit") {
      handlers.onUpdateTask(Number(elements.taskForm.dataset.taskId), taskInput);
    } else {
      handlers.onCreateTask(taskInput);
    }

    closeModal(elements);
  });

  elements.deleteTaskBtn.addEventListener("click", () => {
    const taskId = Number(elements.taskForm.dataset.taskId);

    if (!taskId) {
      return;
    }

    handlers.onDeleteTask(taskId);
    closeModal(elements);
  });
}
