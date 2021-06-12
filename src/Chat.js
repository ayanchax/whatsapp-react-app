import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from "react-router-dom";
import db from './firebase'
import "./Chat.css";

function Chat() {

    const [input, setInput] = useState("");
    const roomId = useParams(); //fetch the room id from the url params of react-router-dom
    const [roomName, setRoomName] = useState("");
    const [seed, setSeed] = useState("");
    useEffect(() => {
        if (roomId) {
            if (roomId.rid) {
                db.collection("rooms").doc(roomId.rid).onSnapshot((snapshot) => {
                    setRoomName(snapshot.data().name)
                })
                setSeed(roomId.rid)
            }

        }
        else {
            setSeed(Math.floor(Math.random() * 5000))
        }

    }, [roomId]); //on roomid change, refresh snapshot of this collection realtime.



    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input)
        setInput("")
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName ? roomName : "Standard name"}</h3>
                    <p>Last seen 21 minutes ago</p>
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
                <p className={`chat__message ${true && "chat__receiver"}`}>
                    <span className="chat__name">Ayan Chax</span>
                    Hey guys
                    <span className="chat__timestamp">
                        4:36pm
                    </span>
                </p>
                <p className="chat__message">
                    <span className="chat__name">Dane Saw</span>
                    What's up
                    <span className="chat__timestamp">
                        5:36pm
                    </span>
                </p>
                <p className="chat__message">
                    <span className="chat__name">John Doe</span>
                    What are you upto mate
                    <span className="chat__timestamp">
                        5:37pm
                    </span>
                </p>

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
