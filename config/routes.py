from controllers.app import App
from controllers.chat import Chat
from controllers.query import Query
from controllers.session import Session


site_map = {
    '/': App,
    '/chat': Chat,
    '/query': Query,
    '/session': Session
}