from unittest import TestCase
from controllers.chat import Chat


class TestMessage(TestCase):
    def test_send_new_message(self):
        message = Chat()
        message.new_message(message='Hello')
        self.assertEqual(message.message_log[0]['text'], 'Hello')

    def test_get_updates(self):
        message = Chat()
        for i in range(0, 10):
            message.new_message(message='message%i' % i)
        messages = message.get_updates(index=5)
        self.assertEqual(len(messages), 4)
        self.assertEqual(messages[0]['text'], 'message6')
