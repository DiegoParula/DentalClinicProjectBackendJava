package com.backend.integrador.service;

import com.backend.integrador.dto.TurnoDto;
import com.backend.integrador.entity.Turno;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ITurnoService {
    TurnoDto guardarTurno(Turno turno) throws BadRequestException;

    List<TurnoDto> listarTodos();

    TurnoDto buscarTurnoPorId(Long id) throws ResourceNotFoundException;

    TurnoDto actualizarTurno(Turno turno) throws ResourceNotFoundException, BadRequestException;

    void eliminarTurno(Long id) throws ResourceNotFoundException;
}