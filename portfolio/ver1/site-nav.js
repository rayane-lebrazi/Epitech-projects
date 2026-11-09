(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');
  if (!header || !nav) return;

  header.querySelector('.brand')?.remove();
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  const items = [
    { key: 'home', label: 'Home', href: './home.html' },
    { key: 'career', label: 'Academics', href: './home.html#career' },
    { key: 'skills', label: 'Skills', href: './home.html#skills' },
    { key: 'about', label: 'About me', href: './about.html#story' },
    { key: 'contact', label: 'Contact me', href: './contact.html' },
    { key: 'cv', label: 'My CV', href: './assets/documents/CV.pdf', target: '_blank' }
  ];
  nav.replaceChildren();
  const rubber = document.createElement('span');
  rubber.className = 'nav-rubber-indicator';
  nav.append(rubber);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rubberReady = false;
  let lastRubberPosition = null;

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
  if (currentFile !== 'home.html' && currentFile !== 'index.html') {
    for (const item of items.slice(2, 4)) {
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

  const moveRubber = (link, animate = false) => {
    if (!link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const next = {
      left: linkRect.left - navRect.left + nav.scrollLeft,
      top: linkRect.top - navRect.top + nav.scrollTop,
      width: linkRect.width,
      height: linkRect.height
    };
    const moved = lastRubberPosition && (
      Math.abs(next.left - lastRubberPosition.left) > 1 ||
      Math.abs(next.top - lastRubberPosition.top) > 1 ||
      Math.abs(next.width - lastRubberPosition.width) > 1
    );
    rubber.style.left = next.left + 'px';
    rubber.style.top = next.top + 'px';
    rubber.style.width = next.width + 'px';
    rubber.style.height = next.height + 'px';
    if (animate && moved && !reducedMotion) {
      rubber.getAnimations().forEach(animation => animation.cancel());
      const travel = Math.abs(next.left - lastRubberPosition.left) + Math.abs(next.top - lastRubberPosition.top);
      const squeeze = Math.max(.84, 1 - travel / 1000);
      const stretch = Math.min(1.17, 1 + travel / 900);
      rubber.animate([
        { transform: 'scaleX(' + squeeze + ') scaleY(.96)' },
        { transform: 'scaleX(' + stretch + ') scaleY(1.04)' },
        { transform: 'scale(1)' }
      ], { duration: 420, easing: 'cubic-bezier(.23, 1, .32, 1)' });
    }
    lastRubberPosition = next;
    rubberReady = true;
    nav.classList.add('rubber-ready');
  };

  const paintActiveLink = activeKey => {
    for (const [key, link] of navLinks) {
      const isActive = key === activeKey;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    moveRubber(navLinks.get(activeKey), rubberReady);
  };

  const updateActiveLink = () => {
    let activeKey = currentFile === 'contact.html' ? 'contact' : currentFile === 'about.html' ? 'about' : 'home';
    if (currentFile === 'home.html' || currentFile === 'index.html') {
      const threshold = header.getBoundingClientRect().bottom + 140;
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
  const specularTargets = Array.from(document.querySelectorAll(
    'button:not(:disabled), .button, .activity-card, .contact-row, .site-header nav > a, .site-map-link'
  ));
  specularTargets.forEach(target => target.classList.add('specular-target'));

  const sectionGlows = Array.from(document.querySelectorAll('main section')).map(section => {
    section.classList.add('border-glow-section');
    const overlay = document.createElement('span');
    overlay.className = 'section-glow-overlay';
    const radius = getComputedStyle(section).borderRadius;
    overlay.style.borderRadius = radius === '0px' ? '24px' : radius;
    section.append(overlay);
    return overlay;
  });

  let pointerPoint = null;
  let effectsFrame = 0;
  const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));
  const updatePointerEffects = () => {
    effectsFrame = 0;
    if (!pointerPoint) return;
    for (const target of specularTargets) {
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      const px = clampValue(pointerPoint.x, rect.left, rect.right);
      const py = clampValue(pointerPoint.y, rect.top, rect.bottom);
      const distance = Math.hypot(pointerPoint.x - px, pointerPoint.y - py);
      const opacity = .22 + Math.max(0, 1 - distance / 250) * .78;
      const angle = (Math.atan2(pointerPoint.y - rect.top - rect.height / 2, pointerPoint.x - rect.left - rect.width / 2) * 180 / Math.PI + 90 + 360) % 360;
      target.style.setProperty('--specular-x', ((px - rect.left) / rect.width * 100) + '%');
      target.style.setProperty('--specular-y', ((py - rect.top) / rect.height * 100) + '%');
      target.style.setProperty('--specular-angle', angle + 'deg');
      target.style.setProperty('--specular-opacity', opacity.toFixed(3));
    }
    for (const overlay of sectionGlows) {
      const rect = overlay.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      const insideX = pointerPoint.x >= rect.left && pointerPoint.x <= rect.right;
      const insideY = pointerPoint.y >= rect.top && pointerPoint.y <= rect.bottom;
      const dx = insideX ? 0 : Math.max(rect.left - pointerPoint.x, pointerPoint.x - rect.right, 0);
      const dy = insideY ? 0 : Math.max(rect.top - pointerPoint.y, pointerPoint.y - rect.bottom, 0);
      const edgeDistance = dx || dy ? Math.hypot(dx, dy) : Math.min(
        pointerPoint.x - rect.left, rect.right - pointerPoint.x,
        pointerPoint.y - rect.top, rect.bottom - pointerPoint.y
      );
      const opacity = edgeDistance >= 42 ? 0 : .92 * (1 - edgeDistance / 42);
      const angle = (Math.atan2(pointerPoint.y - rect.top - rect.height / 2, pointerPoint.x - rect.left - rect.width / 2) * 180 / Math.PI + 90 + 360) % 360;
      overlay.style.setProperty('--section-glow-angle', angle + 'deg');
      overlay.style.setProperty('--section-glow-opacity', opacity.toFixed(3));
    }
  };
  const schedulePointerEffects = event => {
    if (event && event.pointerType === 'touch') return;
    if (event) pointerPoint = { x: event.clientX, y: event.clientY };
    if (!effectsFrame) effectsFrame = requestAnimationFrame(updatePointerEffects);
  };
  document.addEventListener('pointermove', schedulePointerEffects, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    pointerPoint = null;
    specularTargets.forEach(target => target.style.setProperty('--specular-opacity', '.22'));
    sectionGlows.forEach(overlay => overlay.style.setProperty('--section-glow-opacity', '0'));
  });
  window.addEventListener('scroll', () => schedulePointerEffects(), { passive: true });

  const orbitStage = document.querySelector('.orbit-stage');
  if (orbitStage) {
    const orbitItems = Array.from(orbitStage.querySelectorAll('.orbit-item'));
    const turn = Math.PI * 2;
    const duration = 30000;
    const reducedOrbitMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let orbitAngle = 0;
    let orbitOffset = 0;
    let targetOffset = 0;
    let inertia = 0;
    let previousFrame = 0;
    let isHovered = false;
    let dragState = null;
    let suppressClick = false;
    let orbitVisible = true;
    let orbitFrame = 0;

    const drawOrbit = () => {
      const rect = orbitStage.getBoundingClientRect();
      const firstRect = orbitItems[0]?.getBoundingClientRect();
      if (!rect.width || !rect.height || !firstRect) return;
      const radiusX = Math.max(0, Math.min(rect.width * .42, (rect.width - firstRect.width) / 2 - 8));
      const radiusY = Math.max(0, Math.min(rect.height * .34, (rect.height - firstRect.height) / 2 - 8));
      const tilt = -8 * Math.PI / 180;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);
      orbitItems.forEach((item, index) => {
        const point = orbitAngle + orbitOffset + index * turn / orbitItems.length;
        const ellipseX = radiusX * Math.cos(point);
        const ellipseY = radiusY * Math.sin(point);
        const x = ellipseX * cosTilt - ellipseY * sinTilt;
        const y = ellipseX * sinTilt + ellipseY * cosTilt;
        const depth = Math.sin(point);
        const scale = .86 + (depth + 1) * .12;
        item.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + scale.toFixed(3) + ')';
        item.style.opacity = (.62 + (depth + 1) * .19).toFixed(3);
        item.style.filter = 'brightness(' + (.72 + (depth + 1) * .14).toFixed(3) + ')';
        item.style.zIndex = String(Math.round((depth + 1) * 50));
      });
    };

    const runOrbit = timestamp => {
      orbitFrame = 0;
      if (!orbitVisible) return;
      if (!previousFrame) previousFrame = timestamp;
      const delta = Math.min(50, timestamp - previousFrame);
      previousFrame = timestamp;
      if (!reducedOrbitMotion && !dragState) {
        orbitAngle += turn * delta / duration * (isHovered ? .3 : 1);
        orbitAngle += inertia * delta / 1000;
        inertia *= Math.pow(.12, delta / 1000);
        if (Math.abs(inertia) < .01) inertia = 0;
        orbitOffset += (targetOffset - orbitOffset) * Math.min(1, delta / 150);
        if (Math.abs(targetOffset - orbitOffset) < .0005) orbitOffset = targetOffset;
      }
      drawOrbit();
      if (!reducedOrbitMotion || Math.abs(targetOffset - orbitOffset) > .0005 || inertia) {
        orbitFrame = requestAnimationFrame(runOrbit);
      }
    };
    const requestOrbitFrame = () => {
      if (!orbitFrame && orbitVisible) orbitFrame = requestAnimationFrame(runOrbit);
    };
    orbitStage.addEventListener('pointerenter', () => { isHovered = true; });
    orbitStage.addEventListener('pointerleave', () => { isHovered = false; });
    orbitStage.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      dragState = {
        id: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        startOffset: targetOffset,
        lastTime: event.timeStamp,
        velocity: 0,
        moved: false
      };
      try { orbitStage.setPointerCapture(event.pointerId); } catch {}
      orbitStage.dataset.dragging = '';
    });
    orbitStage.addEventListener('pointermove', event => {
      if (!dragState || event.pointerId !== dragState.id) return;
      const dx = event.clientX - dragState.startX;
      if (Math.abs(dx) > 5) dragState.moved = true;
      const elapsed = Math.max(1, event.timeStamp - dragState.lastTime);
      dragState.velocity = ((event.clientX - dragState.lastX) / elapsed) / Math.max(80, orbitStage.clientWidth * .42) * .7 * 1000;
      dragState.lastX = event.clientX;
      dragState.lastTime = event.timeStamp;
      targetOffset = dragState.startOffset + dx / Math.max(80, orbitStage.clientWidth * .42) * 1.5;
      if (reducedOrbitMotion) {
        orbitOffset = targetOffset;
        drawOrbit();
      } else requestOrbitFrame();
    });
    const finishDrag = event => {
      if (!dragState || (event && event.pointerId !== dragState.id)) return;
      const moved = dragState.moved;
      inertia = reducedOrbitMotion ? 0 : clampValue(dragState.velocity, -3.2, 3.2);
      dragState = null;
      delete orbitStage.dataset.dragging;
      if (moved) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 120);
      }
      requestOrbitFrame();
    };
    orbitStage.addEventListener('pointerup', finishDrag);
    orbitStage.addEventListener('pointercancel', finishDrag);
    orbitStage.addEventListener('lostpointercapture', finishDrag);
    orbitItems.forEach((item, index) => item.addEventListener('click', () => {
      if (suppressClick) return;
      const itemAngle = orbitAngle + orbitOffset + index * turn / orbitItems.length;
      const difference = Math.atan2(Math.sin(Math.PI / 2 - itemAngle), Math.cos(Math.PI / 2 - itemAngle));
      targetOffset = orbitOffset + difference;
      requestOrbitFrame();
    }));
    window.addEventListener('resize', () => {
      if (reducedOrbitMotion) drawOrbit();
      else requestOrbitFrame();
    });
    if ('IntersectionObserver' in window) {
      const visibility = new IntersectionObserver(entries => {
        orbitVisible = entries.some(entry => entry.isIntersecting);
        if (orbitVisible) {
          previousFrame = 0;
          if (reducedOrbitMotion) drawOrbit();
          else requestOrbitFrame();
        } else {
          cancelAnimationFrame(orbitFrame);
          orbitFrame = 0;
          previousFrame = 0;
        }
      });
      visibility.observe(orbitStage);
    }
    drawOrbit();
    if (!reducedOrbitMotion) requestOrbitFrame();
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      const active = nav.querySelector('a.active');
      if (active) moveRubber(active);
    });
  }
  window.addEventListener('resize', () => {
    const active = nav.querySelector('a.active');
    if (active) moveRubber(active);
    schedulePointerEffects();
  });

})();