
/* ============================================
   BrainDock — Main JavaScript
   Handles navigation, animations, and interactivity
   ============================================ */

(function () {
  'use strict';

  // ========== FOOTER YEAR ==========
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========== HEADER SCROLL EFFECT ==========
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ========== DESKTOP DROPDOWN MENUS ==========
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  let activeDropdown = null;
  let dropdownTimeout = null;

  navItems.forEach((item) => {
    const trigger = item.querySelector('.nav-link');

    item.addEventListener('mouseenter', () => {
      clearTimeout(dropdownTimeout);
      if (activeDropdown && activeDropdown !== item) {
        activeDropdown.classList.remove('active');
        const prevTrigger = activeDropdown.querySelector('.nav-link');
        if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');
      }
      item.classList.add('active');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      activeDropdown = item;
    });

    item.addEventListener('mouseleave', () => {
      dropdownTimeout = setTimeout(() => {
        item.classList.remove('active');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        if (activeDropdown === item) activeDropdown = null;
      }, 150);
    });

    // Click toggle for touch devices
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        // Close all
        navItems.forEach((ni) => {
          ni.classList.remove('active');
          const t = ni.querySelector('.nav-link');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          activeDropdown = item;
        } else {
          activeDropdown = null;
        }
      });
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      navItems.forEach((item) => {
        item.classList.remove('active');
        const trigger = item.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
      activeDropdown = null;
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navItems.forEach((item) => {
        item.classList.remove('active');
        const trigger = item.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
      activeDropdown = null;

      // Also close mobile menu
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileToggle = document.getElementById('mobileToggle');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // ========== MOBILE MENU ==========
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('open');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Mobile dropdown accordion
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item.has-dropdown');
  mobileNavItems.forEach((item) => {
    const trigger = item.querySelector('.mobile-nav-link');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        mobileNavItems.forEach((ni) => ni.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Close mobile menu on link click
  const mobileLinks = mobileMenu
    ? mobileMenu.querySelectorAll('a:not(.mobile-nav-link)')
    : [];
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      if (mobileToggle) mobileToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Close mobile menu
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          if (mobileToggle) mobileToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // ========== SCROLL REVEAL ANIMATIONS ==========
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ========== FAQ ACCORDION ==========
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        faqItems.forEach((fi) => {
          fi.classList.remove('active');
          const fa = fi.querySelector('.faq-answer');
          if (fa) fa.style.maxHeight = null;
        });

        // Open clicked (if it was closed)
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ========== PRICING TOGGLE ==========
  const pricingToggle = document.querySelectorAll('.pricing-toggle-option');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const annualPrices = document.querySelectorAll('.price-annual');

  pricingToggle.forEach((option) => {
    option.addEventListener('click', () => {
      pricingToggle.forEach((o) => o.classList.remove('active'));
      option.classList.add('active');

      const isAnnual = option.dataset.period === 'annual';

      monthlyPrices.forEach((el) => {
        el.style.display = isAnnual ? 'none' : 'block';
      });
      annualPrices.forEach((el) => {
        el.style.display = isAnnual ? 'block' : 'none';
      });
    });
  });

  // ========== SAVINGS CALCULATOR ==========
  const hoursSlider = document.getElementById('hoursSlider');
  const hoursValue = document.getElementById('hoursValue');
  const rateInput = document.getElementById('rateInput');

  function updateSavings() {
    if (!hoursSlider || !rateInput) return;

    const hours = parseFloat(hoursSlider.value) || 4;
    const rate = parseFloat(rateInput.value) || 50;

    if (hoursValue) hoursValue.textContent = hours;

    // Update slider fill percentage
    const pct = ((hours - 1) / (12 - 1)) * 100;
    hoursSlider.style.setProperty('--slider-pct', pct + '%');

    // Without BrainDock: 60% focus rate → 40% of study time is wasted
    // With BrainDock: 100% focus → you reclaim that 40%
    const studyHoursMonth = hours * 22; // work/study days per month
    const wastedHours = parseFloat((studyHoursMonth * 0.4).toFixed(1)); // 40% unfocused
    const valueSaved = Math.round(wastedHours * rate);
    const proCost = 12;
    const netSavings = valueSaved - proCost;

    const resultEls = {
      studyHours: document.getElementById('calcStudyHours'),
      wastedHours: document.getElementById('calcWastedHours'),
      valueSaved: document.getElementById('calcValueSaved'),
      proCost: document.getElementById('calcProCost'),
      netSavings: document.getElementById('calcNetSavings'),
    };

    if (resultEls.studyHours) resultEls.studyHours.textContent = studyHoursMonth;
    if (resultEls.wastedHours) resultEls.wastedHours.textContent = wastedHours;
    if (resultEls.valueSaved) resultEls.valueSaved.textContent = '$' + valueSaved.toLocaleString();
    if (resultEls.proCost) resultEls.proCost.textContent = '$' + proCost;
    if (resultEls.netSavings) resultEls.netSavings.textContent = '$' + netSavings.toLocaleString() + '/mo';
  }

  if (hoursSlider) {
    hoursSlider.addEventListener('input', updateSavings);
  }
  if (rateInput) {
    rateInput.addEventListener('input', updateSavings);
  }
  // Initial calculation
  updateSavings();

  // ========== TABS ==========
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach((container) => {
    const tabs = container.querySelectorAll('.tab');
    const tabId = container.dataset.tabs;
    const contents = document.querySelectorAll(`[data-tab-content="${tabId}"] .tab-content`);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;

        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach((c) => {
          c.classList.remove('active');
          if (c.dataset.tab === target) {
            c.classList.add('active');
          }
        });
      });
    });
  });

  // ========== USE CASE TABS ==========
  const useCaseTabs = document.querySelectorAll('.use-case-tab');
  const useCaseGroups = document.querySelectorAll('.use-case-group');

  useCaseTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.category;

      useCaseTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      useCaseGroups.forEach((group) => {
        if (target === 'all' || group.dataset.category === target) {
          group.style.display = '';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // ========== DOWNLOAD BUTTONS (display only) ==========
  document.querySelectorAll('[data-download]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Placeholder: could open download modal or redirect
    });
  });

  // ========== TESTIMONIAL SEAMLESS SCROLL ==========
  const testimonialTrack = document.querySelector('.testimonials-track');
  if (testimonialTrack) {
    const firstSlide = testimonialTrack.querySelector('.testimonials-slide');
    if (firstSlide) {
      // Measure actual pixel width of one slide for a seamless loop
      const slideWidth = firstSlide.offsetWidth;

      // Inject keyframe with exact pixel distance (avoids CSS % miscalculation)
      const scrollStyle = document.createElement('style');
      scrollStyle.textContent = `
        @keyframes testimonials-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${slideWidth}px); }
        }
      `;
      document.head.appendChild(scrollStyle);

      // Apply smooth, infinite animation
      testimonialTrack.style.animation = 'testimonials-scroll 40s linear infinite';

      // Pause on hover so users can read
      testimonialTrack.addEventListener('mouseenter', () => {
        testimonialTrack.style.animationPlayState = 'paused';
      });
      testimonialTrack.addEventListener('mouseleave', () => {
        testimonialTrack.style.animationPlayState = 'running';
      });
    }
  }

  // ========== MADE FOR YOU — PILL SWITCHER ==========
  const mfyPills = document.querySelectorAll('.mfy-pill');
  const mfyPanels = document.querySelectorAll('.mfy-panel');

  if (mfyPills.length) {
    mfyPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const target = pill.getAttribute('data-mfy');

        // Update active pill
        mfyPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        // Update active panel
        mfyPanels.forEach((panel) => {
          if (panel.getAttribute('data-mfy-panel') === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Placeholder
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Sent! We\'ll be in touch.';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }

  // ========== TEAM SAVINGS CALCULATOR ==========
  const teamSlider = document.getElementById('teamSlider');
  const teamHoursSlider = document.getElementById('teamHoursSlider');
  const teamCount = document.getElementById('teamCount');
  const teamHoursValue = document.getElementById('teamHoursValue');
  const teamRate = document.getElementById('teamRate');

  function updateTeamSavings() {
    if (!teamSlider || !teamRate || !teamHoursSlider) return;

    const members = parseInt(teamSlider.value) || 10;
    const hours = parseInt(teamHoursSlider.value) || 4;
    const rate = parseFloat(teamRate.value) || 75;

    if (teamCount) teamCount.textContent = members;
    if (teamHoursValue) teamHoursValue.textContent = hours;

    // Update slider fill percentages
    const teamPct = ((members - 2) / (200 - 2)) * 100;
    teamSlider.style.setProperty('--slider-pct', teamPct + '%');
    const hoursPct = ((hours - 1) / (12 - 1)) * 100;
    teamHoursSlider.style.setProperty('--slider-pct', hoursPct + '%');

    // 60% focus → 40% wasted, per person per day × 22 workdays × team size
    const teamStudyHoursMonth = hours * 22 * members;
    const wastedHours = parseFloat((teamStudyHoursMonth * 0.4).toFixed(1));
    const valueSaved = Math.round(wastedHours * rate);
    const teamCostTotal = members * 12;
    const netSavings = valueSaved - teamCostTotal;

    const els = {
      studyHours: document.getElementById('teamStudyHours'),
      wastedHours: document.getElementById('teamWastedHours'),
      valueSaved: document.getElementById('teamValueSaved'),
      cost: document.getElementById('teamCost'),
      net: document.getElementById('teamNetSavings'),
    };

    if (els.studyHours) els.studyHours.textContent = teamStudyHoursMonth.toLocaleString();
    if (els.wastedHours) els.wastedHours.textContent = wastedHours;
    if (els.valueSaved) els.valueSaved.textContent = '$' + valueSaved.toLocaleString();
    if (els.cost) els.cost.textContent = '$' + teamCostTotal.toLocaleString();
    if (els.net) els.net.textContent = '$' + netSavings.toLocaleString() + '/mo';
  }

  if (teamSlider) {
    teamSlider.addEventListener('input', updateTeamSavings);
  }
  if (teamHoursSlider) {
    teamHoursSlider.addEventListener('input', updateTeamSavings);
  }
  if (teamRate) {
    teamRate.addEventListener('input', updateTeamSavings);
  }
  updateTeamSavings();

  // ========== PERFORMANCE REPORTS — CHART DRAW + STAT COUNTERS ==========
  const prChart = document.getElementById('prChart');
  const prStats = document.getElementById('prStats');

  if (prChart && 'IntersectionObserver' in window) {
    let prAnimated = false;

    const prObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !prAnimated) {
            prAnimated = true;

            // Trigger the SVG line drawing
            prChart.classList.add('animated');

            // Animate stat counters
            if (prStats) {
              const counters = prStats.querySelectorAll('.pr-stat-num');
              counters.forEach(function (counter) {
                animateCounter(counter);
              });
            }

            prObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    prObserver.observe(prChart);
  }

  /**
   * Animates a number element from 0 to its data-count value.
   * Supports integers and decimals via data-decimals attribute.
   */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      el.textContent = current.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(step);
  }

  // ========== HOW BRAINDOCK HELPS — TYPING ANIMATION ==========
  const hbhTextEl = document.getElementById('hbhTypedText');
  const hbhCursor = document.getElementById('hbhCursor');
  const hbhPopup = document.getElementById('hbhCompletePopup');

  if (hbhTextEl) {
    const hbhFullText =
      'I met the lawyer in a quiet office, discussing contracts, deadlines, and risks. ' +
      'Papers rustled, coffee cooled, and advice flowed calmly, leaving me relieved, ' +
      'informed, and cautiously optimistic about next steps after a long morning.';

    let hbhStarted = false;

    /**
     * Types text one character at a time with human-like variable speed.
     * Pauses longer on punctuation for a natural rhythm.
     */
    function runTypingAnimation() {
      let i = 0;

      function typeChar() {
        if (i >= hbhFullText.length) {
          // Typing done — hide cursor, show popup after 3s
          if (hbhCursor) hbhCursor.classList.add('hidden');
          setTimeout(function () {
            if (hbhPopup) hbhPopup.classList.add('visible');
          }, 3000);
          return;
        }

        hbhTextEl.textContent += hbhFullText[i];
        i++;

        // Variable delay for realistic typing feel
        var char = hbhFullText[i - 1];
        var delay;
        if (char === '.' || char === '!') {
          delay = 280 + Math.random() * 120; // longer pause at sentences
        } else if (char === ',') {
          delay = 140 + Math.random() * 80; // medium pause at commas
        } else if (char === ' ') {
          delay = 50 + Math.random() * 50; // quick on spaces
        } else {
          delay = 40 + Math.random() * 70; // base typing speed
        }

        setTimeout(typeChar, delay);
      }

      typeChar();
    }

    // Trigger when section scrolls into view (plays only once)
    var hbhSection = document.querySelector('.hbh-section');
    if (hbhSection && 'IntersectionObserver' in window) {
      var hbhObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !hbhStarted) {
              hbhStarted = true;
              runTypingAnimation();
              hbhObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      hbhObserver.observe(hbhSection);
    } else if (hbhSection) {
      // Fallback: just run immediately
      runTypingAnimation();
    }
  }

  // ========== BINARY TEXT BANNER ==========
  // Renders "BrainDock" formed by dense 0s and 1s with a Matrix-rain
  // reveal and continuous character scrambling. Inspired by Wispr Flow.

  function initBinaryBanner() {
    var canvas = document.getElementById('binaryCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dense grid — compact chars for high-res binary texture
    var FONT_SIZE = 9;
    var CELL_W = 6;
    var CELL_H = 10;

    var W, H, cols, rows, mask, dripMask, centerWeight, grid, rainY, settled, animId;

    /** Set canvas dimensions and rebuild everything. */
    function setup() {
      W = canvas.parentElement.clientWidth;
      H = Math.max(220, Math.min(380, W * 0.3));

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(W / CELL_W);
      rows = Math.ceil(H / CELL_H);

      buildMask();
      initGrid();
    }

    /** Render "BrainDock" at full canvas resolution, sample at each grid cell. */
    function buildMask() {
      // Render text at the FULL canvas pixel resolution for crisp sampling
      var off = document.createElement('canvas');
      off.width = Math.ceil(W * dpr);
      off.height = Math.ceil(H * dpr);
      var oc = off.getContext('2d');
      oc.scale(dpr, dpr);

      // Large bold text covering ~65% of banner height
      var fontSize = H * 0.65;
      oc.font = '800 ' + fontSize + 'px "Inter", sans-serif';
      oc.textAlign = 'center';
      oc.textBaseline = 'middle';
      // Stroke for extra thickness
      oc.lineWidth = fontSize * 0.04;
      oc.strokeStyle = '#000';
      oc.strokeText('BrainDock', W / 2, H / 2);
      oc.fillStyle = '#000';
      oc.fillText('BrainDock', W / 2, H / 2);

      var data = oc.getImageData(0, 0, off.width, off.height).data;

      // Sample the pixel at the center of each grid cell
      mask = [];
      for (var r = 0; r < rows; r++) {
        mask[r] = [];
        for (var c = 0; c < cols; c++) {
          var cx = Math.floor((c * CELL_W + CELL_W / 2) * dpr);
          var cy = Math.floor((r * CELL_H + CELL_H / 2) * dpr);
          if (cx >= off.width) cx = off.width - 1;
          if (cy >= off.height) cy = off.height - 1;
          var idx = (cy * off.width + cx) * 4;
          mask[r][c] = data[idx + 3] > 25;
        }
      }

      // Drip mask: vertical bleed above and below text for rain/drip halo
      dripMask = [];
      for (var r2 = 0; r2 < rows; r2++) {
        dripMask[r2] = [];
        for (var c2 = 0; c2 < cols; c2++) {
          if (mask[r2][c2]) {
            dripMask[r2][c2] = 0;
            continue;
          }
          var nearest = 99;
          for (var dr = -10; dr <= 10; dr++) {
            var rr = r2 + dr;
            if (rr >= 0 && rr < rows && mask[rr][c2]) {
              nearest = Math.min(nearest, Math.abs(dr));
            }
          }
          dripMask[r2][c2] = nearest < 99 ? Math.max(0, 0.45 - nearest * 0.04) : 0;
        }
      }

      // Center-weight map: elliptical Gaussian falloff for background noise density
      var halfW = W / 2;
      var halfH = H / 2;
      centerWeight = [];
      for (var r3 = 0; r3 < rows; r3++) {
        centerWeight[r3] = [];
        for (var c3 = 0; c3 < cols; c3++) {
          var dx = (c3 * CELL_W + CELL_W / 2 - halfW) / halfW; // -1 to 1
          var dy = (r3 * CELL_H + CELL_H / 2 - halfH) / halfH; // -1 to 1
          var d2 = dx * dx + dy * dy; // squared elliptical distance
          centerWeight[r3][c3] = Math.exp(-d2 * 2.5); // Gaussian falloff
        }
      }
    }

    /** Fill grid with random binary chars and stagger rain start positions. */
    function initGrid() {
      grid = [];
      rainY = [];
      settled = false;

      for (var r = 0; r < rows; r++) {
        grid[r] = [];
        for (var c = 0; c < cols; c++) {
          grid[r][c] = Math.random() > 0.5 ? '1' : '0';
        }
      }
      for (var c = 0; c < cols; c++) {
        rainY[c] = -(Math.random() * rows * 1.5);
      }
    }

    var frame = 0;

    /** Main render loop. */
    function draw() {
      frame++;

      ctx.fillStyle = '#F8F2E6';
      ctx.fillRect(0, 0, W, H);

      ctx.font = FONT_SIZE + 'px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Advance rain
      if (!settled) {
        var allDone = true;
        for (var c = 0; c < cols; c++) {
          rainY[c] += 0.5 + Math.random() * 0.3;
          if (rainY[c] < rows + 5) allDone = false;
        }
        if (allDone) settled = true;
      }

      // Draw every cell
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var isText = mask[r][c];
          var drip = dripMask[r][c];
          var rainPos = rainY[c];
          var visible = r <= rainPos;

          if (!visible) continue;

          // Scramble characters
          if (!isText && frame % 3 === 0 && Math.random() > 0.95) {
            grid[r][c] = Math.random() > 0.5 ? '1' : '0';
          }
          if (isText && frame % 5 === 0 && Math.random() > 0.92) {
            grid[r][c] = Math.random() > 0.5 ? '1' : '0';
          }

          // Determine opacity
          var dist = rainPos - r;
          var alpha;

          if (isText) {
            // Solid black text characters
            alpha = settled ? 1.0 : Math.min(1.0, dist / 2.5);
          } else if (drip > 0) {
            // Medium-visible drip chars near the text
            alpha = settled ? drip : Math.min(drip, dist / 6);
          } else {
            // Background noise with center-focused density
            var cw = centerWeight[r][c];
            if (cw < 0.02) continue; // skip near-empty edges
            var baseAlpha = 0.14 * cw;
            alpha = settled ? baseAlpha : Math.min(baseAlpha, dist / 30);
          }

          if (alpha < 0.01) continue; // skip invisible

          ctx.fillStyle = 'rgba(26,26,26,' + alpha.toFixed(3) + ')';
          ctx.fillText(grid[r][c], c * CELL_W + CELL_W / 2, r * CELL_H + CELL_H / 2);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    // Pause when scrolled out of viewport for performance
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis && !animId && !reducedMotion) draw();
        if (!vis && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }, { threshold: 0 });
      observer.observe(canvas);
    }

    // --- Init ---
    setup();

    if (reducedMotion) {
      settled = true;
      for (var c = 0; c < cols; c++) rainY[c] = rows + 10;
      draw();
      cancelAnimationFrame(animId);
      animId = null;
    } else {
      draw();
    }

    // Debounced resize handler
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (animId) cancelAnimationFrame(animId);
        animId = null;
        frame = 0;
        setup();
        if (reducedMotion) {
          settled = true;
          for (var c2 = 0; c2 < cols; c2++) rainY[c2] = rows + 10;
          draw();
          cancelAnimationFrame(animId);
          animId = null;
        } else {
          draw();
        }
      }, 250);
    });
  }

  // Run binary banner after fonts are loaded (mask needs Inter)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initBinaryBanner);
  } else {
    window.addEventListener('load', initBinaryBanner);
  }

  // ========== MacBook Neo — MULTI-SCENE 3D LAPTOP SCROLL ANIMATION ==========
  var SCENE_COUNT = 4;
  var LID_CLOSED = -91;
  var LID_OPEN   = -13;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Glow colours per scene (R,G,B) — avoids reading computed styles in scroll loop
  var GLOW_COLORS = ['180,200,60', '230,180,195', '140,160,220', '200,200,210'];

  /**
   * Custom hinge easing — cubic-bezier(0.25, 0.1, 0.1, 1.0) approximation.
   * Decelerates sharply at the end for a mechanical lid-resistance feel.
   */
  function hingeEase(t) {
    // Attempt to approximate cubic-bezier(0.25, 0.1, 0.1, 1.0)
    // This gives a fast start that decelerates sharply near the end
    return 1 - Math.pow(1 - t, 3.2);
  }

  if (!prefersReducedMotion) {
    window.addEventListener('scroll', function () {
      for (var i = 0; i < SCENE_COUNT; i++) {
        var scene  = document.getElementById('scene-' + i);
        var lid    = document.getElementById('lid-' + i);
        var wrap   = document.getElementById('laptop-' + i);
        var text   = document.getElementById('text-' + i);

        if (!scene || !lid || !wrap) continue;

        var inner     = wrap.querySelector('.laptop-3d');
        var baseInner = wrap.querySelector('.laptop-base-inner');
        var rect      = scene.getBoundingClientRect();
        var total     = scene.offsetHeight - window.innerHeight;

        if (total <= 0) continue;

        // Check if scene is in or near viewport
        var inView = rect.top < window.innerHeight * 1.15 && rect.bottom > -50;
        if (!inView) {
          wrap.classList.remove('visible');
          wrap.style.opacity = 0;
          continue;
        }

        var raw = Math.max(0, Math.min(1, -rect.top / total));

        // Phase 1: Fade + rise in (0% → 15%)
        // Laptop starts at 15% opacity (partially visible before scroll starts)
        var appearP = Math.min(raw / 0.15, 1);
        var opacity = Math.max(0.15, appearP);
        wrap.classList.add('visible');
        wrap.style.opacity = opacity;

        // Phase 2: Lid opens (15% → 70%, stretched for deliberate feel)
        var rawOpen = Math.max(0, Math.min((raw - 0.15) / 0.55, 1));
        var openP = hingeEase(rawOpen);

        // Bounce/settle: 2° overshoot past fully open, then ease back
        var bounce = 0;
        if (rawOpen > 0.85 && rawOpen < 1.0) {
          bounce = Math.sin(((rawOpen - 0.85) / 0.15) * Math.PI) * 2;
        }

        var baseAngle = LID_CLOSED + openP * (LID_OPEN - LID_CLOSED);
        lid.style.transform = 'rotateX(' + (baseAngle + bounce) + 'deg)';

        // Combine rise-in + base parallax (lid weight shifts base down 5px)
        if (inner) {
          var riseOffset = (1 - appearP) * 40;
          var baseShift = openP * 5;
          inner.style.transform = 'translateY(' + (riseOffset + baseShift) + 'px)';
        }

        // Dynamic shadow + ambient screen glow on base
        if (baseInner) {
          var sY = Math.round(15 + openP * 25);
          var sBlur = Math.round(40 + openP * 60);
          var sOp = (0.25 + openP * 0.10).toFixed(2);
          // Ambient glow: screen light cast down onto keyboard area
          var glowOp = (openP * 0.15).toFixed(3);
          var gc = GLOW_COLORS[i] || '200,200,210';
          baseInner.style.boxShadow =
            '0 ' + sY + 'px ' + sBlur + 'px rgba(0,0,0,' + sOp + '),' +
            '0 6px 12px rgba(0,0,0,0.12),' +
            '0 1px 2px rgba(0,0,0,0.10),' +
            'inset 0 3px 8px rgba(0,0,0,0.06),' +
            'inset 0 4px 14px rgba(' + gc + ',' + glowOp + ')';
        }

        // Phase 3: Text appears (30% → 55%)
        if (text) {
          var textP = Math.max(0, Math.min((raw - 0.30) / 0.25, 1));
          if (textP > 0.1) {
            text.classList.add('visible');
          } else {
            text.classList.remove('visible');
          }
        }
      }
    }, { passive: true });
  } else {
    // Reduced motion: show everything open
    for (var i = 0; i < SCENE_COUNT; i++) {
      var wrap = document.getElementById('laptop-' + i);
      var text = document.getElementById('text-' + i);
      var lid  = document.getElementById('lid-' + i);
      if (wrap) { wrap.classList.add('visible'); wrap.style.opacity = 1; }
      if (text) text.classList.add('visible');
      if (lid)  lid.style.transform = 'rotateX(' + LID_OPEN + 'deg)';
    }
  }

})();
