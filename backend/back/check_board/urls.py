from django.urls import path
from . import views

urlpatterns = [
    path('save_game/', views.save_game, name='save_game'),
    path('validate/', views.validate_sudoku_board, name='validate_sudoku_board'),
    path('chat/', views.chat, name='chat'),
    path('generate_game_plot/', views.generate_game_performance_plot, name='generate_game_plot'),
]
