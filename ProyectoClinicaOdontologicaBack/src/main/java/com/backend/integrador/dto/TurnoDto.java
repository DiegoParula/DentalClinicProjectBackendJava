package com.backend.integrador.dto;

import com.backend.integrador.entity.Turno;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TurnoDto {

    private Long id;
    private Long idPaciente;
    private Long idOdontologo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime fecha;

    public TurnoDto() {
    }

    public TurnoDto(Long id, Long idPaciente, Long idOdontologo, LocalDateTime fecha) {

        this.id = id;
        this.idPaciente = idPaciente;

        this.idOdontologo = idOdontologo;
        this.fecha = fecha;
    }

    public TurnoDto(PacienteDto pacienteTurno, OdontologoDto odontologoTurno, LocalDateTime fecha) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPaciente() {
        return idPaciente;
    }

    public void setPaciente(Long paciente) {
        this.idPaciente = idPaciente;
    }

    public Long getOdontologo() {
        return idOdontologo;
    }

    public void setOdontologo(Long odontologo) {
        this.idOdontologo = idOdontologo;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public static TurnoDto fromTurno(Turno turno) {
        Long paciente = turno.getPaciente().getId();
        Long odontologo = turno.getOdontologo().getId();
        return new TurnoDto(turno.getId(), paciente, odontologo, turno.getFecha());
    }
}
