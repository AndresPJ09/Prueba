package com.sena.prueba.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.prueba.IService.IEnumService;
import com.sena.prueba.Utils.tipo_identificacion;
import com.sena.prueba.Utils.direccion;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/enum")
public class EnumController {
	
	@Autowired
	private IEnumService service;
	
	@GetMapping("/tipoidentificacion")
	public tipo_identificacion[] identificacion() {
		return service.getTypoIdentificacion();
	}
	
	@GetMapping("/direccion")
	public direccion[] direccion() {
	    return service.getDireccion();
	    
	}

}
