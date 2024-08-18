from flask import Flask, request, jsonify
from model_utils import get_prediction, get_review_label, get_polarity, is_arabic

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def prediction():
    if request.method == 'POST':
        input_texts = request.json
        out_put = []

        for text in input_texts:
            if is_arabic(text['text']):
                pred_vec = get_prediction(text['text'])
                label = get_review_label(pred_vec)
                polarity = get_polarity(text['text'])

                out_put.append({
                    "id": text["id"],
                    "label": label,
                    "pred_vec": pred_vec,
                    "polarity": polarity
                })
            else:
                out_put.append({
                    "id": text["id"],
                    "label": "Unsupported language, Most be Arabic",
                    "pred_vec": "Unsupported language, Most be Arabic",
                    "polarity": "Unsupported language, Most be Arabic"
                })
        return jsonify(out_put)
    else:
        raise TypeError(f'The request type must by POST, get "{request.method}"')


if __name__ == '__main__':
    app.run(debug=True)
