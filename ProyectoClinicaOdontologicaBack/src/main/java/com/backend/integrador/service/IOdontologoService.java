package com.backend.integrador.service;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IOdontologoService {

    OdontologoDto guardarOdontologo(Odontologo odontologo);

    List<OdontologoDto> listarOdontologos();

    void eliminarOdontologo(Long id) throws ResourceNotFoundException;

    OdontologoDto buscarOdontologo(Long id);

    OdontologoDto actualizarOdontologo(Odontologo odontologo) throws ResourceNotFoundException;
}
