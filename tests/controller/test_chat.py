from unittest import TestCase
import cherrypy
from controllers.chat import Chat
from scripts.channel import Channel


class TestChat(TestCase):

    chat = None
    channel_name = 'testChan'
    white_list = '*'
    username = 'test'
    language = 'en'

    fake_return = None

    def fakeMethod(self, *args, **kwargs):
        return self.fake_return

    def setUp(self):
        cherrypy.session = {}
        self.chat = Chat()
        self.chat.db.create_table = self.fakeMethod
        self.chat.db.get_all_messages = self.fakeMethod
        self.chat.translator.translate_text = self.fakeMethod

    def tearDown(self):
        pass

    def test_new_channel_with_no_channel_name(self):
        response = self.chat.new_channel()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'No channel name given')

    def test_new_channel_with_no_white_list(self):
        response = self.chat.new_channel(channel=self.channel_name, username=self.username)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'No white_list given')

    def test_new_channel_when_not_logged_in(self):
        response = self.chat.new_channel(channel=self.channel_name, username=self.username, white_list=self.white_list)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'You must be logged into to create channels')

    def test_new_channel_with_duplicate_name(self):
        cherrypy.session['username'] = self.username
        self.chat.channels[self.channel_name] = object()
        response = self.chat.new_channel(channel=self.channel_name, username=self.username, white_list=self.white_list)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'Channel name already exists')

    def test_valid_new_channel(self):
        cherrypy.session['username'] = self.username
        response = self.chat.new_channel(channel=self.channel_name, username=self.username, white_list=self.white_list)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_delete_channel_with_no_channel_name(self):
        response = self.chat.delete_channel()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_delete_channel_when_not_logged_in(self):
        response = self.chat.delete_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to delete channels')

    def test_delete_channel_that_doesnt_exist(self):
        cherrypy.session['username'] = self.username
        response = self.chat.delete_channel(channel=self.channel_name + '1')
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'channel does not exist')

    def test_delete_channel_that_isnt_owned_by_user(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username + '1', '*')
        self.chat.channels[self.channel_name] = chan
        response = self.chat.delete_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'only the channel creator can delete the channel')

    def test_valid_delete_channel(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        response = self.chat.delete_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_join_channel_with_no_channel_name(self):
        response = self.chat.join_channel()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_join_channel_when_not_logged_in(self):
        response = self.chat.join_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to join channels')

    def test_join_channel_that_doesnt_exist(self):
        cherrypy.session['username'] = self.username
        response = self.chat.join_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'Channel does not exist')

    def test_join_channel_when_already_joined(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        chan.user_log.append(self.username)
        response = self.chat.join_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'You are already in this channel')

    def test_valid_join_channel(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        response = self.chat.join_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_leave_channel_with_no_channel_name(self):
        response = self.chat.leave_channel()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_leave_channel_when_not_logged_in(self):
        response = self.chat.leave_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to join channels')

    def test_leave_channel_when_not_in_channel(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        response = self.chat.leave_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'You are not in this channel')

    def test_valid_leave_channel(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        chan.user_log.append(self.username)
        response = self.chat.leave_channel(channel=self.channel_name)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_new_message_with_no_channel_name(self):
        response = self.chat.new_message()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_new_message_with_no_message(self):
        response = self.chat.new_message(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no message provided')

    def test_new_message_when_not_logged_in(self):
        response = self.chat.new_message(channel=self.channel_name, message='suhh')
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to send messages')

    def test_new_message_on_channel_that_doesnt_exist(self):
        cherrypy.session['username'] = self.username
        response = self.chat.new_message(channel=self.channel_name, message='suhh')
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'channel does not exist')

    def test_valid_new_message(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        chan.user_log.append(self.username)
        response = self.chat.new_message(channel=self.channel_name, message='suhh')
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_get_updates_with_no_channel(self):
        response = self.chat.get_updates()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_get_updates_with_no_language(self):
        response = self.chat.get_updates(channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no target language provided')

    def test_get_updates_with_no_index(self):
        response = self.chat.get_updates(channel=self.channel_name, language=self.language)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no index provided')

    def test_get_updates_when_not_logged_in(self):
        response = self.chat.get_updates(channel=self.channel_name, language=self.language, index=-1)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to get messages')

    def test_get_updates_on_channel_that_doesnt_exist(self):
        cherrypy.session['username'] = self.username
        response = self.chat.get_updates(channel=self.channel_name, language=self.language, index=-1)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'channel does not exist')

    def test_valid_get_updates(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, '*')
        self.fake_return = [{'code': 1, 'message': '', 'data': []}]
        chan.message_log.get_messages = self.fakeMethod
        self.chat.channels[self.channel_name] = chan
        chan.user_log.append(self.username)
        response = self.chat.get_updates(channel=self.channel_name, language=self.language, index=-1)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_channel_list_when_not_logged_in(self):
        response = self.chat.channel_list()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to get channels')

    def test_valid_channel_list(self):
        cherrypy.session['username'] = self.username
        self.chat.channels = {
            't1': Channel('t1', self.username, ['*']),
            't2': Channel('t2', self.username, [self.username]),
            't3': Channel('t2', self.username, [self.username + '1'])
        }
        response = self.chat.channel_list()
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')
        self.assertEqual(len(response['data']), 2)

    def test_channel_white_list_with_no_channel(self):
        response = self.chat.channel_white_list()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_valid_channel_white_list(self):
        chan = Channel(self.channel_name, self.username, '*')
        self.chat.channels[self.channel_name] = chan
        response = self.chat.channel_white_list(channel=self.channel_name)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')

    def test_add_to_whitelist_with_no_username(self):
        response = self.chat.add_to_whitelist()
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no username provided')

    def test_add_to_whitelist_with_no_channel(self):
        response = self.chat.add_to_whitelist(username=self.username)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'no channel name provided')

    def test_add_to_whitelist_when_not_logged_in(self):
        response = self.chat.add_to_whitelist(username=self.username, channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you must be logged in to edit white lists')

    def test_add_to_whitelist_when_already_in_whitelist(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, [self.username])
        self.chat.channels[self.channel_name] = chan
        response = self.chat.add_to_whitelist(username=self.username, channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'user is already in whitelist')

    def test_add_to_whitelist_with_no_permissions(self):
        cherrypy.session['username'] = self.username + '1'
        chan = Channel(self.channel_name, self.username, [self.username])
        self.chat.channels[self.channel_name] = chan
        response = self.chat.add_to_whitelist(username=self.username, channel=self.channel_name)
        self.assertEqual(response['code'], 1)
        self.assertEqual(response['message'], 'you do not have permission to edit this whitelist')

    def test_valid_add_to_whitelist(self):
        cherrypy.session['username'] = self.username
        chan = Channel(self.channel_name, self.username, [self.username])
        self.chat.channels[self.channel_name] = chan
        response = self.chat.add_to_whitelist(username=self.username + '1', channel=self.channel_name)
        self.assertEqual(response['code'], 0)
        self.assertEqual(response['message'], '')
