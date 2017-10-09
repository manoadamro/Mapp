import cherrypy
from os import path


class App:
    def __init__(self):
        pass

    @cherrypy.expose()
    def index(self):
        return open(path.join('./app/index.html'))
