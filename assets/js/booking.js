document.getElementById("sendBooking").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!startDate || !endDate) return alert("Izaberite dolazak i odlazak");
  if (!name || !phone) return alert("Popunite ime i telefon");

  const data = {
    name,
    phone,
    start: startDate,
    end: endDate,
    apartment: "Apartman Zlatibor"
  };

  // Ovde ide EmailJS ili druga metoda slanja
  console.log("Upit poslat:", data);
  alert("Upit je poslat ✅");
});
