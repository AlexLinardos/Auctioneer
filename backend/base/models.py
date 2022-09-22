from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    # extra fields
    phone = models.CharField(max_length=15, default="none")
    country = models.CharField(max_length=100, default="none")
    city = models.CharField(max_length=100, default="none")
    address = models.CharField(max_length=100, default="none")
    TIN = models.CharField(max_length=20, default="none")
    seller_rating = models.IntegerField(null=True, blank=True)
    bidder_rating = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        if self.user!=None:
            return ("Profile:" + str(self.user))
        else:
            return("Profile without user")