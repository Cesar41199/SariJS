let bool1=false
let bool2=false
let bool3=false
let bool4=false
let bool5=false
let bool6=false
let bool7=false
let bool8=false
let bool9=false
let bool10=false
$('#btnGuardar').hide()

function idRed() {
    try{
    fetch('http://localhost:3002/idRed')
    .then((response) => response.json())
    .then((idRed)=>{
      //console.log(usuarios)
      
      let idRedJalisco = document.getElementById('idRedJalisco');
      let idsitio = document.getElementById('idsitio');    
      //console.log(idAlarma_inf);     
        $(idRedJalisco).text(idRed.idRedJalisco) 
        $(idsitio).val(idRed.idRedJalisco) 
    })
  }catch(e){
    console.log(e)
  }
  }



$("#image1").change(function(){
    
   var x = document.getElementById('image1')
   if('files' in x ){
  
    if(x.files.length == 6){
      
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
     
     if(x.files.length == 1){
         
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
     
     if(x.files.length == 5){
         
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
    
     if(x.files.length == 3){
        
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
     
     if(x.files.length == 4){
         
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
    
     if(x.files.length == 5){
        
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
     
     if(x.files.length == 2){
         
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
     
     if(x.files.length == 2){
         
         $('#check8').show()
         bool8=true
     }else{
         $('#check8').hide()
         bool8=false
     }
    }  
 });
 $("#image9").change(function(){
    var x = document.getElementById('image9')
    if('files' in x ){
     
     if(x.files.length == 1){
         
         $('#check9').show()
         bool9=true
     }else{
         $('#check9').hide()
         bool9=false
     }
    }  
 });
 $("#image10").change(function(){
    var x = document.getElementById('image10')
    if('files' in x ){
     
     if(x.files.length == 1){
         
         $('#check10').show()
         bool10=true
     }else{
         $('#check10').hide()
         bool10=false
     }
    }  
 });
 

function validar(){
    if(bool1==true && bool2==true && bool3==true && bool4==true && bool5==true && bool5==true && bool6==true && bool7==true && bool8==true && bool9==true && bool10==true ){
        console.log('Todo correcto')
        $('#btnGuardar').click()
    }else{
        console.log('Algo falta')
        
    }
}
 idRed()

