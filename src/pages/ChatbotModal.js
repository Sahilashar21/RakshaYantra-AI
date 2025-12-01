// import React, { useState } from "react";

// const ChatbotModal = () => {
//     const [chatbotUrl, setChatbotUrl] = useState("");
//     const [showModal, setShowModal] = useState(false);

//     // Open chatbot in a modal
//     const openChatbot = () => {
//         const chatUrl = `https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/26/15/20250226152148-VV6BMUPY.json`;
//         setChatbotUrl(chatUrl);
//         setShowModal(true);
//     };

//     // Close the modal
//     const closeModal = () => {
//         setShowModal(false);
//         setChatbotUrl("");
//     };

//     return (
//         <>
//             {/* Floating Chatbot Bubble */}
//             <div
//                 style={{
//                     position: "fixed",
//                     bottom: "20px",
//                     right: "20px",
//                     zIndex: 1000,
//                 }}
//             >
//                 <button
//                     onClick={openChatbot}
//                     style={{
//                         backgroundColor: "#007BFF",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "50%",
//                         width: "60px",
//                         height: "60px",
//                         cursor: "pointer",
//                         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//                         fontSize: "24px",
//                     }}
//                 >
//                     💬
//                 </button>
//             </div>

//             {/* Chatbot Modal */}
//             {showModal && (
//                 <div
//                     style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         zIndex: 1000,
//                     }}
//                 >
//                     <div
//                         style={{
//                             backgroundColor: "#fff",
//                             padding: "20px",
//                             borderRadius: "10px",
//                             width: "80%",
//                             maxWidth: "600px",
//                             maxHeight: "80vh",
//                             overflow: "auto",
//                         }}
//                     >
//                         <h3>Chatbot Quiz</h3>
//                         <iframe
//                             src={chatbotUrl}
//                             style={{
//                                 width: "100%",
//                                 height: "400px",
//                                 border: "none",
//                                 borderRadius: "10px",
//                             }}
//                         ></iframe>
//                         <button
//                             onClick={closeModal}
//                             style={{
//                                 marginTop: "10px",
//                                 padding: "10px 15px",
//                                 backgroundColor: "#dc3545",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "5px",
//                                 cursor: "pointer",
//                             }}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default ChatbotModal;


import React, { useState } from "react";

const ChatbotBubble = () => {
    const [show, setShow] = useState(false);
    const chatUrl =
        "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/26/15/20250226152148-VV6BMUPY.json";

    return (
        <>
            {/* Bubble */}
            <div style={bubbleStyle} onClick={() => setShow(true)}>
                🤖
            </div>

            {/* Modal */}
            {show && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h3>RakshaYantra Assistant</h3>

                        <iframe src={chatUrl} style={frameStyle}></iframe>

                        <button style={closeBtn} onClick={() => setShow(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

const bubbleStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#0b72ec",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    fontSize: "30px",
    zIndex: 999,
};

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflow: "auto",
};

const frameStyle = {
    width: "100%",
    height: "60vh",
    border: "none",
    borderRadius: "10px",
};

const closeBtn = {
    marginTop: "10px",
    background: "#d9534f",
    padding: "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};

export default ChatbotBubble;
