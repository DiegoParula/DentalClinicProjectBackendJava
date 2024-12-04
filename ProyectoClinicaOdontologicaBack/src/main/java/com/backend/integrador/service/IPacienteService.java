package com.backend.integrador.service;

import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IPacienteService {

    PacienteDto guardarPaciente(Paciente paciente);

    List<PacienteDto> listarPacientes();

    void eliminarPaciente(Long id) throws ResourceNotFoundException;

    PacienteDto buscarPacientePorId(Long id);

    PacienteDto actualizarPaciente(Paciente paciente) throws ResourceNotFoundException;
}
