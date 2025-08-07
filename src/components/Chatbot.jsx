import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR. AC QUIS PELLENTESQUE NISI CONVALLIS NUNC. SIT CONSECTETUR VESTIBULUM EU SEM AMET ET. LACINIA ID AMET CRAS ARCU MI LECTUS TELLUS NEQUE. NISI EGET EGET EU AT TRISTIQUE ARCU URNA LACUS. SCELERISQUE ORNARE IN ELEMENTUM ID. VIVERRA ID AC NULLAM RHONCUS VITAE. NON EU TINCIDUNT FACILISIS IN NIBH LOREM NEC. ERAT PHASELLUS MALESUADA ET VITAE. QUIS AENEAN SED MORBI EST VITAE.",
            type: 'bot'
        }
    ]);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const suggestedQuestions = [
        "WHAT FILE TYPES DOES AOCR SUPPORT?"
    ];

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#000',
        },
        box: {
            backgroundColor: '#f5f5dc',
            border: '1px solid #000',
            borderRadius: '0',
            width: '100%',
            maxWidth: '61.8125rem',
            height: '23.25rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            gap: '24px'
        },
        suggestedQuestions: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '16px'
        },
        suggestedQuestion: {
            background: 'none',
            border: 'none',
            color: '#000',
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            textTransform: 'uppercase',
            textAlign: 'left',
            cursor: 'pointer',
            padding: '8px 0',
            transition: 'color 0.2s ease'
        },
        messagesSection: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto',
            height: '300px',
            maxHeight: '300px',
            marginBottom: '16px'
        },
        message: {
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '1.5',
            wordWrap: 'break-word'
        },
        botMessage: {
            color: '#4169e1',
            textTransform: 'uppercase',
            textAlign: 'left'
        },
        userMessage: {
            color: '#000',
            textTransform: 'uppercase',
            textAlign: 'left'
        },
        inputSection: {
            display: 'flex',
            gap: '0',
            alignItems: 'center',
            marginTop: 'auto'
        },
        input: {
            flex: 1,
            background: 'none',
            border: '1px solid #000',
            borderRadius: '0',
            borderRight: 'none',
            padding: '12px 16px',
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            textTransform: 'uppercase',
            color: '#000',
            outline: 'none'
        },
        sendButton: {
            backgroundColor: '#0035DD',
            border: '1px solid #000',
            borderLeft: 'none',
            borderRadius: '0',
            width: '40px',
            height: '43px',
            zIndex: '100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
        },
        sendButtonDisabled: {
            backgroundColor: '#ccc',
            cursor: 'not-allowed'
        }
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputValue.toUpperCase(),
                type: 'user'
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSuggestedQuestion = (question) => {
        const newMessage = {
            id: messages.length + 1,
            text: question,
            type: 'user'
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.box}>
                    {/* Suggested Questions Section */}
                    <div style={styles.suggestedQuestions}>
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                style={styles.suggestedQuestion}
                                onClick={() => handleSuggestedQuestion(question)}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#4169e1';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#000';
                                }}
                            >
                                {question}
                            </button>
                        ))}
                    </div>

                    {/* Messages Section */}
                    <div style={styles.messagesSection} className="chatbot-messages" ref={messagesContainerRef}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                style={{
                                    ...styles.message,
                                    ...(message.type === 'user' ? styles.userMessage : styles.botMessage)
                                }}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Section */}
                    <div style={styles.inputSection}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="ASK ANY QUESTIONS"
                            style={styles.input}
                        />
                        <button
                            style={{
                                ...styles.sendButton,
                                ...(inputValue.trim() ? {} : styles.sendButtonDisabled)
                            }}
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            onMouseEnter={(e) => {
                                if (inputValue.trim()) {
                                    e.target.style.backgroundColor = '#0028b0';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (inputValue.trim()) {
                                    e.target.style.backgroundColor = '#0035DD';
                                }
                            }}
                        >
                            <img src="/star.svg" alt="star" width="21" height="21" />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .chatbot-messages::-webkit-scrollbar {
                    width: 8px;
                }
                
                .chatbot-messages::-webkit-scrollbar-track {
                    background: #f5f5dc;
                }
                
                .chatbot-messages::-webkit-scrollbar-thumb {
                    background: #4169e1;
                    border-radius: 4px;
                }
                
                .chatbot-messages::-webkit-scrollbar-thumb:hover {
                    background: #3151b0;
                }
            `}</style>
        </>
    );
};

export default Chatbot;
