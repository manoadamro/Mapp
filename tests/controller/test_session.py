from unittest import TestCase
from controllers.session import Session
import cherrypy
from cherrypy.test import helper

class TestSession(TestCase):
    def test_login(self):
        sesh = Session()
        sesh.login(username='Liz')
        self.assertEqual(cherrypy.session['username'], 'Liz')


    def test_logout(self):
        self.fail()
