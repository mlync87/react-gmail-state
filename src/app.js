import { useState } from "react";
import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);

  const toggleRead = (target) => {
    const updatedRead = emails.map((email) =>
      email === target ? { ...email, read: !email.read } : email
    );
    setEmails(updatedRead);
  };

  const toggleStar = (target) => {
    const updatedStar = emails.map((email) =>
      email === target ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedStar);
  };

  const [hideRead, setHideRead] = useState(false);

  const getEmails = (hideRead) => {
    if (hideRead === false) {
      return emails;
    }

    const updatedEmails = emails.filter((email) => email.read === false);
    return updatedEmails;
  };

  const updatedEmails = getEmails(hideRead);

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onClick={() => {
                setHideRead(!hideRead);
              }}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {updatedEmails.map((email) => {
          return (
            <li
              className={email.read ? "email read" : "email unread"}
              key={email.id}
            >
              <div className="select">
                <input
                  onClick={() => toggleRead(email)}
                  checked={email.read}
                  classname="select-checkbox"
                  type="checkbox"
                />
              </div>
              <div className="star">
                <input
                  onClick={() => {
                    toggleStar(email);
                  }}
                  className="star-checkbox"
                  type="checkbox"
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
