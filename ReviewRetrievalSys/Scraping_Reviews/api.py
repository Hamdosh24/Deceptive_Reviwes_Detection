from runner import run_scraper
from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    return 'Scraper API'


@app.route('/scrap/<scraper_name>', methods=['GET', 'POST'])
def run(scraper_name):
    if request.method == 'GET':
        url = request.args.get('url')
        file_name = request.args.get('file_name')

        # url = 'https://www.amazon.com/dp/B0D4QBCGMC'
        # url = 'https://welcomesaudi.com/hotel/hilton-riyadh-hotel-and-residences'
        # file_name = 'items3'
        res, taken_time = run_scraper(scraper_name=scraper_name, url=url, file_name=file_name)

        return jsonify({
            "res": res,
            "taken_time": taken_time
        })

    if request.method == 'POST':
        req_dict = request.json
        url = req_dict['url']
        file_name = req_dict['file_name']

        res, taken_time = run_scraper(scraper_name=scraper_name, url=url, file_name=file_name)
        return jsonify({
            "res": res,
            "taken_time": taken_time
        })


if __name__ == '__main__':
    app.run(debug=True)
