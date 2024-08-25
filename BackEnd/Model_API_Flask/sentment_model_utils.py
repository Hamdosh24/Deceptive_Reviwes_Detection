from camel_tools.sentiment import SentimentAnalyzer
import re


# loading SentimentAnalyzer
sa = SentimentAnalyzer("CAMeL-Lab/bert-base-arabic-camelbert-da-sentiment")

def get_review_polarity(text):
  predicted_class = sa.predict([text])
  return predicted_class[0]


def is_arabic(text):
    match_pattern = re.findall('[ا-ي]', text)
    if match_pattern:
        return True
    else:
        return False
