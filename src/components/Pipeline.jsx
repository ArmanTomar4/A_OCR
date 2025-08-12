import React, { useState, useEffect } from 'react'
import MiddleSection from './MiddleSection'

const Pipeline = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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
                <p>Intelligent OCR Pipeline in Action</p>
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