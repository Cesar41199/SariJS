const queries = {
    getAllProduct: "SELECT * FROM usuarios",
    createProduct: 'INSERT INTO usuarios (idUsuario,Usuario,Password) VALUES (@id,@name,@password)',
    getPassword: 'SELECT Password FROM usuarios Where Usuario = @username',
    deleteProduct: 'DELETE FROM usuarios WHERE idUsuario = @Id',
    UploadImage: 'INSERT INTO Images (IdEvento,cam,image1) VALUES (@IdEvento,@cam,@image1)',
    ShowImage:'SELECT image1 FROM Images Where IdEvento = @IdEvento',
    
    getInformacion_Reporte: 'select idAlarma,(select nombreSitio from sitio s where T0.idsitio=s.idsitio) as sitio, tipoEvento,estatus,fecha,tiempo from eventoMacro T0',

    query_modificarEvento: "update EstadosFotos set estatusCreacion=@estatus WHERE idSitio_id=@id",
    
    
    query_graficaUno: "select count(idSitio) as 'Cantidad',(select nombreSitio from sitio s where s.idSitio=even.idsitio) as 'Sitio' from eventoMacro even group by idSitio",

    verEvento: "select * FROM EstadosFotos WHERE idSitio_id=@id",
    getTableproveedores: 'select TOP 50 idRedJalisco,fecha,core_estatus_sitio.nombreEstatus from core_sitios_abonados inner join core_estatus_sitio on core_sitios_abonados.idEstatus_sitio_id = core_estatus_sitio.idEstatus_sitio  where core_sitios_abonados.proveedor = @proveedor ',    
}
exports.queries = queries