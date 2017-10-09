import cherrypy
from lib.message_log import MessageLog


class Message:
    def __init__(self):
        self.message_log = MessageLog()

    @cherrypy.expose(alias='new')
    @cherrypy.tools.json_out()
    def new_message(self, **params):
        """
        for sending a new message
        :param params: POST params
        :return: json response
        """
        pass

    @cherrypy.expose(alias='updates')
    @cherrypy.tools.json_out()
    def get_updates(self, **params):

        """
        for updating received messages
        :param params: GET params
        :return: json response
        """
        pass
