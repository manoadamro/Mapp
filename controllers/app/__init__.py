import cherrypy
from os import path


class App:
    def __init__(self):
        pass

    @cherrypy.expose()
    def index(self):

        """
        Serves the app page (index.html)
        :return: the html file
        """

        return open(path.join('./app/index.html'))