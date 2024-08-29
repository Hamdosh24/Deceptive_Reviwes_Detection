from bs4 import BeautifulSoup
import requests
from user_agent_list import random_user_agent
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time


def welcomesaudi_scraper(id, url):
    sours = requests.get(url=url, headers={"user-agent": random_user_agent()}).text
    soup = BeautifulSoup(sours, 'lxml')
    res = {
        "id": id,
        "Reviews": []
    }

    base_url = soup.find('a', class_='page-link')['href'].split(sep='?')[0]
    page_num = 1
    next_page_button = True
    while next_page_button:
        next_page_url = base_url + f'?page={page_num}'
        next_page = requests.get(url=next_page_url, headers={"user-agent": random_user_agent()}).text
        soup = BeautifulSoup(next_page, 'lxml')
        reviews = soup.find_all('div', class_='review-item')
        # check if reviews section exsist
        if reviews:
            for review in reviews:
                stars = len(review.find_all('i', class_='fa-star'))
                review_detail = review.find('div', class_='detail').text.strip().replace('\n', ' ')

                res["Reviews"].append({
                    'Text': review_detail,
                    'Ratting': stars
                })

            pagination_list = soup.find_all('a', class_='page-link')
            # check if there are next page
            try:
                next_page_button = pagination_list[len(pagination_list) - 1]['rel']
                page_num += 1
            except:
                next_page_button = False
        else:
            next_page_button = False

    return res


def ebay_seller_scraper(id, url):
    sours = requests.get(url=url).text
    soup = BeautifulSoup(sours, 'lxml')
    res = {
        "id": id,
        "Reviews": []
    }

    all_seller_reviews = soup.find('div', class_='fdbk-detail-list__btn-container')

    # check if seller reviews exist
    if all_seller_reviews:
        all_seller_reviews = all_seller_reviews.a["href"]
        sours = requests.get(url=all_seller_reviews).text
        soup = BeautifulSoup(sours, 'lxml')
        num_reviews = int(soup.find("div", class_="fdbk-result-status").text.split()[0].replace(",", ""))

        i = 0
        while i % 25 == 0:
            reviews = soup.find_all('div', class_='fdbk-container__details__comment')
            for review in reviews:
                Text = review.span.text

                res["Reviews"].append({
                    'Text': Text,
                    'Ratting': None
                })
                i += 1

            next_button = soup.find("a", class_="pagination__next")
            if next_button:
                next_button_url = "https://www.ebay.com/fdbk/mweb_profile" + next_button["href"]
                sours = requests.get(url=next_button_url).text
                soup = BeautifulSoup(sours, 'lxml')

            else:
                break

        return res
    # seller reviews don't exist
    else:
        return {
            "id": id,
            "Reviews": ["Wrong link, The page must counten seller reviews"]
        }


def ebay_proudect_scraper(id, url):
    sours = requests.get(url=url).text
    soup = BeautifulSoup(sours, 'lxml')
    res = {
        "id": id,
        "Reviews": []
    }

    all_prodect_reviews = soup.find('div', class_='x-review-details__allreviews')
    # check if proudect reviews exist
    if all_prodect_reviews:
        all_prodect_reviews = all_prodect_reviews.a["href"]
        sours = requests.get(url=all_prodect_reviews).text
        soup = BeautifulSoup(sours, 'lxml')

        i = 0
        while i % 10 == 0:
            reviews = soup.find_all('div', class_='ebay-review-section')
            if reviews:
                for review in reviews:
                    stars = len(review.find_all("i", class_="fullStar"))
                    text = review.find("p", class_="review-item-content").text

                    res["Reviews"].append({
                        'Text': text,
                        'Ratting': stars
                    })
                    i += 1

            next_button_url = soup.find_all("a", class_="spf-link")[-1]["href"]
            sours = requests.get(url=next_button_url).text
            soup = BeautifulSoup(sours, 'lxml')

        return res

    # seller reviews don't exist
    else:
        return {
            "id": id,
            "Reviews": ["Wrong link, The page must counten seller reviews"]
        }


def talabat_scraper(id, url):
    res = {
        "id": id,
        "Reviews": []
    }

    GD_PATH = r'C:\Program Files (x86)\chromedriver.exe'
    service = Service(GD_PATH)

    chrome_options = Options()
    chrome_options.add_argument("--headless")

    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(url)

    max_try = 40
    for _ in range(max_try):
        try:
            more_button = driver.find_element(By.CSS_SELECTOR, "span.color-primary")
            more_button.click()
            time.sleep(1)
        except:
            print("Reached Final Page")
            break

    src = driver.page_source
    soup = BeautifulSoup(src, "lxml")
    reviews = soup.find_all("div", class_="card")
    for review in reviews:
        text = review.find("p").text
        ratting = review.find("div", class_="ml-1").text

        res["Reviews"].append({
            'Text': text,
            'Ratting': ratting
        })

    driver.quit()

    return res
