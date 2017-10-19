from unittest import TestCase
from scripts.channel import Channel


class TestChannel(TestCase):

    channel = None
    channel_name = 'testChan'
    username = 'test'
    white_list = ['test']
    fake_return = None

    def fake_method(self, *args, **kwargs):
        return self.fake_return

    def setUp(self):
        self.channel = Channel(self.channel_name, self.username, self.white_list)

    def test_add_user(self):
        self.channel.add_user('user')
        self.assertEqual(len(self.channel.user_log), 1)
        self.assertEqual(self.channel.user_log[0], 'user')

    def test_remove_user(self):
        self.channel.user_log = ['user1', 'user2']
        self.channel.remove_user('user2')
        self.assertEqual(len(self.channel.user_log), 1)
        self.assertEqual(self.channel.user_log[0], 'user1')

    def test_contains_user(self):
        self.channel.user_log = ['user1', 'user2']
        self.assertTrue(self.channel.contains_user('user2'))

    def test_add_message(self):
        self.channel.message_log.db.add_message = self.fake_method
        self.channel.add_message(self.username, 'hello', self.channel)
        self.assertEqual(len(self.channel.message_log), 1)
        self.assertEqual(self.channel.message_log[0]['text'], 'hello')

    def test_get_messages(self):
        self.fake_return = [1, 2, 3, 4, 5]
        self.channel.message_log.db.get_all_messages = self.fake_method
        response = self.channel.get_messages(self.channel_name, -1)
        self.assertEqual(len(response), 5)
