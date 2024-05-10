package com.sena.prueba.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.prueba.Entity.Ventas;
import com.sena.prueba.IService.IVentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/ventas")
public class VentasController extends ABaseController<Ventas, IVentasService>{

	protected VentasController(IVentasService service) {
		super(service, "Ventas");
		// TODO Auto-generated constructor stub
	}

}
