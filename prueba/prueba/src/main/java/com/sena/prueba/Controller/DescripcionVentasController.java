package com.sena.prueba.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.prueba.Entity.DescripcionVentas;
import com.sena.prueba.IService.IDescripcionVentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/descripcion_ventas")
public class DescripcionVentasController extends ABaseController<DescripcionVentas, IDescripcionVentasService>{

	protected DescripcionVentasController(IDescripcionVentasService service) {
		super(service, "Descripcion_Ventas");
		// TODO Auto-generated constructor stub
	}

}
