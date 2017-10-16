from unittest import TestCase
from scripts.message_log import MessageLog
import sqlite3

conn = sqlite3.connect('./db/messenger.db', check_same_thread=False)
c = conn.cursor()


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

    def test_message_added_to_db(self):
        log = MessageLog()
        log.add_message('dbmessage', 'me')
        c.execute(
            "SELECT * FROM chatMessages WHERE author = 'me' AND message='dbmessage'")
        data = c.fetchall()
        print("\n\n\n\n%s\n\n\n\n" % data)
        self.assertEqual(len(data), 1)
