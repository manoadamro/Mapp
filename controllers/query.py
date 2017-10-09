import cherrypy


class Query:

    def __init__(self):
        pass

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def online(self, **params):

        """
        gets data for all online users and packages it into json object
        :param params: GET params
        :return: a json object containing all online users
        """
        pass

    def find(self, **params):

        """
        gets single user by specified search field and packages into json object
        :param params: GET params
        :return: a json object containing single user if found or response if not
        """
        pass
