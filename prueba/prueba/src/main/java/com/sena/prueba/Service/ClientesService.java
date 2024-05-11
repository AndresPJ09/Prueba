package com.sena.prueba.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.prueba.Dto.IClientesDto;
import com.sena.prueba.Entity.Clientes;
import com.sena.prueba.IRepository.IBaseRepository;
import com.sena.prueba.IRepository.IClientesRepository;
import com.sena.prueba.IService.IClientesService;

@Service
public class ClientesService extends ABaseService<Clientes> implements IClientesService{
	
	@Autowired
	private IClientesRepository repository;

	@Override
	protected IBaseRepository<Clientes, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

	@Override
	public List<IClientesDto> getTypoIdentificacion(String tipo) {
		// TODO Auto-generated method stub
		return repository.getTypoIdentificacion(tipo);
	}
	
	@Override
	public List<Clientes> findByNombreAndCiudadAndState(String nombre_cliente, String ciudad, Boolean state) {
	    return repository.findByNombreAndCiudadAndState(nombre_cliente, ciudad, state);
	}
	
	  @Override
	    public void delete(Long id){
	        repository.deleteById(id);
	    }

}
