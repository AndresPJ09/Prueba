package com.sena.prueba.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.prueba.Entity.Ventas;
import com.sena.prueba.IRepository.IBaseRepository;
import com.sena.prueba.IRepository.IVentasRepository;
import com.sena.prueba.IService.IVentasService;

@Service
public class VentasService extends ABaseService<Ventas> implements IVentasService{
	
	@Autowired
	private IVentasRepository repository;

	@Override
	protected IBaseRepository<Ventas, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

}
