import os
import eel
import pyttsx3

# Initialize text-to-speech engine
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
print("Available voices:", voices)

def speak(text):
    """Convert text to speech"""
    engine.say(text)
    engine.runAndWait()

# Expose the speak function to JavaScript
@eel.expose
def speak_text(text):
    """Function to be called from JavaScript"""
    try:
        speak(text)
        return {"status": "success", "message": f"Spoke: {text}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

eel.init('www')

os.system('start msedge.exe --app="http://localhost:8000/index.html"')

eel.start('index.html',mode=None,host='localhost',block=True)







