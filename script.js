const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const matchBtn = document.getElementById("matchBtn");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");
const heartEl = document.getElementById("heart");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

function showError(text, ...inputs) {
  errorEl.textContent = text;
  [name1Input, name2Input].forEach(i => i.classList.remove("invalid"));
  inputs.forEach(i => i.classList.add("invalid"));
  resultEl.hidden = true;
}

function getResult(score) {
  if (score >= 90) return { color: "#d6336c", text: "A perfect match!" };
  if (score >= 70) return { color: "#e8590c", text: "Great chemistry. Go for it." };
  if (score >= 50) return { color: "#c98a00", text: "There's potential here." };
  if (score >= 30) return { color: "#2f7fb5", text: "It could work with some effort." };
  return { color: "#6b5a8e", text: "Maybe just stay friends." };
}

function countUp(target) {
  let current = 0;
  const step = Math.max(1, Math.round(target / 30));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    scoreEl.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 25);
}

function findMatch() {
  const name1 = name1Input.value.trim();
  const name2 = name2Input.value.trim();

  if (!name1 && !name2) return showError("Enter both names.", name1Input, name2Input);
  if (!name1) return showError("Enter the first name.", name1Input);
  if (!name2) return showError("Enter the second name.", name2Input);
  if (name1.toLowerCase() === name2.toLowerCase()) {
    return showError("Enter two different names.", name1Input, name2Input);
  }

  showError("");
  const score = Math.floor(Math.random() * 101); // 0-100
  const { color, text } = getResult(score);

  document.documentElement.style.setProperty("--result-color", color);
  messageEl.textContent = `${name1} + ${name2}: ${text}`;
  scoreEl.textContent = "0";
  resultEl.hidden = false;

  heartEl.classList.remove("beat");
  void heartEl.offsetWidth; // restart the animation
  heartEl.classList.add("beat");

  countUp(score);
}

matchBtn.addEventListener("click", findMatch);
[name1Input, name2Input].forEach(input =>
  input.addEventListener("keydown", e => { if (e.key === "Enter") findMatch(); })
);
