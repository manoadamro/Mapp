from unittest import TestCase
from controllers.chat import Chat


class TestChat(TestCase):

    chat = None

    def setUp(self):
        self.chat = Chat()

    def tearDown(self):
        pass

    def test_new_channel(self):
        self.assertTrue(True)

    def test_delete_channel(self):
        self.assertTrue(True)

    def test_join_channel(self):
        self.assertTrue(True)

    def test_leave_channel(self):
        self.assertTrue(True)

    def test_new_message(self):
        self.assertTrue(True)

    def test_get_updates(self):
        self.assertTrue(True)

    def test_channel_list(self):
        self.assertTrue(True)

    def test_channel_white_list(self):
        self.assertTrue(True)

    def test_add_to_whitelist(self):
        self.assertTrue(True)
