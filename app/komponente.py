import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_komponente
from .database import Database_projekt
from .database import Database_fehler

class Komponente_cl(object):
  
   def __init__(self):
      self.db_komponente = Database_komponente()
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
      mylist = self.getFehlerID_by_komponenteID(id)
      mylist.sort()
      print(mylist)
      for i in mylist:
         db_fehler.delete_px(i)
      retVal_s = ''
      for i in range(1, len(db_fehler.data_o)):
         if int(db_fehler.data_o[i]["komponenteID"]) > int(id):
            db_fehler.data_o[i]["komponenteID"] = str(int(db_fehler.data_o[i]["komponenteID"]) - 1)
      db_fehler.saveData_p()
      self.db_komponente.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def POST (self, data_opl):#CREATE
      retVal_s = ''
      data_opl['id'] = str(self.db_komponente.data_o_count)
      self.db_komponente.create_px(data_opl)
      retVal_s = self.getList_p()
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      print(data_opl)
      data_o = ast.literal_eval(data_opl)
      id = data_o['id']
      print (id)
      self.db_komponente.update_px(data_o,id)
      retVal_s = self.getList_p()
      return retVal_s

   def getList_p(self):
   #-------------------------------------------------------
      db_komponenten = Database_komponente()
      data_a = db_komponenten.read_px()
      print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)
   
   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
   #-------------------------------------------------------
      data_o = self.db_komponente.read_px(id_spl)
      data_o["projektID"]=self.getProjektID()
      print(data_o)
      return self.view_o.createDetail_px(data_o)


   def getProjektID(self):
      db_projekt = Database_projekt()
      data_ID = db_projekt.read_px()
      data_o= data_ID #self.db_projekt.read_px()
      listID= []
      for i in range(1, len(data_o)):
         listID.append(data_o[i]["id"])
      print(listID)
      return listID

   def getFehlerID_by_komponenteID(self,id):
      db_fehler = Database_fehler()
      listID = []
      for i in range (1, len(db_fehler.data_o)):
         if db_fehler.data_o[i]["komponenteID"] == id:
            listID.append(db_fehler.data_o[i]["id"])
      return listID