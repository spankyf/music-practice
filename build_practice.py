#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Aug 17 23:47:51 2019

@author: dean
"""

from operator import itemgetter
import random
keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
        
def reorder(note):
    return keys[keys.index(note):] + keys[:keys.index(note)]

possible_triads = []

for start in range(1,6):
    for second_interval in range(5, 12):
        if second_interval - start > 1:
            possible_triads.append((0,start, second_interval))

qualities = {1:'b9',
             2:'sus2',
             3:'m',
             4:'',
             5:'sus4',
             6:'b5/#4',
             7:'',
             8:'b6/#5',
             9:'6',
             10:'7',
             11:'Δ7'}


major = {'ionian':0,
         'dorian':2,
         'phyrgian':4,
         'lydian':5,
         'mixolydian':7,
         'aeolian':9,
         'locrian':11}


melodic_minor = {'Melodic minor':0,
         'Dorian b2 (aka Phrygian #6)':2,
         'Lydian augmented':3,
         'Lydian dominant (aka overtone scale)':5,
         'Mixolydian b6':7,
         'Aeolian b5 (aka Locrian #2)':9,
         'Altered scale (aka super Locrian)':11}


harmonic_minor = {'Harmonic minor scale':0,
         'Locrian 13 or Locrian 6':2,
         'Ionian #5 (augmented)':3,
         'Dorian #11':5,
         'Phrygian dominant':7,
         'Lydian #2':8,
         'Super locrian bb7':11}

def next_scale(scale):
    scale.append(12)
    diff = scale[1] - scale[0]
    new_scale = [x - diff for x in scale[1:]]
    return new_scale


def tonal_scales_triads(tonality=random.choice([harmonic_minor, melodic_minor, major]), key=random.choice(keys)):
    """
    For major, harmonic or melodic minor, add the scales for the given key
    and add all possible triads    
    """
    tonal_scales = {}
    scale_triads = []
    tonal_modes = list(tonality.keys())
    tonality = list(tonality.values())
        
    for note, scale_name in zip(itemgetter(*tonality)(reorder(key)),tonal_modes):
        tonal_scales[scale_name] = itemgetter(*tonality)(reorder(note))
        for candidate_triad in possible_triads:
            if set(candidate_triad).issubset(tonality):
                scale_triads.append(f'{note}{qualities[candidate_triad[1]]}{qualities[candidate_triad[2]]}')
        tonality = next_scale(tonality)
    return key,tonal_scales, scale_triads


    

# key,scales, triads = tonal_scales_triads()

# for n in range(3,8):
#     print(random.sample(triads, n))
#     print()

if __name__ == "__main__":

    tonal_scales_triads()