
function llenarDatosImagenes(){
    try {
        fetch('http://localhost:3002/informacionDatosSitioSupervisor')
        .then((response)=> response.json())
        .then((tablaInf)=>{

            ///////////////////////////////// ANTES //////////////////////////////////////////////////////
        let collapserFachadaSitio = document.querySelector('#collapser_fachasadaSitio');
        let collapser_AntesVistaGralAreaSwitch = document.querySelector('#collapser_AntesVistaGralAreaSwitch');
        let collapser_AntesVistaGralAcercamientoEquip = document.querySelector('#collapser_AntesVistaGralAcercamientoEquip');
        let collapser_AntesVistaGralAreaAP = document.querySelector('#collapser_AntesVistaGralAreaAP');
        let collapser_AntesSwitch = document.querySelector('#collapser_AntesSwitch');
        let collapser_AntesAccessPoint = document.querySelector('#collapser_AntesAccessPoint');
        let collapser_AntesElemPasi = document.querySelector('#collapser_AntesElemPasi');
        let collapser_AntesEtiquetaSeriesSwitch = document.querySelector('#collapser_AntesEtiquetaSeriesSwitch');

            ///////////////////////////////// DURANTE //////////////////////////////////////////////////////
        let collapser_DuranteActInstaladas = document.querySelector('#collapser_DuranteActInstaladas');
        let collapser_DuranteVistaGralAreaSwitch = document.querySelector('#collapser_DuranteVistaGralAreaSwitch');
        let collapser_DuranteAcercaSwitch = document.querySelector('#collapser_DuranteAcercaSwitch');
        let collapser_DuranteVistaGralAcercaEquipExis = document.querySelector('#collapser_DuranteVistaGralAcercaEquipExis');
        let collapser_DuranteVistaGralAreaAP = document.querySelector('#collapser_DuranteVistaGralAreaAP');
        let collapser_DuranteAcercamientoAPS = document.querySelector('#collapser_DuranteAcercamientoAPS');
        let collapser_DuranteVistaGralEquipPasivo = document.querySelector('#collapser_DuranteVistaGralEquipPasivo');
        let collapser_DuranteAcercaEquipPasivo = document.querySelector('#collapser_DuranteAcercaEquipPasivo');
        let collapser_DuranteEtiSwitchApPasivo = document.querySelector('#collapser_DuranteEtiSwitchApPasivo');
        
        
            ///////////////////////////////// DESPUES //////////////////////////////////////////////////////
        let collapser_DespuesAcercaConecRJ45 = document.querySelector('#collapser_DespuesAcercaConecRJ45');
        let collapser_DespuesPruebaContUTP = document.querySelector('#collapser_DespuesPruebaContUTP');
        let collapser_DespuesRutasCableExt = document.querySelector('#collapser_DespuesRutasCableExt');
        let collapser_DespuesAcoAerea = document.querySelector('#collapser_DespuesAcoAerea');
        let collapser_DespuesPasesMuroLoza = document.querySelector('#collapser_DespuesPasesMuroLoza');
        let collapser_DespuesImper = document.querySelector('#collapser_DespuesImper');
        let idSARIestatus = document.querySelector('input[name="idSARIestatus"]');
        let tituloSitio = document.getElementById('tituloSitio');

        
                      

        let primerParteImagen = '<form action="borrarFotoAdmin" method="post" style="min-width: 186px; max-width: 386px;padding: 2px;">'+
        '<img class="estiloImagenVerAdmin" src="data:image/png;base64,';
        let segundaParteImagen = '" alt=""> '+
            'Foto <label class="letraNumeroEquipo">';
        let parte_conteo ='</label> '+
            '<input type="hidden" name="idImagenEliAdmin" value="';
        let tercerParte ='"><button type="submit"><span class="material-icons" style="color: red;">delete</span></button>'+
            '</form>';

        let conteoAntes=0;
        let conteo2Durante=0;
        let conteo3Despues=0;

            for (const tablafotosAdmin of tablaInf){
                idSARIestatus.value=tablafotosAdmin.idSARIestatus_id;
                tituloSitio.textContent= "Sitio  " + tablafotosAdmin.idRedJalisco;
                console.log(idSARIestatus)
                if  (tablafotosAdmin.estatus == 'Antes'){
                    conteoAntes=conteoAntes+1;
                    if  (tablafotosAdmin.nombre == 'Fachada de Sitio'){
                        /*collapserFachadaSitio.innerHTML += `<img style="min-width: 186px; max-width: 386px;padding: 2px;" src="data:image/png;base64,${tablafotosAdmin.base64}" alt="">`*/
                        collapserFachadaSitio.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
    
                    if  (tablafotosAdmin.nombre == 'Vista Gral. de Área de Switch'){
                        collapser_AntesVistaGralAreaSwitch.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    } 
    
                    if  (tablafotosAdmin.nombre == 'Vista Gral. y Acercamiento de Equipo Existente'){
                        collapser_AntesVistaGralAcercamientoEquip.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }   
    
                    if  (tablafotosAdmin.nombre == 'Vistas Gral. de Área de AP'){
                        collapser_AntesVistaGralAreaAP.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    } 
    
                    if  (tablafotosAdmin.nombre == 'Switch'){
                        collapser_AntesSwitch.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    } 
    
                    if  (tablafotosAdmin.nombre == 'Access Points'){
                        collapser_AntesAccessPoint.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    } 
    
                    if  (tablafotosAdmin.nombre == 'Elementos Pasivos'){
                        collapser_AntesElemPasi.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    } 
    
                    if  (tablafotosAdmin.nombre == 'Etiqueta Series Switch/AP/Pasivo'){
                        collapser_AntesEtiquetaSeriesSwitch.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }

                } /* //////////////////////////////////// *** FIN del ANTES *** ////////////////////////////////////////////// */ 

                if (tablafotosAdmin.estatus == 'Durante'){
                    conteo2Durante=conteo2Durante+1;
                    if (tablafotosAdmin.nombre == 'Actividades de Instalación'){
                        collapser_DuranteActInstaladas.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Vista Gral. Área de Switch'){
                        collapser_DuranteVistaGralAreaSwitch.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Acercamiento a Switch'){
                        collapser_DuranteAcercaSwitch.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Vista Gral.  y Acercamiento de Equipo Existente'){
                        collapser_DuranteVistaGralAcercaEquipExis.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Vista Gral. Área de AP'){
                        collapser_DuranteVistaGralAreaAP.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Acercamiento APs'){
                        collapser_DuranteAcercamientoAPS.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Vista Gral. área de Equipo Pasivo'){
                        collapser_DuranteVistaGralEquipPasivo.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Acercamiento a Equipo Pasivo'){
                        collapser_DuranteAcercaEquipPasivo.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Etiquetado Switch/Ap/Pasivo'){
                        collapser_DuranteEtiSwitchApPasivo.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                } /* //////////////////////////////////// *** FIN del DURANTE *** ////////////////////////////////////////////// */

                if (tablafotosAdmin.estatus == 'Despues'){
                    conteo3Despues=conteo3Despues+1;
                    if (tablafotosAdmin.nombre == 'Acercamiento conectores RJ45'){
                        collapser_DespuesAcercaConecRJ45.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Prueba de continuidad UTP'){
                        collapser_DespuesPruebaContUTP.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Rutas de Cableado Ext/Int'){
                        collapser_DespuesRutasCableExt.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Acometida aérea'){
                        collapser_DespuesAcoAerea.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Pases de Muro/Loza'){
                        collapser_DespuesPasesMuroLoza.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                    if (tablafotosAdmin.nombre == 'Impermeabilización'){
                        collapser_DespuesImper.innerHTML += `${primerParteImagen} ${tablafotosAdmin.base64} ${segundaParteImagen} ${parte_conteo} ${tablafotosAdmin.idSARIfotos} ${tercerParte}`
                    }
                } /* //////////////////////////////////// *** FIN del DESPUES *** ////////////////////////////////////////////// */
                
            }

        })
    } catch (error) {
        
    }
}

llenarDatosImagenes();
