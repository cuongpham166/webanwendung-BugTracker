import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_mitarbeiter
from .database import Database_entwickler
from .database import Database_fehler

class Mitarbeiter_cl(object):
  
   def __init__(self):
      self.db_mitarbeiter = Database_mitarbeiter()
      self.view_o = View_cl()

   def GET(self, id=None): #SELECT
      retVal_s = ''
      if id == None:
         # Anforderung der Liste
         retVal_s = self.getList_p()
      else:
         # Anforderung eines Details
         retVal_s = self.getDetail_p(id)

      return retVal_s

   def DELETE(self, id): 
      db_fehler = Database_fehler()
      myID = self.getFehlerID_by_mitarbeiterID(id)
      db_fehler.delete_px(myID)
      for i in range(1,len(db_fehler.data_o)):
         if db_fehler.data_o[i]["Status"] == "erkannt":
            if int(db_fehler.data_o[i]["id"]) > int(id) :
               db_fehler.data_o[i]["id"] = str(int(db_fehler.data_o[i]["id"])-1)


      retVal_s = ''
      db_fehler.saveData_p()
      self.db_mitarbeiter.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def POST (self, data_opl):#CREATE
      retVal_s = ''
      data_opl['id'] = str(self.db_mitarbeiter.data_o_count)
      self.db_mitarbeiter.create_px(data_opl)
      retVal_s = self.getList_p()
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      data_o = ast.literal_eval(data_opl)
      id = data_o['id']
      self.db_mitarbeiter.update_px(data_o,id)
      retVal_s = self.getList_p()
      return retVal_s

   def getList_p(self):
   #-------------------------------------------------------
      data_a = self.db_mitarbeiter.read_px()
      #print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)
   
   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
   #-------------------------------------------------------
      data_o = self.db_mitarbeiter.read_px(id_spl)
      return self.view_o.createDetail_px(data_o)

   def getFehlerID_by_mitarbeiterID(self, id):
      db_fehler = Database_fehler()
      for i in range(1, len(db_fehler.data_o)):
         if db_fehler.data_o[i]["Status"] == "erkannt":
            if db_fehler.data_o[i]["mitID"] == id:
               myID = db_fehler.data_o[i]["id"]
      return myID


#####################################################################################################
class Entwickler_cl(object):
  
   def __init__(self):
      self.db_entwickler = Database_entwickler()
      self.view_o = View_cl()

   def GET(self, id=None): #SELECT
      retVal_s = ''
      if id == None:
         # Anforderung der Liste
         retVal_s = self.getList_p()
      else:
         # Anforderung eines Details
         retVal_s = self.getDetail_p(id)

      return retVal_s

   def DELETE(self, id): #DELETE
      retVal_s = ''
      self.db_entwickler.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def POST (self, data_opl):#CREATE
      retVal_s = ''
      data_opl['id'] = str(self.db_entwickler.data_o_count)
      self.db_entwickler.create_px(data_opl)
      retVal_s = self.getList_p()
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      data_o = ast.literal_eval(data_opl)
      id = data_o['id']
      self.db_entwickler.update_px(data_opl,id)
      retVal_s = self.getList_p()
      return retVal_s

   def getList_p(self):
      data_a = self.db_entwickler.read_px()
      #print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)
   
   
   def getDetail_p(self, id_spl):
      data_o = self.db_entwickler.read_px(id_spl)
      return self.view_o.createDetail_px(data_o)
###############################################################################################################
class Arbeiter_cl(object):

   def __init__(self):
      self.view_o = View_cl()

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
      data_a = []
      db_mitarbeiter = Database_mitarbeiter()
      db_entwickler = Database_entwickler()
      print("adadada")
      print(db_entwickler.read_px())
      for i in range (1, len(db_mitarbeiter.data_o)):
         data_a.append(db_mitarbeiter.data_o[i])

      for i in range(1, len(db_entwickler.data_o)):
         data_a.append(db_entwickler.data_o[i])
         print(db_entwickler.data_o[i])
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(data_a)