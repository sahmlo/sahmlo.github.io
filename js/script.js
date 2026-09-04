
// Alterna entre modo claro e escuro
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

const updateThemeButton = () => {
    const isLight = document.body.classList.contains("light-theme");

    themeIcon.textContent = isLight ? "🌙" : "☀️";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Ativar modo escuro" : "Ativar modo claro"
    );
    themeToggle.setAttribute(
        "title",
        isLight ? "Modo escuro" : "Modo claro"
    );
};

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");

    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateThemeButton();
});

updateThemeButton();

// Menu mobile
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", isOpen);
});

// Fecha o menu depois de escolher uma seção
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// Destaca a seção atual no menu
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 140;
    let currentSection = "";

    sections.forEach((section) => {
        if (
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
};

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Anima elementos conforme entram na tela
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Atualiza o ano do rodapé
document.getElementById("year").textContent = new Date().getFullYear();
