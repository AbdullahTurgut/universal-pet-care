package com.dailyalcorwork.universal_pet_care.dto;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EntityConverter<T, D> {
    private final ModelMapper modelMapper;

    // Dto converter
    public D mapEntityToDto(T entity, Class<D> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    // entity converter
    public T mapDtoToEntity(D dto, Class<T> entityClass) {
        return modelMapper.map(dto, entityClass);
    }
}
