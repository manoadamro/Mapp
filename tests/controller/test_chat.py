from unittest import TestCase
import cherrypy
from controllers.chat import Chat


class TestMessage(TestCase):

    def test_new_channel(self):
        chat = Chat()
        cherrypy.session = {'username': 'George', 'language': 'en'}
        chat.new_channel(channel='Ducks')
        self.assertEqual('Ducks' in chat.channels, True)

    def test_delete1_channel(self):
        chat = Chat()
        print("\n\n\n\n\nTEST DELETE1 CHANNEL\n\n\n\n\n\n")
        cherrypy.session = {'username': 'George', 'language': 'en'}
        chat.new_channel(channel='Ducks')
        self.assertEqual(chat.channels['Ducks'].creator, 'George')

        cherrypy.session['username'] = 'Mike'
        response = chat.delete_channel(channel='Ducks')
        self.assertEqual(response['code'], 1)

        cherrypy.session['username'] = 'George'
        response = chat.delete_channel(channel='Ducks')
        self.assertEqual(response['code'], 0)

        response = chat.delete_channel(channel='Ducks')
        self.assertEqual(response['code'], 1)

    def test_join_channel(self):
        chat = Chat()
        print("\n\n\n\n\nTEST JOIN CHANNEL\n\n\n\n\n\n")

        cherrypy.session = {'username': 'George', 'language': 'en'}
        chat.new_channel(channel='Ducks')

        cherrypy.session['username'] = 'Mike'
        response = chat.join_channel(channel='Pucks')
        self.assertEqual(response['code'], 1)

        response = chat.join_channel(channel='Ducks')
        self.assertEqual(response['code'], 0)

    def test_delete_channel(self):
        chat = Chat()
        print("\n\n\n\n\nTEST DELETE CHANNEL\n\n\n\n\n\n")
        cherrypy.session = {'username': 'George', 'language': 'en'}
        chat.new_channel(channel='Ducks')

        cherrypy.session['username'] = 'Mike'
        response = chat.delete_channel(channel='Ducks')
        self.assertEqual(response['code'], 1)

        cherrypy.session['username'] = 'George'
        response = chat.delete_channel(channel='Ducks')
        self.assertEqual(response['code'], 0)

    def test_new_message(self):
        chat = Chat()
        cherrypy.session = {'username': 'George', 'language': 'en'}

        for i in range(0, 10):
            chat.new_message(channel='global', message='message%i' % i)
        self.assertEqual(len(chat.channels['global'].message_log), 10)

        response = chat.new_message(channel='nothing', message='message%i' % i)
        self.assertEqual(response['code'], 1)

    def test_get_updates(self):
        chat = Chat()
        cherrypy.session = {'username': 'George', 'language': 'en'}

        for i in range(0, 10):
            chat.new_message(channel='global', message='message%i' % i)

        response = chat.get_updates(channel='global', index=4)
        self.assertEqual(len(response['data']), 5)
        self.assertEqual(response['data'][0]['index'], 5)
