const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let index = 1; // FIX: Start at the first real slide
const slideWidth = track.clientWidth / 7;
const slides = dots.length;
let interval;

// Move slides correctly
function moveSlide(newIndex) {
    index = newIndex;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    updateDots();
}

// Auto-slide function
function autoSlide() {
    interval = setInterval(() => {
        if (index >= slides) {
            moveSlide(1);
        } else {
            moveSlide(index + 1);
        }
    }, 3000);
}

// Update active dot
function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index - 1].classList.add('active'); // FIX: Adjust for duplicate slides
}

// Prev & Next Button Event Listeners
prevBtn.addEventListener('click', () => moveSlide(index <= 1 ? slides : index - 1));
nextBtn.addEventListener('click', () => moveSlide(index >= slides ? 1 : index + 1));

// Dots Click Event
dots.forEach(dot => dot.addEventListener('click', e => moveSlide(parseInt(e.target.dataset.index) + 1)));

// Start Auto Slide
autoSlide();
