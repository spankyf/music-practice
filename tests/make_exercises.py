# -*- coding: utf-8 -*-
"""
Created on Thu Sep 24 15:47:21 2020

@author: dean.flanagan
"""
# first import sys and get the args json string.Then use json.loads to make a dict

# import pandas as pd
import json
params = json.loads('{"timeSig":"4/4","key":"random","essentials":"on","instrument":"all","time":"61","days":"4","mode":"locrian","seed":268,"date":"9/24/2020"}')

keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
modes = {'ionian':[0,2,4,5,7,9,11]}#, 'dorian', 'phyrgian', 'lydian', 'mixolydian', 'aeolian','locrian','Harmonic minor scale', 'Locrian 13 or Locrian 6', 'Ionian #5 (augmented)', 'Dorian #11', 'Phrygian dominant', 'Lydian #2', 'Super locrian bb7','Melodic minor', 'Dorian b2 (aka Phrygian #6)', 'Lydian augmented', 'Lydian dominant (aka overtone scale)', 'Mixolydian b6', 'Aeolian b5 (aka Locrian #2)', 'Altered scale(aka super Locrian)'}


with open('exercises.json') as json_file:
    data = json.load(json_file)
    
