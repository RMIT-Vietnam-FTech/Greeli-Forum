import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";

const UserTest = () => {
	const { user } = useUserContext();
	const userId = JSON.parse(user).id;
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUser = () => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/user/${userId}`,
			};
			axios(configuration)
				.then((result) => {
					console.log(result.data.user);
					setUserData(result.data.user);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		};

		fetchUser();
	}, [userId]);

	return (
		<div>
			{/* Display the user's username only when we get the data */}
			<h1>{userData?.username}</h1>
			<p>Email: {userData?.email}</p>
			{/* Add more user details as needed */}
		</div>
	);
};

export default UserTest;
