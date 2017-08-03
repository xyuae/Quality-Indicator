
## MongoDB
MangoDB is a non-relation database, which is opposite to relational database. It make use of text based set. These document are created in json format.
You can use Python to call MangoDB using MongoEngine. MongoEngine is a mapper from document to object.
### Example blog using MangoDB
We will use Python 1.7, Django 1.3, MongoDB 1.8.2, MongoEngine 0.4 and Hypertext Markup Language (HTML) 5. It allows all forms of standard CRUD operation.
CSS definition is included in a individual static file.
Django commnad
```
django-admin.py startproject blongo
cd blongo
django-admin.py startapp blogapp
mkdir templates
cd blogapp
mkdir static
```
To integrate MongoDB into your apps, just need MongoEngine under model.py
```
Insert 'DBNAME=something' in settings.py

from mongoengine imoprt *
from blog.settings import DBNAME
connect(DBNAME)

class Post(Document):
    ...
```


