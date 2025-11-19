// Returns true if the viewport is mobile width (max 700px)
function isMobileRules() {
    return window.matchMedia('(max-width: 700px)').matches;
}

// Deactivates all tabs and tab panels in all tab groups
function closeAllTabPanels() {
    document.querySelectorAll('.tab-group').forEach(group => {
        group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    });
}

// Activates a specific tab and its corresponding panel
function openTabPanel(tab, panel) {
    tab.classList.add('active');
    panel.classList.add('active');
}

// Updates the icon for each tab based on its active state and viewport
function updateTabIcons(tabs) {
    tabs.forEach(tab => {
        const icon = tab.querySelector('i');
        if (!icon) return;
        if (isMobileRules()) {
            icon.style.display = '';
            if (tab.classList.contains('active')) {
                icon.classList.remove('fa-caret-down');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-caret-down');
            }
        } else {
            icon.style.display = 'none';
        }
    });
}

// Main logic: set up tab click handlers and initial state
// Only resets panels when switching between mobile/desktop
// or on first load

document.addEventListener('DOMContentLoaded', function() {
    // Attach click handlers to all tabs
    document.querySelectorAll('.tab-group').forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        const panels = group.querySelectorAll('.tab-panel');
        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', function() {
                if (isMobileRules()) {
                    // On mobile: toggle the clicked tab's panel
                    const isActive = tab.classList.contains('active');
                    closeAllTabPanels();
                    if (!isActive) {
                        openTabPanel(tab, panels[idx]);
                    }
                } else {
                    // On desktop: only one active per group
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    openTabPanel(tab, panels[idx]);
                }
                updateTabIcons(tabs);
            });
        });
    });

    // Track last mode to only reset panels when switching between mobile/desktop
    let lastMobile = isMobileRules();
    /**
     * Sets the initial state of tab panels:
     * - On mobile: all tabs/panels inactive
     * - On desktop: first tab/panel active in each group
     * Only runs when switching between mobile/desktop or on first load
     * @param {boolean} force - If true, always reset on first load
     */
    function setInitialTabPanels(force) {
        const isMobile = isMobileRules();
        if (force || isMobile !== lastMobile) {
            if (isMobile) {
                // On mobile, ensure all tabs/panels are inactive
                closeAllTabPanels();
            } else {
                // On desktop, activate the first tab/panel in each group
                document.querySelectorAll('.tab-group').forEach(group => {
                    const tabs = group.querySelectorAll('.tab');
                    const panels = group.querySelectorAll('.tab-panel');
                    if (tabs.length && panels.length) {
                        tabs.forEach(t => t.classList.remove('active'));
                        panels.forEach(p => p.classList.remove('active'));
                        openTabPanel(tabs[0], panels[0]);
                    }
                });
            }
            lastMobile = isMobile;
        }
        // Always update icons to match state
        document.querySelectorAll('.tab-group').forEach(group => {
            updateTabIcons(group.querySelectorAll('.tab'));
        });
    }
    setInitialTabPanels(true); // force on first load
    window.addEventListener('resize', function() { setInitialTabPanels(false); });
});
