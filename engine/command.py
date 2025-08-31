import pyttsx3

# Initialize text-to-speech engine
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
print(voices)

def speak(text):
    """Convert text to speech"""
    engine.say(text)
    engine.runAndWait()

# Example usage
if __name__ == "__main__":
    speak("I love India")
