from django.urls import path
from .views import roll_dice_view

urlpatterns = [
    path('roll/', roll_dice_view, name='roll_dice'),
]
