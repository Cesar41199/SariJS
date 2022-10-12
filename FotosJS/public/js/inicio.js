const direcionServer='http://localhost:3002/';
// const direcionServer='http://app.grupohemac.com.mx:3002/';
function llenartabla() {
    try{
    fetch(direcionServer='tablaProvedores')
    .then((response) => response.json())
    .then((tabla)=>{
      //console.log(usuarios)
      let conteo= 1
      let tablaUsuario = document.querySelector('#tabla-inicio tbody');
      
      //console.log(idAlarma_inf);
      for (const tablafotos of tabla) {
        
        if(tablafotos.fechaAmpliacion == null){
          
          tablafotos.fechaAmpliacion = 'Sin asignar'
        }else{
          tablafotos.fechaAmpliacion = tablafotos.fechaAmpliacion.substring(0,10)
        }

        if(conteo%2==0){
          let tr = " <tr class='other-row'> <td>"+conteo+"</td>" + 
          "<td><form action='/checkEstatus' method=POST id='formulario"+conteo+"'> <input type='hidden' name='idRedJalisco' value='"+tablafotos.idRedJalisco+"'><a href='javascript:enviar_formulario(formulario"+conteo+")'>"+ tablafotos.idRedJalisco +"</a></form></td>" +
        "<td>"+tablafotos.nombreEstatus+"</td>"+
        "<td>"+tablafotos.estatusInfo+"</td>" +
        "<td>" + tablafotos.fechaAmpliacion+ "</td> </tr>" 

        tablaUsuario.innerHTML +=  tr;

        conteo = conteo + 1;
        }else{
          let tr = " <tr class='active-row'> <td>"+conteo+"</td>" + 
          "<td><form action='/checkEstatus' method=POST id='formulario"+conteo+"'> <input type='hidden' name='idRedJalisco' value='"+tablafotos.idRedJalisco+"'><a href='javascript:enviar_formulario(formulario"+conteo+")'>"+ tablafotos.idRedJalisco +"</a></form></td>" +
          "<td>"+tablafotos.nombreEstatus+"</td>"+
          "<td>"+tablafotos.estatusInfo+"</td>" +
          "<td>" + tablafotos.fechaAmpliacion + "</td> </tr>" 
  
          tablaUsuario.innerHTML +=  tr;
  
          conteo = conteo + 1;
        }
        
      
      }
    })
  }catch(e){
    console.log(e)
  }
  }
  llenartabla()

  
  function enviar_formulario(formulario){
    
    formulario.submit()
      
    
    
  }