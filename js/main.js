/**
 * PT Manggala Artajaya Sejahtera - Modern Interactive JavaScript
 * Handcrafted for optimal performance, responsiveness, and lead conversion.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPhotoSlots();
  initNavbar();
  initCalculator();
  initTechnicalSpecsTabs();
  initGalleryFilter();
  initModalLightbox();
  initFaqAccordion();
  initCounters();
  initFloatingWa();
  initCatalogFilter();
  initHeroSlides();
});

/* ==========================================================================
   HERO BERANDA: LATAR FOTO BERGANTIAN
   Ganti slide tiap 6 detik; berhenti saat tab tidak aktif atau
   pengguna memilih reduced motion.
   ========================================================================== */
function initHeroSlides() {
  const slides = document.querySelectorAll('.gx-hero-slide');
  if (slides.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let current = 0;
  let timer = null;
  const next = () => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  };
  const start = () => { if (!timer) timer = setInterval(next, 6000); };
  const stop = () => { clearInterval(timer); timer = null; };

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}

/* ==========================================================================
   KATALOG PRODUK: FILTER MEREK & MUTU
   Kartu: [data-brand] [data-grade]; tombol: [data-filter-brand] / [data-filter-grade].
   Link dengan hash kartu (mis. #javacrete-k300) tetap bisa langsung dibuka.
   ========================================================================== */
function initCatalogFilter() {
  const grid = document.querySelector('[data-catalog-grid]');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.grade-card')];
  const empty = document.querySelector('[data-catalog-empty]');
  const count = document.querySelector('[data-catalog-count]');
  const state = { brand: 'all', grade: 'all' };

  const apply = () => {
    let shown = 0;
    cards.forEach(card => {
      const ok = (state.brand === 'all' || card.dataset.brand === state.brand) &&
                 (state.grade === 'all' || card.dataset.grade === state.grade);
      card.hidden = !ok;
      if (ok) shown++;
    });
    document.querySelectorAll('.filter-chip[data-filter-brand]').forEach(b =>
      b.classList.toggle('is-active', b.dataset.filterBrand === state.brand));
    document.querySelectorAll('.filter-chip[data-filter-grade]').forEach(b =>
      b.classList.toggle('is-active', b.dataset.filterGrade === state.grade));
    document.querySelectorAll('.brand-card[data-filter-brand]').forEach(b =>
      b.classList.toggle('is-active', b.dataset.filterBrand === state.brand));
    if (empty) empty.hidden = shown !== 0;
    if (count) count.textContent = `Menampilkan ${shown} dari ${cards.length} produk`;
  };

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter-brand], [data-filter-grade]');
    if (!btn) return;
    if (btn.dataset.filterBrand) {
      // Klik kartu merek yang sedang aktif = kembali ke semua merek
      const next = btn.dataset.filterBrand;
      state.brand = btn.classList.contains('brand-card') && state.brand === next ? 'all' : next;
      if (btn.classList.contains('brand-card')) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (btn.dataset.filterGrade) state.grade = btn.dataset.filterGrade;
    apply();
  });

  apply();
}

/* ==========================================================================
   0. SLOT FOTO (PLACEHOLDER FOTO ASLI)
   Setiap .photo-slot punya data-photo-src. Jika file foto tersebut sudah ada
   di assets/images, slot otomatis diganti foto; jika belum, slot tetap tampil.
   ========================================================================== */
function initPhotoSlots() {
  // Gambar uji tidak menempel di halaman, jadi loading="lazy" membuatnya tidak
  // pernah dimuat. Sebagai gantinya, muat saat slot mendekati layar.
  const load = slot => {
    const img = new Image();
    img.alt = slot.dataset.photoAlt || '';
    img.decoding = 'async';
    img.onload = () => slot.replaceWith(img);
    img.src = slot.dataset.photoSrc;
  };

  const slots = document.querySelectorAll('.photo-slot[data-photo-src]');
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          load(entry.target);
        });
      }, { rootMargin: '400px 0px' })
    : null;

  slots.forEach(slot => {
    if (slot.dataset.photoEager || !observer) load(slot);
    else observer.observe(slot);
  });
}

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

    // Close menu when clicking normal nav links (exclude dropdown toggle)
    navLinks.forEach(link => {
      if (link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
        });
      } else {
        link.addEventListener('click', closeDrawer);
      }
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
          const href = link.getAttribute('href') || '';
          // Hanya link anchor di halaman ini; status aktif halaman (Beranda / Jasa Kami) dibiarkan
          if (!href.startsWith('#') || href === '#') return;
          link.classList.toggle('active', href === `#${sectionId}`);
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
  const thicknessGroup = document.getElementById('calcThicknessGroup');
  const thicknessInput = document.getElementById('calcThickness');

  const labelVolume = document.getElementById('labelVolume');
  const unitIndicator = document.getElementById('unitIndicator');

  const summaryServiceName = document.getElementById('summaryServiceName');
  const summaryPackageName = document.getElementById('summaryPackageName');
  const summaryVolume = document.getElementById('summaryVolume');
  const summaryUnitPrice = document.getElementById('summaryUnitPrice');
  const totalPriceOutput = document.getElementById('totalPriceOutput');
  const totalRangeOutput = document.getElementById('totalRangeOutput');
  const btnSendWA = document.getElementById('btnSendWAEstimate');

  // Service options and pricing database
  const pricingData = {
    aspal: {
      name: "Pengaspalan Hotmix",
      unit: "m²",
      priceUnit: "m² / cm",     // harga per m² per cm tebal
      defaultThickness: 7,      // asumsi tebal tebar (cm), bisa diubah pelanggan
      min: 30,
      max: 3000,
      step: 10,
      defaultVal: 150,
      packages: [
        { id: "aspal-terpasang", name: "Jasa Pengaspalan Terpasang", price: 125000 }
      ]
    },
    uditch: {
      name: "Pemasangan U-Ditch Precast",
      unit: "m'",
      priceUnit: "buah",   // harga per buah U-Ditch
      pieceLength: 1.2,    // 1 buah = 120 cm
      min: 10,
      max: 500,
      step: 2,
      defaultVal: 50,
      packages: [
        { id: "uditch-30", name: "Pasang U-Ditch 30 x 30 x 120 cm (Mutu K-350)", price: 250000 },
        { id: "uditch-40", name: "Pasang U-Ditch 40 x 40 x 120 cm (Mutu K-350)", price: 275000 },
        { id: "uditch-50", name: "Pasang U-Ditch 50 x 50 x 120 cm (Mutu K-350)", price: 300000 },
        { id: "uditch-60", name: "Pasang U-Ditch 60 x 60 x 120 cm (Mutu K-350)", price: 375000 },
        { id: "uditch-80", name: "Pasang U-Ditch 80 x 80 x 120 cm (Mutu K-350)", price: 400000 },
        { id: "uditch-100", name: "Pasang U-Ditch 100 x 100 x 120 cm (Mutu K-350)", price: 500000 },
      ]
    },
    poles: {
      name: "Poles Beton",
      unit: "m²",
      min: 50,
      max: 5000,
      step: 25,
      defaultVal: 200,
      packages: [
        { id: "poles-terpasang", name: "Jasa Poles Beton Terpasang", price: 160000 }
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

    // Input tebal hanya untuk layanan yang harganya dihitung per cm tebal (pengaspalan)
    if (thicknessGroup) {
      thicknessGroup.style.display = serviceInfo.defaultThickness ? '' : 'none';
      if (serviceInfo.defaultThickness) thicknessInput.value = serviceInfo.defaultThickness;
    }

    // Populate packages
    packageSelect.innerHTML = '';
    serviceInfo.packages.forEach(pkg => {
      const option = document.createElement('option');
      option.value = pkg.id;
      option.textContent = `${pkg.name} - Rp ${formatNumber(pkg.price)} / ${serviceInfo.priceUnit || serviceInfo.unit}`;
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

    const priceUnit = serviceInfo.priceUnit || serviceInfo.unit;
    let quantity = volume;
    let volumeText = `${formatNumber(volume)} ${serviceInfo.unit}`;

    if (serviceInfo.pieceLength) {
      // Harga per buah (mis. U-Ditch): konversi meter ke jumlah buah
      quantity = Math.ceil(volume / serviceInfo.pieceLength);
      volumeText = `${formatNumber(volume)} ${serviceInfo.unit} (≈ ${formatNumber(quantity)} ${priceUnit})`;
    } else if (serviceInfo.defaultThickness && thicknessInput) {
      // Harga per m² per cm (pengaspalan): harga × tebal (cm) × luas (m²)
      const thickness = parseFloat(thicknessInput.value) || 0;
      quantity = volume * thickness;
      volumeText = `${formatNumber(volume)} ${serviceInfo.unit} × tebal ${formatNumber(thickness)} cm`;
    }

    const basePrice = unitPrice * quantity;
    const maxPrice = basePrice * 1.25;

    // Update UI elements
    unitIndicator.textContent = `${formatNumber(volume)} ${serviceInfo.unit}`;
    summaryServiceName.textContent = serviceInfo.name;
    summaryPackageName.textContent = selectedPackageOption.textContent.split(' - ')[0];
    summaryVolume.textContent = volumeText;
    summaryUnitPrice.textContent = `Rp ${formatNumber(unitPrice)} / ${priceUnit}`;
    totalPriceOutput.textContent = `Rp ${formatNumber(basePrice)}`;
    if (totalRangeOutput) {
      totalRangeOutput.textContent = `Bisa sampai Rp ${formatNumber(maxPrice)} tergantung kondisi lapangan`;
    }

    // Build formatted WhatsApp message
    const waText =
      `Halo Admin PT Manggala Artajaya Sejahtera, saya ingin konsultasi dan meminta penawaran resmi untuk estimasi proyek berikut:

- Kategori: ${serviceInfo.name}
- Spesifikasi: ${selectedPackageOption.textContent.split(' - ')[0]}
- Estimasi Volume: ${volumeText}
- Estimasi Biaya: Rp ${formatNumber(basePrice)} - Rp ${formatNumber(maxPrice)}

Mohon informasi ketersediaan jadwal survey lokasi gratis dan rincian penawaran resminya. Terima kasih!`;

    const waEncoded = encodeURIComponent(waText);
    btnSendWA.href = `https://wa.me/6282260840642?text=${waEncoded}`;
  }

  // Event Listeners for Calculator
  serviceSelect.addEventListener('change', updatePackageDropdown);
  packageSelect.addEventListener('change', calculateTotal);
  if (thicknessInput) thicknessInput.addEventListener('input', calculateTotal);

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
      const desc = item.getAttribute('data-caption') || 'Dokumentasi pelaksanaan pekerjaan lapangan PT Manggala Artajaya Sejahtera.';
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

/* ==========================================================================
   9. PERSISTENT FLOATING WHATSAPP BUTTON HANDLER
   ========================================================================== */
function initFloatingWa() {
  const waWrapper = document.querySelector('.floating-wa-wrapper');
  if (!waWrapper) return;

  // Guarantee wrapper is directly a child of <body> to avoid overflow/transform stacking traps
  if (waWrapper.parentElement !== document.body) {
    document.body.appendChild(waWrapper);
  }
}
