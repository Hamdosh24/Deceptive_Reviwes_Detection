from runner import run_scraper


if __name__ == '__main__':
    scraper_name = 'amazon'
    url = 'https://www.amazon.com/dp/B0D4QBCGMC/'
    # url = 'https://welcomesaudi.com/hotel/hilton-riyadh-hotel-and-residences'
    file_name = 'items3'
    run_scraper(scraper_name=scraper_name, url=url, file_name=file_name)
