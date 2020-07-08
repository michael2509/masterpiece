import React, { Component } from 'react';
import EventList from './EventList';
import AddEvent from './AddEvent';
import { Container } from '@material-ui/core';

class EventContainer extends Component {

    render() {

        return (
            <Container component="main" maxWidth="sm" style={{ minHeight: "calc(100vh - 150px)" }}>
                <EventList />
                <AddEvent />
            </Container>
        )
    }
}


export default EventContainer;