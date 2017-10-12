# -*- coding: utf-8 -*-

from google.cloud import translate
from os import getcwd, environ
from json import loads, dumps, dump
path = "%s/config/key.json" % getcwd()
environ['GOOGLE_APPLICATION_CREDENTIALS'] = path

file = open(path, 'r')
json = loads(file.read())
file.close()
json["private_key_id"] = environ["PRIVATE_KEY_ID_TRANSLATOR"]
print("\n\n\n %s\n\n\n" % environ["PRIVATE_KEY_ID_TRANSLATOR"])
json["private_key"] = environ["PRIVATE_KEY_TRANSLATOR"]
file = open(path, 'w')
file.write(dumps(json, separators=(',',':')))
file.close()


class Translator:
    def __init__(self):
        self.translate_client = translate.Client()

    def translate_text(self, text, target='en'):
        result = self.translate_client.translate(text, target_language=target)
        return result['translatedText']
