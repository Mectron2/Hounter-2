const containers = Array.from(document.querySelectorAll('.featured-house__houses, .featured-house__villas, .featured-house__apartments'));
const track = document.querySelector('.featured-house__slider');
const prevBtn = document.querySelector('.button_prev');
const nextBtn = document.querySelector('.button_next');
const buttons = document.querySelectorAll('.button_featured-house');

const VISIBLE_ITEMS = 4;
const SWITCH_BREAKPOINT = 1440;

let current = 0;
let itemWidth = 0;
let maxIndex = 0;

function getItems() {
    return document.querySelectorAll('.featured-house__element');
}

function getMaxItemWidth() {
    return Math.max(...Array.from(getItems(), el => el.clientWidth));
}

function reCalc() {
    itemWidth = getMaxItemWidth();
    maxIndex = Math.ceil(getItems().length / containers.length) - VISIBLE_ITEMS;
    update();
}

function update() {
    const offset = -current * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
}

function slideToPrev() {
    current = current > 0 ? current - 1 : maxIndex;
    update();
}

function slideToNext() {
    current = current < maxIndex ? current + 1 : 0;
    update();
}

function showContainer(containerToShow) {
    containers.forEach(container => {
        container.classList.toggle('featured-house__hidden', container !== containerToShow);
    });
}

function updateButtonStyles(activeButton) {
    buttons.forEach(btn => {
        btn.classList.toggle('button_secondary', btn === activeButton);
        btn.classList.toggle('button_inactive', btn !== activeButton);
    });
}

function handleCategorySwitch(button) {
    const type = button.dataset.type;

    const containerMap = {
        House: '.featured-house__houses',
        Villa: '.featured-house__villas',
        Apartment: '.featured-house__apartments',
    };

    const selector = containerMap[type];
    if (!selector) {
        console.warn(`Unknown type: ${type}`);
        return;
    }

    const container = document.querySelector(selector);
    if (container) {
        current = 0;
        update();
        showContainer(container);
        updateButtonStyles(button);
    }
}

prevBtn.addEventListener('click', slideToPrev);
nextBtn.addEventListener('click', slideToNext);

buttons.forEach(button => {
    button.addEventListener('click', () => handleCategorySwitch(button));
});

window.addEventListener('resize', () => {
    reCalc();
    if (window.innerWidth < SWITCH_BREAKPOINT) {
        current = 0;
        update();
    }
});

reCalc();
