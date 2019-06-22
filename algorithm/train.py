import numpy as np
import csv
from keras.models import Sequential
from keras.layers import Dense, Dropout

if __name__ == "__main__":
    with open("select.csv") as data_file:
        train_data = np.loadtxt(data_file, delimiter=',')
        feather = train_data[:, :-1]
        label = train_data[:, -1]
        # print(label)
        # print(feather, label)

    with open("select_test.csv") as test_file:
        test_data = np.loadtxt(test_file, delimiter=',')
        test_feather = test_data[:, :-1]
        test_label = test_data[:, -1]

    model = Sequential()
    model.add(Dense(256, input_dim=36, activation='relu'))
    model.add(Dropout(0.5))
    for _ in range(0, 2):
        model.add(Dense(256, activation='tanh'))
        model.add(Dropout(0.5))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(loss='mse', optimizer='adam', metrics=['mae'])

    score = []

    for _ in range(1, 20):
        model.fit(feather, label, batch_size=128, epochs=50)
        score.append(model.evaluate(test_feather, test_label, batch_size=128))
    print(score)

