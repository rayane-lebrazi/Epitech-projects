const footballActionPhoto = document.querySelector("#football-action-photo");
if (footballActionPhoto) {
  const showFootballPhoto = () => {
    if (footballActionPhoto.naturalWidth > 0) {
      footballActionPhoto.hidden = false;
      document.querySelector("#football-photo-placeholder").hidden = true;
    }
  };
  footballActionPhoto.addEventListener("load", showFootballPhoto);
  showFootballPhoto();
}
const footballShoot = document.querySelector("#football-shoot");
if (footballShoot) {
  let score = 0;
  let shots = 0;
  footballShoot.addEventListener("click", () => {
    const aim = Number(document.querySelector("#football-aim").value);
    const keeperPosition = Math.floor(Math.random() * 76) + 12;
    const keeper = document.querySelector("#keeper");
    const ball = document.querySelector("#football-ball");
    const result = document.querySelector("#football-result");
    const distance = Math.abs(aim - keeperPosition);
    const goal = aim > 5 && aim < 95 && distance > 15;
    keeper.style.left = keeperPosition + "%";
    ball.style.left = aim + "%";
    ball.classList.add("kicked");
    footballShoot.disabled = true;
    shots += 1;
    if (goal) {
      score += 1;
      result.textContent = distance > 30 ? "Top corner! What a finish." : "Goal! You found the gap.";
    } else if (aim <= 5 || aim >= 95) {
      result.textContent = "Too wide. Try aiming inside the posts.";
    } else {
      result.textContent = "The keeper got a hand to it. Have another go.";
    }
    document.querySelector("#football-score").textContent = score;
    document.querySelector("#football-shots").textContent = shots;
    window.setTimeout(() => {
      ball.classList.remove("kicked");
      footballShoot.disabled = false;
    }, 700);
  });
}

const basketballAim = document.querySelector("#basketball-aim");
if (basketballAim) {
  const value = document.querySelector("#basketball-aim-value");
  const ball = document.querySelector("#shot-mark");
  let points = 0;
  let streak = 0;
  basketballAim.addEventListener("input", () => {
    value.textContent = basketballAim.value;
  });
  document.querySelector("#basketball-shoot").addEventListener("click", () => {
    const angle = Number(basketballAim.value);
    const made = angle >= 42 && angle <= 58;
    const result = document.querySelector("#basketball-result");
    ball.classList.remove("shooting");
    void ball.offsetWidth;
    ball.classList.add("shooting");
    if (made) {
      points += 2;
      streak += 1;
      result.textContent = streak >= 3 ? "Nothing but net! You’re on fire." : "Swish! Two points.";
    } else {
      streak = 0;
      result.textContent = angle < 42 ? "A little too far left. Adjust and shoot again." : "A little too far right. Adjust and shoot again.";
    }
    document.querySelector("#basketball-score").textContent = points;
    document.querySelector("#basketball-streak").textContent = streak;
    window.setTimeout(() => ball.classList.remove("shooting"), 700);
  });
}

const note = document.querySelector("#writing-note");
if (note) {
  const status = document.querySelector("#note-status");
  try {
    note.value = localStorage.getItem("rayane-writing-note") || "";
  } catch {
    status.textContent = "Browser storage is unavailable.";
  }
  document.querySelector("#save-note").addEventListener("click", () => {
    try {
      localStorage.setItem("rayane-writing-note", note.value);
      status.textContent = "Saved in this browser.";
    } catch {
      status.textContent = "Could not save in this browser.";
    }
  });
  document.querySelector("#clear-note").addEventListener("click", () => {
    note.value = "";
    try {
      localStorage.removeItem("rayane-writing-note");
      status.textContent = "Notebook cleared.";
    } catch {
      status.textContent = "Text cleared.";
    }
  });
}

const cases = [
  {
    category: "Starting system",
    icon: "🔋",
    title: "The engine won’t crank",
    symptom: "The dashboard lights are dim, and you hear a rapid clicking sound when turning the key.",
    options: ["The battery is discharged or has a poor connection", "The engine air filter is clogged", "The coolant level is low"],
    correct: 0,
    explanation: "Dim lights and rapid clicking often point to low battery voltage or a loose battery connection."
  },
  {
    category: "Cooling system",
    icon: "🌡️",
    title: "The temperature keeps climbing",
    symptom: "The temperature gauge rises while driving, and you notice a coolant smell after stopping.",
    options: ["A cooling-system leak or circulation problem", "A worn windshield wiper", "A misaligned headlight"],
    correct: 0,
    explanation: "An overheating engine and coolant smell call for a careful cooling-system check. Never open a hot radiator."
  },
  {
    category: "Electrical system",
    icon: "💡",
    title: "The headlights keep flickering",
    symptom: "The lights brighten and dim with engine speed, and the battery warning light comes on.",
    options: ["The charging system needs inspection", "The tire pressure is too high", "The cabin filter needs changing"],
    correct: 0,
    explanation: "Flickering lights and a battery warning can indicate a charging-system or electrical connection fault."
  }
];
let currentCase = 0;
let solved = 0;
let completed = 0;
const optionsContainer = document.querySelector("#diagnostic-options");
if (optionsContainer) {
  const renderCase = () => {
    const item = cases[currentCase];
    document.querySelector("#case-number").textContent = "CASE " + String(currentCase + 1).padStart(2, "0") + " / " + String(cases.length).padStart(2, "0");
    document.querySelector("#case-category").textContent = item.category;
    document.querySelector("#diagnostic-icon").textContent = item.icon;
    document.querySelector("#case-title").textContent = item.title;
    document.querySelector("#case-symptom").textContent = item.symptom;
    document.querySelector("#diagnostic-result").textContent = "What would you check first?";
    document.querySelector("#next-case").hidden = true;
    optionsContainer.replaceChildren();
    item.options.forEach((label, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "diagnostic-option";
      button.textContent = label;
      button.addEventListener("click", () => {
        completed += 1;
        const correct = index === item.correct;
        if (correct) {
          solved += 1;
          button.classList.add("correct");
          document.querySelector("#diagnostic-result").textContent = "Good diagnosis. " + item.explanation;
        } else {
          button.classList.add("incorrect");
          document.querySelector("#diagnostic-result").textContent = "Not quite. " + item.explanation;
          optionsContainer.children[item.correct].classList.add("correct");
        }
        optionsContainer.querySelectorAll("button").forEach(choice => choice.disabled = true);
        document.querySelector("#diagnostic-score").textContent = solved;
        document.querySelector("#diagnostic-completed").textContent = completed;
        const next = document.querySelector("#next-case");
        next.hidden = false;
        next.textContent = currentCase === cases.length - 1 ? "Play again" : "Next case";
      });
      optionsContainer.append(button);
    });
  };
  renderCase();
  document.querySelector("#next-case").addEventListener("click", () => {
    if (currentCase === cases.length - 1) {
      currentCase = 0;
      solved = 0;
      completed = 0;
      document.querySelector("#diagnostic-score").textContent = "0";
      document.querySelector("#diagnostic-completed").textContent = "0";
    } else {
      currentCase += 1;
    }
    renderCase();
  });
}

