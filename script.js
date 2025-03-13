// Wait for DOM to load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible for performance
                }
            });
        }, { threshold: 0.2 });

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers: show all elements immediately
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Update URL hash without page reload (enhances UX and tracking)
                window.history.pushState(null, null, targetId);
            }
        });
    });

    // Bonus: Track section views for analytics (indirect SEO boost)
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Section viewed: ${entry.target.id}`); // Replace with analytics event
                // Example: snid('track', 'SectionView', { section: entry.target.id });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
});
