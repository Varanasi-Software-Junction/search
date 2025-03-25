const slides = document.querySelectorAll('.slide');
const wrapper = document.querySelector('.carousel-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let index = 0;
let autoSlideInterval;
let restartTimeout;

// Function to update the slide position
function updateSlide() {
    wrapper.style.transform = `translateX(${-index * 100}%)`;
}

// Function to go to next slide
function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
}

// Function to go to previous slide
function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
}

// Function to start auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

// Function to stop auto-slide and restart after a pause
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    clearTimeout(restartTimeout);
    restartTimeout = setTimeout(startAutoSlide, 5000); // Restart after 5 sec
}

// Event listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
});

// Start auto-slide initially
startAutoSlide();
