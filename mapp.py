from lib.server import Server
from config.routes import site_map
from os.path import dirname


if __name__ == '__main__':
    app_dir = dirname(__file__)
    server = Server(site_map, app_dir)
    server.build()
    server.start()
