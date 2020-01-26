import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_projekt
from .database import Database_komponente

class Projekt_cl(object):
  
   def __init__(self):
      self.db_projekt = Database_projekt()
      self.view_o = View_cl()

   def GET(self, id=None): #SELECT
      retVal_s = ''
      if id == None:
         # Anforderung der Liste
         retVal_s = self.getList_p()
      else:
         # Anforderung eines Details
         retVal_s = self.getDetail_p(id)
      print("retVal_s")
      print(type(retVal_s))
      print(retVal_s)
      return retVal_s

   def DELETE(self, id): #DELETE
      retVal_s = ''
      db_komponente = Database_komponente()
      list = self.get_Komponente_ID_by_ProjektID(id)
      list.sort(reverse = True)
      print(list)
      for i in list:
         db_komponente.delete_px(i)

      #for x in range (1, len(self.db_projekt.data_o)):
       #  if self.db_projekt.data_o[int(x)]["id"] > id:
        #    self.db_projekt.data_o[int(x)]["id"] = str(int(self.db_projekt.data_o[int(x)]["id"])-1)

      
      for i in range(1,len(db_komponente.data_o)):
         if(int(db_komponente.data_o[i]['projektID']) > int(id)):
            data = db_komponente.data_o[i]
            data['projektID'] = str(int(data['projektID']) -1);
            db_komponente.update_px(data,i)
            print(db_komponente.data_o)
      
      self.db_projekt.delete_px(id)
      retVal_s = self.getList_p()
      return retVal_s

   def get_Komponente_ID_by_ProjektID(self, id): #id : ID-Projekt
      db_komponente = Database_komponente()
      listKomponenteIDbyProjektID = []
      data = db_komponente.read_px()
      for i in self.get_Komponete_ID():
         if data[i]["projektID"] == id:
            listKomponenteIDbyProjektID.append(i)
      print(listKomponenteIDbyProjektID)
      return listKomponenteIDbyProjektID

   def get_Komponete_ID (self):
      db_komponente = Database_komponente()
      data = db_komponente.read_px()
      list_Komponente_ID = []
      for i in range (1, len(data)):
         list_Komponente_ID.append(i)
      print(list_Komponente_ID)
      return list_Komponente_ID

   def POST (self, data_opl):#CREATE
      retVal_s = ''
      data_opl['id'] = str(self.db_projekt.data_o_count)
      self.db_projekt.create_px(data_opl)
      retVal_s = self.getList_p()
      print("POST projekt")
      print(retVal_s)
      return retVal_s

   def PUT (self, data_opl): #UPDATE
      retVal_s = ''
      print(data_opl)
      data_o = ast.literal_eval(data_opl)
      id = data_o['id']
      print (id)
      self.db_projekt.update_px(data_o,id)
      retVal_s = self.getList_p()
      return retVal_s

   def getList_p(self):
   #-------------------------------------------------------
      data_a = self.db_projekt.read_px()
      #print (data_a)
      # default-Werte entfernen
      ndata_a = data_a[1:]
      return self.view_o.createList_px(ndata_a)
   
   #-------------------------------------------------------
   def getDetail_p(self, id_spl):
   #-------------------------------------------------------
      data_o = self.db_projekt.read_px(id_spl)
      #data_o['projekt'] = [1,2,3,4];
      print("data_o")
      print(data_o)
      return self.view_o.createDetail_px(data_o)

   def getKomponenteIDbyProjektID(self, id): #id : ID-Projekt
      db_komponente = Database_komponente()
      data = db_komponente.read_px()
      listKomponenteIDbyProjektID = []
      for i in range (0, len(data)):
         if(data[i]["projektID"] == id):
            listKomponenteIDbyProjektID.append(i)
      return listKomponenteIDbyProjektID
   