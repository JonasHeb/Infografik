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

// Section-to-dot and delay mapping
const sectionSettings = {
    section_1: { dots: 50, delay: 0.5 }, // 50 dots, 0.05s delay
    section_2: { dots: 100, delay: 0.1 }, // 100 dots, 0.03s delay
    section_3: { dots: 200, delay: 0.02 }, // 200 dots, 0.02s delay
    section_4: { dots: 500, delay: 0.01 }, // 500 dots, 0.01s delay
    section_5: { dots: 1000, delay: 0.09 }, // 1000 dots, 0.005s delay
};

// Initialize IntersectionObserver
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const settings = sectionSettings[sectionId] || { dots: 0, delay: 0 }; // Default values
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

// Initial setup (ensure the first section is rendered correctly)
const initialSettings = sectionSettings['section_1'];
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