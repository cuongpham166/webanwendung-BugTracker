import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_kategoriefehler
from .database import Database_fehler
from .database import Database_katfehler
from .database import Database_katursache 

class Katlist_cl(object):

	def __init__(self):
		self.view_o = View_cl()

	def GET(self, id=None):
		retVal_s = ''
		if id == None:
			retVal_s = self.getList_p()
		else:
			retVal_s = self.getDetail_p(id)
		return retVal_s

	def getList_p(self):
		db_fehler = Database_fehler()
		db_katfehler = Database_katfehler()
		db_kategoriefehler = Database_kategoriefehler()
		

		data_fehler = db_fehler.data_o
		data_katfehler = db_katfehler.data_o
		data_kategoriefehler = db_kategoriefehler.data_o
		

		data_kategoriefehler.pop(0)

		for i in range(0, len(data_kategoriefehler)):
			mydict = self.get_FehlerName_by_FehlerID(data_kategoriefehler[i]["fehlerID"])
			print(mydict)
			data_kategoriefehler[i].update(mydict)

		for i in range(0, len(data_kategoriefehler)):
			mydict = self.get_KatfehlerName_by_KatfehlerID(data_kategoriefehler[i]["katfehlerID"])
			data_kategoriefehler[i].update(mydict)

		for i in range(0, len(data_kategoriefehler)):
			mydict = self.get_Status_by_FehlerID(data_kategoriefehler[i]["fehlerID"])
			data_kategoriefehler[i].update(mydict)



		print("data_kategoriefehler")
		print(data_kategoriefehler)
		print("myDICT")
		print(self.get_FehlerName_by_FehlerID_in_Katursache())

		newLIST = data_kategoriefehler + self.get_FehlerName_by_FehlerID_in_Katursache()
		
		
		return self.view_o.createList_px(newLIST)



	def get_FehlerName_by_FehlerID(self,fehlerID):
		db_fehler = Database_fehler()
		data_fehler = db_fehler.data_o

		mydict = {}
		for i in range(1, len(data_fehler)):
			if data_fehler[i]["id"] ==fehlerID:
				mydict["fehlerName"] = data_fehler[i]["Name"]

		return mydict

	def get_KatfehlerName_by_KatfehlerID(self,katfehlerID):
		db_katfehler = Database_katfehler()
		data_katfehler = db_katfehler.data_o

		mydict = {}
		for i in range(1, len(data_katfehler)):
			if data_katfehler[i]["id"] == katfehlerID:
				mydict["katfehlerName"] = data_katfehler[i]["Name"]
		return mydict

	def get_Status_by_FehlerID(self,fehlerID):
		db_fehler = Database_fehler()
		data_fehler = db_fehler.data_o

		mydict = {}
		for i in range(1, len(data_fehler)):
			if data_fehler[i]["id"] == fehlerID:
				mydict["Status"] = data_fehler[i]["Status"]
		return mydict

	def get_FehlerName_by_FehlerID_in_Katursache(self):
		db_fehler = Database_fehler()
		db_katursache = Database_katursache()
		db_katursache.data_o.pop(0)
		for i in range(0,len(db_katursache.data_o)):
			for j in range(1, len(db_fehler.data_o)):
				if db_katursache.data_o[i]["fehlerID"] == db_fehler.data_o[j]["id"]:
					newdict = {}
					newdict["fehlerName"] = db_fehler.data_o[j]["Name"]
					db_katursache.data_o[i].update(newdict)

		for k in range(0,len(db_katursache.data_o)):
			newdict = {}
			newdict["katfehlerID"] = db_katursache.data_o[k]["id"]
			newdict["Status"] = "beseitigt"
			db_katursache.data_o[k].update(newdict)
		myDict = db_katursache.data_o
		return myDict
    	
    
    	
    	

    	

    	
    		
    			
    				
    	

    	
    
    	
    	

    	
    	
    		
    			
    	
    		
    	
    		
    	

    
    	
    	
    	

    	
    	
    	

    	

    	
    		
    		
    	

    	
    		


    
    	
    	
    	
    	
    		
    					
    	
