import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ selectedQuestion, chatbotResponse }) => (
    <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        maxWidth: '400px',
        background: selectedQuestion ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        border: selectedQuestion ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        backdropFilter: selectedQuestion ? 'blur(10px)' : 'none'
    }}>
        {selectedQuestion && (
            <div style={{ marginBottom: '10px' }}>
                <div style={{
                    fontSize: '10px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Question:
                </div>
                <div style={{
                    fontSize: '11px',
                    color: 'white',
                    marginBottom: '15px',
                    lineHeight: '1.4'
                }}>
                    {selectedQuestion}
                </div>
                <div style={{
                    fontSize: '10px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Answer:
                </div>
                <div style={{
                    fontSize: '11px',
                    color: 'white',
                    lineHeight: '1.4'
                }}>
                    {chatbotResponse}
                </div>
            </div>
        )}
    </div>
);

const AnimatedFAQDiagram = () => {
    console.log('AnimatedFAQDiagram component rendering...');

    const [currentStep, setCurrentStep] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const [focusedBox, setFocusedBox] = useState(null);
    const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [chatbotResponse, setChatbotResponse] = useState(null);
    const [visibleQuestions, setVisibleQuestions] = useState({
        leftQuestions: [],
        rightQuestions: [],
        leftConnectors: [],
        rightConnectors: []
    });

    // Navigation state management
    const [navigationHistory, setNavigationHistory] = useState([{ type: 'faq', label: 'FAQ' }]);
    const [currentNavIndex, setCurrentNavIndex] = useState(0);

    console.log('State initialized:', { currentStep, isVisible, focusedBox });

    // Question sets for each info-box - moved here to avoid reference before declaration
    const questionSets = {
        'data-structuring-left': {
            leftQuestions: [
                'What file types does AOCR support?',
                'How to upload documents in bulk?',
                'Can AOCR process handwritten text?',
                'What is the maximum file size limit?',
                'Does AOCR support multi-language OCR?'
            ],
            rightQuestions: [
                'How accurate is the text extraction?',
                'Can AOCR handle complex layouts?',
                'What output formats are available?',
                'How to batch process documents?',
                'Is there an API for integration?'
            ]
        },
        'security-compliance-left': {
            leftQuestions: [
                'Is my data secure with AOCR?',
                'What compliance standards does AOCR meet?',
                'How is data encrypted during processing?',
                'Can I control data retention policies?',
                'Is AOCR GDPR compliant?'
            ],
            rightQuestions: [
                'What audit logs are available?',
                'How to set up user permissions?',
                'Is there two-factor authentication?',
                'Can I deploy AOCR on-premises?',
                'What backup and recovery options exist?'
            ]
        },
        'llm-integration-left': {
            leftQuestions: [
                'Which LLMs does AOCR integrate with?',
                'How to configure custom AI models?',
                'Can I use my own trained models?',
                'What AI features are available?',
                'How to improve extraction accuracy?'
            ],
            rightQuestions: [
                'Can AOCR summarize extracted content?',
                'How to set up automated workflows?',
                'What natural language processing features exist?',
                'Can I extract specific data fields?',
                'How to train custom recognition models?'
            ]
        },
        'data-structuring-right': {
            leftQuestions: [
                'How does AOCR structure extracted data?',
                'Can I customize output schemas?',
                'What data validation features exist?',
                'How to export structured data?',
                'Can AOCR detect document types?'
            ],
            rightQuestions: [
                'How to map data to existing systems?',
                'What database integrations are supported?',
                'Can AOCR handle form recognition?',
                'How to set up data transformation rules?',
                'What quality control features exist?'
            ]
        },
        'security-compliance-right': {
            leftQuestions: [
                'How to implement enterprise security?',
                'What monitoring tools are available?',
                'Can I set up custom security policies?',
                'How to manage user access controls?',
                'What encryption methods are used?'
            ],
            rightQuestions: [
                'How to configure compliance reporting?',
                'What data residency options exist?',
                'Can I integrate with existing security tools?',
                'How to set up automated compliance checks?',
                'What incident response procedures exist?'
            ]
        },
        'llm-integration-right': {
            leftQuestions: [
                'How to optimize AI model performance?',
                'Can I use multiple LLMs simultaneously?',
                'What prompt engineering features exist?',
                'How to monitor AI processing costs?',
                'Can I fine-tune models for my use case?'
            ],
            rightQuestions: [
                'How to implement intelligent document routing?',
                'What content analysis features are available?',
                'Can AOCR generate insights from documents?',
                'How to set up automated content classification?',
                'What machine learning capabilities exist?'
            ]
        }
    };

    const addToNavigationHistory = useCallback((item) => {
        setNavigationHistory(prev => {
            // Remove any items after current index (for proper forward navigation)
            const newHistory = prev.slice(0, currentNavIndex + 1);
            
            // Check if the last item is the same type and content to avoid duplicates
            const lastItem = newHistory[newHistory.length - 1];
            if (lastItem && lastItem.type === item.type && lastItem.label === item.label) {
                // Update the existing item instead of adding a new one
                newHistory[newHistory.length - 1] = item;
                return newHistory;
            }
            
            // Add new item if it's different
            newHistory.push(item);
            return newHistory;
        });
        
        // Only increment index if we're actually adding a new item
        setCurrentNavIndex(prev => {
            const currentItem = navigationHistory[prev];
            if (currentItem && currentItem.type === item.type && currentItem.label === item.label) {
                return prev; // Don't increment if we're updating the same item
            }
            return prev + 1;
        });
    }, [currentNavIndex, navigationHistory]);

    const animateQuestionsSequentially = useCallback((boxId) => {
        const questions = questionSets[boxId];
        if (!questions) return;

        // Reset visible questions
        setVisibleQuestions({
            leftQuestions: [],
            rightQuestions: [],
            leftConnectors: [],
            rightConnectors: []
        });

        // Animate left side first
        questions.leftQuestions.forEach((_, index) => {
            setTimeout(() => {
                // Show connector first
                setVisibleQuestions(prev => ({
                    ...prev,
                    leftConnectors: [...prev.leftConnectors, index]
                }));

                // Show question after connector
                setTimeout(() => {
                    setVisibleQuestions(prev => ({
                        ...prev,
                        leftQuestions: [...prev.leftQuestions, index]
                    }));
                }, 150);
            }, index * 300);
        });

        // Animate right side after left side
        const leftDelay = questions.leftQuestions.length * 300;
        questions.rightQuestions.forEach((_, index) => {
            setTimeout(() => {
                // Show connector first
                setVisibleQuestions(prev => ({
                    ...prev,
                    rightConnectors: [...prev.rightConnectors, index]
                }));

                // Show question after connector
                setTimeout(() => {
                    setVisibleQuestions(prev => ({
                        ...prev,
                        rightQuestions: [...prev.rightQuestions, index]
                    }));
                }, 150);
            }, leftDelay + index * 300);
        });
    }, []);

    const navigateBack = useCallback(() => {
        if (currentNavIndex > 0) {
            const newIndex = currentNavIndex - 1;
            setCurrentNavIndex(newIndex);
            const previousState = navigationHistory[newIndex];

            if (previousState.type === 'faq') {
                setFocusedBox(null);
                setSelectedQuestion(null);
                setChatbotResponse(null);
                setVisibleQuestions({
                    leftQuestions: [],
                    rightQuestions: [],
                    leftConnectors: [],
                    rightConnectors: []
                });
            } else if (previousState.type === 'infobox') {
                setFocusedBox(previousState.boxId);
                animateQuestionsSequentially(previousState.boxId);
            }
        }
    }, [currentNavIndex, navigationHistory, animateQuestionsSequentially]);

    const navigateForward = useCallback(() => {
        if (currentNavIndex < navigationHistory.length - 1) {
            const newIndex = currentNavIndex + 1;
            setCurrentNavIndex(newIndex);
            const nextState = navigationHistory[newIndex];

            if (nextState.type === 'infobox') {
                setFocusedBox(nextState.boxId);
                animateQuestionsSequentially(nextState.boxId);
            }
        }
    }, [currentNavIndex, navigationHistory, animateQuestionsSequentially]);



    // Initialize component visibility
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Handle question clicks - send to your external Chatbot.jsx
    const handleQuestionClick = useCallback((question) => {
        console.log('FAQ: Question clicked:', question);
        
        // Dispatch custom event to trigger chatbot
        console.log('FAQ: Dispatching questionClicked event');
        window.dispatchEvent(new CustomEvent('questionClicked', { detail: question }));
        console.log('FAQ: Event dispatched');
        
        // Only add to navigation history if we're not already in an answer state
        const currentState = navigationHistory[currentNavIndex];
        if (currentState.type !== 'answer') {
            addToNavigationHistory({
                type: 'answer',
                label: 'ANSWER',
                question: question
            });
        } else {
            // If we're already in answer state, just update the current entry
            setNavigationHistory(prev => {
                const newHistory = [...prev];
                newHistory[currentNavIndex] = {
                    type: 'answer',
                    label: 'ANSWER',
                    question: question
                };
                return newHistory;
            });
        }
    }, [addToNavigationHistory, navigationHistory, currentNavIndex]);

    const boxes = [
        { id: 'data-structuring-left', label: 'DATA STRUCTURING', position: { x: 178, y: 180 } },
        { id: 'security-compliance-left', label: 'SECURITY & COMPLIANCE', position: { x: 148, y: 240 } },
        { id: 'llm-integration-left', label: 'LLM INTEGRATION', position: { x: 188, y: 300 } },
        { id: 'data-structuring-right', label: 'DATA STRUCTURING', position: { x: 584, y: 180 } },
        { id: 'security-compliance-right', label: 'SECURITY & COMPLIANCE', position: { x: 584, y: 240 } },
        { id: 'llm-integration-right', label: 'LLM INTEGRATION', position: { x: 584, y: 300 } }
    ];



    const connections = [
        {
            svg: `<path d="M0.146446 4.35355C-0.0488129 4.15829 -0.0488129 3.84171 0.146446 3.64645L3.32843 0.464466C3.52369 0.269204 3.84027 0.269204 4.03554 0.464466C4.2308 0.659728 4.2308 0.976311 4.03554 1.17157L1.20711 4L4.03554 6.82843C4.2308 7.02369 4.2308 7.34027 4.03554 7.53553C3.84027 7.7308 3.52369 7.7308 3.32843 7.53553L0.146446 4.35355ZM110.5 75V75.5C85.7324 75.5 70.4615 57.5358 55.3076 39.8251C40.0889 22.0386 24.9837 4.5 0.5 4.5V4V3.5C25.5163 3.5 40.9111 21.4614 56.0674 39.1749C71.2885 56.9642 86.2676 74.5 110.5 74.5V75Z" fill="white"/>`,
            position: { x: 235, y: 202 },
            viewBox: "0 0 111 76",
            id: 'line-1'
        },
        {
            svg: `<path d="M0.646446 4.35355C0.451187 4.15829 0.451187 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53554 0.464466C4.7308 0.659728 4.7308 0.976311 4.53554 1.17157L1.70711 4L4.53554 6.82843C4.7308 7.02369 4.7308 7.34027 4.53554 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM111 4V4.5H1V4V3.5H111V4Z" fill="white"/>`,
            position: { x: 235, y: 240 },
            viewBox: "0 0 111 8",
            id: 'line-2'
        },
        {
            svg: `<path d="M0.146446 71.6464C-0.0488129 71.8417 -0.0488129 72.1583 0.146446 72.3536L3.32843 75.5355C3.52369 75.7308 3.84027 75.7308 4.03554 75.5355C4.2308 75.3403 4.2308 75.0237 4.03554 74.8284L1.20711 72L4.03554 69.1716C4.2308 68.9763 4.2308 68.6597 4.03554 68.4645C3.84027 68.2692 3.52369 68.2692 3.32843 68.4645L0.146446 71.6464ZM110.5 1V0.5C85.7324 0.5 70.4615 18.4642 55.3076 36.1749C40.0889 53.9614 24.9837 71.5 0.5 71.5V72V72.5C25.5163 72.5 40.9111 54.5386 56.0674 36.8251C71.2885 19.0358 86.2676 1.5 110.5 1.5V1Z" fill="white"/>`,
            position: { x: 235, y: 278 },
            viewBox: "0 0 111 76",
            id: 'line-3'
        },
        {
            svg: `<path d="M110.854 4.35355C111.049 4.15829 111.049 3.84171 110.854 3.64645L107.672 0.464466C107.476 0.269204 107.16 0.269204 106.964 0.464466C106.769 0.659728 106.769 0.976311 106.964 1.17157L109.793 4L106.964 6.82843C106.769 7.02369 106.769 7.34027 106.964 7.53553C107.16 7.7308 107.476 7.7308 107.672 7.53553L110.854 4.35355ZM0.5 75V75.5C25.2676 75.5 40.5385 57.5358 55.6924 39.8251C70.9111 22.0386 86.0163 4.5 110.5 4.5V4V3.5C85.4837 3.5 70.0889 21.4614 54.9326 39.1749C39.7115 56.9642 24.7324 74.5 0.5 74.5V75Z" fill="white"/>`,
            position: { x: 459, y: 202 },
            viewBox: "0 0 111 76",
            id: 'line-4'
        },
        {
            svg: `<path d="M110.354 4.35355C110.549 4.15829 110.549 3.84171 110.354 3.64645L107.172 0.464466C106.976 0.269204 106.66 0.269204 106.464 0.464466C106.269 0.659728 106.269 0.976311 106.464 1.17157L109.293 4L106.464 6.82843C106.269 7.02369 106.269 7.34027 106.464 7.53553C106.66 7.7308 106.976 7.7308 107.172 7.53553L110.354 4.35355ZM0 4V4.5H110V4V3.5H0V4Z" fill="white"/>`,
            position: { x: 459, y: 240 },
            viewBox: "0 0 111 8",
            id: 'line-5'
        },
        {
            svg: `<path d="M110.854 71.6464C111.049 71.8417 111.049 72.1583 110.854 72.3536L107.672 75.5355C107.476 75.7308 107.16 75.7308 106.964 75.5355C106.769 75.3403 106.769 75.0237 106.964 74.8284L109.793 72L106.964 69.1716C106.769 68.9763 106.769 68.6597 106.964 68.4645C107.16 68.2692 107.476 68.2692 107.672 68.4645L110.854 71.6464ZM0.5 1V0.5C25.2676 0.5 40.5385 18.4642 55.6924 36.1749C70.9111 53.9614 86.0163 71.5 110.5 71.5V72V72.5C85.4837 72.5 70.0889 54.5386 54.9326 36.8251C39.7115 19.0358 24.7324 1.5 0.5 1.5V1Z" fill="white"/>`,
            position: { x: 459, y: 278 },
            viewBox: "0 0 111 76",
            id: 'line-6'
        }
    ];

    // Question box connectors
    const questionConnectors = [
        {
            id: 'left-connector-1',
            svg: `<path d="M0.646446 4.35355C0.451187 4.15829 0.451187 3.84171 0.646446 3.64645L3.82842 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82842 7.53553L0.646446 4.35355ZM110 146V146.5C97.5902 146.5 87.6437 137.425 78.9634 124.085C70.2715 110.728 62.7446 92.9321 55.2255 75.1952C47.6954 57.4327 40.173 39.7287 31.478 26.4616C22.7723 13.1779 12.9936 4.5 1 4.5V4V3.5C13.5314 3.5 23.5709 12.5721 32.3144 25.9134C41.0688 39.2713 48.6267 57.0673 56.1461 74.8048C63.6764 92.5679 71.168 110.272 79.8015 123.54C88.4466 136.825 98.1325 145.5 110 145.5V146Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-1'
        },
        {
            id: 'left-connector-2',
            svg: `<path d="M0.146446 4.35355C-0.0488129 4.15829 -0.0488129 3.84171 0.146446 3.64645L3.32843 0.464466C3.52369 0.269204 3.84027 0.269204 4.03554 0.464466C4.2308 0.659728 4.2308 0.976311 4.03554 1.17157L1.20711 4L4.03554 6.82843C4.2308 7.02369 4.2308 7.34027 4.03554 7.53553C3.84027 7.7308 3.52369 7.7308 3.32843 7.53553L0.146446 4.35355ZM110.5 75V75.5C85.7324 75.5 70.4615 57.5358 55.3076 39.8251C40.0889 22.0386 24.9837 4.5 0.5 4.5V4V3.5C25.5163 3.5 40.9111 21.4614 56.0674 39.1749C71.2885 56.9642 86.2676 74.5 110.5 74.5V75Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-2'
        },
        {
            id: 'left-connector-3',
            svg: `<path d="M0.646446 4.35355C0.451187 4.15829 0.451187 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53554 0.464466C4.7308 0.659728 4.7308 0.976311 4.53554 1.17157L1.70711 4L4.53554 6.82843C4.7308 7.02369 4.7308 7.34027 4.53554 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM111 4V4.5H1V4V3.5H111V4Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-3'
        },
        {
            id: 'left-connector-4',
            svg: `<path d="M0.146446 71.6464C-0.0488129 71.8417 -0.0488129 72.1583 0.146446 72.3536L3.32843 75.5355C3.52369 75.7308 3.84027 75.7308 4.03554 75.5355C4.2308 75.3403 4.2308 75.0237 4.03554 74.8284L1.20711 72L4.03554 69.1716C4.2308 68.9763 4.2308 68.6597 4.03554 68.4645C3.84027 68.2692 3.52369 68.2692 3.32843 68.4645L0.146446 71.6464ZM110.5 1V0.5C85.7324 0.5 70.4615 18.4642 55.3076 36.1749C40.0889 53.9614 24.9837 71.5 0.5 71.5V72V72.5C25.5163 72.5 40.9111 54.5386 56.0674 36.8251C71.2885 19.0358 86.2676 1.5 110.5 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-4'
        },
        {
            id: 'left-connector-5',
            svg: `<path d="M0.646446 142.646C0.451187 142.842 0.451187 143.158 0.646446 143.354L3.82842 146.536C4.02369 146.731 4.34027 146.731 4.53553 146.536C4.7308 146.34 4.7308 146.024 4.53553 145.828L1.70711 143L4.53553 140.172C4.7308 139.976 4.7308 139.66 4.53553 139.464C4.34027 139.269 4.02369 139.269 3.82842 139.464L0.646446 142.646ZM110 1V0.5C97.5902 0.5 87.6437 9.57523 78.9634 22.9148C70.2715 36.2721 62.7446 54.0679 55.2255 71.8048C47.6954 89.5673 40.173 107.271 31.478 120.538C22.7723 133.822 12.9936 142.5 1 142.5V143V143.5C13.5314 143.5 23.5709 134.428 32.3144 121.087C41.0688 107.729 48.6267 89.9327 56.1461 72.1952C63.6764 54.4321 71.168 36.7279 79.8015 23.4602C88.4466 10.1748 98.1325 1.5 110 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-5'
        },
        {
            id: 'right-connector-1',
            svg: `<path d="M109.354 4.35355C109.549 4.15829 109.549 3.84171 109.354 3.64645L106.172 0.464466C105.976 0.269204 105.66 0.269204 105.464 0.464466C105.269 0.659728 105.269 0.976311 105.464 1.17157L108.293 4L105.464 6.82843C105.269 7.02369 105.269 7.34027 105.464 7.53553C105.66 7.7308 105.976 7.7308 106.172 7.53553L109.354 4.35355ZM0 146V146.5C12.4098 146.5 22.3563 137.425 31.0366 124.085C39.7285 110.728 47.2554 92.9321 54.7745 75.1952C62.3046 57.4327 69.827 39.7287 78.522 26.4616C87.2277 13.1779 97.0064 4.5 109 4.5V4V3.5C96.4686 3.5 86.4291 12.5721 77.6856 25.9134C68.9312 39.2713 61.3733 57.0673 53.8539 74.8048C46.3236 92.5679 38.832 110.272 30.1985 123.54C21.5534 136.825 11.8675 145.5 0 145.5V146Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-1'
        },
        {
            id: 'right-connector-2',
            svg: `<path d="M110.854 4.35355C111.049 4.15829 111.049 3.84171 110.854 3.64645L107.672 0.464466C107.476 0.269204 107.16 0.269204 106.964 0.464466C106.769 0.659728 106.769 0.976311 106.964 1.17157L109.793 4L106.964 6.82843C106.769 7.02369 106.769 7.34027 106.964 7.53553C107.16 7.7308 107.476 7.7308 107.672 7.53553L110.854 4.35355ZM0.5 75V75.5C25.2676 75.5 40.5385 57.5358 55.6924 39.8251C70.9111 22.0386 86.0163 4.5 110.5 4.5V4V3.5C85.4837 3.5 70.0889 21.4614 54.9326 39.1749C39.7115 56.9642 24.7324 74.5 0.5 74.5V75Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-2'
        },
        {
            id: 'right-connector-3',
            svg: `<path d="M110.354 4.35355C110.549 4.15829 110.549 3.84171 110.354 3.64645L107.172 0.464466C106.976 0.269204 106.66 0.269204 106.464 0.464466C106.269 0.659728 106.269 0.976311 106.464 1.17157L109.293 4L106.464 6.82843C106.269 7.02369 106.269 7.34027 106.464 7.53553C106.66 7.7308 106.976 7.7308 107.172 7.53553L110.354 4.35355ZM0 4V4.5H110V4V3.5H0V4Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-3'
        },
        {
            id: 'right-connector-4',
            svg: `<path d="M110.854 71.6464C111.049 71.8417 111.049 72.1583 110.854 72.3536L107.672 75.5355C107.476 75.7308 107.16 75.7308 106.964 75.5355C106.769 75.3403 106.769 75.0237 106.964 74.8284L109.793 72L106.964 69.1716C106.769 68.9763 106.769 68.6597 106.964 68.4645C107.16 68.2692 107.476 68.2692 107.672 68.4645L110.854 71.6464ZM0.5 1V0.5C25.2676 0.5 40.5385 18.4642 55.6924 36.1749C70.9111 53.9614 86.0163 71.5 110.5 71.5V72V72.5C85.4837 72.5 70.0889 54.5386 54.9326 36.8251C39.7115 19.0358 24.7324 1.5 0.5 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-4'
        },
        {
            id: 'right-connector-5',
            svg: `<path d="M109.354 142.646C109.549 142.842 109.549 143.158 109.354 143.354L106.172 146.536C105.976 146.731 105.66 146.731 105.464 146.536C105.269 146.34 105.269 146.024 105.464 145.828L108.293 143L105.464 140.172C105.269 139.976 105.269 139.66 105.464 139.464C105.66 139.269 105.976 139.269 106.172 139.464L109.354 142.646ZM0 1V0.5C12.4098 0.5 22.3563 9.57523 31.0366 22.9148C39.7285 36.2721 47.2554 54.0679 54.7745 71.8048C62.3046 89.5673 69.827 107.271 78.522 120.538C87.2277 133.822 97.0064 142.5 109 142.5V143V143.5C96.4686 143.5 86.4291 134.428 77.6856 121.087C68.9312 107.729 61.3733 89.9327 53.8539 72.1952C46.3236 54.4321 38.832 36.7279 30.1985 23.4602C21.5534 10.1748 11.8675 1.5 0 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-5'
        },
    ];

    const steps = [
        { boxes: ['data-structuring-left'], lines: [] },
        { boxes: ['data-structuring-left', 'security-compliance-left'], lines: [] },
        { boxes: ['data-structuring-left', 'security-compliance-left', 'llm-integration-left'], lines: [] },
        { boxes: ['data-structuring-left', 'security-compliance-left', 'llm-integration-left', 'data-structuring-right'], lines: [] },
        { boxes: ['data-structuring-left', 'security-compliance-left', 'llm-integration-left', 'data-structuring-right', 'security-compliance-right'], lines: [] },
        { boxes: ['data-structuring-left', 'security-compliance-left', 'llm-integration-left', 'data-structuring-right', 'security-compliance-right', 'llm-integration-right'], lines: ['line-1', 'line-2', 'line-3', 'line-4', 'line-5', 'line-6'] }
    ];

    // Intersection Observer to detect when component is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Animation logic - only start when component is visible
    useEffect(() => {
        if (!isVisible || animationComplete) return;

        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (focusedBox) return prev;
                if (prev === steps.length - 1) {
                    clearInterval(interval);
                    setAnimationComplete(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [isVisible, animationComplete, steps.length, focusedBox]);

    const boxVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const handleWheel = useCallback((event) => {
        if (isScrolling || !focusedBox) return;

        event.preventDefault();
        setIsScrolling(true);

        const delta = Math.sign(event.deltaY);
        setCurrentFocusIndex(prev => {
            const newIndex = (prev + delta + boxes.length) % boxes.length;
            setFocusedBox(boxes[newIndex].id);
            return newIndex;
        });

        setTimeout(() => setIsScrolling(false), 200);
    }, [isScrolling, focusedBox, boxes]);

    const handleBoxClick = useCallback((boxId) => {
        if (focusedBox === boxId) {
            // If clicking the same focused box, return to FAQ main view
            setFocusedBox(null);
            setCurrentFocusIndex(0);
            setVisibleQuestions({
                leftQuestions: [],
                rightQuestions: [],
                leftConnectors: [],
                rightConnectors: []
            });
            
            // Navigate back in history only if we're not at the beginning
            if (currentNavIndex > 0) {
                navigateBack();
            }
        } else {
            const boxIndex = boxes.findIndex(box => box.id === boxId);
            const box = boxes[boxIndex];
            setCurrentFocusIndex(boxIndex);
            setFocusedBox(boxId);

            // Add to navigation history
            const infoBoxLabel = box.label.replace('-left', '').replace('-right', '');
            addToNavigationHistory({
                type: 'infobox',
                label: infoBoxLabel,
                boxId: boxId
            });

            // Start the sequential animation for questions
            animateQuestionsSequentially(boxId);
        }
    }, [focusedBox, boxes, animateQuestionsSequentially, navigateBack, addToNavigationHistory, currentNavIndex]);

    // Use the final step when animation is complete
    const currentStepData = animationComplete ? steps[steps.length - 1] : steps[currentStep];

    return (
        <>
            <div className="animated-faq-container" ref={containerRef}>
                {/* Navigation Breadcrumb */}
                <div className="faq-navigation">
                    <div className="nav-breadcrumb">
                        <button
                            className="nav-back-btn"
                            onClick={navigateBack}
                            disabled={currentNavIndex === 0}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="nav-forward-btn"
                            onClick={navigateForward}
                            disabled={currentNavIndex === navigationHistory.length - 1}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="breadcrumb-path">
                            {navigationHistory.map((item, index) => (
                                <React.Fragment key={index}>
                                    <span className={`breadcrumb-item ${index === currentNavIndex ? 'current' : ''}`}>
                                        {item.label}
                                    </span>
                                    {index < navigationHistory.length - 1 && (
                                        <span className="breadcrumb-separator">{'>'}</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="diagram-container">
                        {/* FAQ Center - Show only when no box is focused */}
                        {!focusedBox && (
                            <motion.div
                                className="faq-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
                            >
                                FAQ
                            </motion.div>
                        )}

                        <motion.div
                            className="boxes-container"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            onWheel={handleWheel}
                        >
                            <AnimatePresence mode="sync">
                                {focusedBox ? (
                                    // When a box is focused, create a centered layout with proper scrolling
                                    <div style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '67%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '300px',
                                        height: '280px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {boxes.map((box, index) => {
                                            const isFocused = focusedBox === box.id;
                                            const relativePosition = index - currentFocusIndex;

                                            // Calculate visual properties based on position
                                            let backgroundColor, borderColor, textColor, opacity, scale;

                                            if (isFocused) {
                                                textColor = '#000';
                                                opacity = 1;
                                                scale = 0.9;
                                            } else if (Math.abs(relativePosition) === 1) {
                                                backgroundColor = '#000';
                                                borderColor = '#666';
                                                textColor = '#fff';
                                                opacity = 0.9;
                                                scale = 0.8;
                                            } else if (Math.abs(relativePosition) === 2) {
                                                backgroundColor = '#000';
                                                borderColor = '#888';
                                                textColor = '#fff';
                                                opacity = 0.8;
                                                scale = 0.7;
                                            } else if (Math.abs(relativePosition) === 3) {
                                                backgroundColor = '#000';
                                                borderColor = '#aaa';
                                                textColor = '#fff';
                                                opacity = 0.7;
                                                scale = 0.6;
                                            } else if (Math.abs(relativePosition) === 4) {
                                                backgroundColor = '#000';
                                                borderColor = '#aaa';
                                                textColor = '#fff';
                                                opacity = 0.6;
                                                scale = 0.5;
                                            } else {
                                                backgroundColor = '#000';
                                                borderColor = '#aaa';
                                                textColor = '#fff';
                                                opacity = 0.5;
                                                scale = 0.4;
                                            }

                                            return (
                                                <motion.div
                                                    key={box.id}
                                                    className={`info-box ${box.id.includes('left') ? 'left-side' : 'right-side'} ${isFocused ? 'focused' : 'stacked'}`}
                                                    style={{
                                                        position: 'absolute',
                                                        top: box.top,
                                                        left: box.left,
                                                        width: '200px',
                                                        height: '45px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        cursor: 'pointer',
                                                        zIndex: isFocused ? 10 : 5,
                                                    }}
                                                    variants={boxVariants}
                                                    initial="hidden"
                                                    animate={{
                                                        scale: scale,
                                                        opacity: opacity,
                                                        y: relativePosition * 44, // Consistent spacing between boxes
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.4
                                                        }
                                                    }}
                                                    exit="exit"
                                                    onClick={() => handleBoxClick(box.id)}
                                                    whileHover={{
                                                        scale: scale * 1.03,
                                                        transition: { duration: 0.15 }
                                                    }}
                                                    whileTap={{
                                                        scale: scale * 0.97,
                                                        transition: { duration: 0.1 }
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: isFocused ? '14px' : '12px',
                                                        fontWeight: isFocused ? 600 : 500,
                                                        color: textColor,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        pointerEvents: 'none',
                                                        fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                                                    }}>
                                                        {box.label}
                                                    </div>
                                                    <div style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        color: textColor,
                                                        pointerEvents: 'none'
                                                    }}>
                                                        {isFocused ? '↗' : relativePosition > 0 ? '↘' : relativePosition < 0 ? '↖' : '↗'}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Normal layout when no box is focused
                                    currentStepData.boxes.map((boxId) => {
                                        const box = boxes.find(b => b.id === boxId);

                                        return (
                                            <motion.div
                                                key={boxId}
                                                className={`info-box ${boxId.includes('left') ? 'left-side' : 'right-side'}`}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${box.position.x}px`,
                                                    top: `${box.position.y}px`,
                                                    cursor: 'pointer'
                                                }}
                                                variants={boxVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                onClick={() => handleBoxClick(boxId)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {box.label}
                                            </motion.div>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <svg
                            className="connection-lines"
                            viewBox="0 0 900 500"
                            preserveAspectRatio="xMidYMid meet"
                            style={{
                                opacity: focusedBox ? 0 : 1,
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="9"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <polygon
                                        points="0 0, 10 3.5, 0 7"
                                        fill="rgba(255, 255, 255, 0.8)"
                                    />
                                </marker>
                            </defs>

                            {connections.map((connection) => (
                                <g key={connection.id}>
                                    <motion.g
                                        transform={`translate(${connection.position.x}, ${connection.position.y})`}
                                        initial={{
                                            pathLength: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            pathLength: currentStepData.lines.includes(connection.id) ? 1 : 0,
                                            opacity: currentStepData.lines.includes(connection.id) ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                            delay: currentStepData.lines.indexOf(connection.id) * 0.05
                                        }}
                                    >
                                        <svg
                                            width="111"
                                            height="76"
                                            viewBox={connection.viewBox}
                                            dangerouslySetInnerHTML={{ __html: connection.svg }}
                                        />
                                    </motion.g>
                                </g>
                            ))}
                        </svg>

                        {/* Questions and Connectors for Focused Box */}
                        {focusedBox && questionSets[focusedBox] && (
                            <div className="questions-container">
                                {/* Left Side Questions */}
                                <div className="left-questions">
                                    {questionSets[focusedBox].leftQuestions.map((question, index) => (
                                        <div key={`left-${index}`}>
                                            {/* Left Connector */}
                                            <AnimatePresence>
                                                {visibleQuestions.leftConnectors.includes(index) && (
                                                    <motion.div
                                                        style={{
                                                            position: 'absolute',
                                                            left: index === 0 ? '238px' :
                                                                index === 1 ? '238px' :
                                                                    index === 2 ? '238px' :
                                                                        index === 3 ? '238px' :
                                                                            index === 4 ? '238px' : '250px',
                                                            top: index === 0 ? '147px' :
                                                                index === 1 ? '207px' :
                                                                    index === 2 ? '267px' :
                                                                        index === 3 ? '270px' :
                                                                            index === 4 ? '270px' : '124px',
                                                            zIndex: 5
                                                        }}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.3,
                                                            delay: 0.1
                                                        }}
                                                    >
                                                        <svg
                                                            width="150"
                                                            height="125"
                                                            viewBox={questionConnectors.find(c => c.id === `left-connector-${index + 1}`)?.viewBox || "0 0 110 147"}
                                                            dangerouslySetInnerHTML={{
                                                                __html: questionConnectors.find(c => c.id === `left-connector-${index + 1}`)?.svg || ''
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Left Question Box */}
                                            <AnimatePresence>
                                                {visibleQuestions.leftQuestions.includes(index) && (
                                                    <motion.div
                                                        className="question-box left-question"
                                                        style={{
                                                            position: 'absolute',
                                                            left: `${16}px`,
                                                            top: `${120 + (index * 60)}px`,
                                                            width: '250px',
                                                            padding: '12px 16px',
                                                            borderRadius: '0',
                                                            backgroundColor: '#000',
                                                            border: '0.5px solid white',
                                                            cursor: 'pointer',
                                                            zIndex: 6
                                                        }}
                                                        initial={{ scale: 0, opacity: 0, x: -50 }}
                                                        animate={{ scale: 1, opacity: 1, x: 0 }}
                                                        exit={{ scale: 0, opacity: 0, x: -50 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.4
                                                        }}
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleQuestionClick(question)}
                                                    >
                                                        <div style={{
                                                            fontSize: '11px',
                                                            fontWeight: 200,
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            lineHeight: '1.3',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px'
                                                        }}>
                                                            {question}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side Questions */}
                                <div className="right-questions">
                                    {questionSets[focusedBox].rightQuestions.map((question, index) => (
                                        <div key={`right-${index}`}>
                                            {/* Right Connector */}
                                            <AnimatePresence>
                                                {visibleQuestions.rightConnectors.includes(index) && (
                                                    <motion.div
                                                        style={{
                                                            position: 'absolute',
                                                            right: index === 0 ? '238px' :
                                                                index === 1 ? '238px' :
                                                                    index === 2 ? '238px' :
                                                                        index === 3 ? '239px' :
                                                                            index === 4 ? '238px' : '238px',
                                                            top: index === 0 ? '144px' :
                                                                index === 1 ? '204px' :
                                                                    index === 2 ? '265px' :
                                                                        index === 3 ? '268px' :
                                                                            index === 4 ? '268px' : '124px',
                                                            zIndex: 5
                                                        }}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.3,
                                                            delay: 0.1
                                                        }}
                                                    >
                                                        <svg
                                                            width="150"
                                                            height="125"
                                                            viewBox={questionConnectors.find(c => c.id === `right-connector-${index + 1}`)?.viewBox || "0 0 110 147"}
                                                            dangerouslySetInnerHTML={{
                                                                __html: questionConnectors.find(c => c.id === `right-connector-${index + 1}`)?.svg || ''
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Right Question Box */}
                                            <AnimatePresence>
                                                {visibleQuestions.rightQuestions.includes(index) && (
                                                    <motion.div
                                                        className="question-box right-question"
                                                        style={{
                                                            position: 'absolute',
                                                            right: `${15.5}px`,
                                                            top: `${120 + (index * 60)}px`,
                                                            width: '250px',
                                                            padding: '12px 16px',
                                                            borderRadius: '0',
                                                            backgroundColor: '#000',
                                                            border: '1px solid white',
                                                            cursor: 'pointer',
                                                            zIndex: 6
                                                        }}
                                                        initial={{ scale: 0, opacity: 0, x: 50 }}
                                                        animate={{ scale: 1, opacity: 1, x: 0 }}
                                                        exit={{ scale: 0, opacity: 0, x: 50 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.4
                                                        }}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleQuestionClick(question)}
                                                    >
                                                        <div style={{
                                                            fontSize: '11px',
                                                            fontWeight: 200,
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            lineHeight: '1.3',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px'
                                                        }}>
                                                            {question}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Chatbot selectedQuestion={selectedQuestion} chatbotResponse={chatbotResponse} />
                </div>

                <style>{`
                    .faq-navigation {
                        position: absolute;
                        top: 50px;
                        left: 50px;
                        z-index: 1000;
                    }

                    .nav-breadcrumb {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        background: rgba(0, 0, 0, 0.8);
                        padding: 8px 16px;
                        backdrop-filter: blur(10px);
                    }

                    .nav-back-btn, .nav-forward-btn {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                        padding: 6px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.2s ease;
                    }

                    .nav-back-btn:hover, .nav-forward-btn:hover {
                        background: rgba(255, 255, 255, 0.2);
                        border-color: rgba(255, 255, 255, 0.4);
                    }

                    .nav-back-btn:disabled, .nav-forward-btn:disabled {
                        opacity: 0.3;
                        cursor: not-allowed;
                        background: rgba(255, 255, 255, 0.05);
                        border-color: rgba(255, 255, 255, 0.1);
                    }

                    .nav-back-btn:disabled:hover, .nav-forward-btn:disabled:hover {
                        background: rgba(255, 255, 255, 0.05);
                        border-color: rgba(255, 255, 255, 0.1);
                    }

                    .breadcrumb-path {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .breadcrumb-item {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 12px;
                        font-weight: 400;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                    }

                    .breadcrumb-item.current {
                        color: white;
                        font-weight: 500;
                    }

                    .breadcrumb-separator {
                        color: rgba(255, 255, 255, 0.4);
                        font-size: 12px;
                        margin: 0 2px;
                    }

                    @media (max-width: 768px) {
                        .faq-navigation {
                            top: 10px;
                            left: 10px;
                        }
                        
                        .nav-breadcrumb {
                            padding: 6px 12px;
                            gap: 8px;
                        }
                        
                        .breadcrumb-item {
                            font-size: 10px;
                        }
                    }

                    .info-box.focused {
                        background: rgba(248, 248, 248, 0.95) !important;
                        color: rgb(0, 0, 0) !important;
                        padding: 0 15px !important;
                        font-size: 14px !important;
                        font-weight: 600 !important;
                        letter-spacing: 0.5px;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .info-box.stacked {
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .animated-faq-container {
                        min-height: 80vh;
                        background: #000000;
                        color: white;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        position: relative;
                    }

                    .content-wrapper {
                        width: 100%;
                        max-width: 900px;
                        margin: 0 auto;
                        position: relative;
                    }

                    .diagram-container {
                        position: relative;
                        width: 100%;
                        height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .faq-center {
                        position: absolute;
                        top: 58%;
                        background: rgb(255, 255, 255);
                        color: rgb(0, 0, 0);
                        padding: 0.625rem 1.65rem;
                        font-weight: 400;
                        font-size: 1.2rem;
                        z-index: 10;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .boxes-container {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }

                    .info-box {
                        background: rgba(30, 30, 30, 0.9);
                        border: 1px solid rgb(255, 255, 255);
                        color: #e2e8f0;
                        padding: 0.55rem 1rem;
                        font-size: 0.6rem;
                        font-weight: 400;
                        letter-spacing: 0.5px;
                        transform-origin: center;
                        width: auto;
                        text-align: center;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        transition: all 0.3s ease;
                    }

                    .connection-lines {
                        position: absolute;
                        top: 36px;
                        left: 38px;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: 5;
                    }

                    @media (max-width: 768px) {
                        .diagram-container {
                            height: 300px;
                        }
                        
                        .info-box {
                            font-size: 0.75rem;
                            padding: 0.5rem 0.75rem;
                        }

                        .info-box.focused {
                            width: 280px !important;
                            font-size: 0.75rem !important;
                            padding: 0.6rem 1.2rem !important;
                        }
                        
                        .faq-center {
                            font-size: 1rem;
                            padding: 0.75rem 1.5rem;
                        }
                    }
                `}</style>
            </div>
        </>
    );
};

export default AnimatedFAQDiagram;