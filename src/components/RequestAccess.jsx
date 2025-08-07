import React from 'react';

const RequestAccess = () => {
    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: '#000',
            position: 'relative',
            width: '100%',
            padding: '0 80px',
            justifyContent: 'center',
            alignItems: 'center'
        },
        innerContainer: {
            width: '100%',
            display: 'flex',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #333',
            borderRadius: '8px',
            minHeight: '80vh'
        },
        leftSection: {
            flex: 1,
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
            position: 'relative'
        },
        textContent: {
            maxWidth: '500px'
        },
        mainHeading: {
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '50px',
            fontWeight: '700',
            color: '#fff',
            margin: '0 0 24px 0',
            lineHeight: '1.1'
        },
        subHeading: {
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '35px',
            fontWeight: '400',
            color: 'grey',
            margin: '0 0 24px 0',
            lineHeight: '1.2',
            opacity: '0.9'
        },
        requestButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            padding: '12px 20px',
            fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(245, 245, 220, 0.2)'
        },
        dividerPattern: {
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '70px',
            background: 'transparent'
        },
        rightSection: {
            flex: 1,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #f97316 50%, #1e3a8a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        abstractGraphics: {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        layer: {
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1)'
        },
        topLayer: {
            width: '320px',
            height: '220px',
            top: '15%',
            left: '15%',
            zIndex: 3,
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        },
        chartContainer: {
            display: 'flex',
            gap: '10px',
            alignItems: 'end',
            height: '80px'
        },
        bar: {
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '3px',
            flex: 1,
            boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
        },
        bar1: { height: '50px' },
        bar2: { height: '80px' },
        bar3: { height: '40px' },
        bar4: { height: '65px' },
        bar5: { height: '45px' },
        textFields: {
            display: 'flex',
            gap: '10px'
        },
        textField: {
            height: '25px',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '4px',
            flex: 1,
            boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'
        },
        glowEffect: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(25px)',
            zIndex: 1
        },
        middleLayer: {
            width: '280px',
            height: '200px',
            top: '30%',
            left: '20%',
            zIndex: 2,
            padding: '20px'
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '6px',
            height: '100%'
        },
        gridCell: {
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '3px',
            boxShadow: '0 1px 3px rgba(255, 255, 255, 0.2)'
        },
        bottomLayer: {
            width: '300px',
            height: '180px',
            top: '45%',
            left: '25%',
            zIndex: 1,
            padding: '25px'
        },
        circlesContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%'
        },
        circle: {
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
        },
        circle1: { width: '35px', height: '35px', background: 'rgba(255, 255, 255, 0.9)' },
        circle2: { width: '25px', height: '25px' },
        circle3: { width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.7)' },
        circle4: { width: '20px', height: '20px' },
        circle5: { width: '30px', height: '30px', background: 'rgba(255, 255, 255, 0.5)' },
        connectionLines: {
            position: 'absolute',
            top: '65%',
            left: '50%',
            zIndex: 0
        },
        line: {
            position: 'absolute',
            width: '1px',
            background: 'rgba(255, 255, 255, 0.5)',
            transformOrigin: 'top',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)'
        },
        line1: { height: '70px', transform: 'translateX(-60px) rotate(15deg)' },
        line2: { height: '60px', transform: 'translateX(-30px) rotate(10deg)' },
        line3: { height: '80px', transform: 'translateX(0px) rotate(5deg)' },
        line4: { height: '55px', transform: 'translateX(30px) rotate(-10deg)' },
        line5: { height: '65px', transform: 'translateX(60px) rotate(-15deg)' },
        foundationCube: {
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            width: '70px',
            height: '70px',
            background: 'rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '6px',
            transform: 'translateX(-50%) rotateX(45deg) rotateZ(45deg)',
            boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                {/* Left Section - Dark with Text */}
                <div style={styles.leftSection}>
                    <div style={styles.textContent}>
                        <h1 style={styles.mainHeading}>Are you ready?</h1>
                        <p style={styles.subHeading}>
                            Help revolutionize technology and accelerate software's future.
                        </p>
                        <button
                            style={styles.requestButton}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(245, 245, 220, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(245, 245, 220, 0.2)';
                            }}
                        >
                            <span>Request Access</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <rect width="24" height="24" transform="translate(0 0.5)" fill="white" fillOpacity="0.01" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024" />
                            </svg>
                        </button>
                    </div>
                    <div style={styles.dividerPattern}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="552" viewBox="0 0 88 552" fill="none" style={{ width: '100%', height: '100%' }}>
                            <path d="M177.414 545.414L-45.5859 768.415L-47 767L176 544L177.414 545.414ZM177.414 532.414L-45.5859 755.415L-47 754L176 531L177.414 532.414ZM177.414 519.414L-45.5859 742.415L-47 741L176 518L177.414 519.414ZM177.414 506.414L-45.5859 729.415L-47 728L176 505L177.414 506.414ZM177.414 493.414L-45.5859 716.415L-47 715L176 492L177.414 493.414ZM177.414 480.414L-45.5859 703.415L-47 702L176 479L177.414 480.414ZM177.414 467.414L-45.5859 690.415L-47 689L176 466L177.414 467.414ZM177.414 454.414L-45.5859 677.415L-47 676L176 453L177.414 454.414ZM177.414 441.414L-45.5859 664.415L-47 663L176 440L177.414 441.414ZM177.414 428.414L-45.5859 651.415L-47 650L176 427L177.414 428.414ZM177.414 415.414L-45.5859 638.415L-47 637L176 414L177.414 415.414ZM177.414 402.414L-45.5859 625.415L-47 624L176 401L177.414 402.414ZM177.414 389.414L-45.5859 612.415L-47 611L176 388L177.414 389.414ZM177.414 376.414L-45.5859 599.415L-47 598L176 375L177.414 376.414ZM177.414 363.414L-45.5859 586.415L-47 585L176 362L177.414 363.414ZM177.414 350.414L-45.5859 573.415L-47 572L176 349L177.414 350.414ZM177.414 337.414L-45.5859 560.415L-47 559L176 336L177.414 337.414ZM177.414 324.414L-45.5859 547.415L-47 546L176 323L177.414 324.414ZM177.414 311.414L-45.5859 534.415L-47 533L176 310L177.414 311.414ZM177.414 298.414L-45.5859 521.415L-47 520L176 297L177.414 298.414ZM177.414 285.414L-45.5859 508.415L-47 507L176 284L177.414 285.414ZM177.414 272.414L-45.5859 495.415L-47 494L176 271L177.414 272.414ZM177.414 259.414L-45.5859 482.415L-47 481L176 258L177.414 259.414ZM177.414 246.414L-45.5859 469.415L-47 468L176 245L177.414 246.414ZM177.414 233.414L-45.5859 456.415L-47 455L176 232L177.414 233.414ZM177.414 220.414L-45.5859 443.415L-47 442L176 219L177.414 220.414ZM177.414 207.414L-45.5859 430.415L-47 429L176 206L177.414 207.414ZM177.414 194.414L-45.5859 417.415L-47 416L176 193L177.414 194.414ZM177.414 181.414L-45.5859 404.415L-47 403L176 180L177.414 181.414ZM177.414 168.414L-45.5859 391.415L-47 390L176 167L177.414 168.414ZM177.414 155.414L-45.5859 378.415L-47 377L176 154L177.414 155.414ZM177.414 142.414L-45.5859 365.415L-47 364L176 141L177.414 142.414ZM177.414 129.414L-45.5859 352.415L-47 351L176 128L177.414 129.414ZM177.414 116.414L-45.5859 339.415L-47 338L176 115L177.414 116.414ZM177.414 103.414L-45.5859 326.415L-47 325L176 102L177.414 103.414ZM177.414 90.4141L-45.5859 313.415L-47 312L176 89L177.414 90.4141ZM177.414 77.4141L-45.5859 300.415L-47 299L176 76L177.414 77.4141ZM177.414 64.4141L-45.5859 287.415L-47 286L176 63L177.414 64.4141ZM177.414 51.4141L-45.5859 274.415L-47 273L176 50L177.414 51.4141ZM177.414 38.4141L-45.5859 261.415L-47 260L176 37L177.414 38.4141ZM177.414 25.4141L-45.5859 248.415L-47 247L176 24L177.414 25.4141ZM177.414 12.4141L-45.5859 235.415L-47 234L176 11L177.414 12.4141ZM177.414 -0.585937L-45.5859 222.415L-47 221L176 -2L177.414 -0.585937ZM177.414 -13.5859L-45.5859 209.415L-47 208L176 -15L177.414 -13.5859ZM177.414 -26.5859L-45.5859 196.415L-47 195L176 -28L177.414 -26.5859ZM177.414 -39.5859L-45.5859 183.415L-47 182L176 -41L177.414 -39.5859ZM177.414 -52.5859L-45.5859 170.415L-47 169L176 -54L177.414 -52.5859ZM177.414 -65.5859L-45.5859 157.415L-47 156L176 -67L177.414 -65.5859ZM177.414 -78.5859L-45.5859 144.415L-47 143L176 -80L177.414 -78.5859ZM177.414 -91.5859L-45.5859 131.415L-47 130L176 -93L177.414 -91.5859ZM177.414 -104.586L-45.5859 118.415L-47 117L176 -106L177.414 -104.586ZM177.414 -117.586L-45.5859 105.415L-47 104L176 -119L177.414 -117.586ZM177.414 -130.586L-45.5859 92.415L-47 91L176 -132L177.414 -130.586ZM177.414 -143.586L-45.5859 79.415L-47 78L176 -145L177.414 -143.586ZM177.414 -156.586L-45.5859 66.415L-47 65L176 -158L177.414 -156.586ZM177.414 -169.586L-45.5859 53.415L-47 52L176 -171L177.414 -169.586ZM177.414 -182.586L-45.5859 40.415L-47 39L176 -184L177.414 -182.586ZM177.414 -195.586L-45.5859 27.415L-47 26L176 -197L177.414 -195.586ZM177.414 -208.586L-45.5859 14.415L-47 13L176 -210L177.414 -208.586Z" fill="url(#paint0_linear_1100_788)" fillOpacity="0.4" />
                            <defs>
                                <linearGradient id="paint0_linear_1100_788" x1="65.207" y1="-210" x2="65.2062" y2="693.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Right Section - Gradient with Abstract Graphics */}
                <div style={styles.rightSection}>
                    <div style={styles.abstractGraphics}>
                        {/* Top Layer - Bar Chart */}
                        <div style={{ ...styles.layer, ...styles.topLayer }}>
                            <div style={styles.chartContainer}>
                                <div style={{ ...styles.bar, ...styles.bar1 }}></div>
                                <div style={{ ...styles.bar, ...styles.bar2 }}></div>
                                <div style={{ ...styles.bar, ...styles.bar3 }}></div>
                                <div style={{ ...styles.bar, ...styles.bar4 }}></div>
                                <div style={{ ...styles.bar, ...styles.bar5 }}></div>
                            </div>
                            <div style={styles.textFields}>
                                <div style={styles.textField}></div>
                                <div style={styles.textField}></div>
                                <div style={styles.textField}></div>
                            </div>
                            <div style={styles.glowEffect}></div>
                        </div>

                        {/* Middle Layer - Grid */}
                        <div style={{ ...styles.layer, ...styles.middleLayer }}>
                            <div style={styles.gridContainer}>
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} style={styles.gridCell}></div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Layer - Circles */}
                        <div style={{ ...styles.layer, ...styles.bottomLayer }}>
                            <div style={styles.circlesContainer}>
                                <div style={{ ...styles.circle, ...styles.circle1 }}></div>
                                <div style={{ ...styles.circle, ...styles.circle2 }}></div>
                                <div style={{ ...styles.circle, ...styles.circle3 }}></div>
                                <div style={{ ...styles.circle, ...styles.circle4 }}></div>
                                <div style={{ ...styles.circle, ...styles.circle5 }}></div>
                            </div>
                        </div>

                        {/* Connection Lines */}
                        <div style={styles.connectionLines}>
                            <div style={{ ...styles.line, ...styles.line1 }}></div>
                            <div style={{ ...styles.line, ...styles.line2 }}></div>
                            <div style={{ ...styles.line, ...styles.line3 }}></div>
                            <div style={{ ...styles.line, ...styles.line4 }}></div>
                            <div style={{ ...styles.line, ...styles.line5 }}></div>
                        </div>

                        {/* Foundation Cube */}
                        <div style={styles.foundationCube}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestAccess; 