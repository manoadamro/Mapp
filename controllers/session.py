import cherrypy
from scripts.controller import Controller


class Session(Controller):

    users = []

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
            self.users.append(params['username'])
            return self.ok()

    @cherrypy.expose(alias='logout')
    @cherrypy.tools.json_out()
    def logout(self, **_params):
        if 'username' in cherrypy.session:
            user = cherrypy.session['username']
            self._perge_user(user)
            del cherrypy.session['username']
            return self.ok()
        else:
            return self.error(message='user not logged in')

    @cherrypy.expose(alias='users')
    @cherrypy.tools.json_out()
    def user_list(self, **_params):
        return self.ok(data=self.users)

    def _perge_user(self, user):
        self.users.remove(user)
        if '/chat' in cherrypy.tree.apps:
            chans = cherrypy.tree.apps['/chat'].root.channels
            for chan in chans:
                if chans[chan].contains_user(user):
                    chans[chan].remove_user(user)
