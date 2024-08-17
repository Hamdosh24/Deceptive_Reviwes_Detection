from flask import Flask, request, jsonify
from scrapers import welcomesaudi_scraper, ebay_seller_scraper, ebay_proudect_scraper



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


@app.route('/scrap/ebay/seller', methods=['POST'])
def run_ebay_seller_scraper():
    if request.method == 'POST':
        #
        req_dict = request.json
        id = req_dict['id']
        url = req_dict['url']

        res = ebay_seller_scraper(id, url)
        return jsonify(res)
    else:
        raise Exception('method should be POST')


@app.route('/scrap/ebay/proudect', methods=['POST'])
def run_ebay_proudect_scraper():
    if request.method == 'POST':
        #
        req_dict = request.json
        id = req_dict['id']
        url = req_dict['url']

        res = ebay_proudect_scraper(id, url)
        return jsonify(res)
    else:
        raise Exception('method should be POST')




if __name__ == '__main__':
    app.run(debug=True)
