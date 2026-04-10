/**
 * Clears inline validation messages from the task form.
 * @param {Object} elements
 * @returns {void}
 */
export function clearFormErrors(elements) {
  elements.titleError.innerHTML = "";
  elements.descriptionError.innerHTML = "";
  elements.taskTitle.classList.remove("input-error");
  elements.taskDescription.classList.remove("input-error");
}

/**
 * Resets the task form back to its default create state.
 * @param {Object} elements
 * @returns {void}
 */
export function resetTaskForm(elements) {
  elements.taskForm.reset();
  elements.taskStatus.value = "todo";
  elements.taskPriority.value = "medium";
  clearFormErrors(elements);
}

/**
 * Validates the required task form fields and shows inline errors when needed.
 * @param {Object} elements
 * @returns {boolean}
 */
export function validateTaskForm(elements) {
  let isValid = true;
  const requiredMessage = "Please fill out this field.";

  if (!elements.taskTitle.value.trim()) {
    elements.titleError.innerHTML = `<span class="error-icon" aria-hidden="true">❗</span><span>${requiredMessage}</span>`;
    elements.taskTitle.classList.add("input-error");
    isValid = false;
  }

  if (!elements.taskDescription.value.trim()) {
    elements.descriptionError.innerHTML = `<span class="error-icon" aria-hidden="true">❗</span><span>${requiredMessage}</span>`;
    elements.taskDescription.classList.add("input-error");
    isValid = false;
  }

  return isValid;
}
