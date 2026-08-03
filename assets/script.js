// Reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Nav active state (index page section links)
const navLinks = document.querySelectorAll('.navlinks a[href^="#"]');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (sections.length) {
  window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s; });
    navLinks.forEach(a => a.style.color = '');
    const match = [...navLinks].find(a => a.getAttribute('href') === '#' + current.id);
    if (match) match.style.color = 'var(--accent)';
  });
}

// Case-study table of contents active state
const tocLinks = document.querySelectorAll('.case-toc a');
if (tocLinks.length) {
  const tocSections = [...tocLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  window.addEventListener('scroll', () => {
    let current = tocSections[0];
    tocSections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s; });
    tocLinks.forEach(a => a.classList.remove('active'));
    const match = [...tocLinks].find(a => a.getAttribute('href') === '#' + current.id);
    if (match) match.classList.add('active');
  });
}

// Schematic pipeline node sequential highlight (hero)
const nodes = document.querySelectorAll('.schem-node');
if (nodes.length) {
  let i = 0;
  setInterval(() => {
    nodes.forEach(n => n.classList.remove('active'));
    nodes[i].classList.add('active');
    i = (i + 1) % nodes.length;
  }, 1400);
}
