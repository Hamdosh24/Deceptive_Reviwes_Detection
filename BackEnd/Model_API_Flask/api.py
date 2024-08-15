from flask import Flask, request, jsonify
from model_utils import get_prediction, get_review_label

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def prediction():
    if request.method == 'POST':
        input_texts = request.json
        out_put = []

        for text in input_texts:
            pred_vec = get_prediction(text['text']).tolist()
            label = get_review_label(pred_vec)
            out_put.append({
                "id": text["id"],
                "label": label,
                "pred_vec": pred_vec
            })
        return jsonify(out_put)
    else:
        raise TypeError(f'The request type must by POST, get {request.method}')


if __name__ == '__main__':
    app.run(debug=True)
