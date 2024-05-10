package com.sena.prueba.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.prueba.Entity.Clientes;
import com.sena.prueba.IService.IClientesService;
import com.sena.prueba.Dto.ApiResponseDto;
import com.sena.prueba.Dto.IClientesDto;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/clientes")
public class ClientesController extends ABaseController<Clientes, IClientesService>{

	protected ClientesController(IClientesService service) {
		super(service, "Clientes");
		// TODO Auto-generated constructor stub
	}
	
	@GetMapping("/filter/{tipo}")
    public ResponseEntity<ApiResponseDto<List<IClientesDto>>> show(@PathVariable String tipo) {
        try {
            List<IClientesDto> entity = service.getTypoIdentificacion(tipo);
            return ResponseEntity.ok(new ApiResponseDto<List<IClientesDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<IClientesDto>>(e.getMessage(), null, false));
        }
		}

}