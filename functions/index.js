const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({request, response});
    var params = request.body.result.parameters;

    function setLuces () {
      var cuarto = String(params.habitaciones);
      var dbCuarto = null;
      var accion = params.acciones;
      var obj = params.luces;
      var valorOp = Number(params.number);
      var luzFinal = 0;
      if(obj === "luz"){
        switch(cuarto){
          case "cuarto de estar":
            dbCuarto = "comedor"
            break;
          case "mi cuarto":
            dbCuarto = "micuarto"
            break;
          case "entrada":
            dbCuarto = "entrada"
            break;
          case "pasillo":
            dbCuarto = "pasillo"
            break;
        }
      }else if(obj === "flexo"){
          switch(cuarto){
            case "mi cuarto":
              dbCuarto = "micuarto"
              break;
          }
      }else if(obj === "persiana"){
        setPersianas();
      }

      if(dbCuarto){
        admin.database().ref(dbCuarto).once('value', function(ds){
          var valuz;
          if(obj === "luz"){
            valuz = Number(ds.val().lampara);
          }else if(obj === "flexo"){
            valuz = Number(ds.val().flexo);
          }

          if(valorOp > 255){
            valorOp = 255;
            luzFinal = valorOp;
          }else if(valorOp < 0){
            valorOp = 0;
            luzFinal = valorOp;
          }else{
            if(accion === "encender"){
              luzFinal = 255;
            }else if(accion === "apagar"){
              luzFinal = 0;
            }else if(accion === "cambiar"){
              if(valuz <= 10){
                luzFinal = 255;
              }else{
                luzFinal = 0;
              }
            }else if(accion === "poner"){
              luzFinal = valorOp;
            }
          }
          if(obj === "luz"){
            ds.ref.update({lampara: luzFinal});
          }else if(obj === "flexo"){
            ds.ref.update({flexo: luzFinal});
          }
          app.ask('La '+ obj + ' de ' + cuarto.replace('mi ', 'tu ') + ' está ahora a ' + luzFinal);
          }
        );
      }else{
        app.ask('Esta luz no existe');
      }
    }
    function setPersianas(){
      var cuarto = String(params.habitaciones);
      var dbCuarto = null;
      var accion = params.acciones;
      var obj = params.persianas;
      var persFinal = 0;
      var valorOp = Number(params.number);
      switch(cuarto){
        case "cuarto de estar":
          dbCuarto = "comedor"
          break;
        case "mi cuarto":
          dbCuarto = "micuarto"
          break;
      }
      if(dbCuarto){
        admin.database().ref(dbCuarto).once('value', ds => {
          var valpers = Number(ds.val().persiana);
          if(valorOp > 255){
            valorOp = 255;
            persFinal = valorOp;
          }else if(valorOp < 0){
            valorOp = 0;
            persFinal = valorOp;
          }else{
            if(accion === "subir"){
              persFinal = 255;
            }else if(accion === "bajar"){
              persFinal = 0;
            }else if(accion === "cambiar"){
              if(valpers <= 15){
                persFinal = 255;
              }else{
                persFinal = 0;
              }
            }else{
              persFinal = valorOp;
            }
          }
          ds.ref.update({persiana: persFinal});
          app.ask('La '+ obj + ' de ' + cuarto.replace('mi ', 'tu ') + ' está ahora a ' + persFinal);
        });
      }else{
        app.ask('Esta persiana no existe');
      }
    }
    function getDatos(){
      var cuarto = String(params.habitaciones);
      var dbCuarto = null;
      var obj;
      if(params.luces) obj = params.luces;
      else if(params.persianas) obj = params.persianas;
      switch(cuarto){
        case "cuarto de estar":
          dbCuarto = "comedor"
          break;
        case "mi cuarto":
          dbCuarto = "micuarto"
          break;
        case "entrada":
          dbCuarto = "entrada"
          break;
        case "pasillo":
          dbCuarto = "pasillo"
          break;
      }
      if(dbCuarto){
        admin.database().ref(dbCuarto).once('value', ds =>{
          var valobj;
          if(obj == "luz"){
            valobj = ds.val().lampara;
          }else if(obj == "flexo"){
            valobj = ds.val().flexo;
          }else if(obj == "persiana"){
            valobj = ds.val().persiana;
          }
          app.ask('La '+ obj + ' de ' + cuarto.replace('mi ', 'tu ') + ' está a ' + valobj);
        });
      }else{
        app.ask('Este objeto no existe');
      }
    }
  
    const actionMap = new Map();
    actionMap.set('input.luces', setLuces);
    actionMap.set('input.persiana', setPersianas);
    actionMap.set('input.query', getDatos);
  
    app.handleRequest(actionMap);
});
