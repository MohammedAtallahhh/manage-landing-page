//---------- Setting variables ------------//
const header = document.querySelector('header'),
  menu = document.querySelector('.header__nav'),
  menuToggle = document.querySelector('.header__menu-toggle'),
  slider = document.querySelector('.testimonials__slider'),
  sliderWrapper = slider.firstElementChild;

(sliderPagination = document.querySelector('.slider__indicators')),
  (sliderItems = Array.from(slider.querySelectorAll('.testimonials__item')));

//--------------------- Section header -----------------//
menuToggle.onclick = openMenu;

function openMenu() {
  document.body.classList.toggle('overlay');
  menu.classList.toggle('hide');
  let icon = menuToggle.firstElementChild;

  let src =
    icon.getAttribute('src') == 'images/icon-hamburger.svg'
      ? 'images/icon-close.svg'
      : 'images/icon-hamburger.svg';

  icon.setAttribute('src', src);
}

//--------------- Change the nav on scroll------------------//
window.onscroll = (e) => {
  header.classList.toggle('sticky', window.scrollY > 10);
};

//------------------ Testimonials Section -----------------//
let slidesIndex = 0;
let slidesCount = sliderItems.length;
let slideWidth = sliderWrapper.offsetWidth;

// Move to the right
function moveSlidesRight() {
  if (slidesIndex === slidesCount - 1) {
    slidesIndex = 0;
  } else {
    slidesIndex++;
  }

  sliderWrapper.style.transform = `translateX(calc(${slidesIndex} * (-100% - 2rem)))`;

  handleIndicators();
}

// Move to the left
function moveSlidesLeft() {
  if (slidesIndex !== 0) {
    slidesIndex--;
  }

  sliderWrapper.style.transform = `translateX(calc(${slidesIndex} * (-100% - 2rem)))`;
  handleIndicators();
}

// Activate the current indicator
function handleIndicators() {
  let active = sliderPagination.querySelector('.active');
  active.classList.remove('active');

  let currentActive = Array.from(sliderPagination.children)[slidesIndex];

  currentActive.classList.add('active');
}
// Add event listener to the indicators
sliderPagination.addEventListener('click', controlSlider);

function controlSlider(e) {
  if (e.target.classList.contains('indicator')) {
    let index = e.target.dataset.index;
    slidesIndex = index - 1;
    moveSlidesRight();
  }
}

// Make it mobile-friendly
let initialPosition = 0;
let position;
let oldTransform;
let transform;
let grabbing = false;
let moveRight, moveLeft;

if (window.PointerEvent) {
  document.addEventListener('pointerdown', gestureStart);
  document.addEventListener('pointerup', gestureEnd);
  document.addEventListener('pointermove', gestureMove);
} else {
  document.addEventListener('mousedown', gestureStart);
  document.addEventListener('mouseup', gestureEnd);
  document.addEventListener('mousemove', gestureMove);

  document.addEventListener('touchdown', gestureStart);
  document.addEventListener('touchup', gestureEnd);
  document.addEventListener('touchmove', gestureMove);
}

function gestureStart(e) {
  // closest method have a selector as the argument not the class name
  if (e.target.closest('.testimonials__item')) {
    initialPosition = e.pageX;
    grabbing = true;
  }
}

function gestureMove(e) {
  if (grabbing) {
    position = e.pageX;
    transform = position - initialPosition;

    if (transform > 100 && slidesIndex > 0) {
      moveLeft = true;
    }
    console.log(transform);
    if (transform < -100 && slidesIndex < slidesCount - 1) {
      moveRight = true;
    }
  }
}

function gestureEnd(e) {
  if (grabbing) {
    moveRight && moveSlidesRight();

    moveLeft && moveSlidesLeft();
  }

  grabbing = false;
  moveRight = false;
  moveLeft = false;
}
