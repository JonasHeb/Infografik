const dotsWrapper = document.querySelector('.dots-wrapper');
const wrapperHeight = Math.round(dotsWrapper.offsetWidth * 0.63);
console.log(wrapperHeight);

// Skaliert den Wrapper für die Animierten Dots
function updateWrapperScale() {
  const wrapperWidth = dotsWrapper.offsetWidth;
  dotsWrapper.style.setProperty('--wrapper-width', `${wrapperWidth}px`);
}

updateWrapperScale();


const wrapper = document.getElementById("dots-wrapper");

// Animiert die Jahreszahlen und den Dot count
function animateNumberDisplay(element, start, end, duration, callback) {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const currentValue = Math.round(start + (end - start) * progress);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else if (callback) {
            callback();
        }
    }

    requestAnimationFrame(updateNumber);
}

// Erzeugt die Dots mit zufälliger Startposition und Delay
function createDots(count, delay) {
    const wrapper = document.getElementById("dots-wrapper");
    const wrapperHeight = Math.round(wrapper.offsetWidth * 0.63);
    wrapper.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');

        const startY = Math.random() * wrapperHeight + (wrapperHeight * 0.2);
        const endY = Math.random() * wrapperHeight + (wrapperHeight * 0.2);

        dot.style.setProperty('--start-y', `${startY}px`);
        dot.style.setProperty('--end-y', `${endY}px`);

        dot.style.animationDelay = `${i * delay}s`;

        wrapper.appendChild(dot);
    }
}

//Voreinstellungen für die Dot und Jahreszahl-Erzeugung
const sectionSettings = {
    section_1: { dots: 1, delay: 0.5, year: 1958 },
    section_2: { dots: 500, delay: 0.1, year: 1985 },
    section_3: { dots: 1000, delay: 0.04, year: 2008 },
    section_4: { dots: 2000, delay: 0.02, year: 2019 },
    section_5: { dots: 3500, delay: 0.008, year: 2024 },
};

const yearDisplay = document.getElementById('year_display');
const countDisplay = document.getElementById('count_display');

// Anpassung an den jeweiligen Abschnitt
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const settings = sectionSettings[sectionId] || { dots: 0, delay: 0, year: 0 };

                const currentYear = parseInt(yearDisplay.textContent, 10) || 0;
                animateNumberDisplay(yearDisplay, currentYear, settings.year, 1000);

                const currentDots = parseInt(countDisplay.textContent, 10) || 0;
                animateNumberDisplay(countDisplay, currentDots, settings.dots, 1000);

                createDots(settings.dots, settings.delay);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll('.section_info').forEach((section) => {
    observer.observe(section);
});

const initialSettings = sectionSettings['section_1'];
animateNumberDisplay(yearDisplay, 0, initialSettings.year, 1000);
animateNumberDisplay(countDisplay, 0, initialSettings.dots, 1000);
createDots(initialSettings.dots, initialSettings.delay);


// Scroll Animation für die Pfeile
document.querySelectorAll('.navigation_arrows').forEach(arrow => {
    arrow.addEventListener('click', event => {
        event.preventDefault();

        const targetId = arrow.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});