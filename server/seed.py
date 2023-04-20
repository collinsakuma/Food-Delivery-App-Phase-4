#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Item, Order, Cart

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting records...")
        Item.query.delete()
        User.query.delete()
        Order.query.delete()
        Cart.query.delete()

        print("Creating Items...")
        items = []
        names = [
            "Four Cheese Pasta",
            "Spicy Rigatoni Vodka",
            "Spicy Cashew Chicken",
            "Chicken Littles",
            "Shrimp and Chicken Gumbo",
            "Miso Salmon",
            'Chicken Salad Sandwhich',
            'The Club',
            "Classic Burger",
            'Impossible Burger',
            'Margherita FlatBread Pizza'
        ]
        prices = [
            "2195",
            "2195",
            "2250",
            "1950",
            "2495",
            "2695",
            "1695",
            '1695',
            '1795',
            '1795',
            '1895'
        ]
        categories = [
            "Pastas",
            "Pastas",
            "Specialties",
            "Specialties",
            "Fish & Seafood",
            "Fish & Seafood",
            'Sandwiches',
            'Sandwiches',
            'Burgers',
            'Burgers',
            'Flatbread Pizzas'
        ]
        images = [
            "https://olo-images-live.imgix.net/9f/9f496696c0c949ef98139b318a7750d7.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=e7619755a9d6c1f56d0844b790c37d26",
            "https://olo-images-live.imgix.net/d2/d233f4d579994a27bba2d44f554ebc7c.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=64a2ad5d7c93a972b1a26ad51b26861f",
            "https://olo-images-live.imgix.net/1a/1abb5e57a5db40dcb48e393961182cd1.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=88d1077d5101a51fea18ce6bcdc1a4c1",
            "https://olo-images-live.imgix.net/04/04bd48debff64c6baa5ebfccad5b1d1d.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=8ca4f0278f2f7687d27b9e75f7989d9d",
            "https://olo-images-live.imgix.net/be/be7c28a9437d481bbb2f8f66181e9510.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=29f002de567077dab64f34f38b242347",
            "https://olo-images-live.imgix.net/7c/7c621be7177743138b57cfbe45252f37.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=4645deacad6003c9036ee0a5b5f867bf",
            "https://olo-images-live.imgix.net/5f/5ffe8ebb69054f9fbb143149514f190f.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=0637ed863e0a88536b6af7e15a94dd9c",
            "https://olo-images-live.imgix.net/5b/5b05157952db4403b77bd2e96384b8f2.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=150939e73c1b0039c78cb8be3ce6add1",
            "https://olo-images-live.imgix.net/37/374e4d7d12a6439db1a294fdea53e1aa.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=c77e8a93f3d4c8c0bc7d4ddb1388e117",
            "https://olo-images-live.imgix.net/d7/d7c3ba5301a049aaaaca04d6dba98d0b.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=a58343687e66f5d8e1aaed33e90f1543",
            "https://olo-images-live.imgix.net/66/66e4fb51318f4c9f82994d85d22efe25.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=e13ade1af5976539ad758ed06d95a0ce"
        ]
        for i in range(11):
            item = Item(
                name = names[i],
                price = int(prices[i]),
                category = categories[i],
                img_url = images[i]
            )
            items.append(item)
        db.session.add_all(items)
        
        user_1 = User(
            username="Collin",
            
            address="1234 ST Long Beach, CA",
            img_url="https://i.pinimg.com/550x/5d/1c/8f/5d1c8f412142c71ca126527add4a1c0c.jpg"
        )
        user_1.password_hash = user_1.username + 'password'

        user_2 = User(
            username= 'Clayton97',
            
            address='12 Main Str',
            img_url = 'https://steamuserimages-a.akamaihd.net/ugc/867358867344594594/9C95791AD21236FCF7571D1C1B83A20A922502B7/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        )
        user_2.password_hash = user_2.username + 'password'

        

        # Seed code goes here!
        db.session.add_all([user_1, user_2])
        db.session.commit()

        print("db seeded")
