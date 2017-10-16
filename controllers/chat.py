import cherrypy
from scripts.channel import Channel
from scripts.controller import Controller
from scripts.translator import Translator


class Chat(Controller):
    def __init__(self):
        self.channels = {'global': Channel('global', 'system', ['*'])}
        self.translator = Translator()

    @cherrypy.expose(alias='create')
    @cherrypy.tools.json_out()
    def new_channel(self, **params):
        # param checks
        if 'channel' not in params:
            return self.error(message='No channel name given')
        elif 'username' not in cherrypy.session:
            return self.error(message='You must be logged into to create channels')

        if 'white_list' in params:
            white_list = [cherrypy.session['username']]
        else:
            white_list = ['*']

        # values
        channel_name = params['channel']
        user = cherrypy.session['username']
        channel = Channel(channel_name, user, white_list)

        # value checks
        if channel_name in self.channels:
            return self.error(message='Channel name already exists')

        # complete action
        self.channels[channel_name] = channel
        # self.channels[channel_name].add_user(user)
        return self.ok()

    @cherrypy.expose(alias='delete')
    @cherrypy.tools.json_out()
    def delete_channel(self, **params):
        # param checks
        if 'channel' not in params:
            return self.error(message='no channel name provided')

        # values
        user = cherrypy.session['username']
        channel_name = params['channel']

        # value checks
        if channel_name not in self.channels:
            return self.error(message='channel does not exist')
        elif self.channels[channel_name].creator is not user:
            return self.error(message='only the channel creator can delete the channel')

        # complete action
        del self.channels[channel_name]
        return self.ok()

    @cherrypy.expose(alias='join')
    @cherrypy.tools.json_out()
    def join_channel(self, **params):
        # param checks
        if 'channel' not in params:
            return self.error(message='no channel name provided')

        if '*' not in self.channels[params['channel']].whitelist and cherrypy.session['username'] not in self.channels[params['channel']].whitelist:
            return self.error(message='you do not have permission to enter this channel')

        # values
        channel_name = params['channel']
        user = cherrypy.session['username']

        # value checks
        if channel_name not in self.channels:
            return self.error(message='Channel does not exist')
        elif user in self.channels[channel_name].user_log:
            return self.error(message='You are already in this channel')

        # complete action
        self.channels[channel_name].add_user(user)
        print(self.channels[channel_name].user_log)
        return self.ok()

    @cherrypy.expose(alias='leave')
    @cherrypy.tools.json_out()
    def leave_channel(self, **params):
        # param checks
        if 'channel' not in params:
            return self.error(message='no channel name provided')

        # values
        channel_name = params['channel']
        user = cherrypy.session['username']

        # value checks
        if user not in self.channels[channel_name].user_log:
            return self.error(message='You are not in this channel')

        # complete action
        self.channels[channel_name].remove_user(user)
        return self.ok()

    @cherrypy.expose(alias='message')
    @cherrypy.tools.json_out()
    def new_message(self, **params):
        # param checks
        if 'channel' not in params:
            return self.error(message='no channel name provided')
        elif 'message' not in params:
            return self.error(message='no message provided')

        # values
        user = cherrypy.session['username']
        channel_name = params['channel']
        message = params['message']

        # value checks
        if channel_name not in self.channels:
            return self.error(message='channel does not exist')

        # complete action
        self.channels[channel_name].add_message(user, message)
        return self.ok()

    @cherrypy.expose(alias='update')
    @cherrypy.tools.json_out()
    def get_updates(self, **params):
        # param checks
        if 'channel' not in params:
            return self.error(message='no channel name provided')

        # values
        channel_name = params['channel']
        index = int(params['index'])

        # value checks
        if channel_name not in self.channels:
            return self.error(message='channel does not exist')

        # complete action
        data = self.channels[channel_name].get_messages(index)

        target_language = cherrypy.session['language']

        for message in data:
            message['text'] = self.translator.translate_text(message['text'], target_language)

        return self.ok(data=data)

    @cherrypy.expose(alias='language')
    @cherrypy.tools.json_out()
    def change_language(self, **params):
        if 'language' not in params:
            return self.error(message='no target language provided')

        cherrypy.session['language'] = params['language']
        return self.ok()

    @cherrypy.expose(alias='list')
    @cherrypy.tools.json_out()
    def channel_list(self, **_params):
        list = []
        if 'username' in cherrypy.session:
            for channel in self.channels:
                 if cherrypy.session['username'] in self.channels[channel].whitelist or '*' in self.channels[channel].whitelist:
                    list.append(channel)

        return self.ok(data=list)

    @cherrypy.expose(alias='add_user')
    @cherrypy.tools.json_out()
    def add_user_to_channel(self, **params):
        if 'channel' not in params:
            return self.error(message='no channel name provided')
        if 'user' not in params:
            return self.error(message='no username provided')\

        if params['user'] not in self.channels[params['channel']].whitelist and '*' not in self.channels[params['channel']].whitelist:
            self.channels[params['channel']].whitelist.append(params['user'])

        return self.ok()

