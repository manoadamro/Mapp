import cherrypy
from scripts.controller import Controller


class Session(Controller):

    def __init__(self):
        self.users = []

    @cherrypy.expose(alias='login')
    @cherrypy.tools.json_out()
    def login(self, **params):
        if 'username' not in params:
            return self.error(message='no username provided')
        elif 'username' in cherrypy.session:
            return self.error(message='already logged in')
        else:
            cherrypy.session['username'] = params['username']
            self.users.append(params['username'])
            return self.ok()

    @cherrypy.expose(alias='logout')
    @cherrypy.tools.json_out()
    def logout(self, **_params):
        if 'username' in cherrypy.session:
            user = cherrypy.session['username']
            self._purge_user(user)
            self.users.remove(user)
            del cherrypy.session['username']
        return self.ok()

    @cherrypy.expose(alias='user_list')
    @cherrypy.tools.json_out()
    def users(self, **_params):
        return self.ok(data=self.users)

    def _purge_user(self, user):
        if '/chat' in cherrypy.tree.apps:
            chans = cherrypy.tree.apps['/chat'].root.channels
            for chan in chans:
                if chans[chan].contains_user(user):
                    chans[chan].remove_user(user)
