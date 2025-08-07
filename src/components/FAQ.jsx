import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';

const AnimatedFAQDiagram = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

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
                threshold: 0.3 // Start animation when 30% of the component is visible
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
                if (prev === steps.length - 1) {
                    clearInterval(interval);
                    setAnimationComplete(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [isVisible, animationComplete, steps.length]);

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

    // Use the final step when animation is complete
    const currentStepData = animationComplete ? steps[steps.length - 1] : steps[currentStep];

    return (
        <>
            <div className="animated-faq-container" ref={containerRef}>
                <div className="content-wrapper">
                    <motion.h1
                        className="title"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Learn more about our
                    </motion.h1>

                    <div className="diagram-container">
                        <motion.div
                            className="faq-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                            FAQ
                        </motion.div>

                        <motion.div
                            className="boxes-container"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                        >
                            <AnimatePresence mode="sync">
                                {currentStepData.boxes.map((boxId) => {
                                    const box = boxes.find(b => b.id === boxId);
                                    return (
                                        <motion.div
                                            key={boxId}
                                            className={`info-box ${boxId.includes('left') ? 'left-side' : 'right-side'}`}
                                            style={{
                                                position: 'absolute',
                                                left: `${box.position.x}px`,
                                                top: `${box.position.y}px`
                                            }}
                                            variants={boxVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            {box.label}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        <svg
                            className="connection-lines"
                            viewBox="0 0 900 500"
                            preserveAspectRatio="xMidYMid meet"
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
                    </div>
                    <Chatbot />
                </div>

                <style jsx>{`
                    .animated-faq-container {
                        min-height: 100vh;
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

                    .title {
                        text-align: center;
                        font-size: 2.5rem;
                        font-weight: 300;
                        margin-bottom: 2rem;
                        margin-top: 4rem;
                        color: #f5f5f5;
                        letter-spacing: 0.5px;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
                        background:rgb(255, 255, 255);
                        color:rgb(0, 0, 0);
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
                        .title {
                            font-size: 2rem;
                            margin-bottom: 3rem;
                        }
                        
                        .diagram-container {
                            height: 300px;
                        }
                        
                        .info-box {
                            font-size: 0.75rem;
                            padding: 0.5rem 0.75rem;
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