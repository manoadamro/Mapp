from os import getcwd, environ
from json import loads, dumps, dump


class PrivateKeyAdder:

    def __init__(self, path, original_key_path):
        self.path = path
        self.original_key_path = original_key_path

    path = "%s/config/key.json" % getcwd()

    def add_google_key_to_json_file(self):
        file = open(self.path, 'r')
        json = loads(file.read())
        file.close()
        json["private_key_id"] = environ["PRIVATE_KEY_ID_TRANSLATOR"]
        json["private_key"] = environ["PRIVATE_KEY_TRANSLATOR"]
        file = open(self.path, 'w')
        file.write(dumps(json, separators=(',', ':')))
        file.close()

    def add_google_key_to_json_file(self):
        file = open(self.path, 'r')
        json = loads(file.read())
        file.close()
        json["private_key_id"] = environ["PRIVATE_KEY_ID_TRANSLATOR"]
        json["private_key"] = environ["PRIVATE_KEY_TRANSLATOR"]
        file = open(self.path, 'w')
        file.write(dumps(json, separators=(',', ':')))
        file.close()

    def reset_key(self):
        file = open(self.original_key_path, 'r')
        original_key_info = loads(file.read())
        file.close()
        file = open(self.path, 'w')
        file.write(dumps(original_key_info, separators=(',', ':')))
        file.close()
