const track = document.querySelector('.featured-house__houses');
const prevBtn = document.querySelector('.button_prev');
const nextBtn = document.querySelector('.button_next');
const items = document.querySelectorAll('.featured-house__house');
const visible = 4;
let itemWidth = items[0].clientWidth;
let current = 0;
let maxIndex = items.length - visible;

function recalc() {
    itemWidth = items[0].clientWidth;
    maxIndex = items.length - visible;
    update();
}

function update() {
    const offset = -current * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener('click', () => {
    if (current > 0) {
        current--;
    } else {
        current = maxIndex;
    }
    update();
})

nextBtn.addEventListener('click', () => {
    if (current < maxIndex) {
        current++;
    } else {
        current = 0;
    }
    update();
});

window.addEventListener('resize', recalc);