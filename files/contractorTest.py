import requests
from bs4 import BeautifulSoup
import time

headers = {
    'authority': 'r.skimresources.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9,es;q=0.8',
    'dnt': '1',
    'origin': 'https://www.contractortalk.com',
    'referer': 'https://www.contractortalk.com/',
    'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
}

data = {
    'data': '{"pubcode":"130832X1595755","page":"https://www.contractortalk.com/threads/bandsaw-for-sale-good-deal.446960/","domains":["painttalk.com","roofingtalk.com","pearforum.com","xenforo.com"],"link_swapping":true}',
}

response = requests.post('https://r.skimresources.com/api/', headers=headers, data=data)

# # p = open("conLinks.txt", "r")
# url = "https://www.contractortalk.com/threads/bandsaw-for-sale-good-deal.446960/"
# responseInner = requests.get(url)
# soupInner=BeautifulSoup(responseInner.text, "html.parser")
# description = soupInner.select(".bbWrapper")
# # print(description)
# for t in description:
#     print(t.text.strip())
# time.sleep(1)
# # p.close()

elementList = []
description=[]
linkList = []
innerText = ""

with open("conLinks.txt", "r") as p:
    x = p.read().splitlines()
    for urls in x:
        linkList.append(str(urls))
    print(linkList)
p.close()

with open("conLinksText.txt", "w", encoding="utf-8") as d:
    for url in linkList:
        response = requests.get(url)
        soup=BeautifulSoup(response.text, "html.parser")
        description = soup.select(".bbWrapper")
        for t in description:
            innerText=t.text.strip()
            d.write(innerText)
            # elementList.append(innerText)
            # print(innerText)
        time.sleep(0.5)
d.close()
