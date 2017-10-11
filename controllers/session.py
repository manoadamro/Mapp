import cherrypy
from scripts.controller import Controller


class Session(Controller):

    def __init__(self):
        self.users = []

    @cherrypy.expose(alias='login')
    @cherrypy.tools.json_out()
    def login(self, **params):
        if 'username' not in params:
            self.error(message='no username provided')
        elif params['username'] in self.users:
            self.error(message='already logged in')
        else:
            cherrypy.session['username'] = params['username']
            self.users.append(params['username'])
            self.ok()

    @cherrypy.expose(alias='logout')
    @cherrypy.tools.json_out()
    def logout(self, **_params):
        if 'username' in cherrypy.session and cherrypy.session['username'] in self.users:
            self.users.remove(cherrypy.session['username'])
            del cherrypy.session['username']
        else:
            self.error(message='user not logged in')
            self.ok()
