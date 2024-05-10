package com.sena.prueba.Service;

import org.springframework.stereotype.Service;

import com.sena.prueba.IService.IEnumService;
import com.sena.prueba.Utils.tipo_identificacion;
import com.sena.prueba.Utils.direccion;

@Service
public class EnumService implements IEnumService{
	
	@Override
    public tipo_identificacion[] getTypoIdentificacion() {
        return tipo_identificacion.values();
    }
	
	@Override
	public direccion[] getDireccion() {
		// TODO Auto-generated method stub
		return direccion.values();
	}
}
