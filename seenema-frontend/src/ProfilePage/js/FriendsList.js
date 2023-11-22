import "../css/UserProfilePage.css";

const FriendsList = ({ friendsList }) => {
    return (
        <div className="main-container">
            <h3>Friends List</h3>
            <hr />
            <ul className="list-group">
                {friendsList.map((friend) => (
                    <li key={friend} className="list-group-item "
                        style={{backgroundColor: "rgba(149,148,153,0.94)", borderColor: "#F1FAEE"}}>{friend}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
