const slider = document.getElementById("dot-count");
const wrapper = document.getElementById("dots-wrapper");

function createDots(count) {
    wrapper.innerHTML = ''; // Clear previous dots

    for (let i = 0; i < count; i++) {
    // Create the dot element
    const dot = document.createElement('span');
    dot.classList.add('dot');
    
    // Set random start and end Y positions within a range of 100 pixels
    const startY = Math.random() * 300; // Random start Y position
    const endY = Math.random() * 300;   // Random end Y position

    // Apply the random Y positions to the dot using CSS variables
    dot.style.setProperty('--start-y', `${startY}px`);
    dot.style.setProperty('--end-y', `${endY}px`);
    
    // Stagger the animation with a slight delay
    dot.style.animationDelay = `${i * 0.53487}s`; 
    
    // Append the dot to the wrapper
    wrapper.appendChild(dot);
    }
}

slider.addEventListener("input", (event) => {
    const count = event.target.value;
    createDots(count);
});

// Initial setup
createDots(slider.value);