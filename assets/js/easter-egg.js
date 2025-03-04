const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

let easterEggActivated = false;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
  
  // Check for "a" key to open arcade directly
  if (e.key === 'a' && !e.ctrlKey && !e.altKey && !e.metaKey) {
    // Only if user is not typing in an input, textarea, or contenteditable element
    const activeElement = document.activeElement;
    const isTyping = activeElement.tagName === 'INPUT' || 
                     activeElement.tagName === 'TEXTAREA' || 
                     activeElement.getAttribute('contenteditable') === 'true';
    
    if (!isTyping) {
      openArcadeInNewWindow();
    }
  }
});

function activateEasterEgg() {
  easterEggActivated = true;
  console.clear();
  console.log('%c🎮 Secret Arcade Unlocked! 🎮', 'font-size: 20px; font-weight: bold; color: #64FFDA;');
  console.log('%cTry these commands:', 'font-size: 16px; color: #8892B0;');
  console.log('%c- showArcade()', 'color: #64FFDA');
  console.log('%c- showKarateJourney()', 'color: #64FFDA');
  console.log('%c- showSecretProject()', 'color: #64FFDA');
  console.log('%c- matrix()', 'color: #64FFDA');
}

window.showArcade = () => {
  const arcadeOverlay = document.createElement('div');
  arcadeOverlay.className = 'arcade-overlay';
  arcadeOverlay.innerHTML = `
    <div class="arcade-modal">
      <div class="arcade-header">
        <h2>🎮 Secret Arcade</h2>
        <button class="arcade-close" aria-label="Close arcade">×</button>
      </div>
      <iframe src="assets/arcade/arcade.html" frameborder="0"></iframe>
    </div>
  `;

  document.body.appendChild(arcadeOverlay);

  const closeBtn = arcadeOverlay.querySelector('.arcade-close');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(arcadeOverlay);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.contains(arcadeOverlay)) {
      document.body.removeChild(arcadeOverlay);
    }
  });
};

function openArcadeInNewWindow() {
  window.open('assets/arcade/arcade.html', '_blank');
}

window.showKarateJourney = () => {
  console.clear();
  console.log('%c🥋 My Karate Journey 🥋', 'font-size: 20px; font-weight: bold; color: #64FFDA;');
  console.log('2016: Started Karate');
  console.log('2020: First Competition');
  console.log('2024: Teaching Children');
  console.log('Future: Black Belt 🎯');
};

window.showSecretProject = () => {
  console.clear();
  console.log('%c🚀 Secret Project Loading...', 'font-size: 20px; font-weight: bold; color: #64FFDA;');
  setTimeout(() => {
    window.location.href = 'https://rummy.mogicato.ch/';
  }, 2000);
};

window.matrix = () => {
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const streams = [];
  const fontSize = 14;
  let canvas, ctx;

  canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '9999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Stream {
    constructor(x) {
      this.x = x;
      this.y = -fontSize;
      this.chars = [];
      this.length = Math.random() * 20 + 5;
      this.speed = Math.random() * 2 + 1;
    }

    render() {
      this.y += this.speed;
      if (this.y > canvas.height) this.y = -fontSize;

      ctx.fillStyle = '#64FFDA';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < this.length; i++) {
        const y = this.y - i * fontSize;
        if (y < canvas.height && y > -fontSize) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, this.x, y);
        }
      }
    }
  }

  function init() {
    resize();
    const columns = Math.floor(canvas.width / fontSize);
    for (let i = 0; i < columns; i++) {
      streams.push(new Stream(i * fontSize));
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    streams.forEach(stream => stream.render());
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  init();
  animate();

  setTimeout(() => {
    document.body.removeChild(canvas);
  }, 10000);
};