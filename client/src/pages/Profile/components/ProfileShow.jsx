import { IoMdNotificationsOutline } from "react-icons/io";

const ProfileShow = (props) => {
	return (
		<div
			className="d-flex flex-row profile-show"
			role="region"
			aria-label="Profile Information"
		>
			<img
				src={props.imgURL}
				alt={`${props.userName} Avatar`}
				className="rounded-circle"
			/>
			<div className="d-flex flex-column justify-content-around">
				<div>
					<h2 className="text-white">{props.userName}</h2>
					<div className="d-flex flex-row align-items-center">
						<div
							className="py-1 bg-primary-yellow text-white text-center rounded-pill role-container"
							role="status"
							aria-label={`Role: ${props.role}`}
						>
							{props.role}
						</div>
						<IoMdNotificationsOutline
							size={32}
							color={"white"}
							className="noti-icon"
							aria-label="Notifications"
							role="button"
							tabIndex={0}
						/>
					</div>
				</div>
				<div className="d-flex flex-row text-white text-center justify-content-between w-80 profile-figures">
					<div
						className="d-flex flex-column w-auto"
						role="status"
						aria-label={`${props.threadsNum} Threads`}
					>
						<p className="fw-bold my-0">{props.threadsNum}</p>
						<p className="fw-light my-0">Threads</p>
					</div>
					<div
						className="d-flex flex-column w-auto"
						role="status"
						aria-label={`${props.postsNum} Posts`}
					>
						<p className="fw-bold my-0">{props.postsNum}</p>
						<p className="fw-light my-0">Posts</p>
					</div>
					<div
						className="d-flex flex-column w-auto"
						role="status"
						aria-label={`Joined on ${props.joinedDate}`}
					>
						<p className="fw-bold my-0">{props.joinedDate}</p>
						<p className="fw-light my-0">Joined Date</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileShow;
