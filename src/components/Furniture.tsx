import { Box, Cylinder } from '@react-three/drei'

export function Table(props: any) {
    return (
        <group {...props}>
            <Box args={[3, 0.2, 3]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Cylinder args={[0.2, 0.2, 1.5, 8]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#555" />
            </Cylinder>
        </group>
    )
}

export function Chair(props: any) {
    return (
        <group {...props}>
            <Box args={[1, 0.1, 1]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#333" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[-0.4, 0.5, -0.4]}>
                <meshStandardMaterial color="#555" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[0.4, 0.5, -0.4]}>
                <meshStandardMaterial color="#555" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[-0.4, 0.5, 0.4]}>
                <meshStandardMaterial color="#555" />
            </Box>
            <Box args={[0.1, 1, 0.1]} position={[0.4, 0.5, 0.4]}>
                <meshStandardMaterial color="#555" />
            </Box>
            <Box args={[1, 1, 0.1]} position={[0, 1.5, -0.45]}>
                <meshStandardMaterial color="#333" />
            </Box>
        </group>
    )
}

export function Bed(props: any) {
    return (
        <group {...props}>
            <Box args={[4, 1, 6]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#fff" />
            </Box>
            <Box args={[4, 0.5, 0.5]} position={[0, 1.25, -2.5]}>
                <meshStandardMaterial color="#ccc" />
            </Box>
        </group>
    )
}

export function Desk(props: any) {
    return (
        <group {...props}>
            <Box args={[4, 0.2, 2]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#ddd" />
            </Box>
            <Box args={[0.2, 1.5, 2]} position={[-1.9, 0.75, 0]}>
                <meshStandardMaterial color="#aaa" />
            </Box>
            <Box args={[0.2, 1.5, 2]} position={[1.9, 0.75, 0]}>
                <meshStandardMaterial color="#aaa" />
            </Box>
        </group>
    )
}

export function SlotMachine(props: any) {
    return (
        <group {...props}>
            <Box args={[1.5, 3, 1.5]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#222" />
            </Box>
            <Box args={[1.2, 1, 0.1]} position={[0, 2, 0.76]}>
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
            </Box>
        </group>
    )
}

export function GrandPiano(props: any) {
    return (
        <group {...props}>
            {/* Body */}
            <Box args={[4, 1, 6]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#000" roughness={0.1} />
            </Box>
            {/* Legs */}
            <Cylinder args={[0.2, 0.1, 1.5, 8]} position={[-1.8, 0.75, -2.8]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
            <Cylinder args={[0.2, 0.1, 1.5, 8]} position={[1.8, 0.75, -2.8]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
            <Cylinder args={[0.2, 0.1, 1.5, 8]} position={[0, 0.75, 2.8]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
        </group>
    )
}
