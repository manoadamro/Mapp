import cherrypy


class Message:
    def __init__(self):
        pass

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def new(self, **params):

        """
        for sending a new message
        :param params: POST params
        :return: json response
        """
        pass

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def update(self, **params):

        """
        for updating received messages
        :param params: GET params
        :return: json response
        """

        pass
