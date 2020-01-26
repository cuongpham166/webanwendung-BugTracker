import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_fehler
from .database import Database_komponente


class behobenerFehler_cl(object):

   def __init__(self):
      self.view_o = View_cl()
      self.db_fehler = Database_fehler()

   def GET(self, id=None): #SELECT
      retVal_s = ''
      if id == None:
         # Anforderung der Liste
         retVal_s = self.getList_p()
      else:
         # Anforderung eines Details
         retVal_s = self.getDetail_p(id)

      return retVal_s

   def getList_p(self):
   #-------------------------------------------------------
      db_fehler = Database_fehler()
      data_a = db_fehler.data_o
      data = []
      for i in range (1, len(data_a)):
         if data_a[i]["Status"] == "behoben":
            data.append(data_a[i])
      print("behoben")
      #print (data_a)
      # default-Werte entfernen
      #ndata_a = data_a[1:]
      print(data)
      
      return self.view_o.createList_px(data) 