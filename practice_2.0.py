# -*- coding: utf-8 -*-
"""
Created on Tue Aug 18 08:52:43 2020

@author: Dean
"""
import sys
import json
import random
import build_practice


key, scales, triads = build_practice.tonal_scales_triads()

data = {"key": key,
        "scale": random.choice(list(scales.items())),
        "triads": random.sample(triads, 3)}

print(json.dumps(data))
