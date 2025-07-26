// Gallery Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    let slideInterval;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicators span');
    
    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
        resetInterval();
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }
    
    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Initialize
    updateIndicators();
    startInterval();
});








// Gallery slider navigation
let currentSlide = 0;
const slides = document.querySelector('.gallery-slides');
const totalSlides = document.querySelectorAll('.gallery-slide').length;

function goToSlide(slideIndex) {
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    if (slideIndex >= totalSlides) slideIndex = 0;
    
    currentSlide = slideIndex;
    const slideWidth = document.querySelector('.gallery-slide').offsetWidth + 20; // width + gap
    slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Manual slide with touch events for mobile
let startX = 0;
let isDragging = false;

slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slides.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

slides.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (diff > 50) {
        // Swipe left
        goToSlide(currentSlide + 1);
    } else if (diff < -50) {
        // Swipe right
        goToSlide(currentSlide - 1);
    }
    
    isDragging = false;
});

// Manual slide with mouse for desktop
let mouseStartX = 0;
let isMouseDown = false;

slides.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
    isMouseDown = true;
});

slides.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
});

slides.addEventListener('mouseup', (e) => {
    if (!isMouseDown) return;
    
    const mouseEndX = e.clientX;
    const diff = mouseStartX - mouseEndX;
    
    if (diff > 100) {
        // Swipe left
        goToSlide(currentSlide + 1);
    } else if (diff < -100) {
        // Swipe right
        goToSlide(currentSlide - 1);
    }
    
    isMouseDown = false;
});

slides.addEventListener('mouseleave', () => {
    isMouseDown = false;
});