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

const form = document.querySelector("#user-login-form");
const emailInput = document.querySelector('input[name="email"]');
const nameInput = document.querySelector('input[name="name"]');
const websiteInput = document.querySelector('input[name="website"]');
const messageInput = document.querySelector('textarea[name="user-message"]');
const modalPop = document.querySelector(".modal");
const modalBtn = document.querySelector(".done");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isEmailValid = validateEmail();
  const isNameValid = validateName();
  const isWebsiteValid = validateWebsite();
  const isMessageValid = validateMessage();

  if (isEmailValid && isNameValid && isWebsiteValid && isMessageValid) {
    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      website: websiteInput.value,
      message: messageInput.value,
    };
    sendMessage(userData);
  
    // submitBtn.addEventListener('click', openModal())
  }
});

function openModal() {
  modalPop.classList.add("visible");
}
function closeModal() {
  modalPop.classList.remove("visible");
}

modalBtn.addEventListener("click", () => {
  closeModal();
});

async function sendMessage(userData) {
  try {
    const response = await fetch("http://api.kesho.me/v1/user-test/contact", {
      method: "post",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    openModal();
  } catch (e) {
    console.log("Error - ", e);
  }
}

function validateEmail() {
  if (!emailInput.value) {
    emailInput.classList.add("has-error");
    emailInput.parentNode.querySelector(".error-message").innerText =
      "Please enter email address";
    return false;
  }
  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailInput.classList.add("has-error");
    emailInput.parentNode.querySelector(".error-message").innerText =
      "Invalid email";
    return false;
  }
  emailInput.classList.remove("has-error");
  emailInput.parentNode.querySelector(".error-message").innerText = "";
  return true;
}

function validateName() {
  if (!nameInput.value) {
    nameInput.classList.add("has-error");
    nameInput.parentNode.querySelector(".error-message").innerText =
      "Please enter your name";
    return false;
  }
  nameInput.classList.remove("has-error");
  nameInput.parentNode.querySelector(".error-message").innerText = "";
  return true;
}

function validateWebsite() {
  if (!websiteInput.value) {
    websiteInput.classList.add("has-error");
    websiteInput.parentNode.querySelector(".error-message").innerText =
      "Please enter your website";
    return false;
  }
  if (
    !(
      websiteInput.value.includes("https://") ||
      emailInput.value.includes("http://")
    )
  ) {
    websiteInput.classList.add("has-error");
    websiteInput.parentNode.querySelector(".error-message").innerText =
      "Invalid website";
    return false;
  }
  websiteInput.classList.remove("has-error");
  websiteInput.parentNode.querySelector(".error-message").innerText = "";
  return true;
}

function validateMessage() {
  if (!messageInput.value) {
    messageInput.classList.add("has-error");
    messageInput.parentNode.querySelector(".error-message").innerText =
      "Please enter Message";
    return false;
  }
  messageInput.classList.remove("has-error");
  messageInput.parentNode.querySelector(".error-message").innerText = "";
  return true;
}
