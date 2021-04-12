package fr.formation.backend.constraints;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidateSenderTypeValidator implements ConstraintValidator<ValidateSenderType, String> {

    List<String> acceptedValueList = null;

    @Override
    public void initialize(ValidateSenderType constraintAnnotation) {
        // Set accepted values that has been passed in parameters when calling the custom annotation parameter in the DTO
        acceptedValueList = Arrays.asList(constraintAnnotation.acceptedValues());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Verifiy the user input match one of the accepted values
        return acceptedValueList.contains(value);
    }

}
