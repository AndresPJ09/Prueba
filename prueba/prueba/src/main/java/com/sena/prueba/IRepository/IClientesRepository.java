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
      
      @Query(value = "SELECT\r\n"
			+ "\r\n"
			+ "    \r\n"
			+ "    clientes.identificacion,\r\n"
			+ "   \r\n"
			+ "    clientes.tipo_identificacion\r\n"
			+ "   \r\n"
			+ "FROM prueba.clientes\r\n"
			+ "where id = :id" , nativeQuery = true)
      IClientesDto getIdentificacion(@Param("id") Long id);

}
