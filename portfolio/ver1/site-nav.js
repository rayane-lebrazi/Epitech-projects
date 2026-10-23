(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');
  if (!header || !nav) return;

  header.querySelector('.brand')?.remove();
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  const items = [
    { key: 'about', label: 'About me', href: './index.html#about' },
    { key: 'career', label: 'Academics', href: './index.html#career' },
    { key: 'skills', label: 'Skills', href: './index.html#skills' },
    { key: 'contact', label: 'Contact me', href: './contact.html' },
    { key: 'cv', label: 'My CV', href: './CV.pdf', target: '_blank' }
  ];
  nav.replaceChildren();

  const map = document.createElement('div');
  map.className = 'site-map';
  const toggle = document.createElement('button');
  toggle.className = 'site-map-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Show page sections');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'site-map-panel');
  toggle.innerHTML = '<span aria-hidden="true">⌄</span>';

  const panel = document.createElement('div');
  panel.className = 'site-map-panel';
  panel.id = 'site-map-panel';
  panel.setAttribute('aria-label', 'Page sections');
  const title = document.createElement('p');
  title.className = 'site-map-title';
  title.textContent = 'On this page';
  panel.append(title);
  const seen = new Set();
  for (const section of document.querySelectorAll('main section[id]')) {
    if (seen.has(section.id)) continue;
    seen.add(section.id);
    const heading = section.querySelector('h1, h2, h3');
    const link = document.createElement('a');
    link.className = 'site-map-link';
    link.href = `#${section.id}`;
    link.textContent = (heading?.textContent || section.getAttribute('aria-label') || section.id).trim();
    panel.append(link);
  }
  if (currentFile !== 'index.html') {
    for (const item of items.slice(1, 3)) {
      const link = document.createElement('a');
      link.className = 'site-map-link';
      link.href = item.href;
      link.textContent = item.label;
      panel.append(link);
    }
  }
  map.append(toggle, panel);
  header.insertBefore(map, nav);

  const navLinks = new Map();
  for (const item of items) {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.dataset.navKey = item.key;
    if (item.target) {
      link.target = item.target;
      link.rel = 'noopener';
    }
    nav.append(link);
    navLinks.set(item.key, link);
  }

  const paintActiveLink = activeKey => {
    for (const [key, link] of navLinks) {
      const isActive = key === activeKey;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  };

  const updateActiveLink = () => {
    let activeKey = currentFile === 'contact.html' ? 'contact' : 'about';
    if (currentFile === 'index.html') {
      const threshold = header.getBoundingClientRect().bottom + 100;
      const academics = document.getElementById('career');
      const skills = document.getElementById('skills');
      if (academics && academics.getBoundingClientRect().top <= threshold) activeKey = 'career';
      if (skills && skills.getBoundingClientRect().top <= threshold) activeKey = 'skills';
    }
    paintActiveLink(activeKey);
  };
  const closeMap = () => {
    map.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const isOpen = map.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  panel.addEventListener('click', event => {
    if (event.target.closest('a')) closeMap();
  });
  document.addEventListener('click', event => {
    if (!map.contains(event.target)) closeMap();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMap();
  });

  let scrollFrame = 0;
  window.addEventListener('scroll', () => {
    header.classList.toggle('has-scrolled', window.scrollY > 30);
    if (!scrollFrame) {
      scrollFrame = requestAnimationFrame(() => {
        updateActiveLink();
        scrollFrame = 0;
      });
    }
  }, { passive: true });
  window.addEventListener('hashchange', () => {
    const key = location.hash === '#career' ? 'career' : location.hash === '#skills' ? 'skills' : null;
    if (key) paintActiveLink(key); else updateActiveLink();
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a[data-nav-key]');
    if (link) paintActiveLink(link.dataset.navKey);
  });
  header.classList.toggle('has-scrolled', window.scrollY > 30);
  if (location.hash === '#career') paintActiveLink('career');
  else if (location.hash === '#skills') paintActiveLink('skills');
  else updateActiveLink();
})();
