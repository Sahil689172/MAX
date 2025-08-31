# MAX - Voice-Enabled AI Assistant

A sophisticated voice-enabled AI assistant built with Python, Eel, and modern web technologies.

## 🎤 Features

### Voice & Audio
- **Text-to-Speech**: Powered by pyttsx3 with SAPI5 driver
- **Audio Feedback**: Custom sound effects for interactions
- **Automatic Greeting**: MAX speaks when the application starts
- **Mic Button Sound**: Audio feedback when voice input is activated

### User Interface
- **Modern Web UI**: Built with Bootstrap and custom CSS
- **SiriWave Animation**: Visual feedback for voice input
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Elements**: Mic, chat, and settings buttons

### Technical Features
- **Python Backend**: Eel framework for Python-JavaScript communication
- **Voice Recognition**: Ready for speech-to-text integration
- **Cross-Platform**: Windows-compatible with virtual environment
- **Real-time Communication**: Seamless Python-JavaScript bridge

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- Windows OS (for SAPI5 driver)
- Microsoft Edge (for app mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahil689172/MAX.git
   cd MAX
   ```

2. **Create virtual environment**
   ```bash
   python -m venv envmax
   envmax\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install eel pyttsx3 bottle bottle-websocket gevent gevent-websocket
   ```

4. **Run MAX**
   ```bash
   python main.py
   ```

## 📁 Project Structure

```
MAX/
├── main.py                 # Main application entry point
├── engine/
│   └── command.py         # Text-to-speech engine
├── www/
│   ├── index.html         # Main web interface
│   ├── style.css          # Custom styling
│   ├── main.js            # Main JavaScript
│   ├── script.js          # Additional scripts
│   └── assets/
│       ├── vendore/       # Third-party libraries
│       └── *.mp3          # Audio files
└── envmax/                # Virtual environment
```

## 🎯 Usage

1. **Start MAX**: Run `python main.py`
2. **Automatic Launch**: MAX opens in Microsoft Edge app mode
3. **Voice Interaction**: Click the mic button to activate voice input
4. **Text Input**: Type queries in the input field
5. **Settings**: Access configuration via the gear icon

## 🔧 Configuration

### Text-to-Speech Settings
- **Driver**: SAPI5 (Windows)
- **Voices**: Automatically detected on startup
- **Greeting**: Customizable welcome message

### Audio Settings
- **Site Sound**: Plays on application start
- **Mic Sound**: Plays when voice input is activated
- **Fallback**: Handles browser autoplay restrictions

## 🛠️ Development

### Adding New Features
1. **Python Functions**: Add to `main.py` with `@eel.expose` decorator
2. **JavaScript Integration**: Call Python functions from web interface
3. **UI Updates**: Modify `www/index.html` and `www/style.css`

### Voice Commands
```python
@eel.expose
def custom_command(text):
    # Add your custom voice command logic here
    return {"status": "success", "message": f"Processed: {text}"}
```

## 📊 Technologies Used

- **Backend**: Python 3.13, Eel, pyttsx3
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Audio**: Web Audio API, pyttsx3
- **UI Components**: SiriWave, Bootstrap Icons
- **Communication**: WebSocket, HTTP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Eel](https://github.com/ChrisKnott/Eel) - For Python-JavaScript bridge
- [pyttsx3](https://github.com/nateshmbhat/pyttsx3) - For text-to-speech
- [SiriWave](https://github.com/kopiro/siriwave) - For voice animation
- [Bootstrap](https://getbootstrap.com/) - For UI components

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [Your Contact Information]

---

**MAX** - Your intelligent voice assistant 🤖✨
