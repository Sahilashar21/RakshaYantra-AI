// // // import React, { useEffect, useState } from "react";
// // // import api from "../api.js"

// // // export default function InboxPage() {
// // //   const [emails, setEmails] = useState([]);
// // //   const [selected, setSelected] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   //  FETCH EMAILS FROM BACKEND
// // //   useEffect(() => {
// // //     api.get("/emails")
// // //       .then(res => {
// // //         setEmails(res.data);
// // //         setSelected(res.data[0]);
// // //         setLoading(false);
// // //       })
// // //       .catch(err => {
// // //         console.error("ERROR FETCHING EMAILS:", err);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   if (loading) return <h2 style={{ padding: "20px" }}>Loading inbox...</h2>;

// // //   return (
// // //     <div style={{ display: "flex", height: "100vh" }}>

// // //       {/* LEFT SIDEBAR */}
// // //       <div style={{
// // //         width: "30%",
// // //         borderRight: "1px solid #ccc",
// // //         overflowY: "auto",
// // //         background: "#fff"
// // //       }}>
// // //         <h2 style={{ padding: "20px", margin: 0 }}>Inbox</h2>

// // //         {emails.map(email => (
// // //           <div
// // //             key={email.id}
// // //             onClick={() => setSelected(email)}
// // //             style={{
// // //               padding: "15px",
// // //               borderBottom: "1px solid #eee",
// // //               background: selected?.id === email.id ? "#e0f2ff" : "#fff",
// // //               cursor: "pointer"
// // //             }}
// // //           >
// // //             <h4 style={{ marginBottom: "5px" }}>{email.subject}</h4>
// // //             <p style={{ margin: 0 }}>{email.from}</p>
// // //             <small>{email.date}</small>
// // //           </div>
// // //         ))}

// // //         {/* LOGIN BUTTON */}
// // //         <div style={{ padding: "20px" }}>
// // //           <a href="http://localhost:5000/auth/login">
// // //             <button style={{
// // //               width: "100%",
// // //               padding: "10px",
// // //               background: "#4285F4",
// // //               color: "white",
// // //               border: "none",
// // //               borderRadius: "5px",
// // //               marginTop: "20px",
// // //               cursor: "pointer"
// // //             }}>
// // //               Login with Google
// // //             </button>
// // //           </a>
// // //         </div>
// // //       </div>

// // //       {/* RIGHT PANEL */}
// // //       <div style={{ width: "70%", padding: "30px", background: "#f8f9fc" }}>
// // //         {selected ? (
// // //           <>
// // //             <h2>{selected.subject}</h2>
// // //             <p>{selected.from}</p>
// // //             <i>{selected.date}</i>
// // //             <hr />

// // //             <p style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
// // //               {selected.body || "No message body found"}
// // //             </p>
// // //           </>
// // //         ) : (
// // //           <h2>Select an email</h2>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import api from "../api";

// // export default function InboxPage() {
// //   const [emails, setEmails] = useState([]);
// //   const [selected, setSelected] = useState(null);
// //   const [body, setBody] = useState("");
// //   const [links, setLinks] = useState([]);
// //   const [loading, setLoading] = useState(true);


// //   // LOAD INBOX
// //   useEffect(() => {
// //     api.get("/emails")
// //       .then(res => {
// //         setEmails(res.data);
// //         setLoading(false);

// //         if (res.data.length > 0) {
// //           loadFullEmail(res.data[0].id, res.data[0]);
// //         }
// //       })
// //       .catch(err => {
// //         console.error("INBOX LOAD ERROR:", err);
// //         setLoading(false);
// //       });
// //   }, []);


// //   // LOAD FULL EMAIL BODY + LINKS
// //   const loadFullEmail = (id, emailMeta) => {
// //     setSelected(emailMeta);

// //     api.get(`/email/${id}`)
// //       .then(res => {
// //         setBody(res.data.body || "");
// //         setLinks(res.data.links || []);
// //       })
// //       .catch(err => console.error("EMAIL BODY ERROR:", err));
// //   };


// //   if (loading)
// //     return <h2 style={{ padding: "20px" }}>Loading inbox...</h2>;


// //   return (
// //     <div style={{ display: "flex", height: "100vh" }}>

// //       {/* LEFT SIDEBAR */}
// //       <div style={{
// //         width: "30%",
// //         borderRight: "1px solid #ccc",
// //         overflowY: "auto"
// //       }}>
// //         <h2 style={{ padding: "20px" }}>Inbox</h2>

// //         {/* LOGIN BUTTON */}
// //         <a href="http://localhost:5000/auth/login">
// //           <button style={{
// //             margin: "10px 20px",
// //             width: "80%",
// //             background: "#4285F4",
// //             color: "white",
// //             padding: "10px",
// //             borderRadius: "5px",
// //             border: "none"
// //           }}>
// //             Login with Google
// //           </button>
// //         </a>

// //         {/* EMAIL LIST */}
// //         {emails.map(email => (
// //           <div
// //             key={email.id}
// //             onClick={() => loadFullEmail(email.id, email)}
// //             style={{
// //               padding: "15px",
// //               cursor: "pointer",
// //               borderBottom: "1px solid #eee",
// //               background: selected?.id === email.id ? "#e0f2ff" : "#fff"
// //             }}
// //           >
// //             <h4>{email.subject}</h4>
// //             <p>{email.from}</p>
// //             <small>{email.date}</small>
// //           </div>
// //         ))}
// //       </div>


// //       {/* RIGHT PANEL */}
// //       <div style={{ width: "70%", padding: "30px" }}>
// //         {selected ? (
// //           <>
// //             <h2>{selected.subject}</h2>
// //             <p>{selected.from}</p>
// //             <i>{selected.date}</i>

// //             <hr />

// //             {/* EMAIL BODY */}
// //             <pre style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
// //               {body || "No body found"}
// //             </pre>

// //             <hr />

// //             {/* EXTRACTED LINKS */}
// //             <h3>Links Found:</h3>
// //             {links.length === 0 && <p>No links detected</p>}

// //             <ul>
// //               {links.map((link, i) => (
// //                 <li key={i}>
// //                   <a href={link} target="_blank" rel="noreferrer">
// //                     {link}
// //                   </a>
// //                 </li>
// //               ))}
// //             </ul>
// //           </>
// //         ) : (
// //           <h2>Select an email</h2>
// //         )}
// //       </div>

// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import api from "../api";
// import '../inbox.css';
// export default function InboxPage() {
//   const [emails, setEmails] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [body, setBody] = useState("");
//   const [links, setLinks] = useState([]);
//   const [scans, setScans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load inbox
//   useEffect(() => {
//     api.get("/emails")
//       .then(res => {
//         setEmails(res.data);
//         setLoading(false);

//         if (res.data.length > 0) {
//           loadFullEmail(res.data[0].id, res.data[0]);
//         }
//       })
//       .catch(err => {
//         console.error("INBOX LOAD ERROR:", err);
//       });
//   }, []);

//   // Load full body + links + scan results
//   const loadFullEmail = (id, emailMeta) => {
//     setSelected(emailMeta);

//     api.get(`/email/${id}`)
//       .then(res => {
//         setBody(res.data.body || "");
//         setLinks(res.data.links || []);
//         setScans(res.data.scans || []);
//       })
//       .catch(err => console.error("EMAIL BODY ERROR:", err));
//   };


//   return (
//     <div style={{ display: "flex", height: "100vh" }}>

//       {/* LEFT: Inbox List */}
//       <div style={{
//         width: "30%",
//         borderRight: "1px solid #ccc",
//         overflowY: "auto"
//       }}>
//         <h2 style={{ padding: 20 }}>Inbox</h2>

//         <a href="http://localhost:5000/auth/login">
//           <button style={{
//             margin: 20,
//             width: "80%",
//             background: "#4285F4",
//             color: "#fff",
//             padding: 10,
//             borderRadius: 5,
//             border: "none"
//           }}>Login With Google</button>
//         </a>

//         {emails.map(email => (
//           <div
//             key={email.id}
//             onClick={() => loadFullEmail(email.id, email)}
//             style={{
//               padding: 15,
//               borderBottom: "1px solid #eee",
//               cursor: "pointer",
//               background: selected?.id === email.id ? "#e3f3ff" : "#fff"
//             }}
//           >
//             <h4>{email.subject}</h4>
//             <p>{email.from}</p>
//             <small>{email.date}</small>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT: Full Email */}
//       <div style={{ width: "70%", padding: 30 }}>
//         {selected ? (
//           <>
//             <h2>{selected.subject}</h2>
//             <p>{selected.from}</p>
//             <i>{selected.date}</i>
//             <hr />

//             {/* Body */}
//             <div dangerouslySetInnerHTML={{ __html: body }} />

//             <hr />

//             {/* Links */}
//             <h3>Extracted Links:</h3>
//             {links.length === 0 ? <p>No links found</p> : null}
//             <ul>
//               {links.map((l, i) => (
//                 <li key={i}>
//                   <a href={l} target="_blank" rel="noreferrer">{l}</a>
//                 </li>
//               ))}
//             </ul>

//             {/* Scan Results */}
//             <h3>Scan Results:</h3>
//             {scans.map((s, i) => (
//               <div key={i} style={{ marginBottom: 10 }}>
//                 <b>{s.link}</b><br />
//                 {s.safe ? (
//                   <span style={{ color: "green" }}>SAFE ✓</span>
//                 ) : (
//                   <span style={{ color: "red" }}>
//                     DANGEROUS — {s.threat}
//                   </span>
//                 )}
//               </div>
//             ))}

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
  const [urlScans, setUrlScans] = useState([]);

  const [attachments, setAttachments] = useState([]);
  const [attachmentScans, setAttachmentScans] = useState([]);

  const [isPhishing, setIsPhishing] = useState(false);
  const [phishingReasons, setPhishingReasons] = useState([]);

  // Load inbox on startup
  useEffect(() => {
    api.get("/emails")
      .then(res => {
        setEmails(res.data);

        if (res.data.length > 0) {
          loadEmail(res.data[0].id, res.data[0]);
        }
      })
      .catch(err => console.error("Inbox error:", err));
  }, []);

  // Load full email (body + scans + attachments)
  const loadEmail = (id, emailMeta) => {
    setSelected(emailMeta);

    api.get(`/email/${id}`)
      .then(res => {
        setBody(res.data.body);
        setLinks(res.data.links || []);
        setUrlScans(res.data.urlScans || []);
        setAttachments(res.data.attachments || []);
        setAttachmentScans(res.data.attachmentScans || []);

        // PHISHING DETECTION LOGIC
        let danger = false;
        let reasons = [];

        res.data.urlScans?.forEach(s => {
          if (!s.googleSafe) {
            danger = true;
            reasons.push("Google Safe Browsing flagged: " + s.googleThreat);
          }
          if (s.vtMalicious > 0) {
            danger = true;
            reasons.push(`${s.vtMalicious} engines flagged URL as malicious`);
          }
          if (s.vtSuspicious > 2) {
            danger = true;
            reasons.push(`${s.vtSuspicious} engines flagged URL as suspicious`);
          }
        });

        res.data.attachmentScans?.forEach(a => {
          if (a.vtMalicious > 0) {
            danger = true;
            reasons.push(`${a.filename}: ${a.vtMalicious} engines flagged file as malicious`);
          }
          if (a.vtSuspicious > 2) {
            danger = true;
            reasons.push(`${a.filename}: suspicious file behavior`);
          }
        });

        setIsPhishing(danger);
        setPhishingReasons(reasons);

      })
      .catch(err => console.error("Email load error:", err));
  };


  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT SIDEBAR LIST */}
      <div style={{
        width: "30%",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
        background: "#fafafa"
      }}>
        <h2 style={{ padding: 20 }}>Inbox</h2>

        <a href="http://localhost:5000/auth/login">
          <button style={{
            margin: 20,
            width: "80%",
            padding: 10,
            background: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}>
            Login with Google
          </button>
        </a>

        {emails.map(e => (
          <div
            key={e.id}
            onClick={() => loadEmail(e.id, e)}
            style={{
              padding: 15,
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              background: selected?.id === e.id ? "#dceeff" : "#fff"
            }}
          >
            <b>{e.subject}</b><br />
            <small>{e.from}</small><br />
            <small>{e.date}</small>
          </div>
        ))}
      </div>


      {/* RIGHT PANEL */}
      <div style={{ padding: 20, width: "70%", overflowY: "auto" }}>

        {!selected && <h3>Select an email</h3>}

        {selected && (
          <>
            <h2>{selected.subject}</h2>
            <p>{selected.from}</p>
            <hr />

            {/* PHISHING WARNING BANNER */}
            {isPhishing && (
              <div style={{
                background: "#ffdddd",
                border: "2px solid red",
                padding: "15px",
                borderRadius: 8,
                marginBottom: 20
              }}>
                <h3 style={{ color: "red", margin: 0 }}>⚠ PHISHING DETECTED</h3>
                <p>This email contains unsafe or malicious content.</p>

                <ul>
                  {phishingReasons.map((r, i) => (
                    <li key={i} style={{ color: "darkred" }}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* BODY */}
            <div dangerouslySetInnerHTML={{ __html: body }} />
            <hr />


            {/* LINKS */}
            <h3>Links Found</h3>
            {links.length === 0 && <p>No links found</p>}

            <ul>
              {links.map((l, i) => (
                <li key={i}>
                  <a href={l} target="_blank" rel="noreferrer">
                    {l}
                  </a>
                </li>
              ))}
            </ul>


            {/* URL SCANS */}
            <h3>URL Scan Results</h3>

            {urlScans.map((s, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <b>{s.link}</b><br />

                Google Safe: {s.googleSafe ? "Yes" : "No"}<br />

                {s.vtMalicious > 0 ? (
                  <span style={{ color: "red" }}>
                    Malicious: {s.vtMalicious} engines
                  </span>
                ) : (
                  <span style={{ color: "green" }}>
                    Clean (0 malicious engines)
                  </span>
                )}

                <br />

                {s.vtSuspicious > 0 && (
                  <span style={{ color: "orange" }}>
                    Suspicious: {s.vtSuspicious} engines
                  </span>
                )}
              </div>
            ))}


            {/* ATTACHMENTS */}
            <hr />
            <h3>Attachments</h3>

            {attachments.length === 0 && <p>No attachments found</p>}

            <ul>
              {attachments.map((a, i) => (
                <li key={i}>
                  {a.filename} ({a.mimeType}) — {a.size} bytes
                </li>
              ))}
            </ul>


            {/* ATTACHMENT SCANS */}
            <h3>Attachment Scan Results</h3>

            {attachmentScans.length === 0 && attachments.length > 0 && (
              <p>Found attachments but not scanned (limit or error).</p>
            )}

            {attachmentScans.map((a, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <b>{a.filename}</b><br />

                {a.vtMalicious > 0 ? (
                  <span style={{ color: "red" }}>
                    Malicious: {a.vtMalicious} engines
                  </span>
                ) : (
                  <span style={{ color: "green" }}>
                    Clean (0 malicious engines)
                  </span>
                )}

                <br />

                {a.vtSuspicious > 0 && (
                  <span style={{ color: "orange" }}>
                    Suspicious: {a.vtSuspicious}
                  </span>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
