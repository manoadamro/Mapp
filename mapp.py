
from lib.server import Server
from controllers import site_map


if __name__ == '__main__':
    server = Server(site_map)
    server.build()
    server.start()

