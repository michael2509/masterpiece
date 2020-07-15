import React, { Component } from 'react';
import EventList from './EventList';
import AddEvent from './AddEvent';
import { createEvent } from "./eventActions";
import { connect } from "react-redux";

class EventContainer extends Component {

    render() {
        const { createEvent } = this.props;

        return (
            <div>
                <EventList />
                <AddEvent createEvent={createEvent} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createEvent: (event) => dispatch(createEvent(event))
})

export default connect(null, mapDispatchToProps)(EventContainer);