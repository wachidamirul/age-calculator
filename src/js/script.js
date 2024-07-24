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

  if (!date || !month || !year) {
    result.innerText = "Please enter all the fields!";
    return;
  }

  const birthDate = new Date(year, month - 1, date);
  if (birthDate > now) {
    result.innerText = "Please enter a valid date!";
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

  result.innerHTML = `<span class="text-[#60e28f]">${ageYears}</span> Year <span class="text-[#60e28f]">${ageMonths}</span> Month <span class="text-[#60e28f]">${ageDays}</span> Days.`;
};
