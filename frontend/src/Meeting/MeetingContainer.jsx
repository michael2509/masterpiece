import React, { Component } from 'react';
import MeetingList from './MeetingList';
import AddMeeting from './AddMeeting';
import { createMeeting, getMeetingListPage } from "./meetingActions";
import { connect } from "react-redux";
import { isLogged } from '../Auth/authService';

class MeetingContainer extends Component {

    componentDidMount() {
        const { getMeetingListPage, pageNumber } = this.props;
        getMeetingListPage(pageNumber);
    }

    render() {
        const { createMeeting, getMeetingListPage, meetingListPage, pageNumber, totalPages, history } = this.props;
        const logged = isLogged();

        if (!logged) {
            history.push("/connexion")
        }

        return (
            <div>
                <MeetingList totalPages={totalPages} meetingListPage={meetingListPage} getMeetingListPage={getMeetingListPage} pageNumber={pageNumber} />
                <AddMeeting createMeeting={createMeeting} getMeetingListPage={getMeetingListPage} pageNumber={pageNumber} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    pageNumber: state.meetings.pageNumber,
    meetingListPage: state.meetings.meetingListPage,
    totalPages: state.meetings.totalPages
});

const mapDispatchToProps = (dispatch) => ({
    createMeeting: (meeting) => dispatch(createMeeting(meeting)),
    getMeetingListPage: (pageNumber) => dispatch(getMeetingListPage(pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingContainer);