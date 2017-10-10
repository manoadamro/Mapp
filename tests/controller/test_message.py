from unittest import TestCase
from controllers.message import Message


class TestMessage(TestCase):
    def test_send_new_message(self):
        message = Message()
        message.new_message(message='Hello')
        self.assertEqual(message.message_log[0]['text'], 'Hello')

    def test_get_updates(self):
        message = Message()
        for i in range(0, 10):
            message.new_message(message='message%i' % i)
        messages = message.get_updates(index=5)
        self.assertEqual(len(messages), 4)
        self.assertEqual(messages[0]['text'], 'message6')
