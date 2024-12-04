package com.backend.integrador.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "ODONTOLOGOS")
public class Odontologo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Pattern(regexp = "^[a-zA-Z\\s]*$", message = "El nombre no debe contener números")
    @Size(max = 50, message = "El nombre debe tener hasta 50 caracteres")
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "Debe especificarse el nombre del odontologo")
    private String nombre;
    @Pattern(regexp = "^[a-zA-Z\\s]*$", message = "El apellido no debe contener números")
    @Size(max = 50, message = "El apellido debe tener hasta 50 caracteres")
    @NotNull(message = "El apellido no puede ser nulo")
    @NotBlank(message = "Debe especificarse el apellido del odontologo")
    private String apellido;

    //@ValidarNumero(message = "La matricula deben ser solo numeros")

    @Min(value = 100000, message = "La matricula debe ser un número entero de 6 cifras")
    @Max(value = 999999, message = "La matricula debe ser un número entero de 6 cifras")
    @NotNull(message = "La matricula no puede ser nula")
    private int matricula;

    public Odontologo() {
    }

    public Odontologo(String nombre, String apellido, int matricula) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
    }

    public Odontologo(Long id, String nombre, String apellido, int matricula) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
    }

    public Long getId() {
        return id;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public int getMatricula() {
        return matricula;
    }

    public void setMatricula(int matricula) {
        this.matricula = matricula;
    }

    @Override
    public String toString() {
        return "\n ID: " + id + " - Odontólogo: " + nombre + " " + apellido + " Matrícula: " + matricula + ".";
    }
}
