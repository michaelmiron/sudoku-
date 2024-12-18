from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import CheckBoard


@csrf_exempt
def save_game(request):
    try:
        time_played = request.POST.get('time_played')
        number_of_mistakes = request.POST.get('number_of_mistakes')

        if not time_played or not number_of_mistakes:
            return JsonResponse({'success': False, 'error': 'Missing required fields.'})



        game = CheckBoard(
            time_played=time_played,
            number_of_mistakes=int(number_of_mistakes)
        )
        game.save()

        return JsonResponse({'success': True, 'message': 'Game data saved successfully!'})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})


def is_valid_row(board, row):
    numbers = [num for num in board[row] if num != 0]
    return len(numbers) == len(set(numbers))


def is_valid_column(board, col):
    numbers = [board[row][col] for row in range(9) if board[row][col] != 0]
    return len(numbers) == len(set(numbers))


def is_valid_subgrid(board, start_row, start_col):
    numbers = []
    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            if board[i][j] != 0:
                numbers.append(board[i][j])
    return len(numbers) == len(set(numbers))


def validate_sudoku_board(request):
    try:

        board = request.GET.getlist('board')
        board = [[int(num) if num.isdigit() else 0 for num in row.split(',')] for row in board]

        for i in range(9):
            if not is_valid_row(board, i):
                return JsonResponse({'valid': False, 'error': f'Invalid row {i + 1}'})
            if not is_valid_column(board, i):
                return JsonResponse({'valid': False, 'error': f'Invalid column {i + 1}'})

        for i in range(0, 9, 3):
            for j in range(0, 9, 3):
                if not is_valid_subgrid(board, i, j):
                    return JsonResponse({'valid': False, 'error': f'Invalid subgrid starting at ({i + 1}, {j + 1})'})

        return JsonResponse({'valid': True, 'message': 'The board is valid!'})

    except Exception as e:
        return JsonResponse({'valid': False, 'error': str(e)})
