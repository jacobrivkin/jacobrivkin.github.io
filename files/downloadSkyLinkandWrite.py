import requests
from bs4 import BeautifulSoup
import time

# headers = {
#     'authority': 'r.skimresources.com',
#     'accept': '*/*',
#     'accept-language': 'en-US,en;q=0.9,es;q=0.8',
#     'dnt': '1',
#     'origin': 'https://www.contractortalk.com',
#     'referer': 'https://www.contractortalk.com/',
#     'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
#     'sec-ch-ua-mobile': '?0',
#     'sec-ch-ua-platform': '"Windows"',
#     'sec-fetch-dest': 'empty',
#     'sec-fetch-mode': 'cors',
#     'sec-fetch-site': 'cross-site',
#     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
# }

# data = {
#     'data': '{"pubcode":"130832X1595755","page":"https://www.contractortalk.com/threads/bandsaw-for-sale-good-deal.446960/","domains":["painttalk.com","roofingtalk.com","pearforum.com","xenforo.com"],"link_swapping":true}',
# }

# response = requests.post('https://r.skimresources.com/api/', headers=headers, data=data)

linkList = []

page=1

for page in range(1,5):
    # get original Links
    url= "https://www.skyscrapercity.com/forums/general-developments-and-discussions.7/page-"+str(page)
    # print(url)
    response = requests.get(url)

    soup=BeautifulSoup(response.text, "html.parser")

    titles = soup.select(".structItem-title > a")
    for t in titles:
        conlinks = t['href']
        sec = "https://www.skyscrapercity.com/"
        linkList.append(sec+conlinks)
    time.sleep(0.5)



elementList = []
description=[]

innerText = ""


#GO THROUGH LIST OF LINKS
d = open("skyText.txt", "w", encoding="utf-8")
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