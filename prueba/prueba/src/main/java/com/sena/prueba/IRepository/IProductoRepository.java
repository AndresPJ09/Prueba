package com.sena.prueba.IRepository;

import org.springframework.stereotype.Repository;

import com.sena.prueba.Entity.Productos;

@Repository
public interface IProductoRepository extends IBaseRepository<Productos, Long>{

}
