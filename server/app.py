#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import *
from models import User, Item, Order, Cart

# Views go here!
class Signup(Resource):

    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        address = request_json.get('address')
        img_url = request_json.get('img_url')

        user = User(
            username=username,
            address=address,
            img_url=img_url
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({"error":"422 Unprocessable Entity"}, 422)
        
api.add_resource(Signup, '/signup')

class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            return make_response(user.to_dict(), 200)
        except:
            return make_response({"error": "Unauthorized"}, 401)
        
api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('username')
        password = request_json.get('password')
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
        return make_response({"error": "401 Unauthroized"},401)
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return make_response({"message": "Logout Sucessful"}, 204)
        return make_response({"error": "401 Unauthorized"}, 401)

api.add_resource(Logout, '/logout')

class Items(Resource):

    def get(self):
        items = [item.to_dict() for item in Item.query.all()]
        return make_response(items, 200)
api.add_resource(Items, '/items')

class ItemById(Resource):
    def get(self, id):
        item = Item.query.filter_by(id=id).first()
        return make_response(item.to_dict(),200)

api.add_resource(ItemById, '/items/<int:id>')



class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return make_response(user.to_dict(), 200)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "user not found"},404)
        request_json = request.get_json()
        for attr in request_json:
            setattr(user, attr, request_json[attr])
        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(),202)

api.add_resource(UserById, '/users/<int:id>')

class OrderById(Resource):
    def get(self, order_id):
        order = Order.query.get_or_404(order_id)
        return make_response(order.to_dict(), 200)

    def post(self, order_id):
        order = Order.query.get(order_id)
        if order is None:
            order = Order(id=order_id)
            db.session.add(order)
            db.session.commit()
        return make_response(order.to_dict(), 201)

    def patch(self, order_id):
        order = Order.query.get_or_404(order_id)
        data = request.get_json()
        if data.get('user_id'):
            order.user_id = data['user_id']
        if data.get('item_id'):
            order.item_id = data['item_id']
        db.session.commit()
        return make_response(order.to_dict(), 200)

    def delete(self, order_id):
        order = Order.query.get_or_404(order_id)
        db.session.delete(order)
        db.session.commit()
        return make_response('', 204)

class Orders(Resource):
    def get(self):
        orders = [order.to_dict() for order in Order.query.all()]
        return make_response(orders, 200)
    
    def post(self):
        request_json = request.get_json()
        if not request_json:
            return make_response({"error" : "order not found"}, 200)
        else:
            new_order = Order(
                item_id = request_json['item_id'],
                user_id = request_json['user_id'],
                quantity = request_json['quantity'],
                status = request_json['status']
            )
            db.session.add(new_order)
            db.session.commit()
            return make_response(new_order.to_dict(), 201)

api.add_resource(OrderById, '/orders/<int:order_id>')
api.add_resource(Orders, '/orders')

class Carts(Resource):
    def get(self):
        cart = [cart.to_dict() for cart in Cart.query.all()]
        return make_response(cart, 200)
    
    def post(self):
        request_json = request.get_json()
        if not request_json:
            return make_response({"error":"invalid cat"},404)
        else:
            new_cart = Cart(
                order_string = request_json['order_string'],
                user_id = request_json['user_id'],
                order_total = request_json['order_total']
            )
            db.session.add(new_cart)
            db.session.commit()
            return make_response(new_cart.to_dict(), 201)
api.add_resource(Carts, '/carts')

class CartsById(Resource):
    def get(self):
        cart = Cart.query.filter_by(id=id).first()
        if not cart:
            return make_response({"error": "cart not found"}, 404)
        else:
            return make_response(cart.to_dict(), 200)
    
api.add_resource(CartsById, '/carts/<int:id>')

@app.route('/users/delete/<int:id>', methods=['DELETE'])
def user_delete(id):    
    if request.method == 'DELETE':
        user_to_delete_id = session['user_id']
        user = User.query.filter_by(id=id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response({"Message": "Yeet!"},200)





if __name__ == '__main__':
    app.run(port=5555, debug=True)
