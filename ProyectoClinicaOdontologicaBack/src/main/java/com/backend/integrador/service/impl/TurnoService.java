package com.backend.integrador.service.impl;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.dto.TurnoDto;
import com.backend.integrador.entity.Turno;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.repository.ITurnoRepository;
import com.backend.integrador.service.ITurnoService;
import com.backend.integrador.utils.JsonPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnoService implements ITurnoService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TurnoService.class);
    private final ITurnoRepository turnoRepository;
    private final PacienteService pacienteService;
    private final OdontologoService odontologoService;


    @Autowired
    public TurnoService(ITurnoRepository turnoRepository, PacienteService pacienteService, OdontologoService odontologoService) {
        this.turnoRepository = turnoRepository;
        this.pacienteService = pacienteService;
        this.odontologoService = odontologoService;

    }

    @Override
    public TurnoDto guardarTurno(Turno turno) throws BadRequestException {
        TurnoDto turnoDto = null;

        PacienteDto paciente = pacienteService.buscarPacientePorId(turno.getPaciente().getId());
        OdontologoDto odontologo = odontologoService.buscarOdontologo(turno.getOdontologo().getId());

        if (paciente == null || odontologo == null) {
            if (paciente == null && odontologo == null) {
                LOGGER.error("El paciente y el odontologo no se encuentran en nuestra base de datos");
                throw new BadRequestException("El paciente y el odontologo no se encuentran en nuestra base de datos");
            } else if (paciente == null) {
                LOGGER.error("El paciente no se encuentra en nuestra base de datos");
                throw new BadRequestException("El paciente no se encuentra en nuestra base de datos");
            } else {
                LOGGER.error("El odontologo no se encuentra en nuestra base de datos");
                throw new BadRequestException("El odontologo no se encuentra en nuestra base de datos");
            }
        } else {
            turnoDto = TurnoDto.fromTurno(turnoRepository.save(turno));
            LOGGER.info("Nuevo turno registrado con exito: {}", JsonPrinter.toString(turnoDto));
        }
        return turnoDto;
    }

    @Override
    public List<TurnoDto> listarTodos() {
        List<Turno> turnoList = turnoRepository.findAll();
        List<TurnoDto> turnoDtoList = turnoList.stream().map(TurnoDto::fromTurno).toList();
        LOGGER.info("Listado de turnos: {}", JsonPrinter.toString(turnoDtoList));

        return turnoDtoList;
    }

    @Override
    public TurnoDto buscarTurnoPorId(Long id) throws ResourceNotFoundException {

        Turno turnoBuscado = turnoRepository.findById(id).orElse(null);
        TurnoDto turnoDto = null;
        if (turnoBuscado != null) {
            turnoDto = TurnoDto.fromTurno(turnoBuscado);
            LOGGER.info("Turno encontrado: {}", JsonPrinter.toString(turnoDto));
        } else {
            LOGGER.error("EL turno no se encuentra registado en la base de datos.");
            throw new ResourceNotFoundException("EL turno no se encuentra registado en la base de datos.");
        }

        return turnoDto;
    }

    @Override
    public TurnoDto actualizarTurno(Turno turno) throws ResourceNotFoundException, BadRequestException {

        Turno turnoActualizar = turnoRepository.findById(turno.getId()).orElse(null);
        PacienteDto paciente = pacienteService.buscarPacientePorId(turno.getPaciente().getId());
        OdontologoDto odontologo = odontologoService.buscarOdontologo(turno.getOdontologo().getId());

        TurnoDto turnoDtoActualiazado = null;

        if (turnoActualizar != null) {
            if (paciente == null || odontologo == null) {
                if (paciente == null && odontologo == null) {
                    LOGGER.error("El paciente y el odontologo no se encuentran en nuestra base de datos");
                    throw new BadRequestException("El paciente y el odontologo no se encuentran en nuestra base de datos");
                } else if (paciente == null) {
                    LOGGER.error("El paciente no se encuentra en nuestra base de datos");
                    throw new BadRequestException("El paciente no se encuentra en nuestra base de datos");
                } else {
                    LOGGER.error("El odontologo no se encuentra en nuestra base de datos");
                    throw new BadRequestException("El odontologo no se encuentra en nuestra base de datos");
                }
            } else {
                turnoActualizar = turno;
                turnoRepository.save(turnoActualizar);
                turnoDtoActualiazado = TurnoDto.fromTurno(turno);
                LOGGER.info("Turno actualizado con exito: {}", JsonPrinter.toString(turnoDtoActualiazado));
            }
        } else {
            LOGGER.error("No se pudo actualizar, el turno no se encuentra registrado.");
            throw new ResourceNotFoundException("No se pudo actualizar, el turno no se encuentra registrado.");
        }

        return turnoDtoActualiazado;
    }

    @Override
    public void eliminarTurno(Long id) throws ResourceNotFoundException {
        if (buscarTurnoPorId(id) != null) {
            turnoRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado el paciente con id {}", id);
        } else {
            LOGGER.warn("No se ha encontrado el turno con id {}", id);
            throw new ResourceNotFoundException("No se ha encontrado el turno con id " + id);
        }
    }
}
