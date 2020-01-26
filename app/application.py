# coding: utf-8

# Demonstrator / keine Fehlerbehandlung

import cherrypy
import json
import ast
from .database import Database_cl

from .projekt import Projekt_cl 

from .kategorie import Katfehler_cl
from .kategorie import  Katursache_cl
from .kategorie import Kategorie_cl

from .arbeiter import Mitarbeiter_cl
from .arbeiter import Entwickler_cl
from .arbeiter import Arbeiter_cl

from .komponente import Komponente_cl

from .fehler import Fehler_cl
from .fehler import erkannterFehler_cl
from .behobeneFehler import behobenerFehler_cl

from .prolist import  Prolist_cl

from .katlist import Katlist_cl

from .kategoriefehler import Kategoriefehler_cl

from .anmeldung import Anmeldung_cl


from .view import View_cl

class Application_cl(object):
#----------------------------------------------------------

   exposed = True # gilt für alle Methoden
   @cherrypy.tools.accept(media='application/json') # gilt für alle Methoden

   #-------------------------------------------------------
   def __init__(self):
   #-------------------------------------------------------
      # spezielle Initialisierung können hier eingetragen werden
      self.list_o = {
         'projekt':Projekt_cl(),
         'qsmitarbeiter':Mitarbeiter_cl(),
         'swentwickler':Entwickler_cl(),
         'katfehler':Katfehler_cl(),
         'katursache':Katursache_cl(),
         'komponente':Komponente_cl(),
         'kategorie':Kategorie_cl(),
         'arbeiter' : Arbeiter_cl(),
         'fehler' : Fehler_cl(),
         'fehler/?type=erkannt':erkannterFehler_cl(), #ở đây của e có mỗi erkannt thôi ạ 
         'fehler/?type=behoben':behobenerFehler_cl(),
         'prolist':Prolist_cl(),
         'katlist':Katlist_cl(),
         'kategoriefehler':Kategoriefehler_cl(),
         'anmeldung':Anmeldung_cl()
        } 
   #-------------------------------------------------------
   def GET(self, path_spl, id=None, type=None):
   #-------------------------------------------------------
      #self.list_o["arbeiter"].getList_p()
      #self.list_o["katlist"]. getList_p()
      retVal_s = ''
      #print (self.list_o["katlist"]. getList_p())
      if path_spl in self.list_o: 
         retVal_s = self.list_o[path_spl].GET(id)
      else:
         # Anforderung eines Details
         cherrypy.expose.status = 404
      print (123)
      print(retVal_s)
      return retVal_s
      
   #-------------------------------------------------------
   def DELETE(self, path_spl, id):
      retVal_s = ''
      if path_spl in self.list_o:
         retVal_s = self.list_o[path_spl].DELETE(id)
      else:
         cherrypy.expose.status = 404
      return retVal_s

   def POST(self, path_spl):
      #print (cherrypy.request.body)
      data_o = (cherrypy.request.body.read()).decode("utf-8") #strings
      #print (data_o)
      data = ast.literal_eval(data_o)
      print("data in POST")
      print(data)
      retVal_s = ''
      if path_spl in self.list_o:
         retVal_s = self.list_o[path_spl].POST(data)
      else:
         cherrypy.expose.status = 404
      return retVal_s

   def PUT(self, path_spl):
      data_o = (cherrypy.request.body.read()).decode("utf-8")
      data = ast.literal_eval(data_o)
      retVal_s = ''
      if path_spl in self.list_o:
         retVal_s = self.list_o[path_spl].PUT(data)

