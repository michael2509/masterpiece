import React, { Component } from 'react';
import EventList from './EventList';
import AddEvent from './AddEvent';

class EventContainer extends Component {

    render() {

        return (
            <div>
                <EventList />
                <AddEvent />
            </div>
        )
    }
}


export default EventContainer;