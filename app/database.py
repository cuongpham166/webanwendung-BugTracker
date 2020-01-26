# coding: utf-8
import os
import os.path
import codecs
import json
# Demonstrator!

#----------------------------------------------------------
class Database_cl(object):
#----------------------------------------------------------

   #-------------------------------------------------------
   def __init__(self):
   #-------------------------------------------------------
      self.data_a = [
         {
            "id": "0",
            "col1": "default col1",
            "col2": "default col2"
         },
         {
            "id": "1",
            "col1": "Wert 1/1",
            "col2": "Wert 1/2"
         },
         {
            "id": "2",
            "col1": "Wert 2/1",
            "col2": "Wert 2/2"
         },
         {
            "id": "3",
            "col1": "Wert 3/1",
            "col2": "Wert 3/2"
         },
         {
            "id": "4",
            "col1": "Wert 4/1",
            "col2": "Wert 4/2"
         }
      ]
      self.data_o = []
      self.readData_p()
      self.data_o_count = len(self.data_o)

   
   #-------------------------------------------------------
   """
   def read_px(self, id_spl= None):
   #-------------------------------------------------------
      data_o = None
      if id_spl == None:
         data_o = self.data_o
      else:
         id_s = int(id_spl)
         if id_s > 0 and  id_s < len(self.data_o):
            data_o = self.data_o[id_s]
         else:
            data_o = self.data_o[0]

      return data_o
   """
   def read_px(self, id_spl = None):
   #-------------------------------------------------------
      print(id_spl)
      data_o = None
      if id_spl == None:
         data_o = self.data_o
      else:
         id_s = int(id_spl)
         if id_s > 0 and  id_s < len(self.data_o):
            data_o = self.data_o[id_s]
         else:
            data_o = self.data_o[0]

      return data_o


   def create_px (self, data_opl):
      self.data_o.append(data_opl)
      self.data_o_count = len(self.data_o)
      self.saveData_p()
      return self.data_o_count


   def delete_px(self, id_spl):
      status_b = False
      id = int(id_spl)
      if id > 0 and id <len(self.data_o):
            #print (self.data_o[id_i])
            self.data_o.pop(id)
            for i in range(0,self.data_o_count-1):
                self.data_o[i]["id"] = str(i);
            self.saveData_p()
            status_b = True
            self.data_o_count -= 1
      return status_b

   def update_px(self, data_opl, id_opl):
      status_b = False
      print (self.data_o)
      for i in range(1, len(self.data_o)):
         if(str(self.data_o[i]["id"]) == str(id_opl)):
            self.data_o[i] = data_opl
            self.saveData_p()
            status_b = True
      return status_b

   def getDataByID_px(self,id_s):
      id = int(id_s)
      for id in range(0,len(self.data_o)):
         if(self.data_o[id]['id'] == id_s):
            return self.data_o[id]

   def readData_p(self):
        pass


   def saveData_p(self):
        pass
########################################################################################################

class Database_projekt(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data','projekt.json'),'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'projekt.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
#############################################################################################################

class Database_mitarbeiter(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o= self.data_o
      with codecs.open(os.path.join('data', 'mitarbeiter.json'), 'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'mitarbeiter.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
###############################################################################################################
class Database_entwickler(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o
      with codecs.open(os.path.join('data', 'entwickler.json'), 'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'entwickler.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return

######################################################################################
class Database_katfehler(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data','katfehler.json'),'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'katfehler.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
######################################################################################
class Database_katursache(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data','katursache.json'),'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'katursache.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
#######################################################################################
class Database_erkannterfehler(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data', 'erkannterfehler.json'), 'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'erkannterfehler.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
########################################################################################
class Database_behobenerfehler(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data', 'behobenerfehler.json'), 'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'behobenerfehler.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
########################################################################################

class Database_komponente(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data', 'komponente.json'), 'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'komponente.json'), 'r', 'utf-8') 
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
#######################################################################################
class Database_kategorie(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data', 'kategorie.json'), 'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'kategorie.json'), 'r', 'utf-8') 
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
##########################################################################################
class Database_fehler(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o 
      with codecs.open(os.path.join('data','fehler.json'),'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'fehler.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return
###########################################################################################
class Database_kategoriefehler(Database_cl):

   def __init__(self):
      Database_cl.__init__(self)

   def saveData_p(self):
      data_o = self.data_o
      with codecs.open(os.path.join('data', 'kategoriefehler.json'),'w', 'utf-8') as fp_o:
         json.dump(self.data_o, fp_o)

   def readData_p(self):
      try:
         fp_o = codecs.open(os.path.join('data', 'kategoriefehler.json'), 'r', 'utf-8')
      except:
         self.data_o = []
         self.saveData_p()
      else:
         with fp_o:
            data_o = json.load(fp_o)
            self.data_o = data_o
      return

# EOF