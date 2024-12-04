package com.backend.integrador.service.impl;


import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.repository.IOdontologoRepository;
import com.backend.integrador.service.IOdontologoService;
import com.backend.integrador.utils.JsonPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OdontologoService implements IOdontologoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PacienteService.class);
    private final IOdontologoRepository odontologoRepository;
    private final ObjectMapper mapper;

    @Autowired
    public OdontologoService(IOdontologoRepository odontologoRepository, ObjectMapper mapper) {
        this.odontologoRepository = odontologoRepository;
        this.mapper = mapper;
    }

    @Override
    public OdontologoDto guardarOdontologo(Odontologo odontologo) {
        OdontologoDto odontologoDto = mapper.convertValue(odontologoRepository.save(odontologo), OdontologoDto.class);

        LOGGER.info("Nuevo odontologo resgitado con exito: {}", JsonPrinter.toString(odontologoDto));
        return odontologoDto;
    }

    @Override
    public List<OdontologoDto> listarOdontologos() {
        List<OdontologoDto> odontologoDtos = odontologoRepository.findAll().stream().map(odontologo -> mapper.convertValue(odontologo, OdontologoDto.class)).toList();
        LOGGER.info("Lista de todos los odontologos: {}", JsonPrinter.toString(odontologoDtos));

        return odontologoDtos;
    }

    @Override
    public void eliminarOdontologo(Long id) throws ResourceNotFoundException {
        if (buscarOdontologo(id) != null) {
            odontologoRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado el odontologo con id {}", id);
        } else {
            LOGGER.error("No se ha encontrado el odontologo con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado el odontologo con id " + id);
        }
    }

    @Override
    public OdontologoDto buscarOdontologo(Long id) {
        Odontologo odontologoBuscado = odontologoRepository.findById(id).orElse(null);
        OdontologoDto odontologoDto = null;
        if (odontologoBuscado != null) {
            odontologoDto = mapper.convertValue(odontologoBuscado, OdontologoDto.class);
            LOGGER.info("Odontologo encontrado: {}", JsonPrinter.toString(odontologoDto));
        } else {
            LOGGER.info("El odontologo con id: " + id + " no existe en la base de datos");

        }
        return odontologoDto;
    }

    @Override
    public OdontologoDto actualizarOdontologo(Odontologo odontologo) throws ResourceNotFoundException {
        Odontologo odontologoActualizar = odontologoRepository.findById(odontologo.getId()).orElse(null);
        OdontologoDto odontologoDtoActualizado = null;

        if (odontologoActualizar != null) {
            odontologoActualizar = odontologo;
            odontologoRepository.save(odontologoActualizar);
            odontologoDtoActualizado = mapper.convertValue(odontologoActualizar, OdontologoDto.class);
            LOGGER.info("Odontologo actualizado con exito: {}", JsonPrinter.toString(odontologoDtoActualizado));
        } else {
            LOGGER.error("No se pudo actualizar, el odontologo no se encuentra registrado.");
            throw new ResourceNotFoundException("No fue posible encontrar el odontologo");
        }
        return odontologoDtoActualizado;
    }
}
