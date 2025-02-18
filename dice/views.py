from django.http import JsonResponse
from .utils import roll_dice, reseed_if_needed

def roll_dice_view(request):
    """
    Endpoint to roll the dice.
    """
    # Check if the pool is running low and reseed if needed.
    reseed_if_needed()
    result = roll_dice()
    return JsonResponse({"dice_face": result})
