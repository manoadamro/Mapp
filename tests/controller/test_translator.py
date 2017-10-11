from unittest import TestCase
from controllers.translator import Translator


class TestTranslate(TestCase):
    def test_translate_french_to_english(self):
        translator = Translator()
        self.assertEqual(translator.translate_text('bonjour'), 'Hello')