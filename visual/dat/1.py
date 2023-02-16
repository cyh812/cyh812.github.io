import csv
import pandas as pd

list_name = ['x','y','z','dynasty','area','id','name']

filename1 = 'artwork_node_x.csv'
filename2 = 'author_node.csv'
filename3 = 'author_pos.csv'
artwork_pos = {}
author_pos = {}
result1 = []

with open(filename3,encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        temp = []
        temp.append(row[1])
        temp.append(row[2])
        temp.append('0')
        author_pos[row[0]] = temp

with open('artwork_pos.csv',encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        temp = []
        temp.append(row[1])
        temp.append(row[2])
        artwork_pos[row[0]] = temp

with open('edge.csv',encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        s = row[0]
        t = row[1]
        p = row[2]
        pp = p.split('|')
        pp1 = pp[0].split(',')
        pp2 = pp[-1].split(',')
        if(len(artwork_pos[s]) == 2):
            artwork_pos[s].append(pp1[-1])
        if(len(artwork_pos[t]) == 2):
            artwork_pos[s].append(pp2[-1])

with open(filename2,encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        temp = []
        id = row[0]
        temp.append(author_pos[id][0])
        temp.append(author_pos[id][1])
        temp.append(author_pos[id][2])
        temp.append(row[2])
        temp.append('')
        temp.append(id)
        temp.append(row[1])
        result1.append(temp)

with open(filename1,encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        temp = []
        id = row[0]
        temp.append(artwork_pos[id][0])
        temp.append(artwork_pos[id][1])
        if(len(artwork_pos[id]) == 2):
            temp.append('0')
        else:
            temp.append(artwork_pos[id][2])
        temp.append(row[3])
        temp.append(row[14])
        temp.append(id)
        temp.append(row[5])
        result1.append(temp)


result = pd.DataFrame(columns=list_name,data=result1)
result.to_csv('node.csv')