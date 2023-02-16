import csv
import random

filename1 = 'dat/nodes.csv'

a = {}

def getcolor():
    colorArr = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    color = ""
    for i in range(6):
        color += colorArr[random.randint(0,14)]
    return "0x"+color


with open(filename1,encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        area = row[4]
        if(area in a.keys()):
            continue
        else:
            c = getcolor()
            a[area] = c

for i,j in a.items():
    print(f'"{i}":{j},')