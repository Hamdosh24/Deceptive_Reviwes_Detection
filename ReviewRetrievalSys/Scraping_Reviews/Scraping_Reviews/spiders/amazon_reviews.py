import scrapy
from ..items import ScrapingReviewsItem




class AmazonReviewsSpider(scrapy.Spider):
    name = "amazon_reviews"
    start_urls = []
    reviews_section = ''
    page_number = 1
    res = []


    def parse(self, response):
        reviews_section_url = response.css('div a.a-link-emphasis').css('a.a-text-bold::attr(href)').get()
        reviews_section_url = 'https://www.amazon.com' + reviews_section_url
        self.reviews_section = reviews_section_url
        reviews_section_url = reviews_section_url + f'&pageNumber={self.page_number}'
        yield response.follow(url=reviews_section_url, callback=self.parse_reviews_section)

    def parse_reviews_section(self, response):
        reviews = response.css('#cm_cr-review_list .a-section.celwidget')

        for review in reviews:
            review_items = ScrapingReviewsItem()

            review_text = review.css('.review-text-content span::text').get()
            review_ratting = review.css('span.a-icon-alt::text').get()[0]

            review_items['text'] = review_text
            review_items['ratting'] = review_ratting

            self.res.append({
                'text': review_text,
                'ratting': review_ratting,
            })
            yield review_items

        next_button_url = response.css('#cm_cr-pagination_bar a::attr(href)').get()
        if next_button_url is not None:
            self.page_number += 1
            next_button_url = self.reviews_section + f'&pageNumber={self.page_number}'
            yield response.follow(url=next_button_url, callback=self.parse_reviews_section)
