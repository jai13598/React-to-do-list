import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Tasks from './Tasks';
function Content() {
    const [selectedTab, setselectedTab] = useState("INBOX")
    return (
        <section className="content">
            <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab} />
            <Tasks />
        </section>


    )
}

export default Content
