//------------------------------------------------------------------------------
//Demonstrator evs/tco/tmg
//------------------------------------------------------------------------------
// rev. 0, 21.11.2018, Bm
//------------------------------------------------------------------------------
// hier zur Vereinfachung (!) die Klassen in einer Datei
//------------------------------------------------------------------------------
'use strict'
class SideBar_cl {
//------------------------------------------------------------------------------

   constructor (el_spl, template_spl) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.configHandleEvent_p();
   }
   render_px (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }
   handleEvent_p (event_opl) {
      let cmd_s = event_opl.target.dataset.action;
      APPUTIL.es_o.publish_px("app.cmd", [cmd_s, null]);
   }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ListView_cl{
    constructor (el_spl, template_spl, action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
      this.configHandleEvent_p();
   }
   render_px () {
      // Daten anfordern
      let path_s = "/app/" + this.action ;
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         }
      );
   }
   buildUrl(url, parameters){
      let qs = "";
      for (const key in parameters){
         if (parameters.hasOwnProperty(key)){
            const value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
         }
      }
      if (qs.length > 0){
         qs = qs.substring(0, qs.length - 1);
         url = url + "?" + qs
      }
      return url;
   }

   render_p () {
      // Daten anfordern
      let path_s = "/app/" +  this.action  ;
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         }
      );
   }

   doRender_p (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }

   

   handleEvent_p (event_opl) {
      if (event_opl.target.tagName.toUpperCase() == "TD") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o != null) {
            elx_o.classList.remove("clSelected");
         }
         event_opl.target.parentNode.classList.add("clSelected");
         event_opl.preventDefault();
      }
      /////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idShowList_mitarbeiter"){
         APPUTIL.es_o.publish_px("app.cmd", ["listMitarbeiter", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id== "idShowList_entwickler"){
         APPUTIL.es_o.publish_px("app.cmd", ["listEntwickler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id== "idShowList_erkannterfehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["listErkannterfehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }
       else if(event_opl.target.id== "idShowList_behobenerfehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["listBehobenerfehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowList_katfehker"){
         APPUTIL.es_o.publish_px("app.cmd", ["listKatfehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idBack_kategorie"){
         APPUTIL.es_o.publish_px("app.cmd", ["listKategorie", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idBack_kategoriefehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["listKatfehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowList_katursache"){
         APPUTIL.es_o.publish_px("app.cmd", ["listKatursache", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idBack_arbeiter"){
         APPUTIL.es_o.publish_px("app.cmd", ["listArbeiter", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id== "idAnlegen_projekt"){
         APPUTIL.es_o.publish_px("app.cmd", ["formProjekt", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id== "idZuordnen_katfehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["listKategoriefehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idBack_kategoriefehler1"){
         APPUTIL.es_o.publish_px("app.cmd", ["listKategoriefehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idBack_fehler1"){
         APPUTIL.es_o.publish_px("app.cmd", ["listFehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

        

      else if (event_opl.target.id == "idShowListEntry_projekt") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formProjekt", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }


      else if(event_opl.target.id == "idDelete_projekt"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/projekt/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listProjekt_o  = new ListView_cl("main", "projektList.tpl.html","projekt");
                  listProjekt_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_mitarbeiter"){
         APPUTIL.es_o.publish_px("app.cmd", ["formMitarbeiter", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_mitarbeiter") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formMitarbeiter", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }
      else if(event_opl.target.id == "idDelete_mitarbeiter"){
         let elx_o = document.querySelector(".clSelected");
         if(elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/qsmitarbeiter/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "mitarbeiterList.tpl.html","qsmitarbeiter");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_entwickler"){
         APPUTIL.es_o.publish_px("app.cmd", ["formEntwickler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_entwickler") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formEntwickler ", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idDelete_entwickler"){
         let elx_o = document.querySelector(".clSelected");
         if(elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/swentwickler/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listProjekt_o  = new ListView_cl("main", "entwicklerList.tpl.html","swentwickler");
                  listProjekt_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_katfehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["formKatfehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_katfehler") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formKatfehler", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }


      else if(event_opl.target.id == "idDelete_katfehler"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/katfehler/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKatfehler_o  = new ListView_cl("main", "katfehlerList.tpl.html","katfehler");
                  listKatfehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_katursache"){
         APPUTIL.es_o.publish_px("app.cmd", ["formKatursache", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_katursache") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formKatursache", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }


      else if(event_opl.target.id == "idDelete_katursache"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/katursache/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKatursache_o  = new ListView_cl("main", "katursacheList.tpl.html","katursache");
                  listKatursache_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_komponente"){
         APPUTIL.es_o.publish_px("app.cmd", ["formKomponente", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_komponente") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formKomponente", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }


      else if(event_opl.target.id == "idDelete_komponente"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/komponente/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKomponente_o  = new ListView_cl("main", "komponenteList.tpl.html","komponente");
                  listKomponente_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_kategorie"){
         APPUTIL.es_o.publish_px("app.cmd", ["formKategorie", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_kategorie") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formKategorie", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }


      else if(event_opl.target.id == "idDelete_kategorie"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/kategorie/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKomponente_o  = new ListView_cl("main", "kategorieList.tpl.html","kategorie");
                  listKomponente_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_fehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["formAnmeldung", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_fehler") {
         let elx_o = document.querySelector(".clSelected");
        
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            let id = elx_o.id;
            let path_s = "/app/anmeldung/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.request_px(path_s,
               function (responseText_spl) {
                  alert(responseText_spl);
                  let data_o = JSON.parse(responseText_spl);
                 alert(data_o["id"]);
                  let anmeldungForm1  = new DetailView_cl("main", "anmeldungForm1.tpl.html","anmeldung");
                  anmeldungForm1.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }

         event_opl.stopPropagation();
         event_opl.preventDefault();
      }


      else if(event_opl.target.id == "idDelete_fehler"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/fehler/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listFehler_o  = new ListView_cl("main", "fehlerList.tpl.html","fehler");
                  listFehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id== "idAnlegen_kategoriefehler"){
         APPUTIL.es_o.publish_px("app.cmd", ["formKategoriefehler", 0] );
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idShowListEntry_kategoriefehler") {
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null) {
            alert("Bitte zuerst einen Eintrag auswählen!");
         } else {
            //APPUTIL.es_o.publish_px("app.cmd", ["detail", elx_o.id] );
            APPUTIL.es_o.publish_px("app.cmd", ["formKategoriefehler", elx_o.id] );
         }
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

else if(event_opl.target.id == "idSave_anmeldung"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         //var selects = form[0].getElementsByTagName("select");
         //for (var i = 0; i< selects.length; i++){
           // data[selects[i].name] = selects[i].value;
         //}

         let json = JSON.stringify(data);
         alert(Object.values(data));
         
         let path_s = "/app/anmeldung/";
         let requester_o = new APPUTIL.Requester_cl();
         requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  alert(responseText_spl);
                  let data_o = JSON.parse(responseText_spl);
                  alert(data_o.length);
                  //APPUTIL.es_o.publish_px("app.cmd", ["formFehler", 0])
                  var formFehler_o  = new DetailView1_cl("main", "fehlerForm.tpl.html", "fehler");
                  
                  let id = data_o["id"] + data_o["mitID"];
                  alert(id);
                  formFehler_o.render_px(id);
                  //let elx_o = document.querySelector(".clSelected");
                  //APPUTIL.es_o.publish_px("app.cmd", ["formFehler", elx_o.id] );
                 
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }

         else if(event_opl.target.id == "idBack_fehler") {
            alert("0");
         APPUTIL.es_o.publish_px("app.cmd", ["listFehler", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_fehler"){
         alert("Save fehler");
         let data = {};
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/fehler/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listFehler_o  = new ListView_cl ("main", "fehlerList.tpl.html", "fehler");
                  listFehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listFehler_o  = new ListView_cl ("main", "fehlerList.tpl.html", "fehler");
                  listFehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
      else if(event_opl.target.id == "idDelete_kategoriefehler"){
         let elx_o = document.querySelector(".clSelected");
         if (elx_o == null){
            alert("Bitte zuerst einen Eintrag auswählen !");
         }else{
            let id = elx_o.id;
            let path_s = "/app/kategoriefehler/" + id;
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.deleteRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKatursache_o  = new ListView_cl("main", "kategoriefehlerList.tpl.html","kategoriefehler");
                  listKatursache_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed");
         });
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
      }
   }
}
////////////////////////////////////////////////
class DetailView1_cl{
    constructor (el_spl, template_spl, action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
   }
   render_px (id_spl) {
      // Daten anfordern
      //document.write(id_spl);
      let path_s;
      if (id_spl === undefined){
         path_s = "/app/" + this.action +"/";
      }else{
         path_s = "/app/" + this.action +"/" + id_spl;
      }
      
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            alert(responseText_spl);
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }
      );
   }
   doRender_p (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
         this.configHandleEvent_p();
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector("form");
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class DetailView_cl{
    constructor (el_spl, template_spl, action) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.action = action;
   }
   render_px (id_spl) {
      // Daten anfordern
      //document.write(id_spl);
      let path_s;
      if (id_spl === undefined){
         path_s = "/app/" + this.action +"/";
      }else{
         path_s = "/app/" + this.action +"/" + id_spl;
      }
      
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            alert(responseText_spl);
            let data_o = JSON.parse(responseText_spl);
            this.doRender_p(data_o);
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }
      );
   }
   doRender_p (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
         this.configHandleEvent_p();
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector("form");
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }

   handleEvent_p (event_opl) {
      if (event_opl.target.id == "idBack_projekt") {
         APPUTIL.es_o.publish_px("app.cmd", ["listProjekt", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_projekt"){
        // alert("hallo");
         let data = {};
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/projekt/";
         if(data['id'] == 0){

            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listProjekt_o  = new ListView_cl("main", "projektList.tpl.html","projekt");
                  listProjekt_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         alert("Insert");
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listProjekt_o  = new ListView_cl("main", "projektList.tpl.html","projekt");
                  listProjekt_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         alert("Update");
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id == "idBack_mitarbeiter") {
         APPUTIL.es_o.publish_px("app.cmd", ["listMitarbeiter", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_mitarbeiter"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
        for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/qsmitarbeiter/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "mitarbeiterList.tpl.html","qsmitarbeiter");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "mitarbeiterList.tpl.html","qsmitarbeiter");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
         //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          else if(event_opl.target.id == "idBack_kategorie") {
         APPUTIL.es_o.publish_px("app.cmd", ["listKategorie", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_kategorie"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
      var selects = form[0].getElementsByTagName("select");
        for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/kategorie/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKategorie_o  = new ListView_cl("main", "kategorieList.tpl.html","kategorie");
                  listKategorie_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listKategorie_o  = new ListView_cl("main", "kategorieList.tpl.html","kategorie");
                  listKategorie_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        else if(event_opl.target.id == "idBack_entwickler") {
         APPUTIL.es_o.publish_px("app.cmd", ["listEntwickler", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }

        else if(event_opl.target.id == "idSave_entwickler"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
        for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }

         let json = JSON.stringify(data);
         let path_s = "/app/swentwickler/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listEntwickler_o  = new ListView_cl("main", "entwicklerList.tpl.html","swentwickler");
                  listEntwickler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listEntwickler_o  = new ListView_cl("main", "entwicklerList.tpl.html","swentwickler");
                  listEntwickler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id == "idBack_katfehler") {
         APPUTIL.es_o.publish_px("app.cmd", ["listKatfehler", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }

        else if(event_opl.target.id == "idSave_katfehler"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         let path_s = "/app/katfehler/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKatfehler_o  = new ListView_cl("main", "katfehlerList.tpl.html","katfehler");
                  listKatfehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listKatfehler_o  = new ListView_cl("main", "katfehlerList.tpl.html","katfehler");
                  listKatfehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id == "idBack_katursache") {
         APPUTIL.es_o.publish_px("app.cmd", ["listKatursache", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_katursache"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/katursache/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listKatursache_o  = new ListView_cl("main", "katursacheList.tpl.html","katursache");
                  listKatursache_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listKatursache_o  = new ListView_cl("main", "katursacheList.tpl.html","katursache");
                  listKatursache_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id == "idBack_komponente") {
         APPUTIL.es_o.publish_px("app.cmd", ["listKomponente", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_komponente"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/komponente/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "komponenteList.tpl.html","komponente");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "komponenteList.tpl.html","komponente");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if(event_opl.target.id == "idBack_kategoriefehler") {
         APPUTIL.es_o.publish_px("app.cmd", ["listKomponente", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_kategoriefehler"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/kategoriefehler/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "kategoriefehlerList.tpl.html","kategoriefehler");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listMitarbeiter_o  = new ListView_cl("main", "kategoriefehlerList.tpl.html","kategoriefehler");
                  listMitarbeiter_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
         //////////////////////////////////////////////////////////////////////////////////////////////////////////

         /////////////////////////////////////////////////////////////////////////////////////////////////////////
         else if(event_opl.target.id == "idSave_anmeldung"){
         let data = {}
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         //var selects = form[0].getElementsByTagName("select");
         //for (var i = 0; i< selects.length; i++){
           // data[selects[i].name] = selects[i].value;
         //}

         let json = JSON.stringify(data);
         alert(Object.values(data));
         
         let path_s = "/app/anmeldung/";
         let requester_o = new APPUTIL.Requester_cl();
         requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  alert(responseText_spl);
                  let data_o = JSON.parse(responseText_spl);
                  
                  if(data_o["error"] == "1"){
                     document.getElementById("failed").innerHTML = "Fehler bei anmeldung!";
                  }
                  else if(data_o["error"] == "2"){
                     document.getElementById("failed").innerHTML = "SW Entwickler ist beschaeftigt!";
                  }
                  else if(data_o["error"] == "3"){
                     document.getElementById("failed").innerHTML = "der Fehler ist schon behoben";
                  }
                  else{
                  //APPUTIL.es_o.publish_px("app.cmd", ["formFehler", 0])
                  var formFehler_o  = new DetailView1_cl("main", "fehlerForm.tpl.html", "fehler");
                  if(data_o["entID"] != "0"){
                     data_o["mitID"] = "0";
                  }
                  let id = data_o["id"] + data_o["mitID"] + data_o["entID"];
                  alert(id);
                  formFehler_o.render_px(id);
               }
                  //let elx_o = document.querySelector(".clSelected");
                  //APPUTIL.es_o.publish_px("app.cmd", ["formFehler", elx_o.id] );
                 
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }

         else if(event_opl.target.id == "idBack_fehler") {
            alert("0");
         APPUTIL.es_o.publish_px("app.cmd", ["listFehler", null]);
         event_opl.stopPropagation();
         event_opl.preventDefault();
      }

      else if(event_opl.target.id == "idSave_fehler"){
         alert("Save fehler");
         let data = {};
         var form = document.getElementsByTagName("form");
         var inputs = form[0].getElementsByTagName("input");
         for (var i = 0; i < inputs.length; i++){
            data[inputs[i].name] = inputs[i].value;
         }
         var selects = form[0].getElementsByTagName("select");
         for (var i = 0; i< selects.length; i++){
            data[selects[i].name] = selects[i].value;
         }
         let json = JSON.stringify(data);
         alert(json);
         let path_s = "/app/fehler/";
         if(data['id'] == 0){
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.insertRequest_px(path_s,
               function (responseText_spl) {
                  let data_o = JSON.parse(responseText_spl);
                  let listFehler_o  = new ListView_cl ("main", "fehlerList.tpl.html", "fehler");
                  listFehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
         }
         else{
            let requester_o = new APPUTIL.Requester_cl();
            requester_o.updateRequest_px(path_s,
               function (responseText_spl) {
                  //let data_o = JSON.parse(responseText_spl);
                  let listFehler_o  = new ListView_cl ("main", "fehlerList.tpl.html", "fehler");
                  listFehler_o.render_px();
         }.bind(this),
         function (responseText_spl) {
            alert("Detail - render failed");
         }, json);
         event_opl.stopPropagation();
         event_opl.preventDefault();
            }
         }
         ///////////////////////////////////////////////////////////////////////////////////////////////////////////

      }
   }

class Application_cl {

   constructor () {
      // Registrieren zum Empfang von Nachrichten
      APPUTIL.es_o.subscribe_px(this, "templates.loaded");
      APPUTIL.es_o.subscribe_px(this, "templates.failed");
      APPUTIL.es_o.subscribe_px(this, "app.cmd");

      this.sideBar_o = new SideBar_cl("aside", "sidebar.tpl.html");
      this.listView_o = new ListView_cl("main", "list.tpl.html","list");
      this.detailView_o = new DetailView_cl("main", "detail.tpl.html", "projekt");

      this.listProjekt_o = new ListView_cl("main", "projektList.tpl.html", "projekt");
      this.formProjekt_o = new DetailView_cl("main", "projektForm.tpl.html", "projekt");

      this.listMitarbeiter_o = new ListView_cl("main", "mitarbeiterList.tpl.html", "qsmitarbeiter");
      this.formMitarbeiter_o = new DetailView_cl("main","mitarbeiterForm.tpl.html", "qsmitarbeiter");

      this.listEntwickler_o = new ListView_cl("main", "entwicklerList.tpl.html", "swentwickler");
      this.formEntwickler_o = new DetailView_cl("main","entwicklerForm.tpl.html", "swentwickler");

      this.listKatfehler_o = new ListView_cl("main", "katfehlerList.tpl.html", "katfehler");
      this.formKatfehler_o = new DetailView_cl("main", "katfehlerForm.tpl.html", "katfehler");

      this.listKatursache_o = new ListView_cl("main", "katursacheList.tpl.html", "katursache");
      this.formKatursache_o = new DetailView_cl("main", "katursacheForm.tpl.html", "katursache");

      this.listKomponente_o = new ListView_cl("main", "komponenteList.tpl.html", "komponente");
      this.formKomponente_o = new DetailView_cl("main", "komponenteForm.tpl.html", "komponente");

      this.listKategorie_o = new ListView_cl("main", "kategorieList.tpl.html", "kategorie");
      this.formKategorie_o = new DetailView_cl("main", "kategorieForm.tpl.html", "kategorie");

      this.listArbeiter_o = new ListView_cl("main", "arbeiterList.tpl.html", "arbeiter");

      this.listFehler_o = new ListView_cl ("main", "fehlerList.tpl.html", "fehler");
      this.formFehler_o = new DetailView_cl("main", "fehlerForm.tpl.html", "fehler");

      this.listErkannterfehler_o = new ListView_cl("main", "erkannterfehlerList.tpl.html", "fehler/?type=erkannt");
      this.listBehobenerfehler_o = new ListView_cl("main", "behobenerfehlerList.tpl.html", "fehler/?type=behoben");

      this.proList_o = new ListView_cl ('main', "proList.tpl.html", "prolist");

      this.katList_o = new ListView_cl ('main', 'katList.tpl.html', "katlist");

      this.listKategoriefehler_o = new ListView_cl("main", "kategoriefehlerList.tpl.html", "kategoriefehler");
      this.formKategoriefehler_o = new DetailView_cl("main", "kategoriefehlerForm.tpl.html", "kategoriefehler");

      this.formAnmeldung_o = new DetailView_cl("main", "anmeldungForm.tpl.html", "anmeldung");
      
      this.formAnmeldung1_o = new DetailView_cl("main", "anmeldungForm1.tpl.html", "anmeldung");
   }
   notify_px (self, message_spl, data_opl) {
      switch (message_spl) {
      case "templates.failed":
         alert("Vorlagen konnten nicht geladen werden.");
         break;
      case "templates.loaded":
         // Templates stehen zur Verfügung, Bereiche mit Inhalten füllen
         // hier zur Vereinfachung direkt
         let markup_s;
         let el_o;
         markup_s = APPUTIL.tm_o.execute_px("header.tpl.html", null);
         el_o = document.querySelector("header");
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
          markup_s = APPUTIL.tm_o.execute_px("footer.tpl.html", null);
         el_o = document.querySelector("footer");
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
         let nav_a = [
            ["home", "Startseite"],
            ["listFehler", "Bearbeitung Fehlerdaten"],
            ["listProjekt", "Pflege Projekte"],
            ["listArbeiter", "Pflege Daten Mitarbeiter"],
            ["listKomponente", "Pflege Komponente"],
            ["listKategorie", "Pflege Kategorie"],
            ["proList", "Auswertung Projekte/Fehler"],
            ["katList", "Auswerung Kategorie/Fehler"]
         ];
         self.sideBar_o.render_px(nav_a);
         markup_s = APPUTIL.tm_o.execute_px("home.tpl.html", null);
         el_o = document.querySelector("main");
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
         break;

      case "app.cmd":
         // hier müsste man überprüfen, ob der Inhalt gewechselt werden darf
         switch (data_opl[0]) {
         case "home":
            let markup_s = APPUTIL.tm_o.execute_px("home.tpl.html", null);
            let el_o = document.querySelector("main");
            if (el_o != null) {
               el_o.innerHTML = markup_s;
            }
            break;
         case "list":
            // Daten anfordern und darstellen
            this.listView_o.render_px();
            break;
         case "detail":
            this.detailView_o.render_px(data_opl[1]);
            break;

         case "listProjekt":
            this.listProjekt_o.render_px();
            break;
         case "formProjekt":
            this.formProjekt_o.render_px(data_opl[1]);
            break;

         case "listMitarbeiter":
            this.listMitarbeiter_o.render_px();
            break;
         case "formMitarbeiter":
            this.formMitarbeiter_o.render_px(data_opl[1]);
            break;

         case "listEntwickler":
            this.listEntwickler_o.render_px();
            break;
         case "formEntwickler":
            this.formEntwickler_o.render_px(data_opl[1]);
            break;

         case "listKatfehler":
            this.listKatfehler_o.render_px();
            break;
         case "formKatfehler":
            this.formKatfehler_o.render_px(data_opl[1]);
            break;

         case "listKatursache":
            this.listKatursache_o.render_px();
            break;
         case "formKatursache":
            this.formKatursache_o.render_px(data_opl[1]);
            break;

         case "listKomponente":
            this.listKomponente_o.render_px();
            break;
         case "formKomponente":
            this.formKomponente_o.render_px(data_opl[1]);
            break;

         case "listKategorie":
            this.listKategorie_o.render_px();
            break;
         case "formKategorie":
            this.formKategorie_o.render_px(data_opl[1]);
            break;

         case "listArbeiter":
            this.listArbeiter_o.render_px();
            break;

         case "listFehler":
            this.listFehler_o.render_px();
            break;
         
         case "listErkannterfehler":
            this.listErkannterfehler_o.render_px(); 
            break;

         case "listBehobenerfehler":
            this.listBehobenerfehler_o.render_px();
            break;

         case "proList":
            this.proList_o.render_px();
            break;

         case "katList":
            this.katList_o.render_px();
            break;

         case "listKategoriefehler":
            this.listKategoriefehler_o.render_px();
            break;
         case "formKategoriefehler":
            this.formKategoriefehler_o.render_px(data_opl[1]);
            break; 

         case "formAnmeldung":
            this.formAnmeldung_o.render_px();
            break;

         case "formAnmeldung1":
            this.formAnmeldung1_o.render_px(data_opl[1]);
            break;
         }

         break;
      }
   }
}

window.onload = function () {
   APPUTIL.req_o = new APPUTIL.Requester_cl();
   APPUTIL.es_o = new APPUTIL.EventService_cl();
   var app_o = new Application_cl();
   APPUTIL.createTemplateManager_px();
}