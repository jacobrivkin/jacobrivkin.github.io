import spacy
from spacy.matcher import Matcher

nlp = spacy.load("en_core_web_sm")
matcher = Matcher(nlp.vocab)
nlp.max_length = 2455897
# text = open("searchFlowers.txt").read()

patterns=[
#    [{"POS":"DET"},{"POS":"VERB"},{"POS": "ADJ"},{"POS": "IN"}]
  # [{"POS":"DET"},{"POS":"VERB"},{"POS": "ADJ","OP": "*"},{"POS": "IN","OP": "*"},{"POS":"DET","OP": "*"},{"POS":"NOUN","OP": "*"}]
# [{"POS":"DET"}, {"POS": "ADV", "OP": "*"}, {"POS": "ADJ"}, {"POS":"ADJ"},{"POS":"NOUN"},{"POS":"VERB", "OP": "*"},{"POS":"DET", "OP": "*"},{"POS":"NOUN", "OP": "*"}]
[{"POS":"ADJ"},{"POS":"NOUN"}]
]

matcher.add("MyPattern", patterns)

# read in the communist manifesto
doc = nlp(open("skyReducedDetAdjNoun.txt","r",encoding="utf-8").read())

# find matches
matches = matcher(doc)

flower = open("skyAdjNounPoem.txt","w",encoding="utf-8")
# print the text of the matches
for match_id, start, end in matches:
    span = doc[start:end]
    print(span.text)
    flower.write(span.text + "\n")
flower.close()