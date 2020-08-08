package fr.formation.backend.controllers;

import fr.formation.backend.dtos.MeetingDto;
import fr.formation.backend.services.MeetingService;
import fr.formation.backend.viewdtos.MeetingViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @PostMapping
    protected void createEvent(@Valid @RequestBody MeetingDto meetingDto) {
        meetingService.createMeeting(meetingDto);
    }

    @GetMapping()
    protected Page<MeetingViewDto> getMeetingList(@RequestParam("page") int page, @RequestParam("size") int size) {
        return meetingService.getMeetingListPage(page, size);
    }
}
