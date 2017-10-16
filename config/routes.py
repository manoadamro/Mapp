from controllers.app import App
from controllers.chat import Chat
from controllers.session import Session


site_map = {
    '/': App,
    '/chat': Chat,
    '/session': Session
}