import { Box, Cylinder } from '@react-three/drei'
import { FLOOR_HEIGHT, BUILDING_RADIUS } from '../constants'

export default function LobbySection() {
    // Floor 1: Grand Lobby
    const height = FLOOR_HEIGHT * 2 // Double height lobby
    const radius = BUILDING_RADIUS

    return (
        <group position={[0, height / 2, 0]}>
            {/* Marble Floor */}
            <Cylinder args={[radius - 1, radius - 1, 0.5, 32]} position={[0, -height / 2 + 0.25, 0]}>
                <meshStandardMaterial color="#eec" roughness={0.1} metalness={0.1} />
            </Cylinder>

            {/* Reception Desk */}
            <group position={[0, -height / 2 + 2, -10]}>
                <Box args={[10, 2, 3]}>
                    <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
                </Box>
            </group>

            {/* Entrance Canopy */}
            <group position={[0, 0, radius + 5]}>
                <Box args={[20, 1, 15]} position={[0, 5, 0]}>
                    <meshStandardMaterial color="#222" />
                </Box>
                {/* Support pillars for canopy */}
                <Cylinder args={[0.5, 0.5, 10, 8]} position={[-8, 0, 6]}>
                    <meshStandardMaterial color="#555" />
                </Cylinder>
                <Cylinder args={[0.5, 0.5, 10, 8]} position={[8, 0, 6]}>
                    <meshStandardMaterial color="#555" />
                </Cylinder>
            </group>

            {/* Revolving Doors (Static representation for now) */}
            <group position={[0, -height / 2 + 3, radius]}>
                <Cylinder args={[3, 3, 6, 16, 1, true]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="#88ccff" transparent opacity={0.5} />
                </Cylinder>
                <Box args={[0.2, 6, 5.8]} rotation={[0, Math.PI / 4, 0]}>
                    <meshStandardMaterial color="#888" />
                </Box>
                <Box args={[0.2, 6, 5.8]} rotation={[0, -Math.PI / 4, 0]}>
                    <meshStandardMaterial color="#888" />
                </Box>
            </group>
        </group>
    )
}
