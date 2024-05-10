package com.sena.prueba.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.prueba.Entity.Productos;
import com.sena.prueba.IService.IProductosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/productos")
public class ProductosController extends ABaseController<Productos, IProductosService>{

	protected ProductosController(IProductosService service) {
		super(service, "Productos");
		// TODO Auto-generated constructor stub
	}

}
