document.addEventListener("DOMContentLoaded", () => {
  introduction();
  calculate();
});

const ageRanges = [
  { min: 0, max: 1, src: "./assets/models/baby.gif", width: "370px" },
  { min: 2, max: 3, src: "./assets/models/toddler.gif", width: "370px" },
  { min: 4, max: 7, src: "./assets/models/preschooler.gif", width: "370px" },
  { min: 8, max: 12, src: "./assets/models/elementary.gif", width: "480px" },
  { min: 13, max: 18, src: "./assets/models/teenager.gif", width: "530px" },
  { min: 19, max: 35, src: "./assets/models/young-adult.gif", width: "410px" },
  { min: 36, max: 65, src: "./assets/models/adult.gif", width: "530px" },
  { min: 66, max: 75, src: "./assets/models/old.gif", width: "530px" },
  { min: 76, max: 100, src: "./assets/models/very-old.gif", width: "280px" },
];

const listOfMonths = [
  { month: "January", short: "Jan" },
  { month: "February", short: "Feb" },
  { month: "March", short: "Mar" },
  { month: "April", short: "Apr" },
  { month: "May", short: "May" },
  { month: "June", short: "Jun" },
  { month: "July", short: "Jul" },
  { month: "August", short: "Aug" },
  { month: "September", short: "Sep" },
  { month: "October", short: "Oct" },
  { month: "November", short: "Nov" },
  { month: "December", short: "Dec" },
];

// Function to show the introduction and switch to calculator after 5 seconds
const introduction = () => {
  const group = document.getElementById("group");
  const calculator = document.getElementById("calculator");
  const timerElement = document.getElementById("timer");
  let countdown = 10;

  const updateTimer = () => {
    if (countdown > 0) {
      timerElement.innerHTML = `Switching in <span class="text-[#eeeeee]/[0.9]">${countdown}</span> seconds...`;
      countdown--;
    } else {
      clearInterval(timerInterval);
      group.classList.add("hidden");
      calculator.classList.remove("hidden");
    }
  };

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
};

// Function to render list of days in a month
const renderDateList = () => {
  const modal = document.getElementById("modalDays");
  const element = document.getElementById("mainDay");

  let output = "";
  for (let i = 1; i <= 31; i++) {
    output += `<li onclick="setDate(${i})">${i.toString().padStart(2, "0")}</li>`;
  }

  element.innerHTML = output;
  modal.classList.remove("hidden");
};

// Function to set the selected date
const setDate = (date) => {
  document.getElementById("date").innerHTML = date.toString().padStart(2, "0");
  document.getElementById("modalDays").classList.add("hidden");
};

// Function to render list of months
const renderMonthList = () => {
  const modal = document.getElementById("modalMonths");
  const element = document.getElementById("mainMonth");
  let output = "";
  listOfMonths.forEach((month) => {
    output += `<li onclick="setMonth('${month.month}')">${month.short}</li>`;
  });
  element.innerHTML = output;
  modal.classList.remove("hidden");
};

// Function to set the selected month
const setMonth = (month) => {
  document.getElementById("month").innerHTML = month;
  document.getElementById("modalMonths").classList.add("hidden");
};

let currentPage = 1;
const yearsPerPage = 12;
const currentYear = new Date().getFullYear();
const startYear = 1800;
const totalYears = currentYear - startYear + 1;
const totalPages = Math.ceil(totalYears / yearsPerPage);

// Function to render list of years with pagination
const renderYearList = (page = 1) => {
  const modal = document.getElementById("modalYears");
  const element = document.getElementById("mainYear");
  const start = currentYear - (page - 1) * yearsPerPage;
  const end = Math.max(start - yearsPerPage + 1, startYear);

  let output = "";
  for (let i = start; i >= end; i--) {
    output += `<li onclick="setYear(${i})">${i}</li>`;
  }

  element.innerHTML = output;
  modal.classList.remove("hidden");

  // Pagination controls
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = `
    <button onclick="previousPage()" class="${page === 1 ? "opacity-0" : ""}">Previous</button>
    <button onclick="nextPage()" class="${page === totalPages ? "opacity-0" : ""}">Next</button>
  `;
  currentPage = page;
};

// Function to set the selected year
const setYear = (year) => {
  document.getElementById("year").innerHTML = year;
  document.getElementById("modalYears").classList.add("hidden");
};

// Function to go to the previous page of years
const previousPage = () => {
  if (currentPage > 1) {
    renderYearList(currentPage - 1);
  }
};

// Function to go to the next page of years
const nextPage = () => {
  if (currentPage < totalPages) {
    renderYearList(currentPage + 1);
  }
};

// Function to calculate age based on the selected date, month, and year
const calculate = () => {
  const now = new Date();
  const date = document.getElementById("date").innerText;
  const monthName = document.getElementById("month").innerText.trim();
  const month = listOfMonths.find((m) => m.month === monthName)?.short;
  const year = document.getElementById("year").innerText;
  const result = document.getElementById("result");
  const model = document.getElementById("model");

  if (!date || !month || !year) {
    displayError("Please enter all the fields!", model, result);
    return;
  }

  const birthDate = new Date(`${month} ${date}, ${year}`);
  if (isNaN(birthDate.getTime()) || birthDate > now) {
    displayError("Please enter a valid date!", model, result);
    return;
  }

  const { ageYears, ageMonths, ageDays } = calculateAge(birthDate, now);

  updateModelAndResult(ageYears, ageMonths, ageDays, model, result);
};

// Function to display error messages
const displayError = (message, model, result) => {
  result.innerText = message;
  model.src = "./assets/models/cat.gif";
  model.style.width = "370px";
  model.style.marginBottom = "40px";
};

// Function to calculate age in years, months, and days
const calculateAge = (birthDate, now) => {
  let ageYears = now.getFullYear() - birthDate.getFullYear();
  let ageMonths = now.getMonth() - birthDate.getMonth();
  let ageDays = now.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return { ageYears, ageMonths, ageDays };
};

// Function to update the model image and result text based on the calculated age
const updateModelAndResult = (ageYears, ageMonths, ageDays, model, result) => {
  const modelData = ageRanges.find(
    (range) => ageYears >= range.min && ageYears <= range.max,
  ) || { src: "./assets/models/ghost.gif", width: "440px" };

  model.src = modelData.src;
  model.style.width = modelData.width;
  model.style.marginBottom = "40px";

  result.innerHTML = `<span class="text-[#60e28f]">${ageYears}</span> Year <span class="text-[#60e28f]">${ageMonths}</span> Month <span class="text-[#60e28f]">${ageDays}</span> Days.`;
};
