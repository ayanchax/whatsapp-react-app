import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";
import db from './firebase';
import { Link } from "react-router-dom";
function SidebarChat({ addNewChat, id, name }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (id) {
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }

    }, [id]);
    const createChat = () => {
        console.log("Create chat")
        const userName = prompt("Please enter name for new chat room");
        if (userName) {
            //do some stuff here
            db.collection("rooms").add({
                name: userName
            })
        }
    }
    const text_truncate = (str, length, ending) => {
        try {
            if (length == null) {
                length = 100;
            }
            if (ending == null) {
                ending = '...';
            }
            if (str.length > length) {
                return str.substring(0, length - ending.length) + ending;
            } else {
                return str;
            }
        }
        catch (e) {
            return str;
        }

    };
    return !addNewChat ? (
        // make the sidebar chat preview clickable by linking with react router dom and change the url without refreshing
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                {/* get random avatar from free api dice bear */}
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{text_truncate(messages[0]?.message, 20)}</p>
                </div>
            </div>
        </Link>

    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
