from transformers import pipeline
from collections import Counter
from helper import correct_words



pos = pipeline('token-classification', model='CAMeL-Lab/bert-base-arabic-camelbert-mix-pos-msa')


def search_dict(id, texts_list):
    for text in texts_list:
        if text["id"] == id:
            return text["text"]


def distr_text(texts_info, texts_list):
    truthful_pos = []
    truthful_neg = []
    deceptive_pos = []
    deceptive_neg = []

    for info in texts_info:
        if info['label'] == 'Truthful':
            if info['polarity'] == 'positive':
                text = search_dict(info['id'], texts_list)
                truthful_pos.append(text)

            elif info['polarity'] == 'negative':
                text = search_dict(info['id'], texts_list)
                truthful_neg.append(text)

        elif info['label'] == 'Deceptive':
            if info['polarity'] == 'positive':
                text = search_dict(info['id'], texts_list)
                deceptive_pos.append(text)

            elif info['polarity'] == 'negative':
                text = search_dict(info['id'], texts_list)
                deceptive_neg.append(text)

    return truthful_pos, truthful_neg, deceptive_pos, deceptive_neg


# Featuer 1
def most_common_counter(texts, most_common):
    noun = []
    adj = []
    verb = []

    for text in texts:
        text_pos = pos(text)
        for token in text_pos:
            if token['entity'] == 'noun':
                noun.append(token['word'])

            elif token['entity'] == 'adj':
                adj.append(token['word'])

            elif token['entity'] == 'verb':
                verb.append(token['word'])

    return {
        'noun': Counter(noun).most_common(most_common),
        'adj':  Counter(adj).most_common(most_common),
        'verb': Counter(verb).most_common(most_common)
    }


def most_common_words(texts_info, texts_list, most_common=10):
    truthful_pos, truthful_neg, deceptive_pos, deceptive_neg = distr_text(texts_info, texts_list)

    mrw_truthful_pos = most_common_counter(truthful_pos, most_common)
    mrw_truthful_neg = most_common_counter(truthful_neg, most_common)
    mrw_deceptive_pos = most_common_counter(deceptive_pos, most_common)
    mrw_deceptive_neg = most_common_counter(deceptive_neg, most_common)

    mrw_output = {
        'mrw_truthful_pos': mrw_truthful_pos,
        'mrw_truthful_neg': mrw_truthful_neg,
        'mrw_deceptive_pos': mrw_deceptive_pos,
        'mrw_deceptive_neg': mrw_deceptive_neg
        }
    mrw_output = correct_words(mrw_output)
    return mrw_output


# Feauter 2
def nan_foreach(texts):
    noun_and_adj = []
    for text in texts:
        text_pos = pos(text)
        for i in range(1, len(text_pos)):
            if text_pos[i - 1]['entity'] == 'adj' and text_pos[i]['entity'] == 'noun':
                noun_and_adj.append((text_pos[i - 1]['word'] + " " + text_pos[i]['word']))
    return noun_and_adj


def noun_and_adj(texts_info, texts_list):
    truthful_pos, truthful_neg, deceptive_pos, deceptive_neg = distr_text(texts_info, texts_list)

    ana_truthful_pos = nan_foreach(truthful_pos)
    ana_truthful_neg = nan_foreach(truthful_neg)
    ana_deceptive_pos = nan_foreach(deceptive_pos)
    ana_deceptive_neg = nan_foreach(deceptive_neg)


    ana_output = {
        'ana_truthful_pos': ana_truthful_pos,
        'ana_truthful_neg': ana_truthful_neg,
        'ana_deceptive_pos': ana_deceptive_pos,
        'ana_deceptive_neg': ana_deceptive_neg
    }
    # ana_output = correct_words(ana_output)
    return ana_output
