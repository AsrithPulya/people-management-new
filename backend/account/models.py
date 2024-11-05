from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        (1, 'Admin'),
        (2, 'Basic'),
    ]
    
    role = models.IntegerField(choices=ROLE_CHOICES, default=2)

    # def __str__(self):
    #     return f"{self.username} - {self.get_role_display()}"
