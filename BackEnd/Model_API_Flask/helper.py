from classification_model_utils import get_model_prediction, get_review_label
from sentment_model_utils import get_review_polarity, is_arabic


def get_prediction(input_texts):
    output = {
        "reviews_info": [],
    }

    for text in input_texts:
        if is_arabic(text['text']):
            pred_vec = get_model_prediction(text['text'])
            label = get_review_label(pred_vec)
            polarity = get_review_polarity(text['text'])

            output["reviews_info"].append({
                "id": text["id"],
                "label": label,
                "pred_vec": pred_vec,
                "polarity": polarity
            })
        else:
            output["reviews_info"].append({
                "id": text["id"],
                "label": "Unsupported language, Most be Arabic",
                "pred_vec": "Unsupported language, Most be Arabic",
                "polarity": "Unsupported language, Most be Arabic"
            })
    return output


def correct_words(input_dict):
    corrected_dict = {}

    for category, words in input_dict.items():

        # for ANA
        if type(words) == list:
            if isinstance(words, list):
                corrected_list = []
                for word in words:
                    if word.startswith("##"):
                        if corrected_list:
                            corrected_list[-1] += word[2:]
                    else:
                        corrected_list.append(word)
                corrected_dict[category] = corrected_list

        # for MRW
        elif type(words) == dict:
            corrected_dict[category] = {}
            for word_type, word_list in words.items():
                corrected_list = []
                previous_word = ""
                for word, count in word_list:
                    if word.startswith("##"):
                        previous_word += word[2:]
                    else:
                        if previous_word:
                            corrected_list.append((previous_word, count))
                        previous_word = word
                if previous_word:
                    corrected_list.append((previous_word, count))
                corrected_dict[category][word_type] = corrected_list

    return corrected_dict
