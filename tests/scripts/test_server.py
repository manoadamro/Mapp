from unittest import TestCase
import cherrypy
from scripts.server import Server


class TestApp:
    pass


class TestServer(TestCase):

    server = None
    count = 0

    def fake_method(self):
        self.count += 1

    def setUp(self):
        self.count = 0
        self.server = Server({
            '/': TestApp,
            '/two': TestApp,
            '/three': TestApp
        })

    def test_app_config(self):
        self.assertEqual(type(self.server.app_config()), dict)

    def test_build(self):
        cherrypy.tree.apps = {}
        self.server.build()
        self.assertEqual(len(cherrypy.tree.apps), 3)

    def test_start(self):
        self.server.engine.start = self.fake_method
        self.server.engine.block = self.fake_method
        self.server.start()
        self.assertEqual(self.count, 2)
