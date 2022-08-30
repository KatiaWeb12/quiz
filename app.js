import { myHTTP } from "./api.js";
let category = document.querySelectorAll(".category");
let choose = document.querySelectorAll(".choose");
let difficulty = document.querySelectorAll(".difficulty");
let sections = document.querySelectorAll("section");
let params = {
  category: "",
  difficulty: "",
};
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
    if (choosingEl.dataset.name) {
      params.category = choosingEl.dataset.name;
    } else {
      params.difficulty = choosingEl.dataset.difficulty;
    }
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
      questionsService.getQuestions(
        params.category,
        params.difficulty,
        getResponse
      );
      return;
    }
    sections[num + 1].classList.add("active-section");
  });
});
let http = myHTTP();
let service = () => {
  let triviaUrl = "https://the-trivia-api.com/api/questions";
  return {
    getQuestions(category, difficulty, cb) {
      http.get(
        `${triviaUrl}?categories=${category}&limit=10&difficulty=${difficulty}`,
        cb
      );
    },
  };
};
let questionsService = service();
function getResponse(err, data) {
  if (err) {
    alert("Произошла ошибка. Страница будет перезагружена автоматически.");
    document.location.reload(); //перезагрузка страницы
    return;
  }
  renderQuestions(data);
}
function renderQuestions(data) {}
