document.addEventListener(
  "DOMContentLoaded",
  () => {
    calculate();
  },
  false,
);

const calculate = () => {
  const now = new Date();
  const date = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  const result = document.getElementById("result");
  const model = document.getElementById("model");

  if (!date || !month || !year) {
    result.innerText = "Please enter all the fields!";
    model.src = "./assets/models/cat.gif";
    model.style = "width: 370px; margin-bottom: 40px";
    return;
  }

  const birthDate = new Date(year, month - 1, date);
  if (birthDate > now) {
    result.innerText = "Please enter a valid date!";
    model.src = "./assets/models/cat.gif";
    model.style = "width: 370px; margin-bottom: 40px";
    return;
  }

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

  if (ageYears >= 0 && ageYears <= 1) {
    model.src = "./assets/models/baby.gif";
    model.style = "width: 370px; margin-bottom: 40px";
  } else if (ageYears >= 2 && ageYears <= 3) {
    model.src = "./assets/models/toddler.gif";
    model.style = "width: 370px; margin-bottom: 40px";
  } else if (ageYears >= 4 && ageYears <= 5) {
    model.src = "./assets/models/preschooler.gif";
    model.style = "width: 370px; margin-bottom: 40px";
  } else if (ageYears >= 6 && ageYears <= 12) {
    model.src = "./assets/models/elementary.gif";
    model.style = "width: 480px; margin-bottom: 40px";
  } else if (ageYears >= 13 && ageYears <= 18) {
    model.src = "./assets/models/teenager.gif";
    model.style = "width: 530px; margin-bottom: 40px";
  } else if (ageYears >= 19 && ageYears <= 40) {
    model.src = "./assets/models/young-adult.gif";
    model.style = "width: 410px; margin-bottom: 40px";
  } else if (ageYears >= 41 && ageYears <= 65) {
    model.src = "./assets/models/adult.gif";
    model.style = "width: 530px; margin-bottom: 40px";
  } else if (ageYears >= 66 && ageYears <= 75) {
    model.src = "./assets/models/old.gif";
    model.style = "width: 530px; margin-bottom: 40px";
  } else if (ageYears >= 76) {
    model.src = "./assets/models/very-old.gif";
    model.style = "width: 280px; margin-bottom: 40px";
  } else {
    model.src = "./assets/models/ghost.gif";
    model.style = "width: 440px; margin-bottom: 40px";
  }

  result.innerHTML = `<span class="text-[#60e28f]">${ageYears}</span> Year <span class="text-[#60e28f]">${ageMonths}</span> Month <span class="text-[#60e28f]">${ageDays}</span> Days.`;
};
