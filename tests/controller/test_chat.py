from unittest import TestCase
import cherrypy
from controllers.chat import Chat


class TestMessage(TestCase):
    def test_new_channel(self):
        chat = Chat()
        cherrypy.session = {'username': 'George'}
        chat.new_channel(channel='Ducks')
        self.assertEqual('Ducks' in chat.channels, True)

