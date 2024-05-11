package com.sena.prueba.IService;

import java.util.List;

import com.sena.prueba.Dto.IClientesDto;
import com.sena.prueba.Entity.Clientes;

public interface IClientesService extends IBaseService<Clientes>{
	
	List<IClientesDto> getTypoIdentificacion(String tipo);
	
    List<Clientes> findByNombreAndCiudadAndState(String nombre_cliente, String ciudad, Boolean state);

}
