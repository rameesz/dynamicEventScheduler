
# Register your models here.
from django.contrib import admin
from .models import Event, Session, Speaker

admin.site.register(Event)
admin.site.register(Session)
admin.site.register(Speaker)
