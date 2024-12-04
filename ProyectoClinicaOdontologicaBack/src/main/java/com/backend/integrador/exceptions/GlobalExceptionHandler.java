package com.backend.integrador.exceptions;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {//handles glocbal exceptions

    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> procesarNotFoundException(ResourceNotFoundException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();
        exceptionMessage.put("message", "Recurso no encontrado: " + exception.getMessage());
        return exceptionMessage;
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> procesarValidationException(MethodArgumentNotValidException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            exceptionMessage.put(fieldName, errorMessage);
        });
        return exceptionMessage;
    }


    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> procesarBadRequest(BadRequestException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();
        exceptionMessage.put("path", String.valueOf(exception.getClass()));
        exceptionMessage.put("message", "Recurso no encontrado: " + exception.getMessage());
        return exceptionMessage;
    }

    @ExceptionHandler({JsonParseException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> procesarJsonParseException(JsonParseException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();
        exceptionMessage.put("path", String.valueOf(exception.getClass()));
        exceptionMessage.put("message", exception.getMessage());
        return exceptionMessage;
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> procesarHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
        Map<String, String> exceptionMessage = new HashMap<>();

        if (exception.getCause() instanceof InvalidFormatException) {// verifica si la causa de la excepción es una instancia de InvalidFormatException
            InvalidFormatException cause = (InvalidFormatException) exception.getCause();//permite acceder a la info de la causa
            List<JsonMappingException.Reference> references = cause.getPath();//lista de referencias de la causa

            if (!references.isEmpty()) {
                String nombreCampo = references.get(0).getFieldName();//para obtener el nombre del campo y mostralo en el mensaje
                //exceptionMessage.put("name", nombreCampo);
                exceptionMessage.put("message", "Debe ingresar números enteros en el campo " + nombreCampo);
            }
        }

        return exceptionMessage;
    }


}
