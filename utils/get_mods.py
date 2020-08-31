# -*- coding: utf-8 -*-
"""
Created on Mon Aug 31 14:59:18 2020

@author: Dean
"""


from modulefinder import ModuleFinder
f = ModuleFinder()
	
#run the main script
f.run_script('practice_1.9.py')
	
# Get names of all the imported modules
names = list(f.modules.keys())
	
# Get a sorted list of the root modules imported
basemods = sorted(set([name.split('.')[0] for name in names]))
# Print it nicely
print("\n".join(basemods))