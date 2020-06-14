import random
from datetime import datetime, timedelta
from pprint import pprint
import json
ID_START = 0x5edf71829e6606d76ecca055
ID_END = 0x5edf71829e6606d76ecca05e
login_data = []
for _ in range(10):
    id = random.randint(ID_START, ID_END)
    delta = timedelta(days=random.randint(0, 180),
                      seconds=random.randint(0, 86400))
    date = datetime.now() - delta
    date_string = f"{date.day:02}-{date.month:02}-{date.year:04}T{date.hour:02}:{date.minute:02}:{date.second:02}.{str(date.microsecond)[:3]}Z"
    
    data = {
        "userId": {"$oid":
                   f"{id:x}"},
        "createdAt": {
            "$date": f"{date_string}"}
    }
    login_data.append(data)
    login_data.sort(key=lambda x: x["createdAt"]["$date"])
    pprint(login_data)
