$('#SEJ').click(function(){
  if( $('#SEJ').prop('checked') ) {
    $('#SSJ').prop('checked',false)
}else{
  $('#SSJ').prop('checked',true)
}
})
$('#SSJ').click(function(){
  if( $('#SSJ').prop('checked') ) {
    $('#SEJ').prop('checked',false)
}else{
  $('#SEJ').prop('checked',true)
}
}) 


let objectollenar

function table(date){
try {
  let tablaUsuario = document.querySelector('#tabla-inicio tbody');
  let tablafotos=[{}]
  let conteo=1
  let sitio=[]
  let arra=[]
  let contadorarray=0
  objectollenar.find(object =>{
    if(object.Fecha.substring(0,10) == date){
      tablafotos.push(object)
    }
  })
  console.log(tablafotos)
  for(i=1;i<Object.keys(tablafotos).length;i++){
    let tr = " <tr class='other-row'> <td>"+conteo+"</td>" + 
    "<td>"+tablafotos[i].idRedJalisco+"</td>"+    
    "<input hidden type='text' value='"+ tablafotos[i].idRedJalisco+"'>"
    //"<img alt='' id='codigo"+conteo+"'>"

   
   
   for(a=1;a<=tablafotos[i].SW;a++){
    arra[contadorarray]=""+tablafotos[i].idRedJalisco+"-SW"+a+""
    sitio[contadorarray]=tablafotos[i].idRedJalisco
    contadorarray = contadorarray +1
   }
   
   for(a=1;a<=tablafotos[i].AP;a++){
    arra[contadorarray]=""+tablafotos[i].idRedJalisco+"-AP"+a+""
    sitio[contadorarray]=tablafotos[i].idRedJalisco
    contadorarray = contadorarray +1
   }
   

    tablaUsuario.innerHTML +=  tr;

    conteo = conteo + 1;
   
  }
  console.log(Object.keys(tablafotos).length)
  if(Object.keys(tablafotos).length== 1){
      
    M.toast({html: 'No hay asignaciones', classes: 'rounded', classes:'red'});
  }else{
    if( $('#SEJ').prop('checked') ) {
      PDFSEJ(arra,sitio)
  }else{
    PDFrevisado(arra,sitio)
  }

  }
} catch (error) {
  console.log(error)
}
}
function llenartabla() {
    try{
    fetch('http://app.grupohemac.com.mx:3002/tablaEtiquetas')
    .then((response) => response.json())
    .then((tabla)=>{
      objectollenar=tabla
      //console.log(usuarios)
    
    })
  }catch(e){
    console.log(e)
  }
  }



 function PDFrevisado(arra,sitio){
    
    try {

    
    
    
    var plantilla='../Images/qr1.jpeg'

    var doc = new jsPDF();
    doc.setFont('helvetica')
    doc.setFontSize(8)
    cuerpo(arra,sitio)
   

   
    
    
    
    
    doc.save("QRSITIOS .pdf");
        
    function cuerpo(arra,sitio){
        
        try{
           
        for(i=0,a=0,e=0;a<=arra.length;i++){
       
        doc.addImage(plantilla,4,0,87,90) 
       
        
        doc.setTextColor(255,255,255)
        $imagen=QR(sitio[a])
        doc.text(17,7,arra[e])
        doc.addImage($imagen,14,49,22,22) 
        
        $imagen=QR(sitio[a])
        doc.text(60,7,arra[e])
        doc.addImage($imagen,57,49,22,22)
        e++
        doc.setTextColor(0,0,0)
        doc.text(17,40,sitio[a])
        
        doc.text(60,40,sitio[a])  
        a++
        
        
    
        doc.addImage(plantilla,110,0,87,90) 
       
       
        doc.setTextColor(255,255,255)
        $imagen=QR(sitio[a])
        doc.text(123,7,arra[e])
        doc.addImage($imagen,120,49,22,22) 
        
        $imagen=QR(sitio[a])
        doc.text(166,7,arra[e])
        doc.addImage($imagen,163,49,22,22)
        e++
        doc.setTextColor(0,0,0)
        doc.text(123,40,sitio[a])
        
        doc.text(166,40,sitio[a]) 
        a++ 
        
        ////////////////////////////////////
    
        doc.addImage(plantilla,4,100,87,90) 
      
        
        doc.setTextColor(255,255,255)
        $imagen=QR(sitio[a])
        doc.text(17,107,arra[e])
        doc.addImage($imagen,14,149,22,22) 
        
        $imagen=QR(sitio[a])
        doc.text(60,107,arra[e])
        doc.addImage($imagen,57,149,22,22)
        e++
        doc.setTextColor(0,0,0)
        doc.text(17,140,sitio[a])
        
        doc.text(60,140,sitio[a]) 
        a++
        
         
    
        doc.addImage(plantilla,110,100,87,90) 
         
        
        doc.setTextColor(255,255,255)
        $imagen=QR(sitio[a])
        doc.text(123,107,arra[e])
        doc.addImage($imagen,120,149,22,22)
        
        $imagen=QR(sitio[a])
        doc.text(166,107,arra[e])
        doc.addImage($imagen,163,149,22,22)
        e++
        doc.setTextColor(0,0,0)
        doc.text(123,140,sitio[a])
        
        doc.text(166,140,sitio[a])
        a++  
        
        //////////////////////////////////////////
        doc.addImage(plantilla,4,200,87,90) 
       
        doc.setTextColor(255,255,255)
        $imagen=QR(sitio[a])
        doc.text(17,207,arra[e])
        doc.addImage($imagen,14,249,22,22)
        
        $imagen=QR(sitio[a])
        doc.text(60,207,arra[e])
        doc.addImage($imagen,57,249,22,22)
        e++
        doc.setTextColor(0,0,0)
        doc.text(17,240,sitio[a])
        
        doc.text(60,240,sitio[a])
        a++ 
        
         
    
        doc.addImage(plantilla,110,200,87,90) 
       
        
        doc.setTextColor(255,255,255)
        $imagen=QR(sitio[a])
        doc.text(123,207,arra[e])
        doc.addImage($imagen,120,249,22,22) 
        
        $imagen=QR(sitio[a])
        doc.text(166,207,arra[e])
        doc.addImage($imagen,163,249,22,22)
        e++
        doc.setTextColor(0,0,0)
        doc.text(123,240,sitio[a])
        
        doc.text(166,240,sitio[a])
        a++
        doc.addPage()
       
        }
        
    }catch(e){
        console.log(e)
    }   
    }
    window.stop()
    } catch (error) {
        
    }
 }

 


 

 function QR(url){
    
    let $imagen = document.querySelector("#codigo1")
    new QRious({
        element: $imagen,
        value: "https://inmuebles.ssj.gob.mx/#/dXNyCg/c3VwZXJ2Cg/"+url+"", // La URL o el texto
        size: 90,
        backgroundAlpha: 0, // 0 para fondo transparente
        foreground: "#000000", // Color del QR
        level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
       });
    return $imagen
 }
 
 $(document).ready(function(){
  llenartabla()
  $('#datepicker').datepicker({
    format: 'yyyy-mm-dd',
    onClose:function(){
      // var instance = M.Datepicker.getInstance($('#datepicker'));
      var date = $('#datepicker').val()    
     
     table(date)     
      
    }

  });
 
});


function PDFSEJ(arra,sitio){
    
  try {

  
  
  
  var plantilla='../Images/qr2.jpeg'

  var doc = new jsPDF();
  doc.setFont('helvetica')
  doc.setFontSize(8)
  cuerpo(arra,sitio)
 

 
  
  
  
  
  doc.save("QRSEJ .pdf");
      
  function cuerpo(arra,sitio){
      
      try{
         
      for(i=0,a=0,e=0;a<=arra.length;i++){
     
      doc.addImage(plantilla,4,0,87,90) 
     
      
      doc.setTextColor(255,255,255)
    
      doc.text(17,7,arra[e])
      
      
      
      doc.text(60,7,arra[e])
      
      e++
      doc.setTextColor(0,0,0)
      doc.text(17,40,sitio[a])
      
      doc.text(60,40,sitio[a])  
      a++
      
      
  
      doc.addImage(plantilla,110,0,87,90) 
     
     
      doc.setTextColor(255,255,255)
      
      doc.text(123,7,arra[e])
      
      doc.text(166,7,arra[e])
     
      e++
      doc.setTextColor(0,0,0)
      doc.text(123,40,sitio[a])
      
      doc.text(166,40,sitio[a]) 
      a++ 
      
      ////////////////////////////////////
  
      doc.addImage(plantilla,4,100,87,90) 
    
      
      doc.setTextColor(255,255,255)
     
      doc.text(17,107,arra[e])
      
      
      
      doc.text(60,107,arra[e])
      
      e++
      doc.setTextColor(0,0,0)
      doc.text(17,140,sitio[a])
      
      doc.text(60,140,sitio[a]) 
      a++
      
       
  
      doc.addImage(plantilla,110,100,87,90) 
       
      
      doc.setTextColor(255,255,255)
      
      doc.text(123,107,arra[e])
      
      doc.text(166,107,arra[e])
     
      e++
      doc.setTextColor(0,0,0)
      doc.text(123,140,sitio[a])
      
      doc.text(166,140,sitio[a])
      a++  
      
      //////////////////////////////////////////
      doc.addImage(plantilla,4,200,87,90) 
     
      doc.setTextColor(255,255,255)
     
      doc.text(17,207,arra[e])
      
      doc.text(60,207,arra[e])
      
      e++
      doc.setTextColor(0,0,0)
      doc.text(17,240,sitio[a])
      
      doc.text(60,240,sitio[a])
      a++ 
      
       
  
      doc.addImage(plantilla,110,200,87,90) 
     
      
      doc.setTextColor(255,255,255)
      
      doc.text(123,207,arra[e])
      
      
     
      doc.text(166,207,arra[e])
     
      e++
      doc.setTextColor(0,0,0)
      doc.text(123,240,sitio[a])
      
      doc.text(166,240,sitio[a])
      a++
      doc.addPage()
     
      }
      
  }catch(e){
      console.log(e)
  }   
  }
  window.stop()
  } catch (error) {
      
  }
}

