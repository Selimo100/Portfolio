// Project overview: card -> detail modal, and the demo video modal.
(function () {
  const projectModal = document.getElementById('projectModal');
  const videoModal = document.getElementById('videoModal');
  if (!projectModal || !videoModal) return;

  const player = document.getElementById('videoModalPlayer');
  const fields = {
    image: document.getElementById('projectModalImage'),
    category: document.getElementById('projectModalCategory'),
    year: document.getElementById('projectModalYear'),
    title: document.getElementById('projectModalTitle'),
    summary: document.getElementById('projectModalSummary'),
    tags: document.getElementById('projectModalTags'),
    links: document.getElementById('projectModalLinks'),
  };

  let lastFocused = null;

  function openModal(modal) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('button').focus();
  }

  function closeModal(modal) {
    modal.hidden = true;
    if (projectModal.hidden && videoModal.hidden) {
      document.body.classList.remove('modal-open');
    }
    if (lastFocused) lastFocused.focus();
  }

  function link(href, icon, label) {
    const a = document.createElement('a');
    a.className = 'project-link';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = '<i class="bi ' + icon + ' me-1"></i>';
    a.append(label);
    return a;
  }

  function showProject(project, card) {
    fields.image.src = project.image;
    fields.image.alt = project.title + ' screenshot';
    fields.category.textContent =
      project.category === 'professional' ? 'Professional' : 'Personal';
    fields.year.textContent = project.year || '';
    fields.title.textContent = project.title;
    fields.summary.textContent = project.summary;

    // Reuse the card's rendered tags so the tech icons come along.
    const tags = card ? card.querySelector('.project-tags') : null;
    fields.tags.replaceChildren();
    if (tags) {
      Array.prototype.forEach.call(tags.children, function (tag) {
        fields.tags.append(tag.cloneNode(true));
      });
    }

    fields.links.replaceChildren();
    if (project.liveUrl) {
      fields.links.append(link(project.liveUrl, 'bi-box-arrow-up-right', 'Launch'));
    }
    if (project.githubUrl) {
      fields.links.append(link(project.githubUrl, 'bi-github', 'Source'));
    }
    if (project.demoVideo) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'project-link';
      btn.innerHTML = '<i class="bi bi-play-circle me-1"></i>Demo Video';
      btn.addEventListener('click', function () {
        closeModal(projectModal);
        showVideo(project.demoVideo);
      });
      fields.links.append(btn);
    }

    openModal(projectModal);
  }

  function showVideo(src) {
    player.src = src;
    openModal(videoModal);
    player.play().catch(function () {
      /* autoplay may be blocked — the controls still work */
    });
  }

  function closeVideo() {
    player.pause();
    player.removeAttribute('src');
    player.load();
    closeModal(videoModal);
  }

  document.querySelectorAll('.project-card[data-project]').forEach(function (card) {
    const project = JSON.parse(card.dataset.project);

    card.addEventListener('click', function (event) {
      // Let the links and the demo button inside the card do their own thing.
      if (event.target.closest('a, button')) return;
      showProject(project, card);
    });

    card.addEventListener('keydown', function (event) {
      if (event.target !== card) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showProject(project, card);
      }
    });
  });

  document.querySelectorAll('.project-video-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showVideo(btn.dataset.video);
    });
  });

  // Backdrop click, close button and Escape.
  projectModal.addEventListener('click', function (event) {
    if (event.target === projectModal || event.target.closest('.project-modal-close')) {
      closeModal(projectModal);
    }
  });

  videoModal.addEventListener('click', function (event) {
    if (event.target === videoModal || event.target.closest('.video-modal-close')) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (!videoModal.hidden) closeVideo();
    else if (!projectModal.hidden) closeModal(projectModal);
  });
})();
