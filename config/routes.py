from controllers.app import App
from controllers.chat import Chat
from controllers.query import Query


site_map = {
    '/': App,
    '/message': Chat,
    '/query': Query
}