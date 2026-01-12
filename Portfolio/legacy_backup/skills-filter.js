// Skills Filtering Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons and skill items
    const filterBtns = document.querySelectorAll('.skill-category-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-category');

            // Filter skill items
            skillItems.forEach(item => {
                // If filter is 'all' or item has the filter class, show it
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    // Otherwise hide it
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize hover effects for skill items
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.skill-icon');
            const name = this.querySelector('.skill-name');

            // Show icon, hide name
            icon.style.opacity = '1';
            icon.style.transform = 'translate(-50%, -50%) scale(1)';
            name.style.opacity = '0';
            name.style.transform = 'translateY(20px)';
        });

        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.skill-icon');
            const name = this.querySelector('.skill-name');

            // Hide icon, show name
            icon.style.opacity = '0';
            icon.style.transform = 'translate(-50%, -50%) scale(0)';
            name.style.opacity = '1';
            name.style.transform = 'translateY(0)';
        });
    });
});
