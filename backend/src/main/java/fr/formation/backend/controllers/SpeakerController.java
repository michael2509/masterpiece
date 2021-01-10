package fr.formation.backend.controllers;

import fr.formation.backend.dtos.SpeakerDto;
import fr.formation.backend.services.SpeakerService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/speakers")
public class SpeakerController {

    private final SpeakerService speakerService;

    public SpeakerController(SpeakerService speakerService) {
        this.speakerService = speakerService;
    }

    @PostMapping
    protected void createSpeaker(@Valid @RequestBody SpeakerDto speakerDto) {
        speakerService.createSpeaker(speakerDto);
    }


}
