from unittest import TestCase
from scripts.database import DatabaseController
import sqlite3

conn = sqlite3.connect('./db/messages.db', check_same_thread=False)
c = conn.cursor()


class TestDatabaseController(TestCase):

    def setUp(self):
        self.db = DatabaseController()
        self.db.create_table('global')
        self.db.add_message('hello world', 'user1', 'global')
        self.db.add_message('nice message', 'user2', 'global')

    def tearDown(self):
        self.db.delete_all_entries('global')

    def test_message_added_to_db(self):
        table_entries = self.db.get_all_messages('global')
        self.assertEqual(len(table_entries), 2)
        self.db.add_message('third message', 'user1', 'global')
        table_entries = self.db.get_all_messages('global')
        self.assertEqual(len(table_entries), 3)

    def test_multiple_messages_added(self):
        self.db.add_message('third message', 'user1', 'global')
        self.db.add_message('fourth message', 'user1', 'global')
        table_entries = self.db.get_all_messages('global')
        self.assertEqual(len(table_entries), 4)

    def test_delete_all_entries(self):
        table_entries = self.db.get_all_messages('global')
        self.assertEqual(len(table_entries), 2)
        self.db.delete_all_entries('global')
        table_entries = self.db.get_all_messages('global')
        self.assertEqual(len(table_entries), 0)

    def test_dict_factory(self):
        table_entries = self.db.get_all_messages('global')
        self.assertEqual(table_entries.__class__.__name__, 'list')
        self.assertEqual(table_entries[0].__class__.__name__, 'dict')
        self.assertEqual(table_entries[0]['message'], 'hello world')
