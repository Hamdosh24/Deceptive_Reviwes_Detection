import scrapy
from ..items import ScrapingReviewsItem
from scrapy_playwright.page import PageMethod


def should_abort_request(request):
    if request.resource_type == 'image':
        return True
    return False



class Tal2Spider(scrapy.Spider):
    name = "tal2"
    start_urls = []
    res = []

    custom_settings = {
        'PLAYWRIGHT_ABORT_REQUEST': should_abort_request,
    }

    def start_requests(self):
        yield scrapy.Request(
            url=self.start_urls[0],
            meta=dict(
                playwright = True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', selector='.card'),],
                playwright_include_page=True,
                errback = errback,
            )
        )


    async def parse(self, response):
        page = response.meta['playwright_page']

        while True:
            next_bt = await page.query_selector('span.color-primary')

            if next_bt is None:
                reviews = await page.query_selector_all('.card')

                for review in reviews:
                    review_items = ScrapingReviewsItem()

                    review_text = await review.query_selector('p')
                    review_ratting = await review.query_selector('.undefined')

                    review_text = await review_text.inner_text()
                    review_ratting = await review_ratting.inner_text()

                    review_items['text'] = review_text
                    review_items['ratting'] = review_ratting

                    self.res.append({
                        'text': review_text,
                        'ratting': review_ratting,
                    })

                    yield review_items

                await page.close()
                break


            else:
                await next_bt.click()

                # await page.wait_for_timeout(1000)


async def errback(self, failure):
    page = failure.request.meta["playwright_page"]
    await page.close()