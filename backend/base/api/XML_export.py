from .serializers.itemSerializers import ItemSerializer
from ..models import Item, User
import logging
import xml.etree.ElementTree as ET
import xml.dom.minidom as md
import pathlib

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