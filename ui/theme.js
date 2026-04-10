/**
 * Sets up the theme toggle controls for light and dark mode.
 * @param {Object} elements
 * @param {HTMLButtonElement} elements.themeToggle
 * @param {HTMLButtonElement} elements.mobileThemeToggle
 */
export function setupThemeControls(elements) {
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.mobileThemeToggle.addEventListener("click", toggleTheme);
}
