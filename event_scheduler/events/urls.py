from django.urls import path
from .views import (
    RegisterAPI, LoginAPI, logout_view, home_view, 
    create_event, update_event, delete_event, list_events, 
    event_details, add_session, update_session, delete_session, 
    list_all_sessions
)

urlpatterns = [
    # Django views
    path('home', home_view, name='home'),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
    path('events/create/', create_event, name='create_event'),
    path('events/<int:event_id>/update/', update_event, name='update_event'),
    path('events/<int:event_id>/delete/', delete_event, name='delete_event'),
    path('events/', list_events, name='list_events'),
    path('events/<int:event_id>/', event_details, name='event_details'),
    path('events/<int:event_id>/sessions/add/', add_session, name='add_session'),
    path('sessions/<int:session_id>/update/', update_session, name='update_session'),
    path('sessions/<int:session_id>/delete/', delete_session, name='delete_session'),
    path('sessions/', list_all_sessions, name='list_all_sessions'),

   
]
