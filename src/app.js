const checkBtn = document.getElementById("check-number");
const tryAgain = document.getElementById("try-again");

//Game class definition
class GuessNumber {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.score = this.max;
    this.highScore = 0;
    this.msgEl = document.getElementById("msg");
    this.bodyEl = document.getElementById("game-interface");
    this.tryBtn = document.getElementById("try-again");

    this.setScore(this.score);
  }

  init() {
    this.initGuessingNumber();
    document.getElementById("min").textContent = this.min;
    document.getElementById("max").textContent = this.max;
    return this;
  }

  initGuessingNumber() {
    this.guessingNum = Math.trunc(Math.random() * this.max) + 1;
    if (this.guessingNum < this.min) this.guessingNum += this.min;
  }

  refresh() {
    this.initGuessingNumber();
    document.forms["guessingGame"].hidden.value = "?";
    this.score = this.max;
    this.setScore(this.score);
    this.setMsg("");
    if (this.tryBtn && this.tryBtn.classList.contains("visible")) {
      this.tryBtn.classList.remove("visible");
    }
    if (this.bodyEl) {
      this.bodyEl.classList.remove("error", "success", "low", "high");
    }
    if (checkBtn.classList.contains("hidden")) {
      checkBtn.classList.remove("hidden");
    }
  }

  check(number) {
    if (number < this.min || number > this.max)
      return this.setMsg("the number is out of range!", "error");

    if (number > this.guessingNum) {
      this.setScore(--this.score);
      this.setMsg("too high!", "high");
    } else if (number < this.guessingNum) {
      this.setScore(--this.score);
      this.setMsg("too low!", "low");
    } else if (number == this.guessingNum) {
      document.forms["guessingGame"].hidden.value = number;
      this.setScore(this.score);
      this.setHighScore();
      this.setMsg("Congrats!", "success");

      if (this.tryBtn && !this.tryBtn.classList.contains("visible")) {
        this.tryBtn.classList.add("visible");
      }
      if (!checkBtn.classList.contains("hidden")) {
        checkBtn.classList.add("hidden");
      }
    }
  }

  setMsg(msg, msgClass = "") {
    if (this.msgEl && msg) {
      this.msgEl.textContent = msg;
      if (!this.msgEl.parentNode.classList.contains("visible")) {
        this.msgEl.parentNode.classList.add("visible");
      }
      if (
        msgClass &&
        this.bodyEl &&
        !this.bodyEl.classList.contains(msgClass)
      ) {
        this.bodyEl.classList.remove("error", "succes", "low", "high");
        this.bodyEl.classList.add(msgClass);
      }
    } else if (!msg) {
      if (this.msgEl.parentNode.classList.contains("visible")) {
        this.msgEl.parentNode.classList.remove("visible");
      }
    }
  }

  setScore(score) {
    document.getElementById("score").textContent = score;
  }

  setHighScore() {
    if (this.highScore == 0 || this.score > this.highScore) {
      this.highScore = this.score;
      document.getElementById("highScore").textContent = this.highScore;
    }
  }
}
//Make game instantiation and invoke it
const guessingGame = new GuessNumber(0, 50).init();

//Listen form submission
checkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const number = document.forms["guessingGame"].suggestion.value;
  guessingGame.check(
    typeof parseInt(number) != "number" ? null : parseInt(number)
  );
});

//Try again the game
tryAgain.addEventListener("click", function (e) {
  e.preventDefault();
  document.forms["guessingGame"].suggestion.value = "";
  guessingGame.refresh();
});
