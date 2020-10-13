import json
import names
import random
false = False
true = True
#listOfUsernames = ["Mike Hunt", "Ben Dover", "Phil M'Crack", "Mike Oxlong", "Hue Janus", "Jennah Tillias", "Ivan Tufaq", "Mike Hock"]
branch = ["CS","ECE","EEE","ENI","PHY","CHEM","ECO","BIO","CHE","CE","CHEM","PHA"]
courses = None
with open("../client/src/Timetable.json",'r') as f:
    courses = (json.load(f)).keys()
year = [1,2,3,4,5]
jsonlist = []
with open('./data/students.json','w+') as f:
    for i in range(0,10):
        jsonStudent = {"branch":["CHEM"],"interestedCourses":[{"BIO F111":{"$numberInt":"1"}}],"name":"fdjkdfkj","email":"f20202020@hyderabad.bits-pilani.ac.in","submittedForm":true,"year":{"$numberInt":"2"}}
        courseInt = random.sample(courses,random.randint(1,5))
        interestedCourses =  [{c: {'$numberInt:': str(random.randint(1,4))}} for c in courseInt]
        jsonStudent['branch'] = [random.choice(branch)]
        jsonStudent['year'] = { '$numberInt': random.choice(year)}
        jsonStudent['interestedCourses'] = interestedCourses
        jsonStudent['submittedForm'] = random.choice([true, false])
        jsonStudent['email']= "f2020"+"{:04d}".format(random.randint(1,1500))+"@hyderabad.bits-pilani.ac.in"
        jsonStudent['name'] = names.get_full_name()
        jsonlist.append(jsonStudent)
        #jsonlist.append(json.dumps(jsonStudent))
    json.dump(jsonlist,f)



