import React, { Component } from 'react';
import ChatList from './ChatList/ChatList';
import AddChat from './AddChat/AddChat';
import { createChat, deleteChat, getChatPage, openUpdateChat, closeUpdateChat, updateChat, fetchMoreChats } from "./redux/chatActions";
import { connect } from "react-redux";
import { isLogged } from '../Auth/authService';
import UpdateChat from './UpdateChat/UpdateChat';
import Container from '@material-ui/core/Container';

// Chat container to connect to app state using redux
class ChatsContainer extends Component {

    componentDidMount() {
        this.props.getChatPage(0);
    }

    render() {
        const { chatState, createChat, deleteChat, getChatPage, openUpdateChat, closeUpdateChat, updateChat, fetchMoreChats, history } = this.props;
        const { chatPage, pageNumber, totalPages, updateChatState, last } = chatState;

        const logged = isLogged();

        if (!logged) {
            history.push("/connexion")
        }

        return (
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <ChatList totalPages={totalPages} chatPage={chatPage} getChatPage={getChatPage} pageNumber={pageNumber} deleteChat={deleteChat} openUpdateChat={openUpdateChat} fetchMoreChats={fetchMoreChats} last={last} />
                <AddChat createChat={createChat} getChatPage={getChatPage} pageNumber={pageNumber} />
                <UpdateChat state={updateChatState} handleClose={closeUpdateChat} updateChat={updateChat} />
            </Container>
        )
    }
}

// Part of the app state to retrieve
const mapStateToProps = (state) => ({ chatState: state.chats, navbarState: state.navbar });

// Actions to retrieve
const mapDispatchToProps = (dispatch) => ({
    createChat: (chat) => dispatch(createChat(chat)),
    updateChat: (chat) => dispatch(updateChat(chat)),
    deleteChat: (chatId) => dispatch(deleteChat(chatId)),
    getChatPage: (pageNumber) => dispatch(getChatPage(pageNumber)),
    fetchMoreChats: (pageNumber) => dispatch(fetchMoreChats(pageNumber)),
    openUpdateChat: (chat) => dispatch(openUpdateChat(chat)),
    closeUpdateChat: () => dispatch(closeUpdateChat()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer);