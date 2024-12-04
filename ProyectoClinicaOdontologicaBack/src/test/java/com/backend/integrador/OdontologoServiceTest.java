package com.backend.integrador;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import com.backend.integrador.service.impl.OdontologoService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class OdontologoServiceTest {


    @Autowired
    private OdontologoService odontologoService;


    @Test
    @Order(1)
    void deberiaAgregarseUnOdontologo()  {
        OdontologoDto odo1 = odontologoService.guardarOdontologo(new Odontologo("Pedro", "Sanchez", 231456));

        Assertions.assertEquals("Pedro", odo1.getNombre());
        Assertions.assertNotNull(odo1);
        Assertions.assertNotNull(odo1.getId());
    }


    @Test
    @Order(2)
    void deberiaBuscarUnOdontologoPorId() {
        OdontologoDto odo1 = odontologoService.buscarOdontologo(1L);
        Assertions.assertEquals("Pedro", odo1.getNombre());
    }

    @Test
    @Order(3)
    void laListaNoDebeEstarVacia() {
        List<OdontologoDto> odontologoListTest = odontologoService.listarOdontologos();
        Assertions.assertFalse(odontologoListTest.isEmpty());
    }


    @Test
    @Order(4)
    void deberiaEliminarElOdontologoConId1() throws ResourceNotFoundException {
        odontologoService.eliminarOdontologo(1L);
        assertThrows(ResourceNotFoundException.class, () -> {
            odontologoService.eliminarOdontologo(1L);
        });
    }

    @Test
    @Order(5)
    void cuandoNoSeCumpleElFormatoNombre_NoDeberiaGuardar() {
        Odontologo odo1 = new Odontologo("", "Sanchez", 121345);
        Assertions.assertThrows(ConstraintViolationException.class, () ->
                odontologoService.guardarOdontologo(odo1));

    }

    @Test
    @Order(6)
    void cuandoNoExisteId_NoDeberiaActualizar() {
        Odontologo odo1 = new Odontologo(1L,"Carlos", "Sanchez", 121345);
        Assertions.assertThrows(ResourceNotFoundException.class, () ->
                odontologoService.actualizarOdontologo(odo1));

    }



}