# -*- coding: utf-8 -*-

from google.cloud import translate


class Translator:
    def translate_text(self, text, target='en'):
        translate_client = translate.Client()
        result = translate_client.translate(text, target_language=target)
        return result['translatedText']