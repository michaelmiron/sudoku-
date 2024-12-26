from django.test import TestCase
from check_board.models import CheckBoard
from django.db.utils import IntegrityError

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


    def test_create_check_board_with_missing_time_played(self):
        with self.assertRaises(IntegrityError):
            CheckBoard.objects.create(
                time_played=None,
                number_of_mistakes=3
            )


    def test_create_check_board_with_invalid_number_of_mistakes(self):
        with self.assertRaises(ValueError):
            CheckBoard.objects.create(
                time_played="10:00",
                number_of_mistakes="invalid_value"
            )

