import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from "react-router-dom";
import { useStateProviderContextValue } from './StateProvider';
import firebase from "firebase";
import db from './firebase'
import "./Chat.css";

function Chat() {

    const [input, setInput] = useState("");
    const roomId = useParams(); //fetch the room id from the url params of react-router-dom
    const [roomName, setRoomName] = useState("");
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, dispatch] = useStateProviderContextValue();
    useEffect(() => {
        if (roomId) {
            if (roomId.rid) {
                db.collection("rooms").doc(roomId.rid).onSnapshot((snapshot) => {
                    setRoomName(snapshot.data().name)
                })
                setSeed(roomId.rid)

                db.collection("rooms").doc(roomId.rid).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                })
            }

        }
        else {
            setSeed(Math.floor(Math.random() * 5000))
        }

    }, [roomId, messages]); //on roomid change, refresh snapshot of this collection realtime.



    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId.rid).collection("messages").add({
            name: user?.user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }
    const getLastSeenInfo = () => {

        var lastSeen = new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
        if (lastSeen === "Invalid Date") {
            return ""
        }
        return "last seen " + lastSeen;
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName ? roomName : "Standard name"}</h3>
                    <p>{getLastSeenInfo()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    {<IconButton><MoreVertIcon /></IconButton>}

                </div>
            </div>
            <div className="chat__body">
                {/*  chat__receiver means the logged in user in this device*/}
                {messages.map(message => (
                    <p key={message.id} className={`chat__message ${message.name === user?.user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}



            </div>
            <div className="chat__footer">
                <IconButton>   <InsertEmoticonIcon />
                </IconButton>

                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." class="chat__userMessage" type="text" />
                    <button type="submit" onClick={sendMessage}>Send Message</button>

                </form>
                <IconButton onClick={sendMessage}>  <SendIcon /></IconButton>
                <IconButton>
                    <MicIcon />
                </IconButton>

            </div>
        </div >
    )
}

export default Chat
