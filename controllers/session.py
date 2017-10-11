import cherrypy
from scripts.controller import Controller


class Session(Controller):

    def __init__(self):
        pass

    @cherrypy.expose(alias='login')
    # @cherrypy.tools.json_out()
    def login(self,**params):
        cherrypy.session['username'] = 'Liz'
        return cherrypy.session['username']

    def logout(self,**params):
        pass