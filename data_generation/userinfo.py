#!/usr/bin/python3

import json
import csv
import random
import datetime
import radar		# If error, "pip install radar"
import math
from datetime import datetime
from hashlib import sha256

'''
UserInfo record:
1) SIN (Hash of SIN)
2) First name
3) Last name
4) Birth date
5) User Public Key
6) Lawyer Public Key
7) Digital Signature
8) Timestamp
'''

# Number of records to generate
num_records = 1000
use_memory = True

first_names_memory = []
last_names_memory = []

first_names = ['Margert', 'Siu', 'Pearl', 'Melania', 'Charmaine', 'Leigh', 'Yukiko', 'Kandy', 'Robt', 'Marsha', 'Mica', 'Collene', 'Trinidad', 'Lorelei', 'Hanh']
last_names = ['Jefferson', 'Nottingham', 'Okumoto', 'Leadley', 'Marklund', 'Agnes', 'Hoblit', 'Koziak', 'Trish', 'Nolin', 'Fulham', 'Santarelli', 'Argetsinger']

def get_sin():
	SIN = "{:09}".format(random.sample(range(0, 1000000000), 1)[0])
	return sha256(SIN.encode('ascii')).hexdigest()

def get_fname():
	if use_memory == True:
		return random.choice(first_names)
	else:
		return random.choice(first_names_memory)

def get_lname():
	if use_memory == True:
		return random.choice(last_names)
	else:
		return random.choice(last_names_memory)

def get_birthdate():
	oldest_age = 100
	youngest_age = 18

	now = datetime.now()
	start_date = datetime(year=now.year-oldest_age, month=now.month, day=now.day)
	stop_date = datetime(year=now.year-youngest_age, month=now.month, day=now.day)

	random_date = radar.random_datetime(start_date, stop_date)
	return "{:02}/{:02}/{:04}".format(random_date.day, random_date.month, random_date.year)

def get_userPK():
	return "{:064x}".format(random.sample(range(0, 2*num_records), 1)[0])

def get_lawyerPK():
	return "{:064x}".format(random.sample(range(4*num_records, 8*num_records), 1)[0])

def get_digital_sig():
	return "{:064x}".format(random.sample(range(num_records*4, num_records*16), 1)[0])

def get_timestamp():
	return radar.random_datetime().strftime('%d/%m/%Y %H:%M:%S')

def export_pretty_json(json_data):
	with open('userinfo.txt', 'w') as f:
		f.write(json.dumps(json_data, indent=4))

# Generates the array for first_names and last_names in "name_array.txt"
def gen_names_arrays():
	# -1 == unlimited
	fname_limit = num_records
	lname_limit = num_records

	fnames = "first_names = ["
	lnames = "last_names = ["

	with open('firstnames.csv', 'rU') as f:
		entries = list(csv.reader(f))
		num_entries = len(entries)
		num_iterations = fname_limit if fname_limit != -1 else num_entries

		for i in range(0, num_iterations):
			pos = random.randrange(1, num_entries)
			fnames+=str('\''+entries[pos][0]+'\', ')
			first_names_memory.append(entries[pos][0])

	with open('lastnames.csv', 'rU') as f:
		entries = list(csv.reader(f))
		num_entries = len(entries)
		num_iterations = lname_limit if lname_limit != -1 else num_entries

		for i in range(0, num_iterations):
			pos = random.randrange(1, num_entries)
			lnames+=str('\''+entries[pos][0]+'\', ')
			last_names_memory.append(entries[pos][0])

	fnames+=str(']')
	lnames+=str(']')

	with open('name_array.txt', 'w') as f:
		f.write(fnames)
		f.write('\n')
		f.write(lnames)

'''
Generate userInfo records in JSON format using above helper functions
'''
data = {}
data['userInfo'] = []

gen_names_arrays();

for i in range(0, num_records):
	data['userInfo'].append({
		'sin'         : get_sin(),
		'first_name'  : get_fname(),
		'last_name'   : get_lname(),
		'birth_date'  : get_birthdate(),
		'userPK'	  : get_userPK(),
		'lawyerPK'	  : get_lawyerPK(),
		'digital_sig' : get_digital_sig(),
		'timestamp'	  : get_timestamp()
	})

export_pretty_json(data)
