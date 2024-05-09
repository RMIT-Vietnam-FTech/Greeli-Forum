import React, { useState, useEffect } from "react"

const Conversation = ({data, currentUserId}) => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId);
        console.log(userId)
        const getUserData = async () => {

        }
    }, [])
    return (
        <div>

        </div>
    )
}

export default Conversation