package com.backend.integrador;

import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.entity.Domicilio;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.service.impl.PacienteService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class PacienteServiceTest {
    @Autowired
    private PacienteService pacienteService;



    @Test
    @Order(1)
    public void deberiaAgregarUnPaciente() throws BadRequestException {

        PacienteDto pacienteResult = pacienteService.guardarPaciente(new Paciente("Luis", "Gonzalez", 123456, LocalDate.of(2023, 07, 02), new Domicilio("Calle", 13, "Localidad", "Provincia")));

        Assertions.assertNotNull(pacienteResult);
        Assertions.assertEquals(123456, pacienteResult.getDni());

    }

    @Test
    @Order(2)
    void deberiaBuscarUnPacientePorId1() throws ResourceNotFoundException {
        PacienteDto odo1 = pacienteService.buscarPacientePorId(1L);
        Assertions.assertEquals("Luis", odo1.getNombre());
    }


    @Test
    @Order(3)
    void listarTodosLosPacientes() {
        List<PacienteDto> odontologoListTest = pacienteService.listarPacientes();
        Assertions.assertEquals(1, odontologoListTest.size());

    }

    @Test
    @Order(4)
    void deberiaEliminarElPacienteConId1() throws ResourceNotFoundException {
        pacienteService.eliminarPaciente(1L);
        assertThrows(ResourceNotFoundException.class, () -> {
            pacienteService.eliminarPaciente(1L);
        });
    }

    @Test
    @Order(5)
    void cuandoNoSeCumpleElFormatoDniNoDeberiaGuardar() {
        Paciente paciente = new Paciente("Luis", "Gonzalez", 123, LocalDate.of(2023, 07, 02), new Domicilio("Calle", 13, "Localidad", "Provincia"));
        Assertions.assertThrows(ConstraintViolationException.class, () ->
                pacienteService.guardarPaciente(paciente));

    }






}