from django.db import models

class CheckBoard(models.Model):
    game_number = models.IntegerField()
    time_played = models.CharField(max_length=255)
    number_of_mistakes = models.IntegerField()

    def __str__(self):
        return f"Game {self.game_number}: Time played: {self.time_played}, Mistakes: {self.number_of_mistakes}"
