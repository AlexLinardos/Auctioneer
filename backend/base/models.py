from django.db import models
from django.contrib.auth.models import User

class Entries(models.Model):
    @property
    def user(self):
        return User.objects.get(pk=self.user_id)

    def users_name(self):
        user = User.objects.get(pk=self.user_id)
        return user_name
        
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile',on_delete=models.CASCADE, default=None)
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

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

class Category(models.Model):
    name = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return "%s" % unicode(self.name)

class Item(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=False)
    image = models.ImageField(blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    first_bid = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=False)
    currently = models.DecimalField(null=True, blank=True, max_digits=7, decimal_places=2)
    buy_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    number_of_bids = models.DecimalField(max_digits=7, decimal_places=0, default=0, blank=True)
    bids = models.DecimalField(max_digits=7, decimal_places=0, default = 0, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    started = models.DateTimeField(auto_now_add=True)
    ends = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=200, null=True, blank=True, 
    choices=[
        ('Upcoming', 'Upcoming'),
        ('Not started', 'Not started'),
        ('Active', 'Active'),
        ('Concluded', 'Concluded'),
    ])
    saved = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name

class Bidder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.user.name)

class Bid(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    # bidder = models.ForeignKey(Bidder, on_delete=models.CASCADE, null=True)
    ammount = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.ammount)
