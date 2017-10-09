from lib.server import Server
from config.routes import site_map
from os import getcwd


if __name__ == '__main__':
    app_dir = getcwd()
    server = Server(site_map, app_dir)
    server.build()
    server.start()

