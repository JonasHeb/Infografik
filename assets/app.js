const dotsWrapper = document.querySelector('.dots-wrapper');
const wrapperHeight = Math.round(dotsWrapper.offsetWidth * 0.63);
console.log(wrapperHeight);

// Function to update CSS variable for wrapper width
function updateWrapperScale() {
  const wrapperWidth = dotsWrapper.offsetWidth;
  dotsWrapper.style.setProperty('--wrapper-width', `${wrapperWidth}px`);
}

// Call the function once to set the initial width
updateWrapperScale();


const wrapper = document.getElementById("dots-wrapper");

// Function to create dots with custom delay
function createDots(count, delay) {
    wrapper.innerHTML = ''; // Clear previous dots
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');

        // Set random start and end Y positions
        const startY = Math.random() * wrapperHeight+(wrapperHeight*0.2);
        const endY = Math.random() * wrapperHeight+(wrapperHeight*0.2);

        dot.style.setProperty('--start-y', `${startY}px`);
        dot.style.setProperty('--end-y', `${endY}px`);

        // Adjust animation delay for each dot
        dot.style.animationDelay = `${i * delay}s`;

        wrapper.appendChild(dot);
    }
}

// Function to animate numbers
function animateNumberDisplay(element, start, end, duration) {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Cap progress at 1 (100%)

        // Calculate the current value
        const currentValue = Math.round(start + (end - start) * progress);

        // Update the element's text
        element.textContent = currentValue;

        // Continue animation if not done
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    // Start the animation
    requestAnimationFrame(updateNumber);
}

const yearDisplay = document.getElementById('year_display'); // Corrected ID

// Section-to-dot and delay mapping
const sectionSettings = {
    section_1: { dots: 1, delay: 0.5, year: 1958 },
    section_2: { dots: 500, delay: 0.1, year: 1985 },
    section_3: { dots: 1000, delay: 0.04, year: 2008 },
    section_4: { dots: 2000, delay: 0.02, year: 2019 },
    section_5: { dots: 3500, delay: 0.008, year: 2024 },
};

// Initialize IntersectionObserver
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const settings = sectionSettings[sectionId] || { dots: 0, delay: 0, year: 0 };

                // Animate year display
                const currentYear = parseInt(yearDisplay.textContent, 10) || 0;
                animateNumberDisplay(yearDisplay, currentYear, settings.year, 1000); // Duration is 1000ms (1 second)

                // Update dots
                createDots(settings.dots, settings.delay);
            }
        });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
);

// Observe each section
document.querySelectorAll('.section_info').forEach((section) => {
    observer.observe(section);
});

// Initial setup
const initialSettings = sectionSettings['section_1'];
animateNumberDisplay(yearDisplay, 0, initialSettings.year, 1000); // Start from 0
createDots(initialSettings.dots, initialSettings.delay);


// Select all navigation arrow links
document.querySelectorAll('.navigation_arrows').forEach(arrow => {
    arrow.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior

        // Get the target section based on the href attribute
        const targetId = arrow.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        // Scroll smoothly to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Align to the top of the viewport
        });
    });
});