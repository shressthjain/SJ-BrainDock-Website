
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

  // ========== REVEAL ELEMENTS — show immediately (no animation) ==========
  document.querySelectorAll('.reveal, .reveal-slide-left, .reveal-slide-right').forEach(function (el) {
    el.classList.add('visible');
  });

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

  // ========== PERFORMANCE REPORTS — show immediately (no animation) ==========
  var prChart = document.getElementById('prChart');
  if (prChart) prChart.classList.add('animated');

  var prStats = document.getElementById('prStats');
  if (prStats) {
    prStats.querySelectorAll('.pr-stat-num').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
      el.textContent = target.toFixed(decimals);
    });
  }

  // ========== HOW BRAINDOCK HELPS — show full text immediately (no typing animation) ==========
  var hbhTextEl = document.getElementById('hbhTypedText');
  var hbhCursor = document.getElementById('hbhCursor');
  var hbhPopup = document.getElementById('hbhCompletePopup');

  if (hbhTextEl) {
    hbhTextEl.textContent =
      'I met the lawyer in a quiet office, discussing contracts, deadlines, and risks. ' +
      'Papers rustled, coffee cooled, and advice flowed calmly, leaving me relieved, ' +
      'informed, and cautiously optimistic about next steps after a long morning.';
    if (hbhCursor) hbhCursor.classList.add('hidden');
    if (hbhPopup) hbhPopup.classList.add('visible');
  }


  // ========== MACBOOK FAN ANIMATION (160-frame smooth sequence) ==========
  var fanFrame = document.getElementById('fanFrame');
  var fanLoader = document.getElementById('fanLoader');

  var fanTotalFrames = 160;
  var fanCurrentFrame = 0;
  var fanPlaying = false;
  var fanReady = false;
  var fanAnimId = null;
  var fanLastTime = 0;
  var fanTargetFPS = 75;
  var fanFrameInterval = 1000 / fanTargetFPS;
  var fanImagesLoaded = 0;

  // Ping-pong: play forward 0→159, then reverse 159→0 to avoid the color jump
  var fanDirection = 1; // 1 = forward, -1 = reverse

  // The frame index where the laptop screen is straight-on (0-indexed)
  var fanStopFrame = 79; // frame 80

  // Feature button state
  var fanActiveFeature = null;
  var fanStopTarget = -1; // frame to stop at, -1 = don't stop

  // Preload all 160 frames
  var fanImages = [];
  (function preloadFanFrames() {
    for (var i = 1; i <= fanTotalFrames; i++) {
      var img = new Image();
      var padded = String(i);
      while (padded.length < 4) padded = '0' + padded;
      img.src = 'assets/images/fan-frames/f60_' + padded + '.png';
      img.onload = function () {
        fanImagesLoaded++;
        if (fanLoader) {
          fanLoader.textContent = 'Loading… ' + Math.round((fanImagesLoaded / fanTotalFrames) * 100) + '%';
        }
        if (fanImagesLoaded === fanTotalFrames) {
          fanReady = true;
          if (fanLoader) fanLoader.classList.add('hidden');
        }
      };
      img.onerror = function () {
        fanImagesLoaded++;
      };
      fanImages.push(img);
    }
  })();

  function fanShowFrame(idx) {
    if (!fanFrame || !fanImages[idx]) return;
    fanCurrentFrame = idx;
    fanFrame.src = fanImages[idx].src;
  }

  function fanAnimate(timestamp) {
    if (!fanPlaying) return;
    if (!fanLastTime) fanLastTime = timestamp;

    var elapsed = timestamp - fanLastTime;
    if (elapsed >= fanFrameInterval) {
      fanLastTime = timestamp - (elapsed % fanFrameInterval);

      // Ping-pong: reverse direction at boundaries instead of wrapping
      var next = fanCurrentFrame + fanDirection;
      if (next >= fanTotalFrames) {
        fanDirection = -1;
        next = fanTotalFrames - 2; // bounce back
      } else if (next < 0) {
        fanDirection = 1;
        next = 1; // bounce forward
      }
      fanShowFrame(next);

      // Check if we've reached the stop frame
      if (fanStopTarget >= 0 && fanCurrentFrame === fanStopTarget) {
        fanPlaying = false;
        cancelAnimationFrame(fanAnimId);
        fanShowDescription(fanActiveFeature);
        return;
      }
    }

    fanAnimId = requestAnimationFrame(fanAnimate);
  }

  function fanPlayToFrame(targetFrame) {
    fanStopTarget = targetFrame;
    if (!fanPlaying) {
      fanPlaying = true;
      fanLastTime = 0;
      fanAnimId = requestAnimationFrame(fanAnimate);
    }
  }

  // Description panel logic
  var fanDescContainer = document.getElementById('fanFeatureDesc');
  var fanDescItems = document.querySelectorAll('.fan-feature-desc-item');

  function fanShowDescription(feature) {
    if (!fanDescContainer || !feature) return;
    fanDescItems.forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-desc') === feature);
    });
    fanDescContainer.classList.add('visible');
  }

  function fanHideDescription() {
    if (!fanDescContainer) return;
    fanDescContainer.classList.remove('visible');
  }

  // Feature button click handlers
  var fanFeatureBtns = document.querySelectorAll('.fan-feature-btn');
  fanFeatureBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!fanReady) return;
      var feature = btn.getAttribute('data-feature');

      // If clicking the already-active button, do nothing
      if (fanActiveFeature === feature) return;

      // Update active button state
      fanFeatureBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Hide current description while animation plays
      fanHideDescription();

      fanActiveFeature = feature;

      // Play animation to the straight-on frame
      fanPlayToFrame(fanStopFrame);
    });
  });

})();

/* ========== FEATURES DECK — Stacked Card Interaction ========== */
;(function () {
  'use strict';

  var DESKTOP_OFFSETS = [
    { x: -100, y: 0   },
    { x: -30,  y: 50  },
    { x: 40,   y: 100 },
    { x: 110,  y: 150 }
  ];
  var DESKTOP_ACTIVE = { x: 0, y: -20 };

  var MOBILE_OFFSETS = [
    { x: -60, y: 0  },
    { x: -20, y: 30 },
    { x: 20,  y: 60 },
    { x: 60,  y: 90 }
  ];
  var MOBILE_ACTIVE = { x: 0, y: -15 };

  var cards = [];
  var activeIndex = -1;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function getOffsets() {
    return isMobile() ? MOBILE_OFFSETS : DESKTOP_OFFSETS;
  }

  function getActivePos() {
    return isMobile() ? MOBILE_ACTIVE : DESKTOP_ACTIVE;
  }

  function updateDeck() {
    var offsets = getOffsets();
    var activePos = getActivePos();
    var totalCards = cards.length;
    var positionIndex = 0;
    var hasActive = activeIndex >= 0;
    var highestInactivePos = -1;

    for (var i = 0; i < totalCards; i++) {
      var card = cards[i];
      var desc = card.querySelector('p');

      card.classList.remove('deck-front');

      if (i === activeIndex) {
        card.style.setProperty('--deck-offset-x', activePos.x + 'px');
        card.style.setProperty('--deck-offset-y', activePos.y + 'px');
        card.style.setProperty('--deck-z', String(totalCards + 1));
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');
        card.setAttribute('tabindex', '0');
        if (desc) desc.removeAttribute('aria-hidden');
      } else {
        var offset = offsets[positionIndex] || offsets[offsets.length - 1];
        card.style.setProperty('--deck-offset-x', offset.x + 'px');
        card.style.setProperty('--deck-offset-y', offset.y + 'px');
        card.style.setProperty('--deck-z', String(positionIndex + 1));
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('tabindex', hasActive ? '-1' : '0');
        if (desc) desc.setAttribute('aria-hidden', 'true');
        highestInactivePos = i;
        positionIndex++;
      }
    }

    if (highestInactivePos >= 0) {
      cards[highestInactivePos].classList.add('deck-front');
    }
  }

  function toggleCard(index) {
    if (index === activeIndex) {
      activeIndex = -1;
    } else {
      activeIndex = index;
    }
    updateDeck();
  }

  function deactivate() {
    if (activeIndex >= 0) {
      activeIndex = -1;
      updateDeck();
    }
  }

  function init() {
    var deck = document.querySelector('.features-deck');
    if (!deck) return;

    var cardElements = deck.querySelectorAll('.feature-card');
    if (cardElements.length === 0) return;

    cards = Array.prototype.slice.call(cardElements);

    cards.forEach(function (card) {
      card.classList.remove('active');
    });

    activeIndex = -1;
    updateDeck();

    cards.forEach(function (card, i) {
      card.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCard(i);
        if (activeIndex >= 0) {
          cards[activeIndex].focus();
        }
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(i);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          deactivate();
          card.focus();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          var next = (i + 1) % cards.length;
          cards[next].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          var prev = (i - 1 + cards.length) % cards.length;
          cards[prev].focus();
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (deck && !deck.contains(e.target)) {
        deactivate();
      }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDeck, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
