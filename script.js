
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

    var W, H, cols, rows, mask, dripMask, grid, rainY, settled, animId;

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
            // Visible background noise field
            alpha = settled ? 0.14 : Math.min(0.14, dist / 30);
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

  // ========== APP SHOWCASE PHONE DEMO ==========
  (function initPhoneDemo() {
    const showcase = document.getElementById('app-showcase');
    const phoneScreen = document.getElementById('phoneScreen');
    if (!showcase || !phoneScreen) return;

    // All screen elements in order
    const screens = {
      wa1: document.getElementById('screen-wa1'),
      google1: document.getElementById('screen-google1'),
      youtube: document.getElementById('screen-youtube'),
      notification: document.getElementById('screen-notification'),
      google2: document.getElementById('screen-google2'),
      wa2: document.getElementById('screen-wa2')
    };

    let animationRunning = false;
    let timeouts = [];

    /** Clear all pending timeouts */
    function clearAllTimeouts() {
      timeouts.forEach(clearTimeout);
      timeouts = [];
    }

    /** Schedule a timeout and track it for cleanup */
    function schedule(fn, delay) {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
      return id;
    }

    /** Show a specific screen, hide others */
    function showScreen(screenKey) {
      Object.entries(screens).forEach(([key, el]) => {
        if (!el) return;
        if (key === screenKey) {
          el.style.display = 'flex';
          el.style.opacity = '1';
        } else {
          // Keep notification overlay visible on top of YouTube
          if (key === 'notification' && screenKey === 'notification') return;
          el.style.opacity = '0';
          setTimeout(() => {
            if (el.style.opacity === '0') el.style.display = 'none';
          }, 400);
        }
      });
    }

    /** Reveal chat messages one by one based on data-delay */
    function revealMessages(chatId) {
      const chat = document.getElementById(chatId);
      if (!chat) return;
      const msgs = chat.querySelectorAll('.wa-msg');
      msgs.forEach(msg => {
        msg.classList.remove('wa-msg--visible');
        msg.classList.add('wa-msg--hidden');
      });
      msgs.forEach(msg => {
        const delay = parseInt(msg.getAttribute('data-delay') || '500', 10);
        schedule(() => {
          msg.classList.remove('wa-msg--hidden');
          msg.classList.add('wa-msg--visible');
        }, delay);
      });
    }

    /** Typewriter effect for Google search bar */
    function typeSearchQuery(text, barEl, callback) {
      const textEl = barEl.querySelector('.google-bar__text');
      if (!textEl) return;
      textEl.textContent = '';
      let i = 0;
      function typeChar() {
        if (i < text.length) {
          textEl.textContent += text[i];
          i++;
          schedule(typeChar, 50 + Math.random() * 40);
        } else if (callback) {
          schedule(callback, 400);
        }
      }
      schedule(typeChar, 300);
    }

    /** Reset all screens to initial hidden state */
    function resetScreens() {
      Object.values(screens).forEach(el => {
        if (!el) return;
        el.style.display = 'none';
        el.style.opacity = '0';
      });
      // Reset all chat messages
      document.querySelectorAll('.wa-msg').forEach(msg => {
        msg.classList.remove('wa-msg--visible');
        msg.classList.add('wa-msg--hidden');
      });
      // Reset Google search text (only the first search bar, keep google2 pre-filled)
      const g1Text = screens.google1 ? screens.google1.querySelector('.google-bar__text') : null;
      if (g1Text) g1Text.textContent = '';
    }

    /** Main animation sequence */
    function runSequence() {
      if (!animationRunning) return;
      clearAllTimeouts();
      resetScreens();

      // Step 1: WhatsApp - Mom's question (~5s)
      showScreen('wa1');
      revealMessages('waChat1');

      // Step 2: Google search (~5s from start = after messages done)
      schedule(() => {
        showScreen('google1');
        const bar = screens.google1.querySelector('.google-bar');
        typeSearchQuery('M4 Competition vs Mercedes Maybach', bar);
      }, 5500);

      // Step 3: YouTube Shorts distraction (~8s from start)
      schedule(() => {
        showScreen('youtube');
      }, 8500);

      // Step 4: BrainDock notification overlay (~12s from start)
      schedule(() => {
        // Show notification on top of YouTube
        screens.notification.style.display = 'flex';
        screens.notification.style.opacity = '1';
      }, 12500);

      // Step 5: Google search results (~15.5s from start)
      schedule(() => {
        showScreen('google2');
      }, 15500);

      // Step 6: WhatsApp final reply (~18.5s from start)
      schedule(() => {
        showScreen('wa2');
        revealMessages('waChat2');
      }, 18500);

      // Step 7: Pause and restart (~25s from start)
      schedule(() => {
        schedule(runSequence, 3000);
      }, 25000);
    }

    // Start animation when section scrolls into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationRunning) {
          animationRunning = true;
          runSequence();
        } else if (!entry.isIntersecting && animationRunning) {
          animationRunning = false;
          clearAllTimeouts();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(showcase);
  })();

})();
