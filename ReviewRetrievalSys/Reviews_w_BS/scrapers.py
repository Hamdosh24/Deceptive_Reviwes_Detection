from bs4 import BeautifulSoup
import requests



def welcomesaudi_scraper(id, url):
    sours = requests.get(url).text
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
        next_page = requests.get(next_page_url).text
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
                next_page_button = pagination_list[len(pagination_list)-1]['rel']
                page_num += 1
            except:
                next_page_button = False
        else:
            next_page_button = False

    return res


def amazon_scraper(id, url):
    pass


def talabat_scraper(id, url):
    pass


def ebay_scraper(id, url):

    sours = requests.get(url).text
    soup = BeautifulSoup(sours, 'lxml')
    res = {
        "id": id,
        "Reviews": []
    }

    all_reviews_url = soup.find('div', class_='fdbk-detail-list__btn-container').a['href']
    sours = requests.get(all_reviews_url).text
    soup = BeautifulSoup(sours, 'lxml')
    num_reviews = int(soup.find("div", class_="fdbk-result-status").text.split()[0])

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

        next_button_url = "https://www.ebay.com/fdbk/mweb_profile" + soup.find("a", class_="pagination__next")["href"]
        sours = requests.get(next_button_url).text
        soup = BeautifulSoup(sours, 'lxml')

    return res
