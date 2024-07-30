import copy

from Scraping_Reviews.spiders.tal2 import Tal2Spider
from Scraping_Reviews.spiders.welcomesaudi_reviews import WelcomesaudiReviewsSpider
from Scraping_Reviews.spiders.amazon_reviews import AmazonReviewsSpider
from Scraping_Reviews.spiders.amaz2 import Amaz2Spider


scrapers = {
    "talabat": Tal2Spider,
    "welcomesaudi": WelcomesaudiReviewsSpider,
    "amazon": AmazonReviewsSpider,
    "amazon2": Amaz2Spider
}


def run_scraper(scraper_name,
                url,
                file_name,
                file_type='json',):
    import time
    start_time = time.time()
    scraper = scrapers[scraper_name]
    scraper.start_urls = []
    scraper.start_urls.append(url)
    from scrapy.crawler import CrawlerProcess
    from scrapy.utils.project import get_project_settings
    settings = get_project_settings()

    # for saving the output as a file
    # settings['FEEDS'] = {
    #     f"{file_name}.{file_type}": {"format": file_type, "overwrite": True}
    # }

    process = CrawlerProcess(settings)
    process.crawl(scraper)
    process.start()
    res = copy.deepcopy(scraper.res)
    scraper.res = []
    taken_time = (time.time() - start_time)

    return res, taken_time
