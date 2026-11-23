(function () {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    window.animateFavoriteButton = function (id) {
        const button = document.querySelector(
            `.favorite-btn[data-car-id="${String(id)}"]`
        );

        if (!button) return;

        button.classList.remove("is-animating");
        void button.offsetWidth;
        button.classList.add("is-animating");
        button.addEventListener("animationend", function () {
            button.classList.remove("is-animating");
        }, { once: true });
    };

    if (!reducedMotion.matches && "IntersectionObserver" in window) {
        document.body.classList.add("motion-ready");

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -36px 0px"
        });

        function observeReveal(element, delay) {
            if (element.dataset.motionObserved) return;
            element.dataset.motionObserved = "true";
            element.classList.add("motion-reveal");
            if (delay) element.style.setProperty("--motion-delay", `${delay}ms`);
            revealObserver.observe(element);
        }

        document.querySelectorAll(
            "main > section:not(.hero), main > form, main > .empty-state, " +
            "main > #vehicleDetails, " +
            ".vehicle-detail, .admin-stats, .admin-section"
        ).forEach(element => observeReveal(element, 0));

        document.querySelectorAll(".car-grid").forEach(grid => {
            function observeCards() {
                Array.from(grid.children).forEach((card, index) => {
                    if (!card.classList.contains("car-card")) return;
                    observeReveal(card, Math.min(index, 7) * 70);
                });
            }

            observeCards();
            new MutationObserver(observeCards).observe(grid, { childList: true });
        });
    }

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        function updateNavbar() {
            navbar.classList.toggle("is-scrolled", window.scrollY > 12);
        }

        updateNavbar();
        window.addEventListener("scroll", updateNavbar, { passive: true });
    }
}());
