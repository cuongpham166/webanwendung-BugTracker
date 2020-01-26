import cherrypy
import json
import ast
from .database import Database_cl
from .view import View_cl

from .database import Database_fehler
from .database import Database_komponente
from .database import Database_projekt


class Prolist_cl (object):

    def __init__(self):
    	self.view_o =View_cl()

    def GET (self, id=None):
    	retVal_s = ''
    	if id == None:
    		retVal_s = self.getList_p()
    	else:
    		retVal_s = self.getDetail_p(id)
    	return retVal_s

    def getList_p(self):
        db_fehler = Database_fehler()
        db_komponente = Database_komponente()
        db_projekt = Database_projekt()

        data_projekt = db_projekt.data_o
        data_komponente = db_komponente.data_o
        data_fehler = db_fehler.data_o

       
        data_projekt.pop(0)
        for i in range (0, len(data_projekt)):

            liste = self.getIdKomponenteList_by_projekt(data_projekt[i]["id"])
            if(len(liste)> 0):
                print(liste)
                data_projekt[i]["Komponente"] = []
                data_projekt[i]["Fehler"] = []
                for j in range(0,len(liste)):
                    data_projekt[i]["Komponente"].append(db_komponente.read_px(liste[j]))
                    liste_fehler = self.getIdFehlerList_by_komponenteID(liste[j])
                    for k in range(0,len(liste_fehler)):
                        data_projekt[i]["Fehler"].append(db_fehler.read_px(liste_fehler[k]))

                #for j in range(0,len(data_projekt[i]["Komponente"])):
                #    for k in liste:
                #        for l in range(1,len(data_fehler)):
                #            if k == data_fehler[l]["komponenteID"]:
                #                data_projekt[i]["Komponente"][j].update(db_fehler.read_px(liste[int(k)]))
                
                    
                        
                            

           
        print("----------data_projekt--------------------")
        print(data_projekt);
        return self.view_o.createList_px(data_projekt)

    def getIdKomponenteList_by_projekt(self,projektID):

        db_komponente = Database_komponente()
        liste = []
        for i in range(1,len(db_komponente.data_o)):
            if(db_komponente.data_o[i]["projektID"] == projektID):
                liste.append(db_komponente.data_o[i]["id"])
        return liste

    def getIdFehlerList_by_komponenteID(self,komponenteID):

        db_fehler = Database_fehler()
        liste = []
        for i in range(1, len(db_fehler.data_o)):
            if db_fehler.data_o[i]["komponenteID"] == komponenteID:
                liste.append(db_fehler.data_o[i]["id"]) 
                    
        return liste       
            
        
        
        
        
        
        
        
            
                
                    
                    
                    
                        
                            
                            
                            

                            
                                
                                    
                                    
                                    

        
    	
      
         
         

      




      