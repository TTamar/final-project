const slideItems = document.querySelectorAll(".slider-item");
const preBtn = document.querySelector("#previous-img");
const nextBtn = document.querySelector("#next-img");
const ballBtns = document.querySelectorAll(".btn");

let activeIndex = 0;
let slideInterval = null;

initSlider();
function initSlider() {
  nextBtn.addEventListener("click", showNextImg);
  preBtn.addEventListener("click", showPrevImg);

  setInterval(showNextImg, 5000);

  ballBtns.forEach((btn, ballIndex) => {
    btn.addEventListener("click", () => {
      handleBallClick(ballIndex);
    });
  });
  document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") {
      showNextImg();
    }
    if (e.code === "ArrowLeft") {
      showPrevImg();
    }
  });
}
function moveSlider() {
  slideItems.forEach((item, i) => {
    if (activeIndex === i) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function showNextImg() {
  activeIndex = activeIndex + 1;
  if (activeIndex > slideItems.length - 1) {
    activeIndex = 0;
  }
  moveSlider();
}

function showPrevImg() {
  activeIndex = activeIndex - 1;
  if (activeIndex < 0) {
    activeIndex = slideItems.length - 1;
  }
  moveSlider();
}
function handleBallClick(nextIndex) {
  activeIndex = nextIndex;
  moveSlider();
}

const quoteSlide = document.querySelectorAll(".quotes");
const btns = document.querySelectorAll(".square");

initQuoteSlider();
function initQuoteSlider() {
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      btns.forEach((btn1) => {
        btn1.classList.remove("pink-border");
      });
      squareClick(i);
      btn.classList.add("pink-border");
    });
  });
}

function moveQuoteSlider(index) {
  quoteSlide.forEach((quote, i) => {
    if (index === i) {
      quote.classList.add("active");
    } else {
      quote.classList.remove("active");
    }
  });
}

function squareClick(squareIndex) {
  moveQuoteSlider(squareIndex);
}

const categoryList = document.querySelectorAll(".chooseBtn");
const showAll = document.querySelector(".chooseAll");
const projectList = document.querySelectorAll(".project-article");
selectCategory();
function selectCategory() {
  categoryList.forEach((item, i) => {
    item.addEventListener("click", () => {
      categoryList.forEach((item) => {
        item.classList.remove("pink-border");
      });
      chooseCategory(i);
      item.classList.add("pink-border");
    });
  });
}
showAll.addEventListener("click", () => {
  projectList.forEach((pro, i) => {
    pro.classList.remove("vanish");
  });
  categoryList.forEach((item) => {
    item.classList.remove("pink-border");
  });
});
function chooseCategory(index) {
  projectList.forEach((pro, i) => {
    if (index === i) {
      pro.classList.remove("vanish");
    } else {
      pro.classList.add("vanish");
    }
  });
}
