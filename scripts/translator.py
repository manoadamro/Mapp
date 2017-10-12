# -*- coding: utf-8 -*-

from google.cloud import translate
from os import getcwd, environ
from json import loads


print(environ['GOOGLE_APPLICATION_CREDENTIALS'])

f = open(environ['GOOGLE_APPLICATION_CREDENTIALS'], 'r')
j = f.read()
f.close()
print(j)

# environ['GOOGLE_APPLICATION_CREDENTIALS'] = j

print(environ['GOOGLE_APPLICATION_CREDENTIALS'])
class Translator:
    def __init__(self):
        self.translate_client = translate.Client.from_service_account_json(environ['GOOGLE_APPLICATION_CREDENTIALS'])

    def translate_text(self, text, target='en'):
        result = self.translate_client.translate(text, target_language=target)
        return result['translatedText']
