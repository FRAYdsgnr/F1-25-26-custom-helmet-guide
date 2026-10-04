const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}


if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );

    });

}


/*
    Плавная подсветка текущего раздела
    на странице гайда.
*/

const guideSections =
    document.querySelectorAll(".guide-section");

const guideLinks =
    document.querySelectorAll(".guide-nav a");


if (guideSections.length && guideLinks.length) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                guideLinks.forEach((link) => {
                    link.style.color = "";
                });

                const activeLink =
                    document.querySelector(
                        `.guide-nav a[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.style.color =
                        "var(--text)";
                }

            });

        },
        {
            rootMargin: "-20% 0px -60% 0px"
        }
    );


    guideSections.forEach((section) => {
        observer.observe(section);
    });

    const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.guide-image img, .carousel-slide img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
});

document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dotsBox = carousel.querySelector('.carousel-dots');

    const dots = [...slides].map((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Фото ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsBox.appendChild(dot);
        return dot;
    });

    const current = () => Math.round(track.scrollLeft / track.clientWidth);

    function goTo(i) {
        const n = (i + slides.length) % slides.length;
        track.scrollTo({ left: n * track.clientWidth });
    }

    function updateDots() {
        dots.forEach((d, i) => d.classList.toggle('active', i === current()));
    }

    carousel.querySelector('.prev').addEventListener('click', () => goTo(current() - 1));
    carousel.querySelector('.next').addEventListener('click', () => goTo(current() + 1));
    track.addEventListener('scroll', updateDots);
    updateDots();
});

}