import { Cylinder, Box } from '@react-three/drei'
import { FLOOR_HEIGHT, BUILDING_RADIUS } from '../constants'

export default function UndergroundSection() {
    // 5 levels of underground parking
    const levels = []
    const numLevels = 5

    for (let i = 1; i <= numLevels; i++) {
        const y = -i * FLOOR_HEIGHT

        levels.push(
            <group key={i} position={[0, y, 0]}>
                {/* Floor */}
                <Cylinder args={[BUILDING_RADIUS + 10, BUILDING_RADIUS + 10, 0.5, 32]} position={[0, -FLOOR_HEIGHT / 2, 0]}>
                    <meshStandardMaterial color="#333" roughness={0.8} />
                </Cylinder>

                {/* Pillars */}
                {Array.from({ length: 8 }).map((_, k) => {
                    const angle = (k / 8) * Math.PI * 2
                    const r = BUILDING_RADIUS * 0.6
                    return (
                        <Cylinder key={k} args={[1, 1, FLOOR_HEIGHT, 8]} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
                            <meshStandardMaterial color="#444" />
                        </Cylinder>
                    )
                })}

                {/* Parked Cars (Simple Boxes) */}
                {Array.from({ length: 12 }).map((_, k) => {
                    const angle = (k / 12) * Math.PI * 2 + 0.1
                    const r = BUILDING_RADIUS * 0.8
                    return (
                        <Box key={k} args={[2, 1.5, 4]} position={[Math.cos(angle) * r, -FLOOR_HEIGHT / 2 + 0.75, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
                            <meshStandardMaterial color={["#a00", "#0a0", "#00a", "#aa0", "#fff"][k % 5]} />
                        </Box>
                    )
                })}
            </group>
        )
    }

    return <group>{levels}</group>
}
