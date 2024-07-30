import scrapy


class ScrapingReviewsItem(scrapy.Item):
    text = scrapy.Field()
    ratting = scrapy.Field()
