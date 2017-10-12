from unittest import TestCase
from controllers.session import Session
import cherrypy


class TestSession(TestCase):

    def test_login(self):
        sesh = Session()
        cherrypy.session = {}
        response = sesh.login(username='Liz', language='en')
        self.assertEqual(response['code'], 0)
        self.assertEqual(cherrypy.session['username'], 'Liz')

        response = sesh.login(username='Liz', language='en')
        self.assertEqual(response['code'], 1)

    def test_logout(self):
        sesh = Session()
        cherrypy.session = {}
        sesh.login(username='Liz', language='en')
        response = sesh.logout()
        self.assertEqual(response['code'], 0)
        self.assertNotIn('username', cherrypy.session)

        response = sesh.logout()
        self.assertEqual(response['code'], 1)
