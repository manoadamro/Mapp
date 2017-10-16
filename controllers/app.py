import cherrypy
from os import path
from scripts.controller import Controller


class App(Controller):
    def __init__(self):
        pass

    @cherrypy.expose()
    def index(self):
        return open(path.join('views/index.html'))

    @cherrypy.expose()
    def sentiment(self):
        """
        Serves the app page (index.html)
        :return: the html file
        """

        return open(path.join('views/sentiment_api_test.html'))
