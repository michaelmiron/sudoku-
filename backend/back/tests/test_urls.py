from django.test import SimpleTestCase
from django.urls import reverse, resolve
from check_board.views import save_game, validate_sudoku_board


class TestUrls(SimpleTestCase):

    def test_save_game_url_resolves(self):
        url = reverse('save_game')
        self.assertEqual(resolve(url).func, save_game)

    def test_validate_sudoku_board_url_resolves(self):
        url = reverse('validate_sudoku_board')
        self.assertEqual(resolve(url).func, validate_sudoku_board)

