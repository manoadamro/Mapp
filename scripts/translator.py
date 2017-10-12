# -*- coding: utf-8 -*-

from google.cloud import translate
from os import getcwd, environ
from json import loads, dumps
path = "%s/config/google.json" % getcwd()

file = open(path, 'r')
json = loads(file.read())
file.close()

print(json)

json['private_key_id'] = environ["PRIVATE_KEY_ID_TRANSLATOR"]
json['private_key'] = environ["PRIVATE_KEY_TRANSLATOR"]

file = open(path, 'w')
file.write(dumps(json))
file.close()

print(json)

class Translator:
    def __init__(self):
        self.translate_client = translate.Client.from_service_account_json(environ['GOOGLE_APPLICATION_CREDENTIALS'])

    def translate_text(self, text, target='en'):
        result = self.translate_client.translate(text, target_language=target)
        return result['translatedText']
