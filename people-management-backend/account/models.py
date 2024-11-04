from django.db import models
from django.contrib.auth.models import AbstractUser


#User Model
class User(AbstractUser):                               
    role = models.IntegerField(default=2)