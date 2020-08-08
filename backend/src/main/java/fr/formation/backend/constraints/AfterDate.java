package fr.formation.backend.constraints;

import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.ANNOTATION_TYPE, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { AfterDateValidator.class })
@Documented
public @interface AfterDate {

    String message() default "End date time must be after start date time" ;

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}