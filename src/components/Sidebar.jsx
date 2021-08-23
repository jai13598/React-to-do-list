import React from 'react'
import { FaInbox, FaRegCalendarCheck, FaRegCalendar } from "react-icons/fa"
function Sidebar({ selectedTab, setselectedTab }) {
    return (
        <div className="sidebar">
            <div className={`active`} onClick={() => setselectedTab("INBOX")}>
                <FaInbox className="icon" />
                Inbox
            </div>
            <div onClick={() => setselectedTab("TODAY")} >
                <FaRegCalendarCheck className="icon" />
                Today</div>
            <div onClick={() => setselectedTab("NEXT_7")}>
                <FaRegCalendar className="icon" />
                Next 7 days</div>
        </div >
    )
}

export default Sidebar
