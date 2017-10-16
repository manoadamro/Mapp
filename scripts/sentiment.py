from nltk.sentiment.sentiment_analyzer import SentimentAnalyzer


class Sentiment:
    def __init__(self):
        self.analyzer = SentimentAnalyzer()

    def analyze(self, text):
        # analyze and return num between -1 and 1
        return 0
        pass
