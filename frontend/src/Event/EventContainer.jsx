import React, { Component } from 'react';
import EventList from './EventList';
import AddEvent from './AddEvent';
import { createEvent, getEventListPage } from "./eventActions";
import { connect } from "react-redux";

class EventContainer extends Component {

    componentDidMount() {
        const { getEventListPage } = this.props;
        getEventListPage()
    }

    render() {
        const { createEvent, events } = this.props;

        return (
            <div>
                <EventList events={events} />
                <AddEvent createEvent={createEvent} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events });

const mapDispatchToProps = (dispatch) => ({
    createEvent: (event) => dispatch(createEvent(event)),
    getEventListPage: () => dispatch(getEventListPage())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);