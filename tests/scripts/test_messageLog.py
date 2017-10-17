from unittest import TestCase
from scripts.message_log import MessageLog
import sqlite3

conn = sqlite3.connect('./db/messages.db', check_same_thread=False)
c = conn.cursor()


class TestMessageLog(TestCase):

    def test_add_message(self):
        log = MessageLog()
        self.assertEqual(len(log), 0)
        log.add_message(text='some message', author='me', channel='global')
        self.assertEqual(len(log), 1)
        self.assertEqual(log.message_list[0]['text'], 'some message')
        self.assertIsNotNone(log.message_list[0]['author'])

    def test_get_messages(self):
        log = MessageLog()
        old_updates = log.get_messages('global', 4)
        old_updates_length = len(old_updates)
        for i in range(0, 10):
            log.add_message(text='message%i' %
                            i, author='me', channel='global')
        updates = log.get_messages('global', 4)
        self.assertEqual(len(updates), (old_updates_length + 10))

    def test_message_added_to_db(self):
        log = MessageLog()
        log.add_message(text='dbmessage', author='me', channel='global')
        c.execute(
            "SELECT * FROM global WHERE author = 'me' AND message='dbmessage'")
        data = c.fetchall()
        self.assertEqual(len(data), 1)
