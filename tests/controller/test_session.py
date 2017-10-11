from unittest import TestCase
from controllers.session import Session
import cherrypy


class TestSession(TestCase):

    def test_login(self):
        sesh = Session()
        cherrypy.session = {}
        sesh.login(username='Liz')
        self.assertEqual(cherrypy.session['username'], 'Liz')

    def test_logout(self):
        sesh = Session()
        cherrypy.session = {}
        sesh.login(username='Liz')
        sesh.logout()
        self.assertNotIn('username', cherrypy.session)
