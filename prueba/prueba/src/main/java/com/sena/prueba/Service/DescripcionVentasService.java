package com.sena.prueba.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.prueba.IRepository.IBaseRepository;
import com.sena.prueba.IRepository.IDescripcionVentasRepository;
import com.sena.prueba.Entity.DescripcionVentas;
import com.sena.prueba.IService.IDescripcionVentasService;

@Service
public class DescripcionVentasService extends ABaseService<DescripcionVentas> implements IDescripcionVentasService{
	
	@Autowired
	private IDescripcionVentasRepository repository;

	@Override
	protected IBaseRepository<DescripcionVentas, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}
	
	  @Override
	    public void delete(Long id){
	        repository.deleteById(id);
	    }


}
