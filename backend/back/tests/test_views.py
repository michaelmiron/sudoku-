from django.test import TestCase, Client
from django.urls import reverse
from check_board.models import CheckBoard

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.save_game_url = reverse('save_game')
        self.validate_board_url = reverse('validate_sudoku_board')

    def test_save_game_valid_data(self):
        response = self.client.post(self.save_game_url, {
            'time_played': '10:11',
            'number_of_mistakes': 3
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'], True)
        self.assertEqual(response.json()['message'], 'Game data saved successfully!')

        game = CheckBoard.objects.get()
        self.assertEqual(game.time_played, '10:11')
        self.assertEqual(game.number_of_mistakes, 3)

    def test_save_game_missing_fields(self):
        response = self.client.post(self.save_game_url, {
            'time_played': '10:11'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'], False)
        self.assertIn('error', response.json())

    def test_save_game_invalid_data(self):
        response = self.client.post(self.save_game_url, {
            'time_played': '10:11',
            'number_of_mistakes': 'invalid_data'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'], False)
        self.assertIn('error', response.json())

    def test_validate_sudoku_board_valid(self):
        valid_board = [
            "5,3,0,0,7,0,0,0,0",
            "6,0,0,1,9,5,0,0,0",
            "0,9,8,0,0,0,0,6,0",
            "8,0,0,0,6,0,0,0,3",
            "4,0,0,8,0,3,0,0,1",
            "7,0,0,0,2,0,0,0,6",
            "0,6,0,0,0,0,2,8,0",
            "0,0,0,4,1,9,0,0,5",
            "0,0,0,0,8,0,0,7,9"
        ]
        response = self.client.get(self.validate_board_url, {'board': valid_board})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['valid'], True)
        self.assertIn('message', response.json())

    def test_validate_sudoku_board_invalid(self):
        invalid_board = [
            "5,3,3,0,7,0,0,0,0",
            "6,0,0,1,9,5,0,0,0",
            "0,9,8,0,0,0,0,6,0",
            "8,0,0,0,6,0,0,0,3",
            "4,0,0,8,0,3,0,0,1",
            "7,0,0,0,2,0,0,0,6",
            "0,6,0,0,0,0,2,8,0",
            "0,0,0,4,1,9,0,0,5",
            "0,0,0,0,8,0,0,7,9"
        ]
        response = self.client.get(self.validate_board_url, {'board': invalid_board})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['valid'], False)
        self.assertIn('Invalid row', response.json()['error'])

    def test_validate_sudoku_board_missing_data(self):
        response = self.client.get(self.validate_board_url, {})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['valid'], False)
        self.assertIn('error', response.json())

