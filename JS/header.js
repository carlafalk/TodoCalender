function changeBG() {
  const headerContainer = document.querySelector(".header-container");
  headerContainer.style.background = `url(../../IMG/BG/${selectedDate.toLocaleString(
    "en-EN",
    { month: "long" }
  )}.jpg)`;
}

function renderHeader() {
  renderYear();
  renderMonth();
}

function renderYear() {
  const centuryDiv = document.querySelector(".century");
  centuryDiv.innerHTML = `${selectedDate
    .getFullYear()
    .toString()
    .substring(0, 2)}`;

  const yearDiv = document.querySelector(".year");
  yearDiv.innerHTML = `${selectedDate
    .getFullYear()
    .toString()
    .substring(2, 4)}`;
}

function renderMonth() {
  const monthControllerDiv = document.querySelector(".month-controller");
  monthControllerDiv.innerHTML = ``;
  const monthDiv = document.createElement("div");

  monthDiv.classList.add("month");

  monthDiv.innerHTML = selectedDate.toLocaleString("en-EN", { month: "long" });
  prevBtn.classList.add("fa-solid", "fa-chevron-left");
  nextBtn.classList.add("fa-solid", "fa-chevron-right");

  monthControllerDiv.appendChild(prevBtn);
  monthControllerDiv.appendChild(monthDiv);
  monthControllerDiv.appendChild(nextBtn);
}
