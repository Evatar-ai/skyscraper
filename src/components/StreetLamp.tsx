import { Cylinder, Box } from '@react-three/drei'

export default function StreetLamp(props: any) {
    return (
        <group {...props}>
            {/* Pole */}
            <Cylinder args={[0.1, 0.1, 5, 8]} position={[0, 2.5, 0]}>
                <meshStandardMaterial color="#222" />
            </Cylinder>
            {/* Arm */}
            <Box args={[1.5, 0.1, 0.1]} position={[0.5, 4.8, 0]}>
                <meshStandardMaterial color="#222" />
            </Box>
            {/* Light Fixture */}
            <Box args={[0.4, 0.1, 0.2]} position={[1.2, 4.75, 0]}>
                <meshStandardMaterial color="#222" />
            </Box>
            {/* Emissive Bulb */}
            <Box args={[0.3, 0.05, 0.15]} position={[1.2, 4.7, 0]}>
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={2} toneMapped={false} />
            </Box>
            {/* Actual Light Source */}
            <pointLight position={[1.2, 4.5, 0]} intensity={1} distance={20} color="#ffaa00" castShadow />
        </group>
    )
}
