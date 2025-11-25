import { CSSProperties } from 'react'

const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    fontFamily: 'monospace',
    pointerEvents: 'none',
    userSelect: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
}

const titleStyle: CSSProperties = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#00ffff',
    textTransform: 'uppercase',
}

const listStyle: CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    lineHeight: '1.6',
}

const keyStyle: CSSProperties = {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '2px 6px',
    borderRadius: '4px',
    marginRight: '8px',
    fontWeight: 'bold',
    color: '#ffcc00',
    minWidth: '20px',
    textAlign: 'center',
}

export default function InstructionsOverlay() {
    return (
        <div style={overlayStyle}>
            <div style={titleStyle}>Skyscraper Controls</div>
            <ul style={listStyle}>
                <li>
                    <span style={keyStyle}>1-0</span> Camera Views
                </li>
                <li>
                    <span style={keyStyle}>W</span><span style={keyStyle}>A</span><span style={keyStyle}>S</span><span style={keyStyle}>D</span> Move
                </li>
                <li>
                    <span style={keyStyle}>R</span><span style={keyStyle}>F</span> Up / Down
                </li>
                <li>
                    <span style={keyStyle}>Mouse</span> Look Around
                </li>
            </ul>
            <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#aaa' }}>
                <div style={{ marginBottom: '5px' }}><strong>Views:</strong></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px 10px' }}>
                    <span>1: Overview</span>
                    <span>2: Entrance</span>
                    <span>3: Atrium</span>
                    <span>4: Hacker's Den</span>
                    <span>5: Pool Deck</span>
                    <span>6: Mall</span>
                    <span>7: Helipad</span>
                    <span>8: Street</span>
                    <span>9: Shaft</span>
                    <span>0: Worm's Eye</span>
                </div>
            </div>
        </div>
    )
}
