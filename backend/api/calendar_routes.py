from __future__ import print_function
from flask import Blueprint, jsonify, session, request
import os

calendar_routes = Blueprint("calendar", __name__)

@calendar_routes.route("/", methods=["GET"])
def get_calendar_keys():
  """
  This route returns an object with the necessary google api keys
  """
  clientId = os.environ.get("CLIENT_ID")
  discoveryDocs = os.environ.get("DISCOVERY_DOC")
  scopes = os.environ.get("SCOPES")
  apiKey = os.environ.get("MAPS_API_KEY")
  print("""*** 
        
        
        hit calendar route 
        
        
        ***""")
  print(clientId, discoveryDocs, scopes, apiKey)
  return {
    "clientId": os.environ.get("CLIENT_ID"),
    "apiKey": os.environ.get("MAPS_API_KEY"),
    "discoveryDocs": [os.environ.get("DISCOVERY_DOC")],
    "scope": os.environ.get("SCOPES")
  }


