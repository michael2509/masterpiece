package fr.formation.backend.services;

import fr.formation.backend.dtos.MeetingDto;
import fr.formation.backend.viewdtos.MeetingViewDto;
import org.springframework.data.domain.Page;

public interface MeetingService {

    void createMeeting(MeetingDto meetingDto);
    Page<MeetingViewDto> getMeetingListPage(int page, int size);
}
