

function llenartabla() {
    try{
    fetch('http://localhost:3002/getDatos_sitiosSupervisor')
    .then((response) => response.json())
    .then((tablaDatosSupervisor)=>{
      //console.log(usuarios)
      let conteo= 1
      let tablaUsuario = document.querySelector('#tabla-inicio tbody');
      
      //console.log(idAlarma_inf);
      for (const tabla of tablaDatosSupervisor) {
        
          let tr = " <tr class='other-row'> <td>"+conteo+"</td>" + 
          "<td><form action='/datosfotosAdminRevisarVista' method=POST> <input type='hidden' name='idSARIestatus' value='"+tabla.idSARIestatus+"'> <button type='submit' class='estiloLetras'>"+ tabla.idRedJalisco +"</button></form></td>"+
          "<td>"+tabla.estatusInfo+"</td>"+
          "<td>"+tabla.estatusSave+"</td>"+
          "<td>"+tabla.nombre+"</td>"+
          "</tr>" 

        tablaUsuario.innerHTML +=  tr;

        conteo = conteo + 1;
        
      }
    })
  }catch(e){
    console.log(e)
  }
  };


  llenartabla();

