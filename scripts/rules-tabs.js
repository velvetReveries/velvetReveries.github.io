function isMobileRules() {
    return window.matchMedia('(max-width: 700px)').matches;
}

function closeAllTabPanels() {
    document.querySelectorAll('.tab-group').forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        const panels = group.querySelectorAll('.tab-panel');
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
    });
}

function openTabPanel(tab, panel) {
    tab.classList.add('active');
    panel.classList.add('active');
}

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

document.addEventListener('DOMContentLoaded', function() {
    const tabGroups = document.querySelectorAll('.tab-group');
    tabGroups.forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        const panels = group.querySelectorAll('.tab-panel');
        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', function() {
                if (isMobileRules()) {
                    // On mobile, toggle the clicked tab's panel
                    const isActive = tab.classList.contains('active');
                    closeAllTabPanels();
                    if (!isActive) {
                        openTabPanel(tab, panels[idx]);
                    }
                } else {
                    // Desktop: only close/open within this group
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    openTabPanel(tab, panels[idx]);
                }

                // Update icons for all tabs in the group
                updateTabIcons(tabs);
            });
        });
    });

    // On load and on resize, set up initial state
    function setInitialTabPanels() {
        if (isMobileRules()) {
            closeAllTabPanels();
        } else {
            // For each group, activate the first tab/panel
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

        // Ensure icons are updated correctly on load
        document.querySelectorAll('.tab-group').forEach(group => {
            updateTabIcons(group.querySelectorAll('.tab'));
        });
    }
    setInitialTabPanels();
    window.addEventListener('resize', setInitialTabPanels);
});
