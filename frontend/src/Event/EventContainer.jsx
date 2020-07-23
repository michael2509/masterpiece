import React, { Component } from 'react';
import EventList from './EventList';
import AddEvent from './AddEvent';
import { createEvent, getEventListPageByAccount } from "./eventActions";
import { connect } from "react-redux";

class EventContainer extends Component {

    render() {
        const { createEvent, getEventListPageByAccount } = this.props;
        getEventListPageByAccount(1);

        return (
            <div>
                <EventList />
                <AddEvent createEvent={createEvent} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createEvent: (event) => dispatch(createEvent(event)),
    getEventListPageByAccount: (accountId) => dispatch(getEventListPageByAccount(accountId))
})

export default connect(null, mapDispatchToProps)(EventContainer);