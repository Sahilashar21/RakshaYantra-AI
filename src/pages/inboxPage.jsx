// import React, { useEffect, useState } from "react";
// import api from "../api.js"

// export default function InboxPage() {
//   const [emails, setEmails] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //  FETCH EMAILS FROM BACKEND
//   useEffect(() => {
//     api.get("/emails")
//       .then(res => {
//         setEmails(res.data);
//         setSelected(res.data[0]);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("ERROR FETCHING EMAILS:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <h2 style={{ padding: "20px" }}>Loading inbox...</h2>;

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>

//       {/* LEFT SIDEBAR */}
//       <div style={{
//         width: "30%",
//         borderRight: "1px solid #ccc",
//         overflowY: "auto",
//         background: "#fff"
//       }}>
//         <h2 style={{ padding: "20px", margin: 0 }}>Inbox</h2>

//         {emails.map(email => (
//           <div
//             key={email.id}
//             onClick={() => setSelected(email)}
//             style={{
//               padding: "15px",
//               borderBottom: "1px solid #eee",
//               background: selected?.id === email.id ? "#e0f2ff" : "#fff",
//               cursor: "pointer"
//             }}
//           >
//             <h4 style={{ marginBottom: "5px" }}>{email.subject}</h4>
//             <p style={{ margin: 0 }}>{email.from}</p>
//             <small>{email.date}</small>
//           </div>
//         ))}

//         {/* LOGIN BUTTON */}
//         <div style={{ padding: "20px" }}>
//           <a href="http://localhost:5000/auth/login">
//             <button style={{
//               width: "100%",
//               padding: "10px",
//               background: "#4285F4",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               marginTop: "20px",
//               cursor: "pointer"
//             }}>
//               Login with Google
//             </button>
//           </a>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div style={{ width: "70%", padding: "30px", background: "#f8f9fc" }}>
//         {selected ? (
//           <>
//             <h2>{selected.subject}</h2>
//             <p>{selected.from}</p>
//             <i>{selected.date}</i>
//             <hr />

//             <p style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
//               {selected.body || "No message body found"}
//             </p>
//           </>
//         ) : (
//           <h2>Select an email</h2>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../api";

export default function InboxPage() {
  const [emails, setEmails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [body, setBody] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);


  // LOAD INBOX
  useEffect(() => {
    api.get("/emails")
      .then(res => {
        setEmails(res.data);
        setLoading(false);

        if (res.data.length > 0) {
          loadFullEmail(res.data[0].id, res.data[0]);
        }
      })
      .catch(err => {
        console.error("INBOX LOAD ERROR:", err);
        setLoading(false);
      });
  }, []);


  // LOAD FULL EMAIL BODY + LINKS
  const loadFullEmail = (id, emailMeta) => {
    setSelected(emailMeta);

    api.get(`/email/${id}`)
      .then(res => {
        setBody(res.data.body || "");
        setLinks(res.data.links || []);
      })
      .catch(err => console.error("EMAIL BODY ERROR:", err));
  };


  if (loading)
    return <h2 style={{ padding: "20px" }}>Loading inbox...</h2>;


  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT SIDEBAR */}
      <div style={{
        width: "30%",
        borderRight: "1px solid #ccc",
        overflowY: "auto"
      }}>
        <h2 style={{ padding: "20px" }}>Inbox</h2>

        {/* LOGIN BUTTON */}
        <a href="http://localhost:5000/auth/login">
          <button style={{
            margin: "10px 20px",
            width: "80%",
            background: "#4285F4",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none"
          }}>
            Login with Google
          </button>
        </a>

        {/* EMAIL LIST */}
        {emails.map(email => (
          <div
            key={email.id}
            onClick={() => loadFullEmail(email.id, email)}
            style={{
              padding: "15px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              background: selected?.id === email.id ? "#e0f2ff" : "#fff"
            }}
          >
            <h4>{email.subject}</h4>
            <p>{email.from}</p>
            <small>{email.date}</small>
          </div>
        ))}
      </div>


      {/* RIGHT PANEL */}
      <div style={{ width: "70%", padding: "30px" }}>
        {selected ? (
          <>
            <h2>{selected.subject}</h2>
            <p>{selected.from}</p>
            <i>{selected.date}</i>

            <hr />

            {/* EMAIL BODY */}
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
              {body || "No body found"}
            </pre>

            <hr />

            {/* EXTRACTED LINKS */}
            <h3>Links Found:</h3>
            {links.length === 0 && <p>No links detected</p>}

            <ul>
              {links.map((link, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2>Select an email</h2>
        )}
      </div>

    </div>
  );
}
