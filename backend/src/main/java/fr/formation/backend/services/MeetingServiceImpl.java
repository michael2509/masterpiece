package fr.formation.backend.services;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.MeetingDto;
import fr.formation.backend.entities.User;
import fr.formation.backend.entities.Meeting;
import fr.formation.backend.repositories.UserRepository;
import fr.formation.backend.repositories.MeetingRepository;
import fr.formation.backend.viewdtos.MeetingViewDto;
import org.hashids.Hashids;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void createMeeting(MeetingDto meetingDto) {
        Meeting meeting = modelMapper.map(meetingDto, Meeting.class);

        // Add account and code
        Long accountId = SecurityHelper.getUserId();
        User user = userRepository.findById(accountId).get();
        meeting.setUser(user);

        Long eventsTableSize = meetingRepository.count();
        String salt = String.valueOf(eventsTableSize);

        Hashids hashids = new Hashids(salt, 5);
        String code = hashids.encode(eventsTableSize).toUpperCase();
        meeting.setCode(code);

        meetingRepository.save(meeting);
    }

    @Override
    public Page<MeetingViewDto> getMeetingListPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Long userId = SecurityHelper.getUserId();
        Page<MeetingViewDto> meetingListPage = meetingRepository.findAllByUserId(userId, pageable);
        return meetingListPage;
    }
}
