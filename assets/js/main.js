const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("mobileSidebar");
const overlay = document.getElementById("sidebarOverlay");

openSidebar.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

closeSidebar.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

function closeMenu() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}




document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // Auto rotate
  setInterval(() => {
    if (!isDragging) {
      index = (index + 1) % slides.length;
      updateCarousel();
    }
  }, 4500);

  // Touch events (mobile swipe)
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    const diff = startX - currentX;

    if (diff > 50 && index < slides.length - 1) {
      index++;
    } else if (diff < -50 && index > 0) {
      index--;
    }

    updateCarousel();
    isDragging = false;
  });
});

document.querySelectorAll(".amenity-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById(card.dataset.modal).classList.add("active");
  });
});

document.querySelectorAll(".amenity-modal .close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".amenity-modal").classList.remove("active");
  });
});

document.querySelectorAll(".amenity-modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });
});


document.querySelectorAll(".amenity-modal").forEach(modal => {
  const track = modal.querySelector(".modal-track");
  const slides = modal.querySelectorAll(".modal-slide");
  const prevBtn = modal.querySelector(".prev");
  const nextBtn = modal.querySelector(".next");
  const closeBtn = modal.querySelector(".modal-close");

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    index = index > 0 ? index - 1 : slides.length - 1;
    update();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  // Swipe support
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    const diff = startX - currentX;
    if (diff > 50) index = (index + 1) % slides.length;
    if (diff < -50) index = index > 0 ? index - 1 : slides.length - 1;
    update();
    isDragging = false;
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    index = 0;
    update();
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

faders.forEach(el => observer.observe(el));

// Modal functionality
const reserveModal = document.getElementById("reserveModal");
const openReserveBtn = document.getElementById("openReserveModal");
const closeReserveBtn = document.querySelector(".close-modal");

// Open modal
openReserveBtn.addEventListener("click", () => {
  reserveModal.classList.add("active");
});

// Close modal via close button
closeReserveBtn.addEventListener("click", () => {
  reserveModal.classList.remove("active");
});

// Close modal by clicking outside content
reserveModal.addEventListener("click", (e) => {
  if (e.target === reserveModal) {
    reserveModal.classList.remove("active");
  }
});

openReserveBtn.addEventListener("click", () => {
  reserveModal.classList.add("active");

  // Reset animations
  const options = reserveModal.querySelectorAll(".reserve-option");
  options.forEach(option => {
    option.style.animation = "none";
    option.offsetHeight; // force reflow
    option.style.animation = "";
  });
});



const galleries = {
  spa: [
    "assets/media/spa3.png",
    "assets/media/spa4.png",
    "assets/media/spa5.png",
    "assets/media/spa6.png",
    "assets/media/spa7.png",
    "assets/media/spa8.png",
  ],
  gym: [
    "assets/media/gym1.png",
    "assets/media/gym2.png",
    "assets/media/gym3.png",
    "assets/media/gym4.png",
  ],
  pool: [
    "assets/media/bazen1.png",
    "assets/media/bazen2.png",
    "assets/media/bazen3.png",
  ],
};

const modal = document.getElementById("galleryModal");
const grid = document.getElementById("galleryGrid");
const closeBtn = document.querySelector(".gallery-close");

document.querySelectorAll("[data-gallery]").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.gallery;
    openGallery(type);
  });
});

function openGallery(type) {
  grid.innerHTML = "";
  galleries[type].forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    grid.appendChild(img);
  });
  modal.classList.add("active");
}

closeBtn.addEventListener("click", closeGallery);
modal.addEventListener("click", e => {
  if (e.target === modal) closeGallery();
});

function closeGallery() {
  modal.classList.remove("active");
}


document.querySelectorAll(".site-faq__question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".site-faq__item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("_jsPMZFMRByyxKPi1");

  const form = document.getElementById("newsletter-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    emailjs.sendForm(
      "service_27djwtk",
      "template_npu2r75",
      this
    )
    .then(() => {
      alert("Email uspešno poslat!");
      form.reset();
    })
    .catch((error) => {
      console.error("Greška:", error);
      alert("Došlo je do greške pri slanju.");
    });
  });
});




