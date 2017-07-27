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


## Script
* python manage.py runserver -- run server
* python manage.py startapp do