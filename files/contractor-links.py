import requests
from bs4 import BeautifulSoup
import time

page=1
for page in range(1,2):
    # get original Links
    url= "https://www.contractortalk.com/forums/remodeling.18/page-"+str(page)
    # print(url)
    response = requests.get(url)

    soup=BeautifulSoup(response.text, "html.parser")

    f = open("conLinks.txt", "w")

    titles = soup.select(".structItem-title > a")
    for t in titles:
        conlinks = t['href']
        # print(plantlinks)
        sec = "https://www.contractortalk.com"
        f.write(sec+conlinks + "\n")
        # print(t.text.strip())
    
        # link = soup.select("a")
        # # link = soup.find('a', {'class': '.cat-name'})['href'] 
        # for link in t:
        #     print(link)
    f.close()
    time.sleep(0.5)


# # RECORD DATA

p = open("conLinks.txt", "r")

  
for line in p:
    linkURL=line
    # print(line)
    responseInner = requests.get(line)
    soupInner=BeautifulSoup(responseInner.text, "html.parser")
    description = soupInner.select(".bbWrapper")
    # print(description)
    for t in description:
        print(t.text.strip())
    time.sleep(1)
p.close()
  


