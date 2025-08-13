import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [messages, setMessages] = useState([]);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Listen for questions from FAQ component
    useEffect(() => {
        const handleQuestionClicked = (event) => {
            console.log('Chatbot: Event received!', event.detail);
            const question = event.detail;
            setIsVisible(true);
            console.log('Chatbot: Setting visible to true');

            // Add the question as a user message
            const newMessage = {
                id: messages.length + 1,
                text: question,
                type: 'user'
            };
            setMessages(prev => [...prev, newMessage]);

            // Scroll to chatbot after a short delay to ensure it's rendered
            setTimeout(() => {
                const chatbotElement = document.querySelector('.chatbot-container');
                if (chatbotElement) {
                    chatbotElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                }
            }, 300);
        };

        console.log('Chatbot: Adding event listener');
        window.addEventListener('questionClicked', handleQuestionClicked);

        return () => {
            window.removeEventListener('questionClicked', handleQuestionClicked);
        };
    }, [messages.length]);

    const suggestedQuestions = [
        "WHAT FILE TYPES DOES AOCR SUPPORT?"
    ];

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '54vh',
            backgroundColor: '#000',
            zIndex: 1000,
            padding: '0px 95px 48px 95px'
        },
        box: {
            backgroundColor: '#000',
            borderRadius: '0',
            border: '1px solid #666',
            width: '100%',
            height: '15.25rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            gap: '24px'
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
            fontSize: '12px',
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
            color: '#FFF',
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
            border: '1px solid #FFF',
            borderRadius: '0',
            borderRight: 'none',
            padding: '12px 16px',
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            textTransform: 'uppercase',
            color: '#FFF',
            outline: 'none'
        },
        sendButton: {
            backgroundColor: '#0035DD',
            border: '1px solid #FFF',
            borderLeft: 'none',
            borderRadius: '0',
            width: '40px',
            height: '40px',
            zIndex: '100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
        },
        sendButtonDisabled: {
            backgroundColor: '#FFF',
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
            {isVisible && (
                <div className="chatbot-container" style={styles.container}>
                    <div style={styles.box}>
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
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 0.5C11.2826 0.5 11.9774 1.00078 12.2249 1.74322L13.9829 7.01715L19.2568 8.77512C19.9992 9.0226 20.5 9.7174 20.5 10.5C20.5 11.2826 19.9992 11.9774 19.2568 12.2249L13.9829 13.9829L12.2249 19.2568C11.9774 19.9992 11.2826 20.5 10.5 20.5C9.7174 20.5 9.0226 19.9992 8.77512 19.2568L7.01715 13.9829L1.74322 12.2249C1.00078 11.9774 0.5 11.2826 0.5 10.5C0.5 9.7174 1.00078 9.0226 1.74322 8.77512L7.01715 7.01715L8.77512 1.74322C9.0226 1.00078 9.7174 0.5 10.5 0.5Z" stroke={inputValue.trim() ? "#fff" : "#000"} stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
