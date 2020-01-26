import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_katfehler
from .database import Database_katursache
from .database import Database_kategorie
from .database import Database_fehler
from .database import Database_kategoriefehler

############################################################################################
class Katfehler_cl(object):
  
   def __init__(self):
      self.db_katfehler = Database_katfehler()
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
      db_kategoriefehler = Database_kategoriefehler()
      mylist = self.getKategorieFehlerID_by_KatfehlerID(id)
      print("myLIST")
      print(mylist)
      mylist.sort()
      for i in mylist:
         db_kategoriefehler.delete_px(i)

      retVal_s = ''
      for i in range(1, len(db_kategoriefehler.data_o)):
         print( int(db_kategoriefehler.data_o[i]["katfehlerID"]))
         if int(db_kategoriefehler.data_o[i]["katfehlerID"]) > int(id):
            print ("aa")
            print (db_kategoriefehler.data_o[i]["katfehlerID"])
            db_kategoriefehler.data_o[i]["katfehlerID"] = str(int(db_kategoriefehler.data_o[i]["katfehlerID"]) - 1)

      print(db_kategoriefehler.data_o)
      db_kategoriefehler.saveData_p()
      self.db_katfehler.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def POST (self, data_opl):#CREATE
      retVal_s = ''
      data_opl['id'] = str(self.db_katfehler.data_o_count)
      self.db_katfehler.create_px(data_opl)
      retVal_s = self.getList_p()
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      print(data_opl)
      data_o = ast.literal_eval(data_opl)
      id = data_o['id']
      print (id)
      self.db_katfehler.update_px(data_o,id)
      retVal_s = self.getList_p()
      return retVal_s

   def getList_p(self):
   #-------------------------------------------------------
      data_a = self.db_katfehler.read_px()
      #print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)
   
   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
   #-------------------------------------------------------
      data_o = self.db_katfehler.read_px(id_spl)
      return self.view_o.createDetail_px(data_o)

   def getKategorieFehlerID_by_KatfehlerID(self,id):
      db_kategoriefehler = Database_kategoriefehler()
      listID = []
      for i in range(1,len(db_kategoriefehler.data_o)):
         if db_kategoriefehler.data_o[i]["katfehlerID"] == id:
            listID.append(db_kategoriefehler.data_o[i]["id"])
      return listID





###############################################################################################
class Katursache_cl(object):
  
   def __init__(self):
      self.db_katursache = Database_katursache()
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
      self.db_katursache.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def POST (self, data_opl):#CREATE
      retVal_s = ''
      data_opl['id'] = str(self.db_katursache.data_o_count)
      self.db_katursache.create_px(data_opl)
      retVal_s = self.getList_p()
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      print(data_opl)
      data_o = ast.literal_eval(data_opl)
      id = data_o['id']
      print (id)
      self.db_katursache.update_px(data_o,id)
      retVal_s = self.getList_p()
      return retVal_s

   def getList_p(self):
   #-------------------------------------------------------
      data_a = self.db_katursache.read_px()
      #print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)
   
   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
      db_fehler = Database_fehler()
      data_fehler = db_fehler.data_o
      data_fehler.pop(0)
      behobene_fehlerID = []
      for i in range(0, len(data_fehler)):
         if data_fehler[i]["Status"] == "behoben":
            behobene_fehlerID.append(data_fehler[i]["id"])#

      
      data_o = self.db_katursache.read_px(id_spl)
      data_o["fehlerID"] = behobene_fehlerID

      return self.view_o.createDetail_px(data_o)

#####################################################################################
class Kategorie_cl(object):
  
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
   #-------------------------------------------------------
      db_katfehler = Database_katfehler()
      db_katursache = Database_katursache()
      data_a1 = []
      for i in range (1, len(db_katfehler.data_o)):
         data_a1.append(db_katfehler.data_o[i])

      data_a2 = []
      for i in range(1, len(db_katursache.data_o)):
         data_a1.append(db_katursache.data_o[i])

      data_a = data_a1 + data_a2
      print (data_a)
      # default-Werte entfernen
      #ndata_a = data_a[1:]
      return self.view_o.createList_px(data_a)
   
   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
   #-------------------------------------------------------
      data_o = self.db_kategorie.read_px(id_spl)
      return self.view_o.createDetail_px(data_o)
