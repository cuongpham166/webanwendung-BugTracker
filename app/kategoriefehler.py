import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_kategoriefehler
from .database import Database_fehler
from .database import Database_katfehler

class Kategoriefehler_cl(object):

	def __init__(self):
		self.db_kategoriefehler = Database_kategoriefehler()
		self.view_o = View_cl()

	def GET(self,id=None):
		retVal_s = ''
		if id == None:
			retVal_s = self.getList_p()
		else:
			retVal_s = self.getDetail_p(id)
		return retVal_s

	def DELETE(self,id):
		retVal_s = ''
		self.db_kategoriefehler.delete_px(id)
		retVal_s = self.getList_p()
		return retVal_s

	def POST (self, data_opl):
		retVal_s = ''
		data_opl["id"] = str(self.db_kategoriefehler.data_o_count)
		self.db_kategoriefehler.create_px(data_opl)
		retVal_s = self.getList_p()
		retVal_s

	def PUT(self, data_opl):
		retVal_s = ''
		print(data_opl)
		data_o = ast.literal_eval(data_opl)
		id = data_o['id']
		print (id)
		self.db_kategoriefehler.update_px(data_o,id)
		retVal_s = self.getList_p()
		return retVal_s

	def getList_p(self):
		db_kategoriefehler = Database_kategoriefehler()
		data_a = db_kategoriefehler.read_px()
		ndata_a = data_a[1:]
		return self.view_o.createList_px(ndata_a)

	def getDetail_p(self, id_spl):
		db_kategoriefehler = Database_kategoriefehler()
		data_o = db_kategoriefehler.read_px(id_spl)
		data_o["fehlerID"] = self.get_erkannteFehler_ID()
		data_o["katfehlerID"] = self.get_katFehler_ID()
		return self.view_o.createDetail_px(data_o) 

	def get_erkannteFehler_ID(self):
		db_fehler = Database_fehler()
		erkannteFehler_ID = []
		data_fehler = db_fehler.data_o
		for i in range (1, len(data_fehler)):
			if data_fehler[i]["Status"] == "erkannt":
				erkannteFehler_ID.append(data_fehler[i]["id"])
		return erkannteFehler_ID

	def get_katFehler_ID(self):
		db_katfehler = Database_katfehler()
		katFehler_ID = []
		data_katfehler = db_katfehler.data_o
		for i in range (1, len(data_katfehler)):
			katFehler_ID.append(data_katfehler[i]["id"])
		return katFehler_ID



