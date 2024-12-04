package com.backend.integrador;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.dto.TurnoDto;
import com.backend.integrador.entity.Domicilio;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.entity.Turno;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.service.impl.OdontologoService;
import com.backend.integrador.service.impl.PacienteService;
import com.backend.integrador.service.impl.TurnoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class TurnoServiceTest {
    private TurnoService turnoService;
    private PacienteService pacienteService;
    private OdontologoService odontologoService;

    @Autowired
    public TurnoServiceTest(TurnoService turnoService, PacienteService pacienteService, OdontologoService odontologoService) {
        this.turnoService = turnoService;
        this.pacienteService = pacienteService;
        this.odontologoService = odontologoService;
    }

    public static Paciente paciente;
    public static Odontologo odontologo;

    @BeforeAll
    public static void init(){
    paciente= new Paciente("Luis", "Gonzalez", 123456, LocalDate.of(2023, 07, 02), new Domicilio("Calle", 13, "Localidad", "Provincia"));
    odontologo = new Odontologo("Pedro", "Sanchez", 234234);
    }
    @Test
    @Order(1)

        void deberiaAgregarUnTurno() throws BadRequestException {

        PacienteDto pacienteDto = pacienteService.guardarPaciente(paciente);
        OdontologoDto odontologoDto = odontologoService.guardarOdontologo(odontologo);

        TurnoDto turnoDto = turnoService.guardarTurno(new Turno(paciente, odontologo, LocalDateTime.of(2023, 8, 25, 13, 30, 00)));


        Assertions.assertNotNull(turnoDto);
        Assertions.assertNotNull(turnoDto.getId());
        Assertions.assertEquals(turnoDto.getPaciente(), pacienteDto.getId());
        Assertions.assertEquals(turnoDto.getOdontologo(), odontologoDto.getId());


    }


    @Test
    @Order(2)
    void deberiaBuscarUnTurnoPorId1() throws ResourceNotFoundException {
        TurnoDto turno1 = turnoService.buscarTurnoPorId(1L);
        Assertions.assertNotNull(turno1);
    }

    @Test
    @Order(3)
    void listarTodosLosTurnos() {
        List<TurnoDto> turnoListTest = turnoService.listarTodos();
        Assertions.assertFalse(turnoListTest.isEmpty());

    }

    @Test
    @Order(4)
    void deberiaEliminarElTurnoConId1() throws ResourceNotFoundException {
        turnoService.eliminarTurno(1L);
        assertThrows(ResourceNotFoundException.class, () -> {
            turnoService.buscarTurnoPorId(1L);
        });
    }


}