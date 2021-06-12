import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from './firebase';
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            // get into the docs list of collection rooms and populate the rooms array in real time whenever there is any change in the db
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }
            )))
        ));
        return () => {
            //cleaning up the db traces once it is done updating the DOM 
            unsubscribe()
        }


    }, []);

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
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton onClick={createChat}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton><MoreVertIcon /></IconButton>

                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat..." />
                </div>

            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />

                {rooms.map(room =>

                (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}



            </div>
        </div>
    )
}

export default Sidebar
