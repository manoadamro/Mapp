from config.routes import site_map
from scripts.server import Server


def main(serverklass=Server):
    server = serverklass(site_map)
    server.build()
    server.start()
    return server


if __name__ == '__main__':
    main()
