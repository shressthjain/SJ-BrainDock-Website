
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

})();
