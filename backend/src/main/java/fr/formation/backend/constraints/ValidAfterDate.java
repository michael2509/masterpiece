package fr.formation.backend.constraints;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.ANNOTATION_TYPE, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { ValidAfterDateValidator.class })
@Documented
public @interface ValidAfterDate {

    String message() default "Start date time must be before end date time" ;

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}