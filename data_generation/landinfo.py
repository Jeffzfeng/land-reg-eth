#!/usr/bin/python3

import sys
import json
import secrets
import radar
from random import randint
import datetime
from datetime import datetime
from dateutil.parser import parse

NULL = 'NULL'
ENABLE_PRINT = 0

'''
TODO:
1) Devise a method of linking merged/split PINs to each other
2) Devise a method of ensuring the timeline restrictions
3) Add PIN coordinates functionality
'''


'''
landInfo record:

1) Seller ID (Hash of SIN)		(32 Bytes = 64 Hex Characters)
2) Buyer ID						(32 Bytes = 64 Hex Characters)
3) PIN and PIN Coordinates		(PIN - 64 Bytes)
								(PIN Coordinates - variable number of bytes...)
4) Seller Ethereum Address		(20 Bytes = 40 Hex Characters)
5) Buyer Ethereum Address		(20 Bytes = 40 Hex Characters)
6) Amount to transfer
7) Hashes of all supporting 	(Merkle Root = 32 Bytes = 64 Hex Characters)
	legal documents
8) Digital signature from
	each party for the hash
	 of all above data
'''

'''
Read the information from the userInfo data
For each of the userInfo records, we have to randomize the properties that they own
Maybe we should have a list of PINs

Pseudo-Pin --> Spatial Identifier
https://www.sse.gov.on.ca/sites/MNR-PublicDocs/EN/CMID/Ownership%20Parcel%20-%20Data%20Description.pdf
http://www.teraview.ca/wp-content/uploads/2016/04/Teraview_Reference_Guide_TV80_Dec_2013.pdf
http://www.bluearthrenewables.com/wp-content/uploads/2015/06/PTRsiteconsiderationsinformation2015-08-05-revised.pdf
http://www2.teranetxchange.ca/title-data-solutions/

Format:
First five digits = Polaris Block Number
Last four digits = in range of 9500-9999

XXXXX-YYYY
'''

class PIN:
	'''
	PIN class
	1) PIN # - Unique number for each property
	2) Date active - Date PIN # became active
	3) Date inactive - Date PIN # became inactive
	4) Ownership chain - List of Owners and date of transfer of PIN
	5) PIN coordinates - List of points defining geographical polygon of land
	'''
	def __init__(self):
		self.pin = -1
		self.date_active = NULL
		self.date_inactive = NULL
		self.parents = []
		self.children = []
		self.ownership_chain = []
		self.pin_coordinates = []

num_transfer = 50
num_merge = 25
num_split = 25

PIN_NUM = 0

#Get the full list of user ids
#TODO: Perform file operation only once (i.e. read user ids from "user_info")
def get_user_ids():
	with open('userinfo.txt') as json_data:
		user_ids = [data['sin'] for data in json.load(json_data)['userInfo']]
	return user_ids

def get_user_info():
	with open('userinfo.txt') as json_data:
		user_info = json.load(json_data)['userInfo']
	return user_info
	
#Get all the PIN IDs
def get_pins(pin_data):
	pin_list = [data['pin'] for data in pin_data['pinInfo']]
	return pin_list
	
# Convert PIN # to specific format
def gen_pin_num(num):
	return "{:09}".format(num)

# PIN has to be made globally unique
def increment_pin():
	global PIN_NUM
	PIN_NUM = PIN_NUM+1
	
def get_random_date(begin,end):
	now = datetime.now()
	start_date = datetime(year=now.year-begin, month=now.month, day=now.day)
	stop_date = datetime(year=now.year-end, month=now.month, day=now.day)

	random_date = radar.random_datetime(start_date, stop_date)
	return "{:02}/{:02}/{:04}".format(random_date.day, random_date.month, random_date.year)

def get_random_date_between(start_year,end_year):
	start_date = datetime(year=start_year, month=1, day=1)
	stop_date = datetime(year=end_year, month=12, day=31)

	random_date = radar.random_datetime(start_date, stop_date)
	return "{:02}/{:02}/{:04}".format(random_date.day, random_date.month, random_date.year)

	
def print_transfer_list(transfer_list):
	for property in transfer_list:
		if ENABLE_PRINT > 0:
			print("Property: ")
			print("Pin: " + property.pin)
			print("Date active: " + property.date_active)
			print("Date inactive: " + property.date_inactive)
			
			print("Parents: ")
			for j in property.parents:
				print(j)
			
			print("Children: ")
			for j in property.children:
				print(j)
			
			print("Ownership chain: ")
			for j in property.ownership_chain:
				print(j)
			
			print("PIN coordinates: " + str(property.pin_coordinates))
			print("---------------------------")
	
def gen_chain_of_ownership_transfer(user_ids, user_info):
	
	#TODO: Have to cap the maximum number of transactions by the difference between the
	# number of year left until the current year
	
	#capped at max number of user ids - Users not allowed to buy land back
	max_land_transfers = randint(0, len(user_ids))
	
	date_active = NULL
	date_inactive = NULL
	ownership_chain = []

	#initialize PIN
	ownership_chain.append({
		'owner'             : NULL,
		'date_of_transfer'  : NULL,
	})
	
	has_run_once = False
	
	for _ in range(max_land_transfers):
		transfer_user_id = secrets.choice(user_ids)
		
		#TODO: Make sure that the user that is going to own the land is at least 
		# 18 years old from the time that the transfer is going to happen
		if not has_run_once:
			user_record = next((item for item in user_info if item['sin'] == transfer_user_id))
			start_year = parse(user_record['birth_date'], fuzzy=True).year
			date_active = get_random_date_between(start_year,start_year+1)
			date_inactive = NULL
			
			date_of_transfer = date_active
			
			has_run_once = True
		else:
			start_year += 2
			date_of_transfer = get_random_date_between(start_year,start_year+1)

		# Add to chain if not already there
		# TODO: verify check for existence is okay
		if transfer_user_id not in ownership_chain:
			ownership_chain.insert(0,({
				'owner'             : transfer_user_id,
				'date_of_transfer'  : date_of_transfer,
			}))

	return ownership_chain, date_active, date_inactive


# Generate the list of properties with simple ownership transfer
def gen_simple_transfer(user_ids, user_info, pin):
	property = PIN()
	
	property.pin = gen_pin_num(pin)
	property.ownership_chain, property.date_active, property.date_inactive = gen_chain_of_ownership_transfer(user_ids,user_info)

	return property
	
	
def gen_regular(num, user_ids, user_info):
	transfer_list = []

	begin = PIN_NUM
	end = PIN_NUM + num_transfer
	
	for i in range(begin, end):
		transfer_list.append(gen_simple_transfer(user_ids,user_info,i))
		increment_pin()
	
	return transfer_list
	
'''
Merging done between two PINs only

PINs to be merged
-----------------------
1) set owner from user_id to NULL
2) set date inactive
3) have link to newly merged PIN

Newly merged PIN
-----------------------
1) Set owner from NULL to user_id
2) set date active (same day that previous PIN made inactive)
3) have link to previous PINs
'''
def gen_merge_transfer(merge_list,merge_index,merge_pin,user_ids,user_info):
	
	#newly merged PIN's owner
	new_owner_id = secrets.choice(user_ids)

	latest_year1 = merge_list[merge_index].ownership_chain[0]['date_of_transfer']
	latest_year2 = merge_list[merge_index+1].ownership_chain[0]['date_of_transfer']
	
	#latest_year should be greater than any of the dates in the ownership chain of either
	if  latest_year1 == NULL and latest_year2 == NULL:
		date_inactive = get_random_date_between(1950,2015)
	elif latest_year1 == NULL:
		end_year2 = parse(latest_year2, fuzzy=True).year
		date_inactive = get_random_date_between(end_year2+1, end_year2+2)
	elif latest_year2 == NULL:
		end_year1 = parse(latest_year1, fuzzy=True).year
		date_inactive = get_random_date_between(end_year1+1, end_year1+2)
	else:
		end_year1 = parse(latest_year1, fuzzy=True).year
		end_year2 = parse(latest_year2, fuzzy=True).year
		latest_year = max(end_year1, end_year2)
		date_inactive = get_random_date_between(latest_year+1, latest_year+2)
	
	#Parents - PINs to be merged
	merge_list[merge_index].ownership_chain.insert(0,({
		'owner'             : NULL,
		'date_of_transfer'  : date_inactive,
	}))
	merge_list[merge_index+1].ownership_chain.insert(0,({
		'owner'             : NULL,
		'date_of_transfer'  : date_inactive,
	}))
	merge_list[merge_index].date_inactive = date_inactive
	merge_list[merge_index+1].date_inactive = date_inactive
	
	#Child - Merged parents
	mproperty = PIN()
	
	mproperty.pin = gen_pin_num(merge_pin)
	mproperty.date_active = date_inactive
	mproperty.date_inactive = NULL
	mproperty.ownership_chain.append({
		'owner'             : NULL,
		'date_of_transfer'  : NULL,
	})
	mproperty.ownership_chain.insert(0,({
		'owner'             : new_owner_id,
		'date_of_transfer'  : date_inactive,
	}))

	#TODO: look into making initialization to NULL upon creation since always done
	
	#Parents-Child Link
	merge_list[merge_index].children.append(mproperty.pin);
	merge_list[merge_index+1].children.append(mproperty.pin);
	
	#Child-Parents Link
	mproperty.parents.append(merge_list[merge_index].pin);
	mproperty.parents.append(merge_list[merge_index+1].pin);
	
	return mproperty

def gen_merge(num, user_ids,user_info):
	merge_list = []

	#generate twice as many normal transfer initially
	begin = PIN_NUM
	end = PIN_NUM + (num_merge*2)

	for i in range(begin,end):
		merge_list.append(gen_simple_transfer(user_ids,user_info,i))
		increment_pin()

	#Merge 2 PINs into 1
	for i in range(begin,end,2):
		merge_list.append(gen_merge_transfer(merge_list,i-begin,PIN_NUM,user_ids,user_info))
		increment_pin()
	
	return merge_list

	
'''
Splitting done into two PINs maximum

PIN to be split
-----------------------
1) set owner from user_id to NULL
2) set date inactive
3) have link to newly split PINs

Newly split PINs
-----------------------
1) Set owner from NULL to user_id
2) set date active
3) have link to previous PINs
'''
#TODO: Find a method to link split child to the parent
def gen_split_transfer(split_list,split_index,merge_pin,user_ids,user_info):
	#get new owners
	split1_owner_id = secrets.choice(user_ids)
	split2_owner_id = secrets.choice(user_ids)
	
	latest_year = split_list[split_index].ownership_chain[0]['date_of_transfer']
	
	#date_inactive should be a random date greater than the date of transfer
	if latest_year == NULL:
		date_inactive = get_random_date_between(1950,2015)
	else:
		#get the date of transfer
		end_year = parse(latest_year, fuzzy=True).year
		date_inactive = get_random_date_between(end_year+1,end_year+2)

	#Parent - PIN to be split
	split_list[split_index].ownership_chain.insert(0,({
		'owner'             : NULL,
		'date_of_transfer'  : date_inactive,
	}))
	split_list[split_index].date_inactive = date_inactive
	
	#Child - splits resulting from parent
	#Child 1
	sproperty1 = PIN()

	sproperty1.pin = gen_pin_num(merge_pin)
	sproperty1.date_active = date_inactive
	sproperty1.date_inactive = NULL
	sproperty1.ownership_chain.append(({
		'owner'             : NULL,
		'date_of_transfer'  : NULL,
	}))
	sproperty1.ownership_chain.insert(0,({
		'owner'             : split1_owner_id,
		'date_of_transfer'  : date_inactive,
	}))

	#Child 2
	sproperty2 = PIN()

	sproperty2.pin = gen_pin_num(merge_pin+1)
	sproperty2.date_active = date_inactive
	sproperty2.date_inactive = NULL
	sproperty2.ownership_chain.append({
		'owner'             : NULL,
		'date_of_transfer'  : NULL,
	})
	sproperty2.ownership_chain.insert(0,({
		'owner'             : split2_owner_id,
		'date_of_transfer'  : date_inactive,
	}))

	#Parent->Children Link
	split_list[split_index].children.append(sproperty1.pin)
	split_list[split_index].children.append(sproperty2.pin)
	
	#Children->Parent Link
	sproperty1.parents.append(split_list[split_index].pin);
	sproperty2.parents.append(split_list[split_index].pin);

	sproperty = []
	sproperty.append(sproperty1)
	sproperty.append(sproperty2)
	
	return sproperty

def gen_split(num, user_ids,user_info):
	split_list = []

	begin = PIN_NUM
	end = PIN_NUM + num_split
	
	for i in range(begin,end):
		split_list.append(gen_simple_transfer(user_ids,user_info,i))
		increment_pin()

	#Split 1 PIN into 2
	for i in range(begin,end):
		temp_list = gen_split_transfer(split_list,i-begin,PIN_NUM,user_ids,user_info)
		split_list.append(temp_list[0])
		split_list.append(temp_list[1])
		increment_pin()
		increment_pin()
	
	return split_list


'''
Each PIN should have: 
 - GPS coordinates (Use LatLon => 6 Decimal precision is enough for application)
'''
def export_pretty_json(json_data):
	with open('landinfo.txt', 'w') as f:
		f.write(json.dumps(json_data, indent=4))

#Generate data into the JSON format
def gen_json(transfer_list,merge_list,split_list):
	pin_data = {}
	pin_data['pinInfo'] = []

	#concatenate the three lists based on method suggested in following link
	#https://stackoverflow.com/questions/1720421/how-to-concatenate-two-lists-in-python
	full_list = [*transfer_list,*merge_list,*split_list]
	
	for property in full_list:
		pin_data['pinInfo'].append({
			'pin'               : property.pin,
			'date_active'       : property.date_active,
			'date_inactive'     : property.date_inactive,
			'parents'			: property.parents,
			'children'			: property.children,
			'ownership_chain'   : property.ownership_chain,
			'Coordinates'		: property.pin_coordinates,
		})

	if ENABLE_PRINT > 0:
		print(json.dumps(pin_data, indent=4))
	export_pretty_json(pin_data)



#MAIN
user_ids = get_user_ids()
user_info = get_user_info()

'''
Regular Transfer
'''
if ENABLE_PRINT > 0:
	print("\n*************")
	print("Regular List")
	print("*************\n")

transfer_list = gen_regular(num_transfer, user_ids, user_info)
print_transfer_list(transfer_list)

'''
Merge Transfer
'''
if ENABLE_PRINT > 0:
	print("\n*************")
	print("Merge List")
	print("*************\n")

merge_list = gen_merge(num_merge, user_ids, user_info)
print_transfer_list(merge_list)

'''
Split Transfer
'''
if ENABLE_PRINT > 0:
	print("\n*************")
	print("Split List")
	print("*************\n")

split_list = gen_split(num_split, user_ids, user_info)
print_transfer_list(split_list)

if ENABLE_PRINT > 0:
	print("\nExporting records as json...\n")
gen_json(transfer_list,merge_list,split_list)

print("\nREGULAR: Active Regular: " + str(num_transfer))
print("MERGE: Inactive Regular: " + str(num_merge*2) + " Active Merge: " + str(num_merge))
print("SPLIT: Inactive Regular: " + str(num_split) + " Active Split: " + str(num_split*2))
print("\nTotal Number of PINs generated: " + str(PIN_NUM) + "\n")
