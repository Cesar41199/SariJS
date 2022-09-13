$("#image1").change(function(){
   var x = document.getElementById('image1')
   if('files' in x ){
    console.log(x.files)
    if(x.files.length == 2){
        console.log(2)
        $('#check1').show()
    }else{
        $('#check1').hide()
    }
   }
    
        
    
});
