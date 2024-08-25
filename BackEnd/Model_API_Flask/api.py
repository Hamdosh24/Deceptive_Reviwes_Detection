from flask import Flask, request, jsonify
from helper import get_prediction
from pos_model_utils import most_common_words, noun_and_adj



app = Flask(__name__)


@app.route('/predict_text', methods=['POST'])
def prediction_text():
    if request.method == 'POST':
        input_texts = request.json

        output = get_prediction(input_texts)

        return jsonify(output)
    else:
        return jsonify({"error": f'The request method must be POST, got "{request.method}"'}), 405


@app.route('/predict_url', methods=['POST'])
def prediction_url():
    if request.method == 'POST':
        input_texts = request.json

        output = get_prediction(input_texts)
        if 'reviews_info' in output:
            output["most_common_words"] = most_common_words(output["reviews_info"], input_texts)
            output["noun_and_adj"] = noun_and_adj(output["reviews_info"], input_texts)

        return jsonify(output)

    else:
        return jsonify({"error": f'The request method must be POST, got "{request.method}"'}), 405



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
