package fr.formation.backend.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueMessageValidator.class)
public @interface UniqueMessage {
    String message() default "A message has already been writing by the same author at the same time";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}