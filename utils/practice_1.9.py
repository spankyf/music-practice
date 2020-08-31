# -*- coding: utf-8 -*-
"""
Created on Tue Aug 18 08:52:43 2020

@author: Dean
"""
import os
import json
import datetime
import random
import build_practice
import pandas as pd


def make_schedule():
    time = 0
    ex_dict = {}
    key, scales, triads = build_practice.tonal_scales_triads()
    # print(os.getcwd())
    random.seed(datetime.date.today())
    for inst in list(filter(lambda x: '.' not in x, os.listdir('../public'))):

        ex_dict[inst] = []
        n_chords_progression = 3

        for exercise_filename in os.listdir(os.path.join('../public', inst)):
            ex_category = exercise_filename.split('.')[0]
            ex_df = pd.read_csv(os.path.join(
                '../public', inst, exercise_filename), encoding="ISO-8859-1")

            if ex_category == 'scales':
                content = list(random.choice(list(scales.values())))
            elif ex_category == 'triads':
                content = [random.choice(triads)]
            elif ex_category == 'progressions':
                content = random.sample(triads, n_chords_progression)
            else:  # has to be repetoire
                content = [None]

            for row in ex_df.values:
                # if content == 0:
                #     content = row[0].replace('\x96', '')
                ex_dict[inst].append({"key": key,
                                      "instrument": inst,
                                      "category": ex_category,
                                      "material": content,
                                      "exercise": row[0].replace('\x96', ''),
                                      "minutes": row[1]})
                time += row[1]

    return json.dumps(ex_dict)


if __name__ == "__main__":
    print(make_schedule())
    # print(json.loads(make_schedule())['guitar'])
