from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login , logout
from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from .models import Event, Session
from .forms import EventForm, SessionForm
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import RegisterSerializer ,LoginSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt





from .models import Event, Session

class RegisterAPI(APIView):
    permission_classes=[]
    def post(self,request):
        _data = request.data
        serializer = RegisterSerializer(data=_data)

        if not serializer.is_valid():
            return Response({"msg": serializer.errors},status=status.HTTP_404_NOT_FOUND)
        
        serializer.save()
        return Response({"msg":"User created"}, status=status.HTTP_201_CREATED)

@login_required
class LoginAPI(APIView):
    permission_classes = []

    def post(self, request):
        _data = request.data
        serializer = LoginSerializer(data=_data)

        if not serializer.is_valid():
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])

        if not user:
            return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"msg": "Login Successful", "token": str(token.key)}, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'You have successfully logged out'}, status=200)


def home_view(request):
    return render(request, 'home.html')

@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('list_events')
    else:
        form = EventForm()
    return render(request, 'create_event.html', {'form': form})
@login_required
def update_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    if request.method == 'POST':
        form = EventForm(request.POST, instance=event)
        if form.is_valid():
            form.save()
            return redirect('event_details', event_id=event.id)
    else:
        form = EventForm(instance=event)
    return render(request, 'update_event.html', {'form': form})

@login_required
def delete_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    event.delete()
    return redirect('list_events')

@login_required
def list_events(request):
    events = Event.objects.all()
    return render(request, 'list_events.html', {'events': events})

@login_required
def event_details(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    sessions = event.session_set.all()
    return render(request, 'event_details.html', {'event': event, 'sessions': sessions})

# Session Management

@login_required
def add_session(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    if request.method == 'POST':
        form = SessionForm(request.POST)
        if form.is_valid():
            session = form.save(commit=False)
            session.event = event
            try:
                session.save()
                return redirect('event_details', event_id=event.id)
            except ValidationError as e:
                form.add_error(None, e.message)
    else:
        form = SessionForm()
    return render(request, 'add_session.html', {'form': form, 'event': event})

@login_required
def update_session(request, session_id):
    session = get_object_or_404(Session, id=session_id)
    if request.method == 'POST':
        form = SessionForm(request.POST, instance=session)
        if form.is_valid():
            try:
                form.save()
                return redirect('event_details', event_id=session.event.id)
            except ValidationError as e:
                form.add_error(None, e.message)
    else:
        form = SessionForm(instance=session)
    return render(request, 'update_session.html', {'form': form, 'session': session})

@login_required
def delete_session(request, session_id):
    session = get_object_or_404(Session, id=session_id)
    event_id = session.event.id
    session.delete()
    return redirect('event_details', event_id=event_id)

@login_required
def list_all_sessions(request):
    sessions = Session.objects.all()
    return render(request, 'list_all_sessions.html', {'sessions': sessions})
