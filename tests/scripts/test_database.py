from unittest import TestCase
from scripts.database import DatabaseController
import sqlite3

conn = sqlite3.connect('./db/messages.db', check_same_thread=False)
c = conn.cursor()


class TestDatabaseController(TestCase):

    def setUp(self):
        self.db = DatabaseController()
        self.db.create_table('global')

    def tearDown(self):
        self.db.delete_all_entries()

    def test_message_added_to_db(self):
        self.db.add_message('hello world', 'user1', 'global')
        self.assertEqual(len(self.db.get_all_messages), 1)
