package fr.formation.backend.constraints;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.ANNOTATION_TYPE, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { ValidAfterDateValidator.class })
@Documented
public @interface ValidAfterDate {

    String message() default "La date de début de l'événement doit être avant la date de fin de l'événement" ;

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}