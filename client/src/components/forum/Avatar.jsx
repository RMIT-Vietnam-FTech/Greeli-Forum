export default function Avatar({ src, username }) {
	let isNull;
	if (src == null) {
		isNull = true;
	} else {
		isNull = false;
	}
	return (
		<div tabIndex={0} aria-label="avatar image" className="avatar">
			{isNull ? null : <img alt={username} src={src} className="w-100 h-100" />}
		</div>
	);
}
