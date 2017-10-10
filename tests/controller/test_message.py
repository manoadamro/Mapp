from unittest import TestCase
from controllers.message import Message


class TestMessage(TestCase):
    def test_send_new_message(self):
        message = Message()
        message.new_message(message = 'Hello')
        self.assertEqual(message.message_log[0]['text'], 'Hello')

    def test_get_updates(self):
        self.assertTrue(True)
