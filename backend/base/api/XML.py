from .serializers.itemSerializers import ItemSerializer
from ..models import Item, User, Bid
import logging
import xml.etree.ElementTree as ET
import xml.dom.minidom as md
import pathlib
from bs4 import BeautifulSoup as Soup

def itemsXML():
    serializer = ItemSerializer(Item.objects.all(), many=True)
    data = serializer.data

    rootE = ET.Element('Items')
    for item in data:
        itemE = ET.SubElement(rootE, 'Item')
        itemE.set('ItemID', str(item['_id']))
        nameE = ET.SubElement(itemE, 'Name')
        nameE.text = str(item['name'])
        for category in item['categories']:
            categoryE = ET.SubElement(itemE, 'Category')
            categoryE.text = str(category['name'])
        currentlyE = ET.SubElement(itemE, 'Currently')
        currentlyE.text = "$"+str(item['currently'])
        firstbidE = ET.SubElement(itemE, 'First_Bid')
        firstbidE.text = "$"+str(item['first_bid'])
        numofbidsE = ET.SubElement(itemE, 'Number_of_Bids')
        numofbidsE.text = "$"+str(item['number_of_bids'])
        bidsE = ET.SubElement(itemE, 'Bids')
        for bid in item['bids']:
            temp_profile = User.objects.get(id=bid['user']).profile
            bidE = ET.SubElement(bidsE, 'Bid')
            bidderE = ET.SubElement(bidE, 'Bidder')
            bidderE.set('Rating', str(temp_profile.bidder_rating))
            bidderE.set('UserID', bid['name'])
            bidderLocationE = ET.SubElement(bidderE, 'Location')
            bidderLocationE.text = str(temp_profile.city)
            bidderCountryE = ET.SubElement(bidderE, 'Country')
            bidderCountryE.text = str(temp_profile.country)
            bidTimeE = ET.SubElement(bidE, 'Time')
            bidTimeE.text = str(bid['time'])
            bidAmountE = ET.SubElement(bidE, 'Amount')
            bidAmountE.text = "$"+str(bid['ammount'])
        locationE = ET.SubElement(itemE, 'Location')
        locationE.set('Latitude', str())
        locationE.set('Longitude', str())
        locationE.text = str(item['location'])
        countryE = ET.SubElement(itemE, 'Country')
        countryE.text = str(item['country'])
        startedE = ET.SubElement(itemE, 'Started')
        startedE.text = str(item['started'])
        endsE = ET.SubElement(itemE, 'Ends')
        endsE.text = str(item['ends'])
        sellerE = ET.SubElement(itemE, 'Seller')
        sellerE.set('Rating', str(item['user']['userProfile']['seller_rating']))
        sellerE.set('UserID', str(item['user']['username']))
        descriptionE = ET.SubElement(itemE, 'Description')
        descriptionE.text = str(item['description'])

    final_xml = md.parseString(ET.tostring(rootE)).toprettyxml(indent='\t')
    curr_path = pathlib.Path(__file__).parent.absolute()
    root_str = str(curr_path.parents[2])
    file_path = root_str+'/frontend/public/Items.xml'
    with open(file_path, "w") as f:
        f.write(final_xml)

    return "success"

def XMLupload(filename, creator):
    curr_path = pathlib.Path(__file__).parent.absolute()
    backend_root_str = str(curr_path.parents[1])
    file_path = backend_root_str+'/static/images/'+filename
    soup = Soup(open(file_path), "xml")
    #parsing
    all_items = []
    for itemT in soup.find_all("Item"):
        item_info = {}
        item_info['name'] = itemT.find("Name").text
        categories = []
        for categoryT in itemT.find_all("Category"):
            categories.append(categoryT.text)
        item_info['categories'] = categories
        item_info['currently'] = itemT.find("Currently").text
        if itemT.find("Buy_Price")!=None:
            item_info['buyout'] = itemT.find("Buy_Price").text
        else:
            item_info['buyout'] = "Not given"
        item_info['first_bid'] = itemT.find("First_Bid").text
        item_info['num_of_bids'] = itemT.find("Number_of_Bids").text
        bidsT = itemT.find("Bids")
        bids = []
        for bidT in bidsT.find_all("Bid"):
            bid = {}
            bidderT = bidT.find("Bidder")
            bidder = {}
            bidder['rating'] = bidderT.attrs["Rating"]
            bidder['id'] = bidderT.attrs["UserID"]
            if bidderT.find("Location")!=None:
                bidder['location'] = bidderT.find("Location").text
            else:
                bidder['location'] = "Not given"
            if bidderT.find("Country")!=None:
                bidder['country'] = bidderT.find("Country").text
            else:
                bidder['country'] ="Not given"
            bid['bidder'] = bidder
            bid['time'] = bidT.find("Time").text
            bid['amount'] = bidT.find("Amount").text
            bids.append(bid)
        item_info['bids'] = bids
        item_info['location'] = itemT.find("Location").text
        if itemT.find("Location").attrs:
            item_info['location_lat'] = itemT.find("Location").attrs["Latitude"]
        if itemT.find("Location").attrs:
            item_info['location_long'] = itemT.find("Location").attrs["Longitude"]
        item_info['country'] = itemT.find("Country").text
        item_info['started'] = itemT.find("Started").text
        item_info['ends'] = itemT.find("Ends").text
        seller = {}
        seller['rating'] = itemT.find("Seller").attrs["Rating"]
        seller['id'] = itemT.find("Seller").attrs["UserID"]
        item_info['seller'] = seller
        item_info['description'] = itemT.find("Description").text
        all_items.append(item_info)

    for item in all_items:
        new_item = Item.objects.create(
            user=creator,
            status='Not Started',
            name=str(item['name']),
            first_bid=float(item['first_bid'][1:]),
            brand=str(''),
            category=str(''),
            description=str(item['description']),
            location=str(item['location']),
            country=str(item['country'])
            )
        for bid in item['bids']:
            Bid.objects.create(
                item = new_item,
                user = creator,
                name = bid['bidder']['id'],
                ammount = float(bid['amount'][1:])
            )
    return "success"