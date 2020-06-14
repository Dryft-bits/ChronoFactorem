import json
import random

with open(
        '../client/src/Timetable.json'
) as f:
    timetable = json.load(f)

data = []

for course in timetable:
    if course.startswith('GS') or course.startswith('HSS') or course in [
            'BITS F214', 'BITS F385', 'BITS F399'
    ]:
        data.append({
            'courseName': course,
            'studentsInterestedInSlot': {
                '0': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '1': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '2': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '3': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '4': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '5': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '6': {
                    '$numberInt': str(random.randint(1, 30))
                },
                '7': {
                    '$numberInt': str(random.randint(1, 30))
                },
            }
        })

with open('./data/HEL_MOCK_DATA.json', 'w+') as f:
    json.dump(data, f)