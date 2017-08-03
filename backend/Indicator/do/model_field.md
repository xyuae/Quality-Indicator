# Model field reference

##  null
### Field.null
If true, Django will store empty values as NULL in the database. Default is False.
Avoid using null on string-based fields such as CharField and TextField because empty string values will always be stored as empty strings, not null.
If a string-based field has null=True, that means it has two possible values for "no data": NULL, and the empty string.
In most cases, it's redundant to have two possible values for "no data". The Django convention is to use the empty sring, not NULL

For both string-based and non-string-based fields, you will also need to set blank=True if you wish to permit empty values in forms,
as the null parameter only affects database stroage (see blank)

If you want to accept null values with BooleanField, use NullBooleanField instead.

## blank
### Field.blank
If True, the field is allowed to be blank. Default is False.

## choices
### Field.choices
// An iterable (e.g., a list or tuple) consisting itself of iterables

## Relationship fields
Django also defines a set of fields that represent relations.
### ForeignKey
class ForeginKey(othermodel, on_delete, **options)
A many-to-one relationship. Requires a positional arguent: the class to which the model is related.
To create a recursive relationship - an object that has a many-to-one relationship with itself - use models.ForeignKey('self', on_delete=models.CASCADE)
### Databse Representation
Behind the scences, Django appends "_id" to the field name to create its database column name.
In the above example, the database table for the Car model will have a manufacturer_id column.

### Arugments
ForeginKey accepts other arguments that define the details of how the relation works

- ForeginKey.on_delete

When an object referenced by a ForeginKey is deleted, Django will emulate the behavior of hte SQL constraint specified by the on_delete argument.
For example, if you have a nullable ForeignKey and you want it to be set null when the referenced object is deleted:
```
user = models.ForeginKey(
    User,
    models.SET_NULL,
    blank=True,
    null=True,
)
```
on_delete will be a required argument in Django 2.0. In older versions it defaults to CASCADE.
The possible values for on_delete are found in django.db.models:
- CASCADE: Cascade deletes. Django emulates the behavior of the SQL constraint on DELETE CASCADE and also deletes the object containing the ForeginKey.
- Project: Prevent deletion of the referenced object by raising ProtectError
- SET_NULL: Set the ForeignKey null; this is only possible if null is true
- SET_DEFAULT: Set the ForeginKey to its default value; a default for the ForeignKey must be set.
- SET(): Set the ForeignKey to the value passed to SET(), or if a callable is passed in, the result of calling it.
- DO_NOTHING: Take no action

ForeignKey.limit_choices_to
Sets a limit to the available choices for this field when this field is rendered using a ModelForm or the admin (by default, all objects in the queryset are available to choose);



