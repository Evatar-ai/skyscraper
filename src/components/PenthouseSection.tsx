import { Box, Text } from '@react-three/drei'
import { FLOOR_HEIGHT, BUILDING_RADIUS } from '../constants'
import { GrandPiano, Chair } from './Furniture'
import Human from './Human'

function ServerRack({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            <Box args={[1, 2.5, 1]} position={[0, 1.25, 0]}>
                <meshStandardMaterial color="#111" />
            </Box>
            {/* Blinking lights */}
            {Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} args={[0.8, 0.1, 0.05]} position={[0, 0.5 + i * 0.4, 0.5]}>
                    <meshStandardMaterial color={Math.random() > 0.5 ? '#00ff00' : '#ff0000'} emissive={Math.random() > 0.5 ? '#00ff00' : '#ff0000'} emissiveIntensity={2} />
                </Box>
            ))}
        </group>
    )
}

function HackerSetup({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Desk */}
            <Box args={[4, 0.1, 2]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#222" />
            </Box>
            {/* Legs */}
            <Box args={[0.1, 1, 1.8]} position={[-1.8, 0.5, 0]}>
                <meshStandardMaterial color="#444" />
            </Box>
            <Box args={[0.1, 1, 1.8]} position={[1.8, 0.5, 0]}>
                <meshStandardMaterial color="#444" />
            </Box>

            {/* Monitors */}
            <group position={[0, 1.5, 0.5]}>
                {/* Center */}
                <Box args={[1.2, 0.8, 0.05]}>
                    <meshStandardMaterial color="#000" emissive="#00ffff" emissiveIntensity={0.5} />
                </Box>
                {/* Left */}
                <Box args={[1, 0.8, 0.05]} position={[-1.2, 0, 0.2]} rotation={[0, Math.PI / 6, 0]}>
                    <meshStandardMaterial color="#000" emissive="#00ff00" emissiveIntensity={0.5} />
                </Box>
                {/* Right */}
                <Box args={[1, 0.8, 0.05]} position={[1.2, 0, 0.2]} rotation={[0, -Math.PI / 6, 0]}>
                    <meshStandardMaterial color="#000" emissive="#ff00ff" emissiveIntensity={0.5} />
                </Box>
            </group>

            {/* The Hacker (User) */}
            <Human position={[0, 0, -1]} rotation={[0, Math.PI, 0]} scale={[0.9, 0.9, 0.9]} />
            <Chair position={[0, 0, -1]} />
        </group>
    )
}

export default function PenthouseSection() {
    const floor166Y = (166 - 1) * FLOOR_HEIGHT
    const floor167Y = (167 - 1) * FLOOR_HEIGHT

    return (
        <group>
            {/* Floor 166: The Hacker's Den */}
            <group position={[0, floor166Y, 0]}>
                {/* Floor Plate */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[BUILDING_RADIUS - 1, 64]} />
                    <meshStandardMaterial color="#222" />
                </mesh>

                {/* Workstation Area */}
                <HackerSetup position={[0, 0, 15]} rotation={[0, Math.PI, 0]} />

                {/* Server Farm */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <ServerRack key={i} position={[-20 + i * 2, 0, -15]} />
                ))}

                {/* Lounge */}
                <GrandPiano position={[20, 0, -10]} rotation={[0, -0.5, 0]} />
                <Box args={[6, 1, 3]} position={[15, 0.5, 10]}>
                    <meshStandardMaterial color="#555" />
                </Box>
            </group>

            {/* Floor 167: The Pool Deck */}
            <group position={[0, floor167Y, 0]}>
                {/* Main Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[BUILDING_RADIUS - 1, 64]} />
                    <meshStandardMaterial color="#eee" />
                </mesh>

                {/* Cantilevered Glass Pool */}
                <group position={[0, 0, BUILDING_RADIUS + 10]}>
                    {/* Glass Bottom */}
                    <Box args={[20, 0.5, 40]} position={[0, 0, 0]}>
                        <meshPhysicalMaterial
                            color="#aaddff"
                            transmission={0.9}
                            opacity={0.5}
                            transparent
                            roughness={0.0}
                            metalness={0.1}
                            thickness={2}
                        />
                    </Box>
                    {/* Water */}
                    <Box args={[18, 2, 38]} position={[0, 1.5, 0]}>
                        <meshPhysicalMaterial
                            color="#00ffff"
                            transmission={0.8}
                            opacity={0.6}
                            transparent
                            roughness={0.1}
                        />
                    </Box>
                    {/* Pool Walls */}
                    <Box args={[21, 3, 1]} position={[0, 1.5, 20.5]}>
                        <meshStandardMaterial color="#fff" />
                    </Box>
                    <Box args={[21, 3, 1]} position={[0, 1.5, -20.5]}>
                        <meshStandardMaterial color="#fff" />
                    </Box>
                    <Box args={[1, 3, 42]} position={[10.5, 1.5, 0]}>
                        <meshStandardMaterial color="#fff" />
                    </Box>
                    <Box args={[1, 3, 42]} position={[-10.5, 1.5, 0]}>
                        <meshStandardMaterial color="#fff" />
                    </Box>
                </group>
            </group>

            {/* Roof / Helipad */}
            <group position={[0, (167) * FLOOR_HEIGHT + 10, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[BUILDING_RADIUS, 64]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                {/* H Marking */}
                <Text
                    position={[0, 0.1, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={40}
                    color="#ffff00"
                >
                    H
                </Text>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                    <ringGeometry args={[35, 38, 64]} />
                    <meshBasicMaterial color="#ffff00" />
                </mesh>
            </group>
        </group>
    )
}
