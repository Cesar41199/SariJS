
  let objectollenar 
  var uploaded_image;
  let objectoSeries
  function llenartabla() {
    try{
    fetch('http://app.grupohemac.com.mx:3002/tablaProtocolos')
    .then((response) => response.json())
    .then((tabla)=>{
      
      objectollenar=tabla
      //console.log(usuarios)
      let conteo= 1
      let tablaUsuario = document.querySelector('#tabla-inicio');
      let tablafotos
      //console.log(idAlarma_inf);
      for (tablafotos of tabla) {
      
        
        
        let tr = "<tbody> <tr class='other-row'> <td>"+conteo+"</td>" + 
        "<td>"+tablafotos.idRedJalisco+"</td>"+
        "<td><div class='imagesquare' id='image_drop_area"+conteo+"'></div></td>"+
        "<td ><div id='btnreportes"+conteo+"'><a  onclick=PDFrevisado("+"'"+tablafotos.idRedJalisco+"'"+") ><img src='images/pdf.png' width='35px' height='35px'></a></div></td></tr></tbody>"
        //"<img alt='' id='codigo"+conteo+"'>"

        tablaUsuario.innerHTML +=  tr;

        conteo = conteo + 1;
      }
      Image(conteo)
      series()
    })
  }catch(e){
    console.log(e)
  }
  }

llenartabla()

  function Image(cont){
    for(contador=1;contador<cont;contador++){
      const image_drop_area = document.querySelector("#image_drop_area"+contador);
  
  
  // Event listener for dragging the image over the div
  image_drop_area.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = 'copy';
  });
  
  // Event listener for dropping the image inside the div
  image_drop_area.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    fileList = event.dataTransfer.files;
  
  //   document.querySelector("#file_name").textContent = fileList[0].name;
    
    readImage(fileList[0]);
    
    $(image_drop_area).css("background-color","#00FF00")
    setTimeout(function(){
      $(image_drop_area).css("background-color","transparent")
      uploaded_image=undefined
      
    }
      ,10000)
  });
  
  // Converts the image into a data URI
  readImage = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      uploaded_image = event.target.result;
      
  
    });
    reader.readAsDataURL(file);
  }
    }
   
  }
  
  
 function PDFrevisado(idRedJalisco){

    try {

      let objfilter
      objectollenar.find(object =>{
        if(object.idRedJalisco == idRedJalisco){
          objfilter=object
        }
     
      })
          
      let objAP=[{}]
      let objSW=[{}]
      objectoSeries.find(objects =>{
        if(objects.idRedJalisco_id == idRedJalisco){
          objects
          if(objects.codigoEquipo_id == 3){
            objAP.push(objects)
          }else{
            objSW.push(objects)
          }
        }
     
      })
    
      
      // objSeri.find(objects =>{
      //   if(objects.codigoEquipo_id == 3){
      //     objAP=objects
      //   }else{
      //     objSW=objects
      //   }
     
      // })
     
      
   
    const plantilla='../Images/Protocolo1PNG.png'
    const plantilla1=uploaded_image
    const plantilla2='../Images/Protocolo2PNG.png'
    const plantillavacia='../Images/ProtocoloVacio1.png'
    
    

    var doc = new jsPDF();
    let width = doc.internal.pageSize.getWidth();
    let height = doc.internal.pageSize.getHeight();
    let contpages = 0
       
    doc.setFont('helvetica')
    doc.setFontSize(7)
    doc.addImage(plantilla,'PNG',0,0,width,height)
    doc.text(objfilter.fechaAmpliacion.substring(0,10),30,52) //FECHA
    doc.text(objfilter.descripcion,109,52) //NOMBRE DE SITIO
    doc.text(objfilter.idRedJalisco,30,56.5)//ID SITIO
    doc.text(objfilter.direccionMesaDeAyuda,109,56.5) //DIRECCION
    
    doc.setFontSize(6)
    doc.text('EQUIPAMIENTO NUEVO OPERANDO CORRECTAMENTE',122,113)
    contpages = contpages+1
    doc.text(""+contpages+"",width/2,279) //PAGES
    
    sw()
    ap()
    
    doc.addPage()
    doc.setFontSize(7)
    doc.addImage(plantillavacia,'PNG',0,0,width,height)
    doc.addImage(plantilla1,'PNG',2,35,203,235)
    
    doc.text(""+contpages+"",width/2,279) //PAGES
    contpages = contpages+1
    
    doc.addPage()
    doc.addImage(plantilla2,'PNG',0,0,width,height)
    doc.text(objfilter.idRedJalisco,30,43) //ID SITIO
    doc.text(""+contpages+"",width/2,279) //PAGES
    contpages = contpages+1
    
    
    
    
    doc.save("SSJ.pdf");
    function sw(){
        const sw = '../Images/SWj.png'
        let x = 10
        let y = 115
        let ytext = 120 
        let xsitio = 12
        let xserie = 70
        let xmodelo =130
      
        
        for(i=1;i<Object.keys(objSW).length;i++){
            doc.setFontSize(7)
            doc.addImage(sw,'PNG',x,y,170,7)
            doc.text(objfilter.idRedJalisco+"-SW"+i,xsitio,ytext) //idSitio
            doc.text(objSW[i].numSerieMA,xserie,ytext) //No Serie
            doc.text("MR-MS120-8LP",xmodelo,ytext) //Modelo
            y = y+7
            ytext = ytext+7
        }
       
    }
    function ap(){
        const ap = '../Images/APj.png'
        let x = 10
        let y = 180
        let ytext = 185 
        let xsitio = 12
        let xserie = 70
        
       

        for(i=1;i<Object.keys(objAP).length;i++){
          if(ytext >= 260){
            doc.addPage()
            contpages= contpages+1
            doc.addImage(plantillavacia,'PNG',0,0,width,height)
            doc.text(""+contpages+"",width/2,279) //PAGES
            y= 50
            ytext =55
          }else{
            doc.setFontSize(7)
            
            doc.addImage(ap,'PNG',x,y,170,7)
            doc.text(objfilter.idRedJalisco+"-AP"+i,xsitio,ytext) //idSitio
            doc.text(objAP[i].numSerieMA,xserie,ytext) //No Serie
            
            y = y+7
            ytext = ytext+7
          }
        }
        doc.text(""+contpages+"",width/2,279) //PAGES
        contpages = contpages+1
    }
        
    } catch (error) {
        console.log(error)
    }
 }

 $('#btnClick').click(function (){
  if($('#inputSitio').val()== ''){
    M.toast({html: 'Favor de completar todos los campos', classes: 'rounded', classes:'red'});
  }else{
    let objectositio
    

   objectollenar.find(object =>{
      if(object.idRedJalisco == $('#inputSitio').val()){
        objectositio=object
        nuevatabla(objectositio)

      }   
    })
    if(objectositio == undefined ){
      M.toast({html: 'Sitio no encontrado', classes: 'rounded', classes:'red'});
    }

    
  }
 })


function nuevatabla(objectositio){
  $("#tabla-inicio tbody").remove(); 
  let tablaUsuario = document.querySelector('#tabla-inicio');
  let conteo= 1
  let tr = "<tbody> <tr class='other-row'> <td>1</td>" + 
  "<td>"+objectositio.idRedJalisco+"</td>"+
  "<td><div class='imagesquare' id='image_drop_area1'></div></td>"+
  "<td ><div id='btnreportes1'><a  onclick=PDFrevisado("+"'"+objectositio.idRedJalisco+"'"+") ><img src='images/pdf.png' width='35px' height='35px'></a></div></td></tr></body>"
  //"<img alt='' id='codigo"+conteo+"'>"

  tablaUsuario.innerHTML +=  tr;
  conteo= conteo+1
  Image(conteo)
  $('#Todos').prop('checked',false)
  
}

$('#Todos').click(function(){
 
  if(!$('#inputSitio').val()== ''){
    $('#inputSitio').val('')
    $("#tabla-inicio tbody").remove(); 
    llenartabla()
  
  }
})
 
function series() {
  try{
  fetch('http://app.grupohemac.com.mx:3002/SeriesEquipos')
  .then((response) => response.json())
  .then((tabla)=>{

    objectoSeries=tabla
  })
}catch(e){
  console.log(e)
}
}

