import React, { Component } from 'react';
import EventList from './EventList';
import AddEvent from './AddEvent';
import { createEvent, getEventListPage } from "./eventActions";
import { connect } from "react-redux";

class EventContainer extends Component {

    componentDidMount() {
        const { getEventListPage, events } = this.props;
        const { currentPage } = events;
        getEventListPage(currentPage);
    }

    handleEventPageChange(event, value) {
        console.log(this.props);
        const page = value - 1;
        console.log(page);
        getEventListPage(page);
    }

    render() {
        const { createEvent, getEventListPage, events } = this.props;
        const { eventListPage } = events;
        const { currentPage } = events;
        console.log(currentPage);

        return (
            <div>
                <EventList eventListPage={eventListPage} getEventListPage={getEventListPage} />
                <AddEvent createEvent={createEvent} getEventListPage={getEventListPage} currentPage={currentPage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events });

const mapDispatchToProps = (dispatch) => ({
    createEvent: (event) => dispatch(createEvent(event)),
    getEventListPage: (currentPage) => dispatch(getEventListPage(currentPage))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);