package fr.formation.backend.config;
// Ressource not found exception class
@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {

    }

    public ResourceNotFoundException(String message) {
	super(message);
    }
}
