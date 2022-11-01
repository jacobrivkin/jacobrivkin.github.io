import requests
from bs4 import BeautifulSoup
import time
import random

con = open("conManyPoem.txt","r",encoding="utf-8").read().splitlines()
sky = open("skyTextPoem.txt","r",encoding="utf-8").read().splitlines()
skynouns = open("skyAdjNounPoem.txt","r",encoding="utf-8").read().splitlines()
prep = open(r"C:\Users\jacob\Desktop\scrapismPractice\webscrape\poemtext\preps.txt","r",encoding="utf-8").read().splitlines()
dets = open(r"C:\Users\jacob\Desktop\scrapismPractice\webscrape\poemtext\dets.txt","r",encoding="utf-8").read().splitlines()

num = 0
for num in range(1,25):

    stanzaLen = random.randrange(4,12)

    for num in range(1,stanzaLen):
    
        conline = random.choice(con).lower()
        skyline =random.choice(sky).lower()
        nouns =random.choice(skynouns).lower()
        lastnouns =random.choice(skynouns).lower()
        frontprepChoice = random.choice(prep).lower()
        prepChoice = random.choice(prep).lower()
        detsChoice = random.choice(dets).lower()
        innerChoice = random.choice([" "+prepChoice+" "])
        if num==1:
            print('\n')
            print(skyline.split(' ', 2)[-1].capitalize(),nouns)
            print('\n')
        if num%3==0:
            savedConnection = innerChoice
            innerChoice = random.choice([" "+detsChoice+" "+nouns+" ",savedConnection,"\n"])
        frontprepChoice = random.choice([frontprepChoice+" ",""])
        lastChoice =random.choice([lastnouns.split(' ')[-1],""])
        print(frontprepChoice+conline+innerChoice+skyline,lastChoice)
        if num==stanzaLen-1:
            print(detsChoice,nouns)
    print('\n')
    num+=1

