import scrapy
import json
from ..items import ScrapingReviewsItem


class TalabatReviewsSpider(scrapy.Spider):
    name = "talabat_reviews"
    start_urls = []
    api_url = f'https://www.talabat.com/nextApi/v1/restaurant/16782/reviews'
    headers = {
        'Accept': 'application/json, text/plain, */*',
    }
    sec_num = 1
    res = []


    def parse(self, response):
        yield scrapy.Request(self.api_url + f'/{self.sec_num}/0',
                             callback=self.parse_api,
                             headers=self.headers)

    def parse_api(self, response):

        raw_data = response.body
        data = json.loads(raw_data)
        reviews = data['result']['rev']
        if reviews:
            self.sec_num += 1

            for review in reviews:
                review_items = ScrapingReviewsItem()
                review_text = review['rew']
                review_ratting = review['rat']

                review_items['text'] = review_text
                review_items['ratting'] = review_ratting

                self.res.append({
                    'text': review_text,
                    'ratting': review_ratting,
                })

                yield review_items

            yield scrapy.Request(self.api_url + f'/{self.sec_num}/0',
                                 callback=self.parse_api,
                                 headers=self.headers)
