# -*- coding: utf-8 -*-

from google.cloud import translate

def translate_text(text, target='fr'):
    translate_client = translate.Client()
    result = translate_client.translate(text, target_language=target)

    print('Text: ', result['input'])
    print('Translation', result['translatedText'])
    print('Detected source lang: ', result['detectedSourceLanguage'])

example_text = '''I don't know.'''

translate_text(example_text)

# 13896304