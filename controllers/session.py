import cherrypy
from scripts.controller import Controller


class Session(Controller):

    def __init__(self):
        pass

    @cherrypy.expose(alias='login')
    @cherrypy.tools.json_out()
    def login(self, **params):
        if 'username' not in params:
            self.error(message='no username provided')
        else:
            cherrypy.session['username'] = params['username']
            self.ok()

    @cherrypy.expose(alias='logout')
    @cherrypy.tools.json_out()
    def logout(self, **_params):
        if 'username' in cherrypy.session:
            del cherrypy.session['username']
        else:
            self.error(message='user not logged in')
            self.ok()
