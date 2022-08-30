let category = document.querySelectorAll(".category");
let choose = document.querySelectorAll(".choose");
let difficulty = document.querySelectorAll(".difficulty");
let sections = document.querySelectorAll("section");
window.addEventListener("click", (event) => {
  chooseQuiz(event.target);
});
function chooseQuiz(choosingEl) {
  if (choosingEl.classList.contains("choose")) {
    let choosingElementsArray = choosingEl.parentElement.children;
    for (let i = 0; i < choosingElementsArray.length; i++) {
      choosingElementsArray[i].classList.remove("active");
    }
    choosingEl.classList.add("active");
    choosingEl
      .closest("section")
      .querySelector("button")
      .classList.add("active-button");
  }
}
sections.forEach((section, num) => {
  let button = section.querySelector("button");
  button.addEventListener("click", () => {
    if (!button.classList.contains("active-button")) {
      return;
    }
    section.classList.remove("active-section");
    if (num === 2) {
      return;
    }
    sections[num + 1].classList.add("active-section");
  });
});
