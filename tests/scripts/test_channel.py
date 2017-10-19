from unittest import TestCase
from scripts.channel import Channel


class TestChannel(TestCase):

    def test_add_user(self):
        channel = Channel()
        channel.add_user(uid='1')
        self.assertEqual(len(user_log), 1)