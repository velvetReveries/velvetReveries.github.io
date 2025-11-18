document.addEventListener('DOMContentLoaded', function() {
    // Tab logic for rules.html
    const tabGroups = document.querySelectorAll('.tab-group');
    tabGroups.forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        const panels = group.querySelectorAll('.tab-panel');
        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', function() {
                // Remove active from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                // Add active to clicked tab and corresponding panel
                tab.classList.add('active');
                panels[idx].classList.add('active');
            });
        });
    });
});
