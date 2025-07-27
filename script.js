const houseContainer = document.querySelector('.featured-house__houses');
const villaContainer = document.querySelector('.featured-house__villas');
const apartmentContainer = document.querySelector('.featured-house__apartments');
const containers = [houseContainer, villaContainer, apartmentContainer];

const track = document.querySelector('.featured-house__slider');
const prevBtn = document.querySelector('.button_prev');
const nextBtn = document.querySelector('.button_next');
const items = document.querySelectorAll('.featured-house__element');
let itemWidth = Math.max(
    ...Array.from(items, el => el.clientWidth)
);
const visible = 4;
let current = 0;
let maxIndex = (items.length / containers.length) - visible;

function recalc() {
    itemWidth = Math.max(
        ...Array.from(items, el => el.clientWidth)
    );
    maxIndex = (items.length / 3) - visible;
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

window.addEventListener('resize', () => {
    recalc();
    if (window.innerWidth < 1440) {
        current = 0;
        update();
    }
});

const buttons = document.querySelectorAll('.button_featured-house');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        current = 0;
        update();
        buttons.forEach((btn) => {
            btn.classList.remove('button_secondary');
            btn.classList.add('button_inactive');
        });

        button.classList.add('button_secondary');
        button.classList.remove('button_inactive');

        const type = button.outerText;

        switch (type) {
            case 'House':
                for (const container of containers) {
                    if (container !== houseContainer) {
                        container.classList.add('featured-house__hidden');
                    } else {
                        container.classList.remove('featured-house__hidden');
                    }
                }
                break;
            case 'Villa':
                for (const container of containers) {
                    if (container !== villaContainer) {
                        container.classList.add('featured-house__hidden');
                    } else {
                        container.classList.remove('featured-house__hidden');
                    }
                }
                break;
            case 'Apartment':
                for (const container of containers) {
                    if (container !== apartmentContainer) {
                        container.classList.add('featured-house__hidden');
                    } else {
                        container.classList.remove('featured-house__hidden');
                    }
                }
                break;
            default:
                console.log(`Unknown type ${type}`);
        }
    });
});
