# -*- coding: utf-8 -*-

from google.cloud import translate
from os import getcwd, environ
from json import loads, dumps, dump
from .private_key_adder import PrivateKeyAdder

path = "%s/config/key.json" % getcwd()
original_key_path = "%s/config/safe-key.json" % getcwd()

environ['GOOGLE_APPLICATION_CREDENTIALS'] = path


class Translator:
    def __init__(self):
        self.private_key_adder = PrivateKeyAdder(path, original_key_path)
        pass

    def translate_text(self, text, target='en'):
        self.private_key_adder.add_google_key_to_json_file()
        self.translate_client = translate.Client()
        result = self.translate_client.translate(text, target_language=target)
        self.private_key_adder.reset_key()
        return result['translatedText']
