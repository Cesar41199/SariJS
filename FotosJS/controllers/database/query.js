const queries = {
    getAllProduct: "SELECT * FROM usuarios",
    
   
    deleteProduct: 'DELETE FROM usuarios WHERE idUsuario = @Id',
    
    ShowImage:'SELECT image1 FROM Images Where IdEvento = @IdEvento',
    
    getInformacion_Reporte: 'select idAlarma,(select nombreSitio from sitio s where T0.idsitio=s.idsitio) as sitio, tipoEvento,estatus,fecha,tiempo from eventoMacro T0',


    
    
    query_graficaUno: "select count(idSitio) as 'Cantidad',(select nombreSitio from sitio s where s.idSitio=even.idsitio) as 'Sitio' from eventoMacro even group by idSitio",

    // Querys usadas
    infoUser:"SELECT nombre,apellidos,correo,empresa,tipo FROM core_sariusarios Where usuario = @username",
    createUser: 'INSERT INTO core_sariusarios (nombre,apellidos,usuario,contraseña,correo,empresa,tipo) VALUES (@nombre,@apellidos,@username,@password,@correo,@empresa,@tipo)',
    getPassword: 'SELECT contraseña FROM core_sariusarios Where usuario = @username',
    select_idEstatus:"select idSARIestatus from core_sariestatus where idRedJalisco_id = @idRedJalisco",
    query_modificarEvento: "update core_sariestatus set estatusSave=@estatus , estatusInfo=@info WHERE idRedJalisco_id=@id",
    UploadImage: 'INSERT INTO core_sarifotos (base64,estatus,nombre,idSARIestatus_id,numEquipo) VALUES (@imagen,@estatus,@nombre,@idSitio,@numEquipo)',
    verEvento: "select * FROM EstadosFotos WHERE idSitio_id=@id",
    getTableproveedores: 'select core_sitios_abonados.idRedJalisco,fechaAmpliacion,core_estatus_sitio.nombreEstatus,core_sariestatus.estatusInfo from core_sitios_abonados inner join core_estatus_sitio on core_sitios_abonados.idEstatus_sitio_id = core_estatus_sitio.idEstatus_sitio inner join core_sariestatus on core_sitios_abonados.idRedJalisco=core_sariestatus.idRedJalisco_id  where core_sitios_abonados.proveedorAmpliacion = @proveedor ', 
    getTableEtiquetas: "select * from core_sarisitios where Fecha = '2022-09-20'",   
    getEstatusFotos:'select estatusSave from core_sariestatus where idRedJalisco_id = @id', 
    getAPSW:'select AP,SW from core_sarisitios where idRedJalisco = @idRedJalisco', 
    getTableproveedores: 'select TOP 50 idRedJalisco,fecha,core_estatus_sitio.nombreEstatus from core_sitios_abonados inner join core_estatus_sitio on core_sitios_abonados.idEstatus_sitio_id = core_estatus_sitio.idEstatus_sitio  where core_sitios_abonados.proveedor = @proveedor ',    
    

    //Querys Supervisor
    datosfotosAdminRevisar: "select idSARIestatus_id,idSARIfotos,base64,estatus,nombre, T1.idRedJalisco from core_sarifotos T0 inner join core_sariestatus T1 on T0.idSARIestatus_id=T1.idSARIestatus where idSARIestatus_id=@idSARIestatus order by estatus,nombre",
    borrarfotoAdminRevisar: "delete from core_sarifotos where idSARIfotos=@id",
    getDatos_sitiosSupervisor:"select idSARIestatus,estatusInfo,estatusSave,idRedJalisco,( CONCAT(T1.nombre,' ',T1.apellidos)) as 'nombre' from core_sariestatus T0 inner join core_sariusarios T1 on T0.usuario=T1.idSARIusuarios  where estatusInfo='Borrador' and estatusSave='Despues'",
    enviarProtocoloAnalisis:"update core_sariestatus set estatusInfo='Enviado' where idSARIestatus=@idSARIestatus",
    getDatos_sitiosAnalisis:"select idSARIestatus,estatusInfo,estatusSave,idRedJalisco,( CONCAT(T1.nombre,' ',T1.apellidos)) as 'nombre' from core_sariestatus T0 inner join core_sariusarios T1 on T0.usuario=T1.idSARIusuarios  where estatusInfo='Enviado' and estatusSave='Despues'",

}
exports.queries = queries