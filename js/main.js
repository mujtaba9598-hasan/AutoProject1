/* ============================================
   AUTO PROJECT GARAGE - Main JS
   Landing Page 1 - Garage Reveal Edition
   ============================================ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

  // ===================== PRELOADER =====================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 2500);
  });
  document.body.style.overflow = 'hidden';

  // ===================== HERO PARTICLES =====================
  const particlesContainer = document.getElementById('hero-particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    if (Math.random() > 0.5) p.style.background = '#FFD700';
    particlesContainer.appendChild(p);
  }

  // ===================== NAVBAR =====================
  const navbar = document.getElementById('navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // ===================== SCROLL PROGRESS (FUEL GAUGE) =====================
  const scrollProgress = document.getElementById('scroll-progress');
  const fuelFill = document.querySelector('.fuel-fill');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    fuelFill.style.height = scrollPercent + '%';
    scrollProgress.classList.toggle('visible', scrollTop > 300);
  });

  // ===================== FLOATING BAR =====================
  const floatingBar = document.getElementById('floating-bar');
  window.addEventListener('scroll', () => {
    floatingBar.classList.toggle('visible', window.scrollY > 500);
  });

  // ===================== GSAP ANIMATIONS =====================
  gsap.registerPlugin(ScrollTrigger);

  // --- GARAGE REVEAL (Door Split) ---
  const doorLeft = document.querySelector('.garage-door-left');
  const doorRight = document.querySelector('.garage-door-right');
  const interiorOverlay = document.querySelector('.interior-overlay');

  if (doorLeft && doorRight) {
    const revealTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#garage-reveal',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    const interiorImg = document.querySelector('.garage-interior img');

    revealTL
      .to(doorLeft, { x: '-100%', duration: 1, ease: 'power2.inOut' }, 0)
      .to(doorRight, { x: '100%', duration: 1, ease: 'power2.inOut' }, 0)
      .to(interiorImg, { scale: 1, duration: 1.2, ease: 'power2.out' }, 0.3)
      .add(() => {
        interiorOverlay.classList.add('visible');
      }, 0.8);
  }

  // --- ABOUT BARS ---
  document.querySelectorAll('.bar-fill').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      onEnter: () => {
        bar.style.width = bar.dataset.width + '%';
      }
    });
  });

  // --- STATS RPM GAUGES ---
  document.querySelectorAll('.rpm-gauge').forEach(gauge => {
    const fill = gauge.querySelector('.gauge-fill');
    const circumference = 339; // 2 * PI * 54

    ScrollTrigger.create({
      trigger: gauge,
      start: 'top 85%',
      onEnter: () => {
        // Animate gauge fill (85% of circumference max)
        const offset = circumference * 0.15; // leave 15% unfilled
        fill.style.strokeDashoffset = offset;
      }
    });
  });

  // --- COUNTER ANIMATION ---
  document.querySelectorAll('.counter').forEach(counter => {
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      },
      once: true
    });
  });

  // --- REVEAL ON SCROLL ---
  document.querySelectorAll('.service-card, .vision-card, .gallery-item, .contact-item, .more-service-item').forEach(el => {
    el.classList.add('reveal-up');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => el.classList.add('revealed'),
    });
  });

  // ===================== SERVICE WHEEL =====================
  const services = [
    {
      title: 'Car Suspension Repair',
      desc: 'Expert suspension repair to improve stability and ensure a smoother ride on every road.',
      img: 'assets/services/service-suspension-repair.jpg',
      wa: 'Car Suspension Repair'
    },
    {
      title: 'Car AC Repair',
      desc: 'Complete AC repair and gas refilling for a cool, comfortable drive year-round.',
      img: 'assets/services/service-ac-repair.webp',
      wa: 'Car AC Repair'
    },
    {
      title: 'Car Oil Change',
      desc: 'Quick oil change and filter replacement to keep your engine healthy and efficient.',
      img: 'assets/services/service-oil-change.jpg',
      wa: 'Car Oil Change'
    },
    {
      title: 'Car Engine Repair',
      desc: 'Professional engine repair and diagnostics for peak vehicle performance.',
      img: 'assets/services/service-engine-repair.jpeg',
      wa: 'Car Engine Repair'
    },
    {
      title: 'Computer Diagnostics',
      desc: 'Advanced computer diagnostics to scan vehicle systems and resolve fault codes.',
      img: 'assets/services/service-general-repair.jpg',
      wa: 'Computer Diagnostics'
    },
    {
      title: 'Transmission & Gearbox',
      desc: 'Reliable transmission and gearbox repair for smooth shifting and better control.',
      img: 'assets/services/service-transmission-repair.webp',
      wa: 'Transmission Repair'
    },
    {
      title: 'Car Electrical Repair',
      desc: 'Expert electrical diagnostics to fix wiring, battery, and electronic issues.',
      img: 'assets/services/service-electrical-repair.webp',
      wa: 'Car Electrical Repair'
    },
    {
      title: 'Shock Absorber Service',
      desc: 'Shock absorber repair and replacement for maximum comfort and road grip.',
      img: 'assets/services/service-shock-absorber.jpeg',
      wa: 'Shock Absorber Service'
    }
  ];

  const wheelItems = document.querySelectorAll('.wheel-item');
  const detailImg = document.getElementById('service-detail-img');
  const detailTitle = document.getElementById('service-detail-title');
  const detailDesc = document.getElementById('service-detail-desc');

  wheelItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.service);
      const service = services[idx];

      wheelItems.forEach(w => w.classList.remove('active'));
      item.classList.add('active');

      detailImg.src = service.img;
      detailImg.alt = service.title;
      detailTitle.textContent = service.title;
      detailDesc.textContent = service.desc;

      const bookBtn = document.querySelector('.service-detail .btn');
      if (bookBtn) {
        bookBtn.href = `https://wa.me/971556449127?text=Hi%2C%20I%20need%20${encodeURIComponent(service.wa)}`;
      }
    });
  });

  // ===================== SYMPTOM CHECKER =====================
  const selectedSymptoms = [];
  const symptomBtns = document.querySelectorAll('.symptom-btn');
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const selectedContainer = document.getElementById('selected-symptoms');
  const recommendedBox = document.getElementById('recommended-service');
  const checkerBack = document.getElementById('checker-back');
  const checkerWA = document.getElementById('checker-whatsapp');

  const symptomServiceMap = {
    'Strange noise while driving': { service: 'Suspension & Shock Absorber Check', desc: 'Noises often indicate worn suspension components, loose parts, or exhaust issues.' },
    'AC not cooling properly': { service: 'AC Repair & Gas Refilling', desc: 'Could be low refrigerant, a faulty compressor, or blocked condenser.' },
    'Car vibrating or shaking': { service: 'Suspension & Wheel Alignment', desc: 'Vibrations may stem from unbalanced wheels, worn shocks, or brake issues.' },
    'Engine overheating': { service: 'Cooling System Repair', desc: 'Check radiator, thermostat, water pump, and coolant levels immediately.' },
    'Brakes feel soft or noisy': { service: 'Brake Pads Replacement', desc: 'Worn pads, low fluid, or warped rotors. Needs immediate attention.' },
    'Oil leak under the car': { service: 'Oil Leak & Gasket Repair', desc: 'Leaks from valve cover, oil pan, or rear main seal need prompt repair.' },
    'Check engine light is on': { service: 'Computer Diagnostics', desc: 'OBD scan to identify fault codes and pinpoint the exact issue.' },
    'Steering feels heavy or loose': { service: 'Steering Rack & Power Steering Repair', desc: 'Could be low fluid, a failing pump, or worn steering components.' },
    "Car won't start": { service: 'Battery & Electrical Diagnostics', desc: 'Test battery, alternator, starter motor, and ignition system.' },
    'Gear shifting problems': { service: 'Transmission & Gearbox Repair', desc: 'Fluid check, solenoid test, or full gearbox inspection needed.' },
    'General service/checkup needed': { service: 'Full Car Service', desc: 'Oil change, filters, fluid top-up, brake check, and multi-point inspection.' },
    'Pre-purchase inspection needed': { service: 'Pre-Purchase Inspection', desc: 'Comprehensive mechanical, electrical, and body check before buying.' }
  };

  symptomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const symptom = btn.dataset.symptom;

      if (btn.classList.contains('selected')) {
        if (selectedSymptoms.indexOf(symptom) === -1) {
          selectedSymptoms.push(symptom);
        }
      } else {
        const idx = selectedSymptoms.indexOf(symptom);
        if (idx > -1) selectedSymptoms.splice(idx, 1);
      }
    });
  });

  // Add a dedicated "Next" button to step 1
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.style.marginTop = '20px';
  nextBtn.innerHTML = 'Get Recommendation <i class="fas fa-arrow-right"></i>';
  nextBtn.addEventListener('click', () => {
    if (selectedSymptoms.length === 0) {
      nextBtn.textContent = 'Please select at least one symptom';
      setTimeout(() => { nextBtn.innerHTML = 'Get Recommendation <i class="fas fa-arrow-right"></i>'; }, 2000);
      return;
    }
    showStep2();
  });
  step1.appendChild(nextBtn);

  function showStep2() {
    step1.classList.remove('active');
    step2.classList.add('active');

    selectedContainer.innerHTML = selectedSymptoms.map(s => `<span>${s}</span>`).join('');

    // Get first symptom's recommendation
    const primary = symptomServiceMap[selectedSymptoms[0]];
    recommendedBox.innerHTML = `<strong>${primary.service}</strong><p>${primary.desc}</p>`;

    // Build WhatsApp message
    const msg = `Hi, I'm contacting from your website.\n\nMy car has the following issues:\n${selectedSymptoms.map(s => '- ' + s).join('\n')}\n\nPlease advise on the next steps.`;
    const waUrl = `https://wa.me/971556449127?text=${encodeURIComponent(msg)}`;
    checkerWA.href = waUrl;

    // Also add click handler as fallback
    checkerWA.onclick = function(e) {
      e.preventDefault();
      window.open(waUrl, '_blank');
    };
  }

  checkerBack.addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');
  });

  // ===================== LIGHTBOX =====================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item img');
  let currentLightboxIndex = 0;
  const gallerySrcs = Array.from(galleryItems).map(img => img.src);

  galleryItems.forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      currentLightboxIndex = i;
      lightboxImg.src = gallerySrcs[i];
      lightbox.classList.add('active');
    });
  });

  document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + gallerySrcs.length) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[currentLightboxIndex];
  });

  document.querySelector('.lightbox-next').addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[currentLightboxIndex];
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev').click();
    if (e.key === 'ArrowRight') document.querySelector('.lightbox-next').click();
  });

  // ===================== SMOOTH SCROLL FOR ANCHOR LINKS =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
