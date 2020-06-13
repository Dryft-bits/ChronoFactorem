import copy
import json
from numpy.random import permutation
true = True
tt = { "_id": { "$oid": "5edfadc23f5eb818e7f5d2d8" }, "branch": ["CS"], "Courses": [{ "course": { "BIO F110": { "name": "Biology Laboratory", "sections": { "L1": { "instructors": ["Gireesha T Mohannath"], "sched": [{ "room": "A122", "days": ["F"], "hours": [{ "$numberInt": "4" }, { "$numberInt": "5" }] }] }, "L2": { "instructors": ["Minali Singh"], "sched": [{ "room": "A122", "days": ["Th"], "hours": [{ "$numberInt": "4" }, { "$numberInt": "5" }] }] }, "L3": { "instructors": ["Vidya Rajesh"], "sched": [{ "room": "A122", "days": ["T"], "hours": [{ "$numberInt": "4" }, { "$numberInt": "5" }] }] }, "L4": { "instructors": ["PIYUSH KHANDELIA"], "sched": [{ "room": "A122", "days": ["M"], "hours": [{ "$numberInt": "4" }, { "$numberInt": "5" }] }] }, "L5": { "instructors": ["Aishwarya Natarajan"], "sched": [{ "room": "A122", "days": ["W"], "hours": [{ "$numberInt": "4" }, { "$numberInt": "5" }] }] }, "L6": { "instructors": ["Anne Lohitha Alias Anuhya"], "sched": [{ "room": "A122", "days": ["T"], "hours": [{ "$numberInt": "7" }, { "$numberInt": "8" }] }] }, "L7": { "instructors": ["Vivek Sharma"], "sched": [{ "room": "A122", "days": ["M"], "hours": [{ "$numberInt": "7" }, { "$numberInt": "8" }] }] }, "L8": { "instructors": ["Aruku Dazo Vadeo"], "sched": [{ "room": "A122", "days": ["F"], "hours": [{ "$numberInt": "7" }, { "$numberInt": "8" }] }] }, "L9": { "instructors": ["Piyush Khandelia"], "sched": [{ "room": "A122", "days": ["W"], "hours": [{ "$numberInt": "7" }, { "$numberInt": "8" }] }] }, "L10": { "instructors": ["Bakhya Shree Gb"], "sched": [{ "room": "A122", "days": ["S"], "hours": [{ "$numberInt": "4" }, { "$numberInt": "5" }] }] }, "L11": { "instructors": ["Anne Lohitha Alias Anuhya"], "sched": [{ "room": "A122", "days": ["Th"], "hours": [{ "$numberInt": "7" }, { "$numberInt": "8" }] }] } }, "compre": { "date": "30/04", "session": "FN" } } }, "sections": ["L1"] }, { "course": { "HSS F222": { "name": "Linguistics", "sections": { "L1": { "instructors": ["PRANESH BHARGAVA"], "sched": [{ "room": "J120", "days": ["T", "Th", "S"], "hours": [{ "$numberInt": "3" }] }] } }, "compre": { "date": "06/05", "session": "AN" }, "midsem": { "date": "4/3", "time": "9.00 - 10.30AM" } } }, "sections": ["L1"] }], "isShared": true, "ownerId": { "$oid": "5edf76404d1ef40ffbc7835a" }, "name": "t4", "year": { "$numberInt": "2" }, "TimeTable": { "M": { "one": {}, "two": {}, "three": {}, "four": {}, "five": {}, "six": {}, "seven": {}, "eight": {}, "nine": {}, "ten": {} }, "T": { "one": {}, "two": {}, "three": { "courseCode": ["HSS F222"], "courseName": "Linguistics", "sectionRoom": "J120", "numHours": { "$numberInt": "1" }, "section": "L1" }, "four": {}, "five": {}, "six": {}, "seven": {}, "eight": {}, "nine": {}, "ten": {} }, "W": { "one": {}, "two": {}, "three": {}, "four": {}, "five": {}, "six": {}, "seven": {}, "eight": {}, "nine": {}, "ten": {} }, "Th": { "one": {}, "two": {}, "three": { "courseCode": ["HSS F222"], "courseName": "Linguistics", "sectionRoom": "J120", "numHours": { "$numberInt": "1" }, "section": "L1" }, "four": {}, "five": {}, "six": {}, "seven": {}, "eight": {}, "nine": {}, "ten": {} }, "F": { "one": {}, "two": {}, "three": {}, "four": { "courseCode": ["BIO F110"], "courseName": "Biology Laboratory", "sectionRoom": "A122", "numHours": { "$numberInt": "2" }, "section": "L1" }, "five": { "courseCode": ["BIO F110"], "courseName": "Biology Laboratory", "sectionRoom": "A122", "numHours": { "$numberInt": "2" }, "section": "L1" }, "six": {}, "seven": {}, "eight": {}, "nine": {}, "ten": {} }, "S": { "one": {}, "two": {}, "three": { "courseCode": ["HSS F222"], "courseName": "Linguistics", "sectionRoom": "J120", "numHours": { "$numberInt": "1" }, "section": "L1" }, "four": {}, "five": {}, "six": {}, "seven": {}, "eight": {}, "nine": {}, "ten": {} } }, "username": "AVIRAL AGARWAL", "date": { "$date": { "$numberLong": "1591717314912" } }, "__v": { "$numberInt": "0" } }
listOfUsernames = ["Mike Hunt", "Ben Dover", "Phil M'Crack", "Mike Oxlong", "Hue Janus", "Jennah Tillias", "Ivan Tufaq", "Mike Hock"]
branch = ["CS","ECE","EEE","ENI","PHY","CHEM","ECO","BIO","CHE","CE","CHEM","PHA"]
year = [1,2,3,4,5]

fullarray = []

for k in year:
    branch = permutation(branch)
    for j in branch:
        listOfUsernames =  permutation(listOfUsernames)
        for i in listOfUsernames:
           ttt = copy.deepcopy(tt)
           ttt['branch'] = j
           ttt['year'] = k
           ttt['username'] = i
           fullarray.append(json.dumps(ttt))

with open('./ttfile.txt','w+') as f:
    for i in fullarray:
        f.writelines(i+',')

           