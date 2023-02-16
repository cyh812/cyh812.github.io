import csv
from unittest import result
from matplotlib.pyplot import flag
import pandas as pd

list_name2 = ['source','target','path']
list_name1 = ['x','y','z','dynasty','area','id','name']

filename1 = 'nodes.csv'
filename2 = 'edges.csv'

result1 = []
result2 = []
all = []
idlist = []

with open(filename1,encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        if(row[5] in idlist):
            continue
        else:
            temp = []
            temp.append(row[0])
            temp.append(row[1])
            temp.append(row[2])
            temp.append(row[3])
            temp.append(row[4])
            temp.append(row[5])
            temp.append(row[6])
            idlist.append(row[5])
            result1.append(temp)

with open(filename2,encoding='utf-8') as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for row in reader:
        if(row in all):
            continue
        all.append(row)
        temp = []
        temp.append(row[0])
        temp.append(row[1])
        s = ''
        if(row[2] == ''):
            temp.append(s)
            result2.append(temp)
            continue
        s1 = row[2].split('|')
        for i in range(len(s1)):
            s2 = s1[i].split(',')
            for j in range(len(s2)):
                if(j == len(s2)-1):
                    n = float(s2[j])
                    n = round(n,1)
                    s = s + str(n)
                else:
                    n = float(s2[j])
                    n = round(n,1)
                    s = s + str(n) + ';'  
            if(i != len(s1)-1):
                s = s + '|'
        temp.append(s)
        result2.append(temp)


result11 = pd.DataFrame(columns=list_name1,data=result1)
result11.to_csv('node.csv')

result22 = pd.DataFrame(columns=list_name2,data=result2)
result22.to_csv('edge.csv')