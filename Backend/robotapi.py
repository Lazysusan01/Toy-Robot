from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .models import User, db  # Ensure your User model is accessible here
from .robot import robot


toy = Blueprint('toy', __name__)

@toy.route('/api/place', methods=['POST'])
def place():
    data = request.json
    x = data.get('x')
    y = data.get('y')
    facing = data.get('facing')
    robot.place(x,y,facing)
    return jsonify(robot.report())


@toy.route('/api/move', methods=['POST'])
def move():
    robot.move()
    return jsonify(robot.report())

@toy.route('/api/left', methods=['POST'])
def left():
    robot.left()
    return jsonify(robot.report())

@toy.route('/api/right', methods=['POST'])
def right():
    robot.right()
    return jsonify(robot.report())

@toy.route('/api/report', methods=['GET'])
def report():
    return jsonify(robot.report())