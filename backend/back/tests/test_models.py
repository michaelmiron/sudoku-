from django.test import TestCase
from check_board.models import CheckBoard


class TestCheckBoardModel(TestCase):

    def test_create_check_board_with_valid_data(self):
        game = CheckBoard.objects.create(
            time_played="15:30",
            number_of_mistakes=5
        )
        self.assertEqual(game.time_played, "15:30")
        self.assertEqual(game.number_of_mistakes, 5)
        self.assertIsNotNone(game.game_number)


    def test_check_board_str_method(self):
        game = CheckBoard.objects.create(
            time_played="12:11",
            number_of_mistakes=2
        )
        expected_str = f"Game {game.game_number}: Time played: 12:11, Mistakes: 2"
        self.assertEqual(str(game), expected_str)