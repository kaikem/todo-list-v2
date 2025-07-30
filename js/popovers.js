function createPopovers() {
    const popoverBtns = document.querySelectorAll(".popover-btn");

    popoverBtns.forEach((popoverBtn) => {
        const popover = new bootstrap.Popover(popoverBtn);
    });
}

export { createPopovers };
