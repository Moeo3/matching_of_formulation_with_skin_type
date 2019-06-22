import random
import numpy as np
import csv
select = [random.randint(0, 135429) for _ in range(6000)]

with open("out.csv") as data_file:
    train_data = np.loadtxt(data_file, delimiter = ',')

out = open('select_test.csv', 'a', newline='')
csv_write = csv.writer(out, dialect='excel')

for _ in range(0, 135430):
    if _ in select:
        csv_write.writerow(train_data[_])