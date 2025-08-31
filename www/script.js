// Rotating Particle Globe Effect (3D Earth-like)
window.addEventListener('DOMContentLoaded', () => {
    const square = document.querySelector('.square');
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.zIndex = '2';
    square.appendChild(canvas);

    // Animate the text in and out
    const globeText = document.getElementById('globeText');
    globeText.classList.add('bounce-in');
    setTimeout(() => {
        globeText.classList.remove('bounce-in');
        globeText.classList.add('bounce-out');
    }, 2000);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const numParticles = 500;
    const radius = 160;
    let angleY = 0; // Y axis (vertical)
    let angleX = 0; // X axis (horizontal)

    // Generate random particles on a sphere
    for (let i = 0; i < numParticles; i++) {
        const theta = Math.random() * 2 * Math.PI; // longitude
        const phi = Math.acos(2 * Math.random() - 1); // latitude
        particles.push({ theta, phi });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angleY += 0.012; // Y axis rotation speed
        angleX += 0.006; // X axis rotation speed
        for (let i = 0; i < numParticles; i++) {
            let { theta, phi } = particles[i];
            // 3D rotation on Y axis
            let x = radius * Math.sin(phi) * Math.cos(theta + angleY);
            let z = radius * Math.sin(phi) * Math.sin(theta + angleY);
            let y = radius * Math.cos(phi);
            // 3D rotation on X axis
            let y2 = y * Math.cos(angleX) - z * Math.sin(angleX);
            let z2 = y * Math.sin(angleX) + z * Math.cos(angleX);
            // Perspective projection
            const scale = 0.5 + (z2 / (2 * radius));
            const px = canvas.width / 2 + x * scale;
            const py = canvas.height / 2 + y2 * scale;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, 2 * Math.PI);
            ctx.fillStyle = '#1a6cff';
            ctx.shadowColor = '#1a6cff';
            ctx.shadowBlur = 8;
            ctx.globalAlpha = 0.5 + 0.5 * (z2 / radius); // fade for depth
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
        requestAnimationFrame(draw);
    }
    draw();
});

// Textillate animation for the heading
$(function () {
  $('.tlt').textillate({
    loop: true,
    minDisplayTime: 2000,
    in: {
      effect: 'fadeInLeftBig',
      delayScale: 1.5,
      delay: 50,
      sync: false
    },
    out: {
      effect: 'hinge',
      sync: false
    }
  });
});

// Input field and icon functionality
document.addEventListener('DOMContentLoaded', function() {
    const maxInput = document.getElementById('maxInput');
    const micBtn = document.getElementById('micBtn');
    const chatBtn = document.getElementById('chatBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    // Input field focus effects
    maxInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    maxInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Enter key functionality
    maxInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const value = this.value.trim();
            if (value) {
                console.log('User input:', value);
                // Add your processing logic here
                this.value = '';
            }
        }
    });

    // Icon button click handlers (mic handled in main HTML)
    // micBtn click handler moved to main HTML for SiriWave integration

    chatBtn.addEventListener('click', function() {
        console.log('Chat button clicked');
        // Add chat functionality here
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    settingsBtn.addEventListener('click', function() {
        console.log('Settings button clicked');
        // Add settings functionality here
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Add pulsing animation to icons
    const icons = [micBtn, chatBtn, settingsBtn];
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('pulse-glow');
    });
});
