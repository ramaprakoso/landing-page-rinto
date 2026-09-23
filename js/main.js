/**
 * PT. Manggala Arta Sejahtera - Modern Interactive JavaScript
 * Handcrafted for optimal performance, responsiveness, and lead conversion.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalculator();
  initTechnicalSpecsTabs();
  initGalleryFilter();
  initModalLightbox();
  initFaqAccordion();
  initCounters();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }, { passive: true });

  // Hamburger, Drawer Close & Overlay Controls
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openDrawer() {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (hamburgerBtn) {
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      }
    }
  }

  function closeDrawer() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (hamburgerBtn) {
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeDrawer);
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeDrawer);
    }

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // Active section highlighting
  function highlightCurrentSection() {
    const scrollY = window.pageYOffset + 120;
    const sections = document.querySelectorAll('section[id], header[id]');

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE COST ESTIMATOR / CALCULATOR
   ========================================================================== */
function initCalculator() {
  const serviceSelect = document.getElementById('calcService');
  if (!serviceSelect) return;
  const packageSelect = document.getElementById('calcPackage');
  if (!packageSelect) return;
  const rangeSlider = document.getElementById('calcRange');
  const volumeInput = document.getElementById('calcVolume');
  const locationSelect = document.getElementById('calcLocation');

  const labelVolume = document.getElementById('labelVolume');
  const unitIndicator = document.getElementById('unitIndicator');

  const summaryServiceName = document.getElementById('summaryServiceName');
  const summaryPackageName = document.getElementById('summaryPackageName');
  const summaryVolume = document.getElementById('summaryVolume');
  const summaryUnitPrice = document.getElementById('summaryUnitPrice');
  const totalPriceOutput = document.getElementById('totalPriceOutput');
  const btnSendWA = document.getElementById('btnSendWAEstimate');

  // Service options and pricing database
  const pricingData = {
    aspal: {
      name: "Pengaspalan Hotmix",
      unit: "m²",
      min: 30,
      max: 3000,
      step: 10,
      defaultVal: 150,
      packages: [
        { id: "acwc-overlay", name: "Paket Gelar Hotmix AC-WC (Tebal 2-3 cm)", price: 85000 },
        { id: "acbc-medium", name: "Paket Gelar Hotmix AC-BC (Tebal 4-5 cm)", price: 125000 },
        { id: "terima-jadi", name: "Paket Full Terima Jadi (Sub-base + Makadam + AC-WC)", price: 185000 },
        { id: "sand-sheet", name: "Paket Sand Sheet Halus (Halaman / Lapangan)", price: 75000 }
      ]
    },
    uditch: {
      name: "Pemasangan U-Ditch Precast",
      unit: "m¹",
      min: 10,
      max: 500,
      step: 2,
      defaultVal: 50,
      packages: [
        { id: "uditch-30", name: "Pasang U-Ditch 30 x 30 x 120 cm (Mutu K-350)", price: 290000 },
        { id: "uditch-40", name: "Pasang U-Ditch 40 x 40 x 120 cm (Mutu K-350)", price: 370000 },
        { id: "uditch-50", name: "Pasang U-Ditch 50 x 50 x 120 cm (Mutu K-350)", price: 480000 },
        { id: "uditch-60", name: "Pasang U-Ditch 60 x 60 x 120 cm (Mutu K-350)", price: 620000 },
        { id: "uditch-80", name: "Pasang U-Ditch 80 x 80 x 120 cm (Mutu K-350)", price: 890000 },
        { id: "uditch-100", name: "Pasang U-Ditch 100 x 100 x 120 cm (Mutu K-350)", price: 1250000 },
        { id: "kansteen-std", name: "Pasang Kansteen Standar / DKI (Mutu K-350)", price: 115000 }
      ]
    },
    poles: {
      name: "Poles Beton & Floor Hardener",
      unit: "m²",
      min: 50,
      max: 5000,
      step: 25,
      defaultVal: 200,
      packages: [
        { id: "trowel-only", name: "Finish Trowel Cor Beton Basah", price: 25000 },
        { id: "fh-nonmetallic", name: "Floor Hardener Non-Metallic (Sika / Fosroc)", price: 45000 },
        { id: "fh-metallic", name: "Floor Hardener Metallic Heavy Duty", price: 75000 },
        { id: "diamond-gloss", name: "Diamond Grinding & Polishing (High Gloss)", price: 95000 },
        { id: "densifier-full", name: "Paket Komplit Polish + Chemical Densifier Anti-Debu", price: 135000 }
      ]
    }
  };

  function updatePackageDropdown() {
    const selectedServiceKey = serviceSelect.value;
    const serviceInfo = pricingData[selectedServiceKey];

    // Update label & units
    labelVolume.textContent = `3. Masukkan Estimasi Volume (${serviceInfo.unit})`;
    rangeSlider.min = serviceInfo.min;
    rangeSlider.max = serviceInfo.max;
    rangeSlider.step = serviceInfo.step;
    rangeSlider.value = serviceInfo.defaultVal;
    volumeInput.value = serviceInfo.defaultVal;
    volumeInput.min = serviceInfo.min;

    // Populate packages
    packageSelect.innerHTML = '';
    serviceInfo.packages.forEach(pkg => {
      const option = document.createElement('option');
      option.value = pkg.id;
      option.textContent = `${pkg.name} - Rp ${formatNumber(pkg.price)} / ${serviceInfo.unit}`;
      option.dataset.price = pkg.price;
      packageSelect.appendChild(option);
    });

    calculateTotal();
  }

  let calculatorStarted = false;

  function calculateTotal() {
    if (!calculatorStarted) {
      console.log('Event: calculator_start', { service: serviceSelect.value });
      calculatorStarted = true;
    }

    const serviceKey = serviceSelect.value;
    const serviceInfo = pricingData[serviceKey];
    const selectedPackageOption = packageSelect.options[packageSelect.selectedIndex];

    if (!selectedPackageOption) return;

    const unitPrice = parseInt(selectedPackageOption.dataset.price, 10) || 0;
    const volume = parseInt(volumeInput.value, 10) || 0;
    const location = locationSelect.value;

    const basePrice = unitPrice * volume;
    const maxPrice = basePrice * 1.25;

    // Update UI elements
    unitIndicator.textContent = `${formatNumber(volume)} ${serviceInfo.unit}`;
    summaryServiceName.textContent = serviceInfo.name;
    summaryPackageName.textContent = selectedPackageOption.textContent.split(' - ')[0];
    summaryVolume.textContent = `${formatNumber(volume)} ${serviceInfo.unit}`;
    summaryUnitPrice.textContent = `Rp ${formatNumber(unitPrice)} / ${serviceInfo.unit}`;
    totalPriceOutput.textContent = `Rp ${formatNumber(basePrice)} - Rp ${formatNumber(maxPrice)}`;

    // Build formatted WhatsApp message
    const waText =
      `Halo Admin Manggala Arta Sejahtera, saya ingin konsultasi dan meminta penawaran resmi untuk estimasi proyek berikut:

- Kategori: ${serviceInfo.name}
- Spesifikasi: ${selectedPackageOption.textContent.split(' - ')[0]}
- Estimasi Volume: ${formatNumber(volume)} ${serviceInfo.unit}
- Estimasi Biaya: Rp ${formatNumber(basePrice)} - Rp ${formatNumber(maxPrice)}
- Wilayah Proyek: ${location}

Mohon informasi ketersediaan jadwal survey lokasi gratis dan rincian penawaran resminya. Terima kasih!`;

    const waEncoded = encodeURIComponent(waText);
    btnSendWA.href = `https://wa.me/6282260840642?text=${waEncoded}`;
  }

  // Event Listeners for Calculator
  serviceSelect.addEventListener('change', updatePackageDropdown);
  packageSelect.addEventListener('change', calculateTotal);
  locationSelect.addEventListener('change', calculateTotal);

  rangeSlider.addEventListener('input', (e) => {
    volumeInput.value = e.target.value;
    calculateTotal();
  });

  volumeInput.addEventListener('input', (e) => {
    rangeSlider.value = e.target.value;
    calculateTotal();
  });

  // Initial populate
  updatePackageDropdown();
}

/* ==========================================================================
   3. TECHNICAL SPECS TAB SWITCH (KANSTEEN ASSET)
   ========================================================================== */
function initTechnicalSpecsTabs() {
  const tabBtns = document.querySelectorAll('.spec-tab-btn');
  const tabContents = document.querySelectorAll('.specs-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. PROJECT GALLERY FILTER
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX MODAL PREVIEW
   ========================================================================== */
function initModalLightbox() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const btnZoomSpec = document.getElementById('btnZoomSpec');

  function openModal(src, title, desc) {
    modalImg.src = src;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Gallery item click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || 'Dokumentasi Proyek';
      const desc = item.getAttribute('data-caption') || 'Dokumentasi pelaksanaan pekerjaan lapangan PT. Manggala Arta Sejahtera.';
      if (img) {
        openModal(img.src, title, desc);
      }
    });
  });

  // Zoom technical drawing asset
  if (btnZoomSpec) {
    btnZoomSpec.addEventListener('click', () => {
      openModal(
        btnZoomSpec.src,
        'Gambar Skematik Dimensi & Isometri Kansteen K-350',
        'Spesifikasi teknis resmi: Kansteen Standar, Standar Inlet, DKI, DKI Inlet, Type S, Type S Inlet dengan metode cetak basah getaran frekuensi tinggi (Mesin Vibrator).'
      );
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems || faqItems.length === 0) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   7. STAT COUNTERS ANIMATION
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 1600; // ms
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
              } else {
                counter.textContent = Math.ceil(current) + '+';
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }
}

/* Helper: Currency & Number Formatter */
function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num);
}

/* ==========================================================================
   8. EVENT TRACKING
   ========================================================================== */
function initEventTracking() {
  // Track WhatsApp Clicks
  const waLinks = document.querySelectorAll('a[href^="https://wa.me"]');
  waLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Event: whatsapp_click', {
        href: link.href,
        text: link.textContent.trim()
      });
    });
  });

  // Track Service View based on pathname (if on a service page)
  const path = window.location.pathname;
  if (path.includes('/pengaspalan')) {
    console.log('Event: service_view', { service: 'pengaspalan' });
  } else if (path.includes('/uditch')) {
    console.log('Event: service_view', { service: 'uditch' });
  } else if (path.includes('/poles-beton')) {
    console.log('Event: service_view', { service: 'poles-beton' });
  }
}

// Initialize tracking when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initEventTracking();
});
