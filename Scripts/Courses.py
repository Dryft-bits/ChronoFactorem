import json
import random
courses = None
with open("../client/src/Timetable.json",'r') as f:
    courses = (json.load(f)).keys()
_data = []
with open('./data/courses.json','w+') as f:
    for i in courses:
        data = {"courseId":i,"count":{"$numberInt":str(random.randint(0,300))}}
        _data.append(data)
    json.dump(_data,f)
