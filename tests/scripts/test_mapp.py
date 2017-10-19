
from unittest import TestCase
from mapp import main


class TestMapp(TestCase):

    def test_main(self):
        server = main(FakeServer)
        self.assertEqual(server.count, 3)


class FakeServer:

    count = 0

    def fake_method(self, *_args, **_kwargs):
        self.count += 1
        return None

    __init__ = fake_method
    build = fake_method
    start = fake_method
