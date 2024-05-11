package com.sena.prueba.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.prueba.Dto.IClientesDto;
import com.sena.prueba.Entity.Clientes;

@Repository
public interface IClientesRepository extends IBaseRepository<Clientes, Long>{
	
	@Query(value = "SELECT "
            + "c.id, "
            + "c.tipo_identificacion "
            + "FROM "
            + "clientes c "
            + "WHERE "
            + "c.tipo_identificacion = :tipo AND "
            + "c.deleted_at IS NULL", nativeQuery = true)
	List<IClientesDto> getTypoIdentificacion(@Param("tipo") String tipo);
      
	@Query("SELECT c FROM Clientes c WHERE "
		       + "(:nombre_cliente IS NULL OR c.nombre_cliente LIKE %:nombre_cliente%) "
		       + "AND (:ciudad IS NULL OR c.ciudad = :ciudad) "
		       + "AND (:state IS NULL OR c.state = :state)")
		List<Clientes> findByNombreAndCiudadAndState(String nombre_cliente, String ciudad, Boolean state);


}
