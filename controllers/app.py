import cherrypy
from os import path
from scripts.controller import Controller


class App(Controller):
    def __init__(self):
        pass

    @cherrypy.expose()
    def index(self):
        return open(path.join('views/index.html'))