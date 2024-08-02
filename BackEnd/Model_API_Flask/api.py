from flask import Flask, request, jsonify
from model_utils import get_prediction

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def prediction():
    if request.method == 'POST':
        input_texts = request.json
        out_put = []

        for text in input_texts:
            pred_label = get_prediction(text['text'])
            out_put.append({
                "id": text["id"],
                "label": pred_label
            })
        return jsonify(out_put)
    else:
        raise TypeError(f'The request type must by POST, get {request.method}')



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000,debug=True)
