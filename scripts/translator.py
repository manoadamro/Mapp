# -*- coding: utf-8 -*-

from google.cloud import translate
from os import getcwd, environ


environ['GOOGLE_APPLICATION_CREDENTIALS'] = '%s/config/google.json' % getcwd()


class Translator:

    def translate_text(self, text, target='en'):
        self.translate_client = translate.Client()
        result = self.translate_client.translate(text, target_language=target)
        return result['translatedText']
