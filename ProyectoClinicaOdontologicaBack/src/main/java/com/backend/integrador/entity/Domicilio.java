package com.backend.integrador.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "DOMICILIOS")
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max = 50, message = "El nombre de la calle debe tener hasta 50 caracteres")
    @NotNull(message = "El nombre de la calle no puede ser nula")
    @NotBlank(message = "Debe especificarse el nombre de la calle")
    private String calle;

    @NotNull(message = "El numero de puerta no puede ser nulo")
    private int numero;
    @Size(max = 50, message = "El nombre de la localidad debe tener hasta 50 caracteres")
    @NotNull(message = "El nombre de la localidad no puede ser nula")
    @NotBlank(message = "Debe especificarse el nombre de la localidad")
    private String localidad;

    @Size(max = 50, message = "El nombre de la provincia debe tener hasta 50 caracteres")
    @NotNull(message = "El nombre de la provincia no puede ser nula")
    @NotBlank(message = "Debe especificarse el nombre de la provincia")
    private String provincia;

    public Domicilio() {
    }

    public Domicilio(Long id, String calle, int numero, String localidad, String provincia) {
        this.id = id;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.provincia = provincia;
    }

    public Domicilio(String calle, int numero, String localidad, String provincia) {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.provincia = provincia;
    }

    public Long getId() {
        return id;
    }


    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    @Override
    public String toString() {
        return "Id: " + id + " - Calle: " + calle + " - Numero: " + numero + " - Localidad: " + localidad + " - Provincia: " + provincia;
    }
}
