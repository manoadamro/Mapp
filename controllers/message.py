import cherrypy

from scripts.message_log import MessageLog
from scripts.translator import Translator


class Message:
    def __init__(self):
        self.message_log = MessageLog()
        self.translator = Translator()

    @cherrypy.expose(alias='new')
    @cherrypy.tools.json_out()
    def new_message(self, **params):
        """
        for sending a new message
        :param params: POST params
        :return: json response
        """
        translated_text = self.translator.translate_text(params['message'], 'en')
        self.message_log.add_message(translated_text)

    @cherrypy.expose(alias='updates')
    @cherrypy.tools.json_out()
    def get_updates(self, **params):

        """
        for updating received messages
        :param params: GET params
        :return: json response
        """
        return self.message_log.get_messages(int(params['index']))
