from unittest import TestCase
from os.path import basename
from controllers.app import App


class TestApp(TestCase):

    app = None
    file = None
    html = None

    def setUp(self):
        self.app = App()
        self.file = self.app.index()
        self.html = self.file.read()

    def tearDown(self):
        self.file.close()

    def test_index(self):
        self.assertRegex(self.html, '<!DOCTYPE html>', 'should return a valid html document')
        self.assertEqual(basename(self.file.name), 'index.html', 'should return index.html')
