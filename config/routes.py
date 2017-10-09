from controllers.app import App
from controllers.message import Message
from controllers.query import Query


site_map = {
    '/': App,
    '/message': Message,
    '/query': Query
}