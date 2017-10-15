# from nltk.sentiment import SentimentAnalyzer
#
# s = SentimentAnalyzer()
#
# sentiment_value, confidence = s.sentiment(text)
# print(text, sentiment_value, confidence)
# if confidence * 100 >= 60:
#     print('super confident!')

from nltk import word_tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.sentiment import SentimentAnalyzer


s = SentimentAnalyzer()


s.evaluate(test_set="Wow, this is great!")
