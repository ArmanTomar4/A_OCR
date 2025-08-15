import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import MiddleSection from './MiddleSection'

const Pipeline = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Refs for title animation
    const titleWordRefs = {
        Intelligent: useRef(null),
        OCR: useRef(null),
        Pipeline: useRef(null),
        in: useRef(null),
        Action: useRef(null)
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Title animation effect
    useEffect(() => {
        const allElements = Object.values(titleWordRefs).map(ref => ref.current);
        if (!allElements.every(el => el)) return;

        // Create intersection observer to trigger animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Start the blinking animation
                    startBlinkAnimation(allElements);
                    observer.unobserve(entry.target); // Only trigger once
                }
            });
        }, { threshold: 0.5 });

        // Observe the first element to trigger the animation
        observer.observe(allElements[0]);

        return () => observer.disconnect();
    }, []);

    const startBlinkAnimation = (allElements) => {
        // Initial setup - all invisible
        gsap.set(allElements, {
            opacity: 0,
            filter: "brightness(1)",
            textShadow: "0 0 0 rgba(0,0,0,0)"
        });

        // Main timeline
        const mainTimeline = gsap.timeline();

        // Quick initial blinks for each element
        const blinkElement = (target, intensity, numBlinks) => {
            const sequence = gsap.timeline();
            for (let i = 0; i < numBlinks; i++) {
                sequence
                    .to(target, {
                        opacity: 0,
                        duration: 0.09,
                        ease: "steps(1)"
                    })
                    .to(target, {
                        opacity: 1,
                        filter: `brightness(${intensity})`,
                        duration: 0.02,
                        ease: "steps(1)"
                    });
            }
            return sequence;
        };

        // All elements start hidden
        gsap.set(allElements, { opacity: 0 });

        // Create parallel animations for each word at different times
        mainTimeline.add(() => {
            // Intelligent blinks first
            blinkElement(titleWordRefs.Intelligent.current, 1.7, 4);
        });

        // OCR with delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.OCR.current, 1.5, 5);
        }, "+=0.15");

        // Pipeline with more delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.Pipeline.current, 1.3, 4);
        }, "+=0.15");

        // "in" with more delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.in.current, 1.2, 4);
        }, "+=0.15");

        // Action with most delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.Action.current, 1.1, 4);
        }, "+=0.15");

        // Set final state for all elements
        mainTimeline.to(allElements, {
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.05
        }, "+=0.1");
    };
    const styles = {
        pipelineContainer: {
            backgroundColor: '#ffffff',
            height: '120vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',

        },
        heading: {
            margin: '50px 0 0 0',
            position: 'absolute',
            top: '0',
            left: '97px',
            color: '#000',
            /* font-family: "Alliance No.2"; */
            fontSize: '2.2rem',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            borderBottom: '1px solid #000',
            paddingBottom: '10px',
            width: '90%',
        },
        mainSection: {
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '90px 85px 48px 85px'
        },
        leftSection: {
            width: '25%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'unset',
            padding: '0',
            alignItems: 'flex-start'
        },
        middleSection: {
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '20px'
        },
        rightSection: {
            width: '25%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            justifyContent: 'flex-end',
            paddingBottom: '104px'
        },
        fadedTiltImage: {
            width: '25%',
            height: screenWidth >= 1366 ? '80%' : '64%',
            position: 'absolute',
            left: '8px',
            top: '25px',
        },

        descriptionText: {
            color: '#000',
            fontSize: '1.125rem',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '1.625rem',
            letterSpacing: '-0.0025rem'
        },
        copyrightText: {
            color: '#000',
            textAlign: 'right',
            fontSize: '0.75rem',
            fontStyle: 'normal',
            fontWeight: '300',
            lineHeight: 'normal',
            letterSpacing: '-0.00275rem',
        }
    }

    return (
        <div className='pipeline-container' style={styles.pipelineContainer}>
            <div className='heading' style={styles.heading}>
                <p><span ref={titleWordRefs.Intelligent}>Intelligent</span> <span ref={titleWordRefs.OCR}>OCR</span> <span ref={titleWordRefs.Pipeline}>Pipeline</span> <span ref={titleWordRefs.in}>in</span> <span ref={titleWordRefs.Action}>Action</span></p>
            </div>
            <div className='main-section' style={styles.mainSection}>
                <div className='left-section' style={styles.leftSection}>
                    <img
                        src="/faded_tilt.svg"
                        alt="Faded tilted lines background"
                        style={styles.fadedTiltImage}
                    />

                </div>
                <MiddleSection />
                <div className='right-section' style={styles.rightSection}>


                </div>
            </div>
        </div >
    )
}

export default Pipeline