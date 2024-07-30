import scrapy
from ..items import ScrapingReviewsItem


class WelcomesaudiReviewsSpider(scrapy.Spider):
    page_number = 1
    name = "welcomesaudi_reviews"
    allowed_domains = ["welcomesaudi.com"]
    start_urls = []
    res = []


    def parse(self, response):
        reviews = response.css('.review-item')
        for review in reviews:
            review_items = ScrapingReviewsItem()

            review_text = review.css('.detail::text').getall()
            for i, text in enumerate(review_text):
                review_text[i] = text.strip('\n').strip('\r').strip('\t').strip()
            review_text = '\n'.join(review_text)

            review_ratting = len(review.css('.review-star li .fa-star'))

            review_items['text'] = review_text
            review_items['ratting'] = review_ratting

            self.res.append({
                'text': review_text,
                'ratting': review_ratting,
            })

            yield review_items

        last_child_num = len(response.css('.pagination li'))
        next_button_url = response.css(f'.page-item:nth-child({last_child_num}) .page-link::attr(href)').get()
        if next_button_url is not None:
            self.page_number += 1
            next_button_url = self.start_urls[0] + f'?page={self.page_number}'
            yield response.follow(url=next_button_url, callback=self.parse)
