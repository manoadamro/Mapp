# -*- coding: utf-8 -*-

from google.cloud import translate
from os import getcwd, environ


# environ['GOOGLE_APPLICATION_CREDENTIALS'] = '%s/config/google.json' % getcwd()
# environ['GOOGLE_APPLICATION_CREDENTIALS'] = environ.get('GOOGLE_APPLICATION_CREDENTIALS')



class Translator:
    def __init__(self):
        self.translate_client = translate.Client()

    def translate_text(self, text, target='en'):
        result = self.translate_client.translate(text, target_language=target)
        return result['translatedText']
