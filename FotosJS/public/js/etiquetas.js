




function llenartabla() {
    try{
    fetch('http://localhost:3002/tablaEtiquetas')
    .then((response) => response.json())
    .then((tabla)=>{
      //console.log(usuarios)
      let conteo= 1
      let tablaUsuario = document.querySelector('#tabla-inicio tbody');
      let arra=[]
      let sitio=[]
      let contadorarray = 0



      //console.log(idAlarma_inf);
      for (const tablafotos of tabla) {
      
        let tr = " <tr class='other-row'> <td>"+conteo+"</td>" + 
        "<td>"+tablafotos.idRedJalisco+"</td>"+
        "<td ><div id='btnreportes"+conteo+"'><a  onclick='PDFrevisado(btnreportes"+conteo+")' ><img src='images/pdf.png' width='35px' height='35px'></a></div></td></tr>"+
        "<input hidden type='text' value='"+ tablafotos.idRedJalisco+"'>"
        //"<img alt='' id='codigo"+conteo+"'>"
    
       
       sitio[contadorarray]=tablafotos.idRedJalisco
       arra[contadorarray]=""+tablafotos.idRedJalisco+"-SW1"
       contadorarray = contadorarray +1
       for(i=1;i<=tablafotos.AP;i++){
        arra[contadorarray]=""+tablafotos.idRedJalisco+"-AP"+i+""
        sitio[contadorarray]=tablafotos.idRedJalisco
        contadorarray = contadorarray +1
       }
       

        tablaUsuario.innerHTML +=  tr;

        conteo = conteo + 1;
       
      
      }
     PDFrevisado(arra,sitio)
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
            console.log(arra)
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
        console.log(a,e)
        }
        
    }catch(e){
        console.log(e)
    }   
    }

    } catch (error) {
        
    }
 }

 


 

 function QR(url){
    console.log(url)
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
 
QR()
llenartabla()
