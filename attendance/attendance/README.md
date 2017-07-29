## Project structure
* The outer attendance/ root directory is just a container for the project
* manage.py: A command-line utility that lets you interact with this Django proejct in various ways.
* The inner attendance/ directory is the actual Python package for the project. Its name is the Python package name you'll need to use to import anythin inside it (eg. attendance.urls)
* attendance/__init__.py: An empty file that tells python that this directory should be considered a Python package.
* attendance/settings.py: Settings/configuration for this Django project. 
* attendance/urls.py: The URL declarations for this Django project: a "table of contents" of your Django-powered site. You can read more about URLs in URL dispatcher
* attendance/wsgi.py: An entry-point for WSGI-compatible web servers to serve your project. 
* The django development server can be started to run locally, which allows developing things rapidly without having to deal with configuring a production server - such as apache - until production
* Each application you write in Django consists of a Python package that follows a certain convention. Django comes with a utility that automatically generates the basic directory structure of an app, so you can focus on writing code rather than creating directories

## Project vs. apps
The difference between a project and an app: An app is a web application that does something - e.g., a Weblog system, a database of public records or a simple poll app. A project is a collection of configurtion and apps for a particular website. A project can contain multiple apps. An app can be in multiple projects
 
## Write your first view
To write the first view, open the file do/views.py and put the following Python code in it:
'''
from django.http import HttpResponse

def index(request):
	return HttpResponse("Hello, world. You're at the do index.")
'''
To call the view, we need to map it to a URL, thus we need a URLconf
To create a URLconf in the polls directory, create a file called urls.py.
In the attendance/urls.py file include the following code
'''
from django.conf.urls import urls
from . import views

urlpatterns = [
	url(r'^$', views.index, name = 'index'),
]
The next step is to point the root URLconf at the polls.urls module. In attendance/urls.py, add an imoprt for django.conf.urls.include and insert an include() in the urlpatterns list, so you have:
'''
from django.conf.urls import include, url
from django.conrib import admin

urlpatterns = [
	url(r'^do/', include('do.urls')),
	url(r'^admin/', admin.site.urls),
]
'''
The include() function allows referencing other URLconfs. Note that the regular expressins for the include() function doesn't have a $(end-of-string match character) but rather a trailing slash. Whever Django encounters include(), it chops off whatever part of the URL matched up to that point and sends the remaining string to the included URLconf for further processing.
The idea behind include() is to make it easy to plug-and-play URLs. 
### When to use include()
You should always include() when you include other URL patterns. admin.site.urls is the only exception to this.

### url() function
The url() function is passed four arguments, two required: regex and view, and two optional: kwargs, and name. At this point, it's worth reviewing what these arugments are for:
* url() argument: regex
The term "regex" is a commonly used short form meaning "regular expressioin", which is a syntax for matching patterns in strings, or in this case, url patterns. Django starts at the first regular expression and makes its way down the list, comparing the requested URL against each regualr expression until it finds one that matches.
Performance note: these regular expressions are compiled the first time the URLconf module is loaded. They're super fast(as long as the lookups aren't too complex as noted above).
* url() argument: view
When Django finds a regular expression match, Django calls the specified view function, with an HttpRequest object as the first argument and any "captured" values from the regular expression as other arguments. If the regex uses simple captures, values are passed as positional arguments; if it uses named captures, values are passed as keyword arguments.
* url() argument: kwargs
Arbitary keyword arguments can be passed in a dictionary to the target view. We aren't going to use this feature of Django-powered
* url() arguemnt: name
Naming your URL lets yourefer to it unambiguously from elsewhere in Django, especially from within templates. This powerful feature allows you to make global changes to the URL patterns of your project while only touching a single file.
Now you're comfortable with the basic request and response flow 


## Database setup
Open up attendance/settings.py. It's a normal Python module with module-level variables representing Django settings.
By default, the configuration uses SQLite. If you're new to database, or you're just interested in trying Django, this is the easiest choice. SQLite is included in Python, so you won't need to install anything else to support your database.
You may want to use a more scalable database like PostgreSQL, to avoid database-switching headaches down the road.
Note the INSTALLED_APPS setting at the top of the file. That holds the names of all Django applications that are activated in this Django instance. Apps can be used in multiple projects.
You can package and distribute them for use by others in their projects.
By default, INSTALLED_APPS contains the following apps, all of which comes with Django:
* django.contrib.admin - The admin site. You'll use it shortly
* django.contrib.auth - An authentication system
* django.contrib.contenttypes - A framework for content types
* django.contrib.sessions - A session framework
* django.contrib.messages - A messaging framework
* django.contrib.staticfiles - A framework for managing static files

These applications are included by default as a convenience for the common case.
Some of these applications make use of at least one database table, though, so we need to create the tables in the database before we can use them.
Run the following command:
'''
python manage.py migrate
'''
The migrate command looks at the INSTALLED_APPS setting and creates any necessary database tables according to the database settings in your attendance/settings.py file and the database migratios shipped with the app.
You'll see a message for each migration it applies.
## Creating models
Now we'll define your models - essentially, your database layout, with additional metadata.
### Philosophy
A model is the single, definitive source of truth about your data. It contains the essential fields and behaviors of the data you're stroing. Django follows the DRY Principle.
The goal is to define your data model in one place and automatically derive things from it.
This includes the migrations - unlike in Ruby on Rails, for example, migrations are entirely derived from your models file, and are essentially just a history that Django can roll through to update your database schema to match your current models.
The content of a data model is represented by simple Python classes.
Each model is represented by a class that subclasses django.db.models.Model. Each model has a number of class variables, each of which represents a database field in the model.
Each field is represented by an isntance of a Field class -e.g., CharField for character fields and DateTimeField for datetimes. This tells Django what type of data each fields holds.
The name of each Feild instance (e.g. question_text or pub_date) is the field's name, in machine-friendly format. You'll use this value in your Python code, and your database will use it as the column name.
You can use an optional first positional argument to a Field to designate a human-readable name. That's used in a couple of introspective parts of Django, and it doubles as documentation. If this field isn't provided, Django will use the machine-readable name.
'''
models.ForeignKey(Question, on_delete=models.CASCADE)
'''
A relationship is defined above, using ForeignKey. That tells Django each Choice is related to a single Question. Django supports all the common database relationships: many to one, many to many, and one to one.
## Activating models
That small bit of model code gives Django a lot of information. With it, Django is able to:
* Create a database schema(Create TABLE statements) for this app
* Create a Python database-access API for accessing data-model objects
First we needf to tell our project that the do app is installed.
### Philosophy
Django apps are "pluggable": you can use an app in multiple projects, and you can distribute apps, because they don't have to tied to a given Django installation.
To include the app in our project, we need to add a reference to its configuration class in the INSTALLED_APPS setting. The DoConfig class is int the do/apps.py file, so it its dotted path is
'do.apps.DoConfig'. Edit the attendance/settings.py file and add that dotted path to the INSTALLED_APPS setting.
'''
python manage.py makemigrations
python manage.py migrate
'''
By running makemigrations, you're telling Django that you've made some changes to hyour models(in this case, you've made new ones) and that you'd like the changes to be stored as a migration.

Migrations are how Django stores changes to your models(and thus your database schema) - they're just files on disk. You can read the migration for your new model under migration directory.
The following sqlmigrate command takes migration names and returns their SQL:
'''
python manage.py sqlmigrate do 0001
'''
Primary keys (IDs) are added automatically. Django appends "_id" to the foreign key field name. The foreign key relaionship is made explicit by a FOREIGN KEY constraint. Don't worry about the DEFERRABLE parts.
The migrate command takes all the migrations that haven't been applied(Django tracks which ones are applied using a special table in your database called django_migrations) and runs them against your database - essentially.
Migrations allows you to change your models over time without the need to delete your database or tables and make new ones - it specializes in upgrading your database live, without losing data.
### Three step guide to making model changes:
* Change your models (in models.py)
* Run python manage.py makemigrations to create migrations for those changes
* Run python manage.py migrate to apply those changes to the database
The reason that there are seperate commands to make and apply migrations is because you'll commit migrations to your version control system and ship them with your app;
They not only make your development easier, they're also useable by other developers and in production
## Playing with the API
Now, hop into the interactive Python shell and play around with the free API Django gives you. To invoke the Python shell, use this command:
'''
python manage.py shell
'''
We're using the above command instead of simply typing "python" because manage.py sets the Django_SETTINGS_MODULE environment vairable, which gives Django the Python import path to your attenance/settings.py file
Making representation of an object more helpful by adding a __str__() method class.
It's important to add __str__() methods to your models, not only for your own convenience when dealing with the interactive prompt, but also because object's representations are used throughout Django's automatically-generated admin.
'''
# Create your models here.
class Project(models.Model):
    proj_name = models.CharField(max_length=100, null=False, blank=False)
    pub_date = models.DateTimeField('date created')
    update_date = models.DateTimeField('date last updated')  # first optional argument to designate a human-readable name
    def __str__(self):
        return self.proj_name
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
'''
Note the addition of import datetime and from django.utils import timezone, to reference Python's standard datetime module and Django's time-zone-related utilites in django.utils.timezone,
respectively. If you aren't familiar with time zone handling in Python, you can learn more in the time zone support docs.
## Introducing the Django Admin
### Philosophy
Generating admin sites for your staff or clients to add, change, and delete content is tedious work that doesn't require much creativity. For that reason, Django entirely automates creation of admin interface for models
Django was written in a newsroom environment, with a very clear separation between "content publishers" and the "public" site. Site managers use the system to add news stories, events, sports scores, etc., and that content is displayed on the public site.
The admin isn't intended to be used by site visitors. It's for site managers.

groups and users are managed by admin site, which is proivided by django.contrib.auth, the authentication framework shipped by Django.

## Make the do app modifiable in the admin
We have to tell the admin that our do objects have an admin interface. To do this, open the do/admin.py file, and edit it to this:
'''
from django.contrib import admin

# Register your models here.
from .models import Project

admin.site.register(Project)
'''
The different model field types (DateTimeField, CharField) correspond to the appropriate HTML input widget. Each type of field knows how to display itself in the Django admin.
Each DateTimeField gets free JavaScript shortcuts. Dates get a "Today" shortcut and calendar popup, and times get a "Now" shortcut and a convenient popup that lists commonly entered times.


## Script
* python manage.py runserver -- run server
* python manage.py startapp do


## MongoDB
MangoDB is a non-relation database, which is opposite to relational database. It make use of text based set. These document are created in json format.
You can use Python to call MangoDB using MongoEngine. MongoEngine is a mapper from document to object.
### Example blog using MangoDB
We will use Python 1.7, Django 1.3, MongoDB 1.8.2, MongoEngine 0.4 and Hypertext Markup Language (HTML) 5. It allows all forms of standard CRUD operation.
CSS definition is included in a individual static file.
Django commnad
'''
django-admin.py startproject blongo
cd blongo
django-admin.py startapp blogapp
mkdir templates
cd blogapp
mkdir static
'''
To integrate MongoDB into your apps, just need MongoEngine under model.py
'''
Insert 'DBNAME=something' in settings.py

from mongoengine imoprt *
from blog.settings import DBNAME
connect(DBNAME)

class Post(Document):
    ...
'''


