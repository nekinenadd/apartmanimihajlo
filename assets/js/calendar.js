const calendarEl = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");

let currentDate = new Date();
let startDate = null;
let endDate = null;

// Zauzeti datumi (kasnije dodaj potvrđene bukinge)
const bookedDates = [
  "2026-02-15",
  "2026-02-16",
  "2026-03-05"
];

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function isBooked(dateStr) {
  return bookedDates.includes(dateStr);
}

function renderCalendar() {
  calendarEl.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthLabel.textContent = currentDate.toLocaleDateString("sr-RS", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i < firstDay; i++) {
    calendarEl.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);

    const div = document.createElement("div");
    div.textContent = day;
    div.classList.add("day");

    if (isBooked(dateStr)) {
      div.classList.add("booked");
    } else {
      div.classList.add("available");
      div.onclick = () => selectDate(dateStr);
    }

    if (dateStr === startDate || dateStr === endDate) div.classList.add("selected");
    if (startDate && endDate && dateStr > startDate && dateStr < endDate) div.classList.add("in-range");

    calendarEl.appendChild(div);
  }
}

function selectDate(dateStr) {
  if (!startDate || (startDate && endDate)) {
    startDate = dateStr;
    endDate = null;
  } else if (dateStr > startDate) {
    endDate = dateStr;
  } else {
    startDate = dateStr;
  }

  document.getElementById("startDate").value = startDate || "";
  document.getElementById("endDate").value = endDate || "";

  renderCalendar();
}

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};
document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
