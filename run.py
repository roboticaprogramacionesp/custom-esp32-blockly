import webview
from app import app  # tu Flask

if __name__ == "__main__":
    webview.create_window("MPYBLockly", app)
    webview.start()