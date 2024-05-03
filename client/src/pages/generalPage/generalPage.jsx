import React from 'react';
import Update from './components/Update';
import News from './components/New';
import Events from './components/Events';

import UpdateData from './data/updateData';
import NewsData from './data/newsData';
import EventsData from './data/eventsData';


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