import scrapy
from ..items import ScrapingReviewsItem


class Amaz2Spider(scrapy.Spider):
    name = "amaz2"
    start_urls = []
    res = []


    def parse(self, response):
        for review in response.css('#cm_cr-review_list [data-hook="review"]'):
            item = ScrapingReviewsItem()

            review_ratting = review.css('[data-hook="review-star-rating"] ::text').get()
            review_ratting = review_ratting.replace('out of 5 stars', '').strip() if review_ratting else None
            item['ratting'] = review_ratting

            review_text = review.css('[data-hook="review-body"] span::text').getall()
            for i, text in enumerate(review_text):
                review_text[i] = text.strip('\n').strip('\r').strip('\t').strip()
            review_text = '\n'.join(review_text)
            item['text'] = review_text

            self.res.append({
                'text': review_text,
                'ratting': review_ratting,
            })

            yield item

        next_page = response.xpath('//a[contains(text(),"Next page")]/@href').get()
        if next_page:
            yield scrapy.Request(response.urljoin(next_page))
