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


import React, { useState, useEffect } from "react";

const ChatbotBubble = () => {
    const [show, setShow] = useState(false);
    const chatUrl =
        "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/26/15/20250226152148-VV6BMUPY.json";

    // Request microphone permissions when chatbot opens
    useEffect(() => {
        if (show) {
            // Request microphone access for voice features
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then(() => {
                        console.log("Microphone access granted");
                    })
                    .catch((err) => {
                        console.log("Microphone access denied:", err);
                    });
            }
        }
    }, [show]);

    return (
        <>
            {/* Floating Chatbot Bubble */}
            <div 
                style={{
                    ...bubbleStyle,
                    animation: show ? "none" : "float 4s cubic-bezier(0.4, 0, 0.2, 1) infinite"
                }} 
                onClick={() => setShow(true)}
            >
                <span style={{ fontSize: "28px", animation: "rotate 6s linear infinite" }}>🤖</span>
            </div>

            {/* Side Panel Overlay */}
            {show && (
                <div style={overlayStyle} onClick={() => setShow(false)}>
                    {/* Side Panel */}
                    <div 
                        style={{
                            ...sidePanelStyle,
                            animation: "slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div style={panelHeaderStyle}>
                            <h3 style={titleStyle}>RakshaYantra AI</h3>
                            <button 
                                style={closeIconBtn} 
                                onClick={() => setShow(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Iframe Container */}
                        <div style={iframeContainerStyle}>
                            <iframe src={chatUrl} style={frameStyle}></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animations and Styles */}
            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Hide Share Button in Botpress Widget */
                iframe[src*="botpress"] + div [data-share-button],
                iframe[src*="botpress"] ~ div [data-share-button],
                [class*="share"] {
                    display: none !important;
                }

                /* Botpress specific styling to hide share */
                button[aria-label*="Share"],
                button[aria-label*="share"],
                [class*="Share"],
                [class*="share"] {
                    display: none !important;
                }

                /* Target Botpress toolbar elements */
                .bp-widget-toolbar [class*="share"],
                .bp-widget [class*="share-button"],
                .bp-widget-actions [class*="share"],
                [data-testid*="share"],
                [aria-label*="Share"] {
                    display: none !important;
                }
            `}</style>
        </>
    );
};

const bubbleStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "linear-gradient(135deg, #00ffc8 0%, #00ccff 50%, #6633ff 100%)",
    color: "white",
    borderRadius: "50%",
    width: "70px",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 15px 40px rgba(0, 255, 200, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2), 0 0 60px rgba(102, 51, 255, 0.3)",
    fontSize: "30px",
    zIndex: 999,
    border: "1px solid rgba(0, 255, 200, 0.3)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 1000,
};

const sidePanelStyle = {
    background: "linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 31, 75, 0.95) 100%)",
    backdropFilter: "blur(25px)",
    height: "100vh",
    width: "500px",
    maxWidth: "90vw",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 80px rgba(0, 255, 200, 0.25), -15px 0 50px rgba(102, 51, 255, 0.2), inset 0 0 60px rgba(0, 255, 200, 0.1)",
    border: "2px solid rgba(0, 255, 200, 0.25)",
    borderLeft: "3px solid rgba(0, 255, 200, 0.4)",
    borderRadius: "0",
    overflow: "hidden",
    position: "relative",
};

const panelHeaderStyle = {
    padding: "25px",
    borderBottom: "2px solid rgba(0, 255, 200, 0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, rgba(0, 255, 200, 0.05) 0%, rgba(102, 51, 255, 0.05) 100%)",
    position: "relative",
};

const titleStyle = {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "900",
    background: "linear-gradient(135deg, #00ffc8 0%, #00ccff 50%, #6633ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
};

const closeIconBtn = {
    background: "rgba(255, 71, 87, 0.15)",
    color: "#ff4757",
    border: "1px solid rgba(255, 71, 87, 0.3)",
    borderRadius: "8px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    padding: 0,
    border: "none",
};

const iframeContainerStyle = {
    flex: 1,
    padding: "0",
    overflow: "hidden",
    position: "relative",
    background: "rgba(15, 20, 40, 0.5)",
};

const frameStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "0",
};

export default ChatbotBubble;
