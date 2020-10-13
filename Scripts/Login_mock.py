import json
import random
from datetime import datetime, timedelta, timezone

data = []

START_ID = 0x5edfc6a5d4a4f36e20f98e8b

START_USER = 0x5ee5fc309e6606d76e9c0e83
END_USER = 0x5ee5fc309e6606d76e9c1000

for id_ in range(100):
    #id_ = START_ID + id_
    user = random.randint(START_USER, END_USER)
    delta = timedelta(days=random.randint(0, 180),
                      seconds=random.randint(0, 86400))
    creation_date = datetime.now(tz=timezone.utc) - delta
    seconds = (creation_date -
               datetime(1970, 1, 1, tzinfo=timezone.utc)).total_seconds()
    data.append({
        'userId': {
            '$oid': f"{user:x}"
        },
        'createdAt': {
            '$date': {
                '$numberLong': f"{int(seconds)}{random.randint(1,999):03}"
            }
        },
    })
data.sort(key=lambda x: x["createdAt"]["$date"]['$numberLong'])

with open('./data/login.json', 'w') as f:
    json.dump(data, f)
