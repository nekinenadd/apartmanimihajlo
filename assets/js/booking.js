// EmailJS podaci
const SERVICE_ID = "service_l55afvo";
const TEMPLATE_ID = "template_npu2r75";
const PUBLIC_KEY = "_jsPMZFMRByyxKPi1";

// Google Sheet webhook URL
const SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbwr7V-iTPsJKWCkbmMOAstqZtcGisw8GOa9FH6P7ZAy2FJotiJNU6XRHStEjINYC3Gp/exec";

document.getElementById("sendBooking").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!startDate || !endDate) return alert("Izaberite dolazak i odlazak");
  if (!name || !phone || !email) return alert("Popunite sve podatke");

  const templateParams = { name, phone, email, start: startDate, end: endDate };

  // 1️⃣ EmailJS
  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then(() => console.log("Email poslat"))
    .catch(err => console.error("Greška EmailJS:", err));

  // 2️⃣ Google Sheet webhook
 fetch(SHEET_WEBHOOK, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: name,
    phone: phone,
    email: email,
    start: startDate,
    end: endDate
  })
})
.then(res => res.json())
.then(res => console.log("Upit zapisano u Sheet:", res))
.catch(err => console.error("Greška Sheet webhook:", err));

  alert("Upit je poslat ✅");

  // reset forme i kalendara
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  startDate = null;
  endDate = null;
  renderCalendar();
});
