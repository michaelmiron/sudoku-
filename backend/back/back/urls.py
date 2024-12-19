from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse


def home(request):
    return HttpResponse("Welcome to the home page!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('check_board/', include('check_board.urls')),
    path('', home),
]
