

let bool1=false
let bool2=false
let bool3=false
let bool4=false
let bool5=false
let bool6=false
let bool7=false
let bool8=false

$('#btnGuardar').hide()
$('#btnGuardar2').hide()
$('#AP').hide()

function idRed() {
    try{
    fetch('http://localhost:3002/idRed')
    .then((response) => response.json())
    .then((idRed)=>{
      //console.log(usuarios)
      
      let idRedJalisco = document.getElementById('idRedJalisco');
      let idsitio = document.getElementById('idsitio');    
      let idRedJaliscoAP = document.getElementById('idRedJaliscoAP');
      let idsitioAP = document.getElementById('idsitioAP');    
      //console.log(idAlarma_inf);     
        $(idRedJalisco).text(idRed.idRedJalisco_id) 
        $(idsitio).val(idRed.idRedJalisco_id) 
        $(idRedJaliscoAP).text(idRed.idRedJalisco_id) 
        $(idsitioAP).val(idRed.idRedJalisco_id) 
    })
  }catch(e){
    console.log(e)
  }
  }

  function numEquipo() {
    try{
    fetch('http://localhost:3002/numEquipos')
    .then((response) => response.json())
    .then((numEquipo)=>{
        let xAp = document.querySelector('#divfoto1')
        let Ap = document.getElementById('AP')
      //console.log(usuarios)
      let obj
      for ( obj of numEquipo){
        
      }
      if(obj!=1){
        Ap.value = obj.AP
        let a=1
        for(i=2;i<=obj.AP;i++){
            
            let lbl = 
            "<div class='col s4 offset-s1 input-field'>"+
                    
           " <input disabled value='Vista Gral. de Área de AP"+i+"'  type='text' class='validate white-text'>"+
           " <input hidden value='Vista Gral. de Área de AP' name='ainput"+a+"' type='text' >"+
            
        "</div>"+
    
    
        "<div class='col s3'>"+
       "<p class='white-text'>(2 Imágenes) Área donde se instalará el AP, diferentes ángulos, debe ser visible de tal modo que se pueda identificar la zona dentro del inmueble donde se va a instalar el equipo.</p>"+
        "</div>"+
        "<div class='col s4'>"+                
            "<div class='col s12'>"+  
                
                    "<div class='file-field input-field'>"+
                        "<div class='file-path-wrapper'>"+
                            "<div class='btn black-text white'>"+
                                "<span>Imagen</span>"+
                                "<input name='aimagen"+a+"' id='aimage"+a+"' class='file-path validate' type='file' accept='image/*' multiple>"+
                            "</div>"+
                            "<img hidden src='./Images/check2.png' id='acheck"+a+"' alt='' width='35px' height='35px' style='padding-left:5px ;'> "+                                 
                    "</div>"+                          
                    "</div>"+
               
            "</div>"+                
            "</div>"
            a++
        let seg= 
            "<div class=' col s4 offset-s1 input-field'>"+
            "<input disabled value='Access Points"+i+"' id=''  type='text' class='validate white-text'>"+
            "<input hidden value='Access Points' id='' name='ainput"+a+"' type='text' >"+
        "</div>"+
        "<div class='col s3'>"+
            "<p class='white-text'>(3 Imágenes) Equipo Access Point, para validar las condiciones físicas antes de la instalación, dos ángulos distintos donde se muestre el frente y la parte posterior del equipo, finalmente una imagen mas del puerto RJ-45 a utilizar.</p>"+
            "</div>"+
            "<div class='col s4'>"+                
                "<div class='col s12'>"+  
                    
                        "<div class='file-field input-field'>"+
                            "<div class='file-path-wrapper'>"+
                                "<div class='btn black-text white'>"+
                                    "<span>Imagen</span>"+
                                    "<input name='aimagen"+a+"' id='aimage"+a+"' class='file-path validate' type='file' accept='image/*' multiple>"+
                                "</div>"+     
                                "<img hidden src='./Images/check2.png' id='acheck"+a+"' alt='' width='35px' height='35px' style='padding-left:5px ;'>"+                             
                        "</div>"+                          
                        "</div>"+
                   
                "</div>"+                
            "</div>"
            a++
            xAp.innerHTML += lbl+ seg
            
        }
      }
      

    })

    
    
  }catch(e){
    console.log(e)
  }
  }

numEquipo()

// setTimeout(()=>{
//     if($("#AP").val()>= 2){
//         ap=$("#AP").val()
         
//          for(i=2,cont = 1;i<=ap;i++,cont++){
//            console.log(cont)
            
//             $("#aimage"+cont+"").on('change',function(){
//                 console.log(cont)
//                 $("#aimage"+cont+"").change(function(){
//                     console.log('Cambio')
//                 var x = document.getElementById('aimage'+cont+'')
               
//                 if('files' in x ){
                    
//                  if(x.files.length == 2){
                  
//                      $('#acheck'+cont+'').show()
                     
//                  }else{
//                      $('#acheck'+cont+'').hide()
                     
//                  }
//                 }  
//                 });
//              });

            
//          }
//     }
// },500)

setTimeout(()=>{
    try {
        $("#aimage1").change(function(){
            var x = document.getElementById('aimage1')
            if('files' in x ){
           
             if(x.files.length == 2){
               
                 $('#acheck1').show()
                 bool1=true
             }else{
                 $('#acheck1').hide()
                 bool1=false
             }
            }  
         });
         $("#aimage2").change(function(){
            var x = document.getElementById('aimage2')
            if('files' in x ){
           
             if(x.files.length == 3){
               
                 $('#acheck2').show()
                 bool1=true
             }else{
                 $('#acheck2').hide()
                 bool1=false
             }
            }  
         });
         $("#aimage3").change(function(){
            var x = document.getElementById('aimage3')
            if('files' in x ){
           
             if(x.files.length == 2){
               
                 $('#acheck3').show()
                 
             }else{
                 $('#acheck3').hide()
                 
             }
            }  
         });
         $("#aimage4").change(function(){
            var x = document.getElementById('aimage4')
            if('files' in x ){
           
             if(x.files.length == 3){
               
                 $('#acheck4').show()
                 
             }else{
                 $('#acheck4').hide()
                
             }
            }  
         });
         
    } catch (error) {
        console.log(error)
    }
},1000)

$("#image1").change(function(){
   var x = document.getElementById('image1')
   if('files' in x ){
  
    if(x.files.length == 2){
      
        $('#check1').show()
        bool1=true
    }else{
        $('#check1').hide()
        bool1=false
    }
   }  
});
$("#image2").change(function(){
    var x = document.getElementById('image2')
    if('files' in x ){
     
     if(x.files.length == 2){
         
         $('#check2').show()
         bool2=true
     }else{
         $('#check2').hide()
         bool2=false
     }
    }  
 });
 $("#image3").change(function(){
    var x = document.getElementById('image3')
    if('files' in x ){
     
     if(x.files.length == 4){
         
         $('#check3').show()
         bool3=true
     }else{
         $('#check3').hide()
         bool3=false
     }
    }  
 });
 $("#image4").change(function(){
    var x = document.getElementById('image4')
    if('files' in x ){
    
     if(x.files.length == 2){
        
         $('#check4').show()
         bool4=true
     }else{
         $('#check4').hide()
         bool4=false
     }
    }  
 });
 $("#image5").change(function(){
    var x = document.getElementById('image5')
    if('files' in x ){
     
     if(x.files.length == 2){
         
         $('#check5').show()
         bool5=true
     }else{
         $('#check5').hide()
         bool5=false
     }
    }  
 });
 $("#image6").change(function(){
    var x = document.getElementById('image6')
    if('files' in x ){
    
     if(x.files.length == 3){
        
         $('#check6').show()
         bool6=true
     }else{
         $('#check6').hide()
         bool6=false
     }
    }  
 });
 $("#image7").change(function(){
    var x = document.getElementById('image7')
    if('files' in x ){
     
     if(x.files.length == 3){
         
         $('#check7').show()
         bool7=true
     }else{
         $('#check7').hide()
         bool7=false
     }
    }  
 });
 $("#image8").change(function(){
    var x = document.getElementById('image8')
    if('files' in x ){
     
     if(x.files.length == 3){
         
         $('#check8').show()
         bool8=true
     }else{
         $('#check8').hide()
         bool8=false
     }
    }  
 });

function validar(){
    
    if(bool1==true && bool2==true && bool3==true && bool4==true && bool5==true && bool5==true && bool6==true && bool7==true && bool8==true){
        console.log('Todo correcto')
        $('#btnGuardar').click()
        setTimeout(()=>{
            $('#btnGuardar2').click()
        },200)
       
    }else{
        console.log('Algo falta')
        
    }
}
 idRed()

