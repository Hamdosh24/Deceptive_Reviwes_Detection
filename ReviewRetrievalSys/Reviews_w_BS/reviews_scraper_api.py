from flask import Flask, request, jsonify
from scrapers import welcomesaudi_scraper, ebay_scraper, amazon_scraper



app = Flask(__name__)


@app.route('/scrap/welcomesaudi', methods=['POST'])
def run_welcomesaudi_scraper():
    if request.method == 'POST':
        #
        req_dict = request.json
        id = req_dict['id']
        url = req_dict['url']

        res = welcomesaudi_scraper(id, url)
        return jsonify(res)
    else:
        raise Exception('method should be POST')


@app.route('/scrap/ebay', methods=['POST'])
def run_ebay_scraper():
    if request.method == 'POST':
        #
        req_dict = request.json
        id = req_dict['id']
        url = req_dict['url']

        res = ebay_scraper(id, url)
        return jsonify(res)
    else:
        raise Exception('method should be POST')


@app.route('/scrap/amazon', methods=['POST'])
def run_amazon_scraper():
    if request.method == 'POST':
        #
        req_dict = request.json
        id = req_dict['id']
        url = req_dict['url']

        res = amazon_scraper(id, url)
        return jsonify(res)
    else:
        raise Exception('method should be POST')




if __name__ == '__main__':
    app.run(debug=True)
