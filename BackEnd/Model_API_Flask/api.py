
from flask import Flask, request, jsonify
from model_utils import get_prediction


app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def prediction():
    print("Received a request on /predict")  # طباعة رسالة عند تلقي الطلب
    if request.method == 'POST':
        input_texts = request.json.get('inputTexts', [])
        out_put = []

        for text in input_texts:
            pred_label = get_prediction(text)  # الحصول على التصنيف
            out_put.append({
                "text": text,  # النص المدخل
                "label": pred_label  # التصنيف
            })
        print(f"Output: {out_put}")  # طباعة الناتج
        return jsonify(out_put)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
