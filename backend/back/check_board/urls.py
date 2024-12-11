from django.urls import path
from . import views

urlpatterns = [
    path('validate/', views.validate_sudoku_board, name='validate_sudoku_board'),
]
