import json
import csv

with open("../data/info.json") as info_file:
    info = json.load(info_file)

with open("../data/count.json") as comment_file:
    comment = json.load(comment_file)

train = []

for goods_id in comment:
    if goods_id in info.keys():
        composition = [ele / 27041 for ele in info[goods_id]]
        for skin in comment[goods_id]:
            skin_type = []
            for s in skin:
                skin_type.append(int(s) / 3)
            feather = composition + skin_type
            score_list = comment[goods_id][skin]
            for i in range(0, 5):
                label = i / 4
                for _ in range(0, i):
                    train.append(feather + [label])

out = open('out.csv', 'a', newline = '')
csv_write = csv.writer(out, dialect = 'excel')

for _ in train:
    csv_write.writerow(_)



        
