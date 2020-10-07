# -*- coding: utf-8 -*-
"""
Created on Tue Aug 18 08:52:43 2020

@author: Dean
"""
import pandas as pd
import build_practice
import random
import os
import datetime
import json
#from pg_functions import todays_state
# from time import time


def make_new_json():
    if os.path.exists('todaysJson.json'):
        if datetime.date.fromtimestamp(os.path.getctime('todaysJson.json')) == datetime.date.today():
            return False


def make_schedule():
    # if not make_new_json():
    #     return

    time = 0
    ex_dict = {}
    exercise_number = 1
    key, scales, triads = build_practice.tonal_scales_triads()

    for inst in list(filter(lambda x: '.' not in x, os.listdir('test'))):
        # print(inst)
        if inst == "\n":
            continue

        ex_dict[inst] = []
        n_chords_progression = 3

        for exercise_filename in os.listdir(os.path.join('public', inst)):
            ex_category = exercise_filename.split('.')[0]
            ex_df = pd.read_csv(os.path.join(
                'public', inst, exercise_filename), encoding="ISO-8859-1")

            if ex_category == 'scales':
                content = list(random.choice(list(scales.values())))
            elif ex_category == 'triads':
                content = [random.choice(triads)]
            elif ex_category == 'progressions':
                content = random.sample(triads, n_chords_progression)
            else:  # has to be repetoire
                content = [None]

            for row in ex_df.values:
                ex_dict[inst].append({"key": key,
                                      "instrument": inst,
                                      "category": ex_category,
                                      "material": content,
                                      "exercise": row[0].replace('\x96', ''),
                                      "minutes": row[1],
                                      "exercise_number": exercise_number,
                                      "practiced": False})
                time += row[1]
                exercise_number += 1

    with open('todaysJson.json', 'w', encoding='utf-8') as f:
        json.dump(ex_dict, f, ensure_ascii=False, indent=4)
    return json.dumps(ex_dict)


if __name__ == "__main__":
    print(make_schedule())
