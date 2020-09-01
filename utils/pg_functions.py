import psycopg2
import json
import os
import datetime
import random


def todays_state():
    # state = random.getstate()
    # seed = random.randint(0, 365)
    # print(os.getcwd())
    with open('../config/config.json') as config_file:
        config = json.load(config_file)

    uri = config['development']['uri']

    conn = psycopg2.connect(uri, sslmode='require')
    cur = conn.cursor()

    with open('musicJson.json') as json_data:

        # use load() rather than loads() for JSON files
        record_list = json.load(json_data)
    if type(record_list) == list:
        first_record = record_list[0]
        print(first_record)
    else:
        print(type(list(record_list)))
        print(list(record_list))
    return
    # cur.execute('SELECT * FROM public."Seeds" WHERE "date" = CURRENT_DATE;')
    # data = cur.fetchall()
    # if len(data) == 0:
    #     cur.execute("""INSERT INTO public."Seeds" (date,state, seed) VALUES (%s, %s,%s);""",
    #                 (datetime.date.today(), str(state), seed))
    #     conn.commit()
    #     # print('Fresh state made and added to db.')
    #     return state

    # else:
    #     # print('Todays state retrieved.')
    #     # print(data[0][2])
    #     return eval(data[0][1]), data[0][2]


todays_state()
