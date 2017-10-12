import cherrypy
from scripts.controller import Controller


class Session(Controller):

    @cherrypy.expose(alias='login')
    @cherrypy.tools.json_out()
    def login(self, **params):
        if 'username' not in params:
            return self.error(message='no username provided')
        elif 'language' not in params:
            return self.error(message='no target language provided')
        elif 'username' in cherrypy.session:
            return self.error(message='already logged in')
        else:
            cherrypy.session['username'] = params['username']
            cherrypy.session['language'] = params['language']
            return self.ok()

    @cherrypy.expose(alias='logout')
    @cherrypy.tools.json_out()
    def logout(self, **_params):
        if 'username' in cherrypy.session:
            del cherrypy.session['username']
            return self.ok()
        else:
            return self.error(message='user not logged in')
