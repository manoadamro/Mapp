import cherrypy
from scripts.channel import Channel
from scripts.controller import Controller


class Chat(Controller):
    def __init__(self):
        self.channels = {}

    @cherrypy.expose(alias='create')
    @cherrypy.tools.json_out()
    def new_channel(self, **params):
        channel = params['channel'] if 'channel' in params else ''
        user = ''  # from session
        # make sure channel doesnt exist
        # create channel object & add to dict
        # add creator to channel
        # return ok or error
        pass

    @cherrypy.expose(alias='delete')
    @cherrypy.tools.json_out()
    def delete_channel(self, **params):
        channel = params['channel'] if 'channel' in params else ''
        user = ''  # from session
        # make sure channel exists
        # make sure session user is creator
        # remove channel
        # return ok or error
        pass

    @cherrypy.expose(alias='join')
    @cherrypy.tools.json_out()
    def join_channel(self, **params):
        channel = params['channel'] if 'channel' in params else ''
        user = ''  # from session
        # make sure channel exists
        # make sure user is not already in channel
        # add user to channel
        # return ok or error
        pass

    @cherrypy.expose(alias='leave')
    @cherrypy.tools.json_out()
    def leave_channel(self, **params):
        channel = params['channel'] if 'channel' in params else ''
        user = ''  # from session
        # make sure channel exists
        # make sure user is in channel
        # remove user from channel
        # return ok or error
        pass

    @cherrypy.expose(alias='message')
    @cherrypy.tools.json_out()
    def new_message(self, **params):
        channel = params['channel'] if 'channel' in params else ''
        message = params['message'] if 'message' in params else ''
        # make sure channel exists
        self.channels[channel].add_message(message)
        return self.ok()

    @cherrypy.expose(alias='update')
    @cherrypy.tools.json_out()
    def get_updates(self, **params):
        channel = params['channel'] if 'channel' in params else ''
        index = int(params['index']) if 'index' in params else ''
        # make sure channel exists
        data = self.channels[channel].get_messages(index)
        return self.ok(data=data)
