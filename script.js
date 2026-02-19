document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  /* ── Nav background on scroll ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ── Tag filter ── */
  const tagBtns = document.querySelectorAll('.tag[data-tag]');
  const cards   = document.querySelectorAll('.card[data-category]');
  if (tagBtns.length && cards.length) {
    tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tagBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tag = btn.dataset.tag;
        cards.forEach(card => {
          const show = tag === 'all' || card.dataset.category === tag;
          card.style.opacity = '0';
          card.style.transform = 'translateY(6px)';
          setTimeout(() => {
            card.style.display = show ? '' : 'none';
            if (show) requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          }, 150);
        });
      });
    });
  }

});
