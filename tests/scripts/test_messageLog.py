from unittest import TestCase
from scripts.message_log import MessageLog


class TestMessageLog(TestCase):

    def test_add_message(self):
        log = MessageLog()
        self.assertEqual(len(log), 0)
        log.add_message(text='some message', author='me')
        self.assertEqual(len(log), 1)
        self.assertEqual(log.message_list[0]['text'], 'some message')
        self.assertIsNotNone(log.message_list[0]['author'])

    def test_get_messages(self):
        log = MessageLog()
        for i in range(0, 10):
            log.add_message(text='message%i' % i, author='me')

        updates = log.get_messages(4)
        self.assertEqual(len(updates), 5)
        self.assertEqual(updates[0]['index'], 5)

