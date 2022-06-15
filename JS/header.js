function renderYearLabel() {
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

function renderHeaderMonth() {
  const monthControllerDiv = document.querySelector(".month-controller");
  const monthDiv = document.createElement("div");
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  monthDiv.classList.add("month");

  monthDiv.innerHTML = selectedDate.toLocaleString("en-EN", { month: "long" });

  monthControllerDiv.appendChild(monthDiv);
}
