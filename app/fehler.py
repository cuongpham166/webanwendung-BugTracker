import cherrypy
import json
import ast
import datetime
from .database import Database_cl
from .view import View_cl

from .database import Database_fehler
from .database import Database_komponente
from .database import Database_kategoriefehler
from .database import  Database_katursache

class Fehler_cl(object):

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
         fehlerID = id[0]
         mitID = id[1]
         entID = id[2]

         retVal_s = self.getDetail_p1(fehlerID,mitID,entID)
         print ("dadada")
         print(retVal_s)
      return retVal_s

   def DELETE(self, id): 
      db_kategoriefehler = Database_kategoriefehler()
      mylist = self.getKategorieFehlerID_by_FehlerID(id)
      for i in mylist:
         db_kategoriefehler.delete_px(i)
      retVal_s = ''
      for i in range(1, len(db_kategoriefehler.data_o)):
         if int(db_kategoriefehler.data_o[i]["fehlerID"]) > int(id):
            print("idishihdisdh")
            print(db_kategoriefehler.data_o[i]["fehlerID"])
            db_kategoriefehler.data_o[i]["fehlerID"] = str(int(db_kategoriefehler.data_o[i]["fehlerID"]) - 1)
      db_kategoriefehler.saveData_p()
      self.db_fehler.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def POST (self, data_opl):
      retVal_s = ''
      mytime = datetime.datetime.now()
      t1 = datetime.datetime.now()
      data_opl['id'] = str(self.db_fehler.data_o_count)
      data_opl["anZeit"] = str(mytime.strftime("%X"))
      data_opl["t1"] = str(t1)
      
      self.db_fehler.create_px(data_opl)
      retVal_s = self.getList_p()
      print("POST fehler")
      print(retVal_s)
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      db_kategoriefehler = Database_kategoriefehler()
      mytime = datetime.datetime.now()
      
      print(data_opl)
      data_o = ast.literal_eval(data_opl)
      print(data_o)        

      id = data_o['id']
      time = data_o["t1"]
      data_o["enZeit"]=str(mytime.strftime("%X"))
      date_time_obj = datetime.datetime.strptime(time, '%Y-%m-%d %H:%M:%S.%f')
      data_o["difZeit"] = str(mytime - date_time_obj)

      for i in range(1,len(db_kategoriefehler.data_o)):
         if data_o["Status"] == "behoben":
            if id == db_kategoriefehler.data_o[i]["fehlerID"]:
               myid = db_kategoriefehler.data_o[i]["id"]
               db_kategoriefehler.delete_px(myid)
      db_kategoriefehler.saveData_p()
      self.db_fehler.update_px(data_o,id)
      retVal_s = self.getList_p()

      return retVal_s

   def getList_p(self):

   #-------------------------------------------------------
      db_fehler = Database_fehler()
      data_a = db_fehler.read_px()
      print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      #print("listFehler")

      return self.view_o.createList_px(ndata_a)
   def getDetail_p1(self,id_spl,mitID,entID):
      data_o = self.db_fehler.read_px(id_spl)
      print (123456)
     
      print(data_o)
      mytime = datetime.datetime.now()
      data_o["komponenteID"] = self.getKomponenteID()
      data_o["mitID"] = mitID
      data_o["entID"] = entID
      data_o["Date"] = str(mytime.strftime("%x"))
      if(entID == "0"):
         data_o["Status"] ="erkannt"
      elif mitID == "0":
         data_o["Status"] = "behoben"
      print(data_o)
      return self.view_o.createDetail_px(data_o)

   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
   #-------------------------------------------------------
      data_o = self.db_fehler.read_px(id_spl)
      
      return self.view_o.createDetail_px(data_o)

   def getKomponenteID(self):
      db_komponente = Database_komponente()
      data_ID = db_komponente.read_px()
      data_o= data_ID #self.db_projekt.read_px()
      listID= []
      for i in range(1, len(data_o)):
         listID.append(data_o[i]["id"])
      print(listID)
      return listID

   def getKategorieFehlerID_by_FehlerID(self,id):
      db_kategoriefehler = Database_kategoriefehler()
      listID = []
      for i in range(1,len(db_kategoriefehler.data_o)):
         if db_kategoriefehler.data_o[i]["fehlerID"] == id:
            listID.append(db_kategoriefehler.data_o[i]["id"])
      return listID

   def getKategorieUrsacheID_by_FehlerID(self, id):
      db_katursache = Database_katursache()
      listID = []
      for i in range(1, len(db_katursache.data_o)):
         if db_katursache.data_o[i]["fehlerID"] == id:
            listID.append(Database_katursache.data_o[i]["id"])
      return listID
##########################################################################
class erkannterFehler_cl(object):
   
   def __init__(self):
      self.view_o = View_cl()
      self.db_fehler = Database_fehler()
      

   def GET(self, id=None, type=None): #SELECT
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
      print("erkannte Fehler")
      print(data_a)
      data = []
      for i in range (1, len(data_a)):
         if data_a[i]["Status"] == "erkannt":
            data.append(data_a[i])
      print("erkannt")
      print("------------------------------erkannt---------------------------------------")
      print (data)
      # default-Werte entfernen
      #ndata_a = data_a[1:]
      return self.view_o.createList_px(data) 

####################################################################################
