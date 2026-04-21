// Set the Scroll Page speed
// using https://github.com/gblazex/smoothscroll-for-websites
// SmoothScroll({ stepSize: 40 })

// Add some parallax
// ====================
const heroImage = document.querySelector(".hero-image");
const textEl = document.querySelector(".parallax");
 
// Create the translate3d function
function setTranslate(xPos, yPos, el) {
 el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
}

// Add event Listenter to Window
window.addEventListener("DOMContentLoaded", scrollLoop, false);

// Define position variables
let xScrollPosition;
let yScrollPosition;

// Scroll function
function scrollLoop() {
  xScrollPosition = window.pageXOffset;
  yScrollPosition = window.pageYOffset;
 
  // We only change the Y variable
  setTranslate(0, yScrollPosition * -0.2, heroImage);
  setTranslate(0, yScrollPosition * 0.1, textEl);
 
  // We use requestAnimationFrame to target the GPU instead of the CPU
  requestAnimationFrame(scrollLoop);
}