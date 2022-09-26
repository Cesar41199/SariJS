function Usuario() {
    try{
    fetch('http://localhost:3002/usuario')
    .then((response) => response.json())
    .then((Usuario)=>{
      //console.log(usuarios)
      let it = ''
      for ( it of Usuario) 
      M.toast({html:it.us, classes: 'rounded', classes:it.color});
      
      
    })
  }catch(e){
    console.log(e)
  }
  }

Usuario()

$('#check').click(function(){
    if($('#username').val()== '' || $('#password').val()== '' ){
        M.toast({html: 'Favor de completar todos los campos!', classes: 'rounded', classes:'red'});
        
    }else{
        $('#login').click()
    }
        
    
})

