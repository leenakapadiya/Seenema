// FriendsList.js
import React, { useState } from "react";
import Lottie from "lottie-react";
import Loading from "../assets/loading.json";
import "./UserProfilePage.css";

const FriendsList = ({ friendEmail, setFriendEmail, handleAddFriend, loading, friendsList }) => {
    return (
        <div className="main-container">
            <h3>Friends List</h3>
            <hr/>
            <ul>
                {Array.from(friendsList).map((friend, index) => (
                    <li key={index}>{friend}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
