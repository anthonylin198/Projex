// Create the page for the chat 

import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // retrieving data from the url
import io from 'socket.io-client/dist/socket.io'
import {withRouter} from "react-router"
import axios from 'axios'


// Importing components
import InfoBar from './InfoBar'
import Messages from './Messages'
import Input from './Input'
import TextContainer from './TextContainer'

import './css/Chat.css'

let socket;

const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');


  // storing the array of messages -- need to make a request to fill up this array of messages
  // axios request to get all the messages to store inside the state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);  // this stores all the messages in an array in state



  // ! UseEffect for user joining the room
  useEffect(() => {
    const {name, room} = queryString.parse(location.search)
    socket = io('localhost:3000');
    // setting the name and the room
    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, () => {

    }); // same as name: name. Sends name and room to server

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, ['localhost:3000', location.search]) // useEffect will trigger when values in array update


  useEffect(() => {
    // make axios request that will access table with all chat messages
    
    
    // make query to table with chat messages -- filtered based off of room which is in state



  })




  // ! UseEffect for user sending a message
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])


  // ! function for sending message -- also do an axios request
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage' , message, () => setMessage(''))
    }
  }

  console.log(message)
  console.log(messages)


  // ! JSX
  return (
<div className="outerContainer">
      <div className="container2">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer/> */}
      {/* <TextContainer users={users}/> */}
    </div>
  );
};

export default withRouter(Chat);