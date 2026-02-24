// Rotating Particle Globe Effect (3D Earth-like)
window.addEventListener('DOMContentLoaded', () => {
    const square = document.querySelector('.square');
    if (!square) return;

    const canvas = document.createElement('canvas');
    const size = Math.max(200, Math.min(square.clientWidth || 320, square.clientHeight || 320));
    canvas.width = size;
    canvas.height = size;
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
    const radius = size * 0.40;
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
            ctx.arc(px, py, 1.8, 0, 2 * Math.PI);
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

// Speech Recognition (Speech-to-Text) with terminal output
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('maxInput');
    const speakBtn = document.getElementById('speakBtn');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!input || !speakBtn) return;

    // Function to add output to terminal
    function addTerminalOutput(text, type = 'output') {
        if (!terminalOutput) return;
        
        // Remove the cursor line temporarily
        const cursorLine = terminalOutput.querySelector('.cursor-line');
        if (cursorLine) {
            cursorLine.remove();
        }
        
        // Create new output line
        const line = document.createElement('p');
        
        if (type === 'output') {
            line.innerHTML = `<span class="prompt">></span> <span class="output-text">${text}</span>`;
        } else if (type === 'listening') {
            line.innerHTML = `<span class="prompt">></span> <span class="speaking-text">${text}</span>`;
        } else if (type === 'error') {
            line.innerHTML = `<span class="prompt">></span> <span class="error-text">Error: ${text}</span>`;
        }
        
        terminalOutput.appendChild(line);
        
        // Re-add cursor line
        const newCursorLine = document.createElement('p');
        newCursorLine.className = 'cursor-line';
        newCursorLine.innerHTML = '<span class="prompt">></span> <span class="cursor-blink">_</span>';
        terminalOutput.appendChild(newCursorLine);
        
        // Auto-scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error('Speech Recognition not supported in this browser.');
        addTerminalOutput('Speech Recognition not supported. Please use Chrome or Edge.', 'error');
        return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let isListening = false;

    // Speech recognition event handlers
    recognition.onstart = () => {
        isListening = true;
        speakBtn.style.color = '#00ff88';
        speakBtn.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.6)';
        addTerminalOutput('Listening... Speak now.', 'listening');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        // Update input field
        input.value = transcript;
        
        // Add to terminal
        addTerminalOutput(`Recognized: "${transcript}" (confidence: ${(confidence * 100).toFixed(1)}%)`, 'output');
    };

    recognition.onerror = (event) => {
        isListening = false;
        speakBtn.style.color = '';
        speakBtn.style.boxShadow = '';
        
        let errorMsg = 'Unknown error occurred.';
        if (event.error === 'no-speech') {
            errorMsg = 'No speech detected. Please try again.';
        } else if (event.error === 'audio-capture') {
            errorMsg = 'No microphone found. Please check your microphone.';
        } else if (event.error === 'not-allowed') {
            errorMsg = 'Microphone permission denied. Please allow microphone access.';
        } else if (event.error === 'network') {
            errorMsg = 'Network error. Please check your connection.';
        }
        
        addTerminalOutput(errorMsg, 'error');
    };

    recognition.onend = () => {
        isListening = false;
        speakBtn.style.color = '';
        speakBtn.style.boxShadow = '';
        
        if (!isListening) {
            addTerminalOutput('Recognition ended.', 'output');
        }
    };

    // Button click handler
    speakBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
            addTerminalOutput('Stopped listening.', 'output');
        } else {
            try {
                recognition.start();
            } catch (error) {
                addTerminalOutput('Failed to start recognition. Please try again.', 'error');
            }
        }
    });
});

