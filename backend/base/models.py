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

class Item(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    first_bid = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    currently = models.DecimalField(null=True, blank=True, max_digits=7, decimal_places=2, default = first_bid)
    buy_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    number_of_bids = models.DecimalField(null=True, blank=True, max_digits=7, decimal_places=0, default=0)
    bids = models.DecimalField(max_digits=7, decimal_places=0, default = 0)
    location = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    started = models.DateTimeField(auto_now_add=True)
    ends = models.DateTimeField(null=False, blank=False)

    def __str__(self):
        return self.name

class Bidder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.user.name)

class Bid(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    # bidder = models.ForeignKey(Bidder, on_delete=models.CASCADE, null=True)
    ammount = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.ammount)
