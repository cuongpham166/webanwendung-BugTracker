import cherrypy
import json
import ast
import datetime
from .database import Database_cl
from .view import View_cl

from .database import Database_mitarbeiter
from .database import Database_entwickler
from .fehler import Fehler_cl
from .fehler import erkannterFehler_cl
from .behobeneFehler import behobenerFehler_cl
from .database import Database_fehler


class Anmeldung_cl(object):
	def __init__(self):
		self.view_o = View_cl()
		self.fehler_o = Fehler_cl()

	def GET(self,id = None):
		retVal_s = ''
		if id == None:	
			data_o= {}
			retVal_s = json.dumps(data_o)
		else:
			data_o ={}
			data_o["id"] = id
			retVal_s = json.dumps(data_o)
			print(retVal_s)
		return retVal_s

	def POST(self, data_opl):
		fehler_o = Database_fehler()
		retVal_s = ''
		arbeiter = data_opl["Arbeiter"]
		password = data_opl["Password"]
		email = data_opl["Email"]
		mytime = datetime.datetime.now()
		print (email)
		print (password)
		print("asasasasa")
		print(self.check_email_password(email,password))
		data = self.check_email_password(email,password)
		if(arbeiter == "0"):
			if len(data) == 0 or data[0] == 2 :
				data_o = {"error": "1"}
			elif data[0] == 1:
				print(self.get_mitarbeiterID_by_fehler(str(data[1])))
				print (123)
				if self.get_mitarbeiterID_by_fehler(str(data[1])) == "0":
					data_o = fehler_o.read_px("0")
					print("hhhhhh")
					data_o["mitID"] = str(data[1])				
				else:
					 data_o = fehler_o.read_px(self.get_mitarbeiterID_by_fehler(str(data[1])))

				print (data_o)
				print("Mitarbeiter")
		else:
			if len(data) == 0 or data[0] == 1 :
				data_o = {"error": "1"}
			elif data[0] == 2:
				id_fehler = arbeiter
				if fehler_o.read_px(id_fehler)["Status"] == "erkannt":
					print(self.get_entwicklerID_by_fehler(str(data[1])))
					print (123)
					if self.get_entwicklerID_by_fehler(str(data[1])) == "0":
						data_o = fehler_o.read_px(id_fehler)
						print("hhhhhh")
						data_o["entID"] = str(data[1])				
					else:
						data_o = {"error": "2"}
				else:
					data_o= {"error":3}
			
		retVal_s = self.view_o.createDetail_px(data_o)
		print(retVal_s)

		return retVal_s

	def check_email_password(self,email,password):
		db_mitarbeiter = Database_mitarbeiter()
		db_entwickler = Database_entwickler()
		data_o = []
		for i in range(1, len(db_mitarbeiter.data_o)):
			if db_mitarbeiter.data_o[i]["Password"] == password and db_mitarbeiter.data_o[i]["Email"] == email:
				data_o.append(1)
				data_o.append(i)
				return data_o

		for i in range(1,len(db_entwickler.data_o)):
			if db_entwickler.data_o[i]["Password"] == password and db_entwickler.data_o[i]["Email"]== email:
				data_o.append(2)
				data_o.append(i)
				return data_o

		return data_o

	def get_mitarbeiterID_by_fehler(self, id):
		db_fehler = Database_fehler()
		for i in range(1, len(db_fehler.data_o)):
			if db_fehler.data_o[i]["mitID"] == id:
				return i
		return "0"
	def get_entwicklerID_by_fehler(self,id):
		db_fehler = Database_fehler()
		for i in range(1, len(db_fehler.data_o)):
			if db_fehler.data_o[i]["entID"] == id:
				return i
		return "0"
		    
		
	
	
		
		
		
		
			
				
				
				
				
		
			
				
				
				
				
				
		

	
		
		
			
				
		


      
      
         
        
      
         
         

      
