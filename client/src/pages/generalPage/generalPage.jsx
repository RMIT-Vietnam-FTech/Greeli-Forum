import React from "react";
import Events from "./components/Events";
import News from "./components/New";
import Update from "./components/Update";

import EventsData from "./data/eventsData";
import NewsData from "./data/newsData";
import UpdateData from "./data/updateData";

function GeneralPage() {
	return (
		<>
			<Update data={UpdateData} />
			<News data={NewsData} />
			<Events data={EventsData} />
		</>
	);
}

export default GeneralPage;
