import { Box, Sphere, Cylinder } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Human(props: any) {
    const shirtColor = useMemo(() => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#000000']
        return colors[Math.floor(Math.random() * colors.length)]
    }, [])

    const group = useRef<any>()
    const offset = Math.random() * 1000

    useFrame((state) => {
        if (group.current) {
            // Simple bobbing/walking motion
            const t = state.clock.elapsedTime * 5 + offset
            group.current.position.y = Math.sin(t * 2) * 0.05
            group.current.rotation.y += 0.005 // Slowly rotate

            // Walk in a small circle if not fixed
            // group.current.position.x += Math.sin(t) * 0.01
            // group.current.position.z += Math.cos(t) * 0.01
        }
    })

    return (
        <group ref={group} {...props}>
            {/* Head */}
            <Sphere args={[0.25, 8, 8]} position={[0, 1.6, 0]}>
                <meshStandardMaterial color="#ffccaa" />
            </Sphere>

            {/* Body */}
            <Box args={[0.5, 0.7, 0.3]} position={[0, 1, 0]}>
                <meshStandardMaterial color={shirtColor} />
            </Box>

            {/* Arms */}
            <Box args={[0.15, 0.7, 0.15]} position={[-0.35, 1, 0]}>
                <meshStandardMaterial color={shirtColor} />
            </Box>
            <Box args={[0.15, 0.7, 0.15]} position={[0.35, 1, 0]}>
                <meshStandardMaterial color={shirtColor} />
            </Box>

            {/* Legs */}
            <Cylinder args={[0.1, 0.1, 0.7, 8]} position={[-0.15, 0.35, 0]}>
                <meshStandardMaterial color="#333" />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 0.7, 8]} position={[0.15, 0.35, 0]}>
                <meshStandardMaterial color="#333" />
            </Cylinder>
        </group>
    )
}
