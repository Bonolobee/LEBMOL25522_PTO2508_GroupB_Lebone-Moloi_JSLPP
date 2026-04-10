/**
 * Sets up sidebar and mobile menu controls.
 * @param {Object} elements
 * @param {HTMLElement} elements.sidebar
 * @param {HTMLButtonElement} elements.hideSidebarBtn
 * @param {HTMLButtonElement} elements.showSidebarBtn
 * @param {HTMLButtonElement} elements.mobileMenuBtn
 * @param {HTMLElement} elements.mobileMenuBackdrop
 * @param {HTMLButtonElement} elements.mobileMenuCloseBtn
 */
export function setupSidebarControls(elements) {
  const openMobileMenu = () => {
    elements.mobileMenuBackdrop.classList.remove("hidden");
  };

  const closeMobileMenu = () => {
    elements.mobileMenuBackdrop.classList.add("hidden");
  };

  elements.hideSidebarBtn.addEventListener("click", () => {
    elements.sidebar.classList.add("hidden-sidebar");
    elements.showSidebarBtn.classList.remove("hidden");
  });

  elements.showSidebarBtn.addEventListener("click", () => {
    elements.sidebar.classList.remove("hidden-sidebar");
    elements.showSidebarBtn.classList.add("hidden");
  });

  elements.mobileMenuBtn.addEventListener("click", openMobileMenu);
  elements.mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);

  elements.mobileMenuBackdrop.addEventListener("click", (event) => {
    if (event.target === elements.mobileMenuBackdrop) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.mobileMenuBackdrop.classList.contains("hidden")) {
      closeMobileMenu();
    }
  });
}
