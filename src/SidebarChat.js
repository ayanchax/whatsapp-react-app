import React from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";
import db from './firebase';
import { Link } from "react-router-dom";
function SidebarChat({ addNewChat, id, name }) {
    // const [seed, setSeed] = useState("");
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000));
    // }, []);
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
    return !addNewChat ? (
        // make the sidebar chat preview clickable by linking with react router dom and change the url without refreshing
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                {/* get random avatar from free api dice bear */}
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>Last message..</p>
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
