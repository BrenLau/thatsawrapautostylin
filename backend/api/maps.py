from flask import Blueprint
import os
maps_api_key = os.environ.get('MAPS_API_KEY')


maps_route = Blueprint('maps', __name__)


@maps_route.route("/", methods=["GET"])
def get_maps():
    """
    Returns the google maps api key
    """
    return {
        "key": maps_api_key
    }
