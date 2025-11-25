import { Text, Box } from '@react-three/drei'
import { FLOOR_HEIGHT, BUILDING_RADIUS } from '../constants'
import Room from './Room'
import Human from './Human'


function Escalator({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Ramp */}
            <Box args={[2, 0.5, 10]} rotation={[Math.PI / 6, 0, 0]} position={[0, 2, 0]}>
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </Box>
            {/* Railings */}
            <Box args={[0.1, 1, 10]} rotation={[Math.PI / 6, 0, 0]} position={[0.9, 2.5, 0]}>
                <meshStandardMaterial color="#ccc" transparent opacity={0.5} />
            </Box>
            <Box args={[0.1, 1, 10]} rotation={[Math.PI / 6, 0, 0]} position={[-0.9, 2.5, 0]}>
                <meshStandardMaterial color="#ccc" transparent opacity={0.5} />
            </Box>
        </group>
    )
}

function ShopSign({ text, color }: { text: string, color: string }) {
    return (
        <group position={[0, 3, 6]}>
            <Text
                color={color}
                fontSize={1.5}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#000"
            >
                {text}
            </Text>
        </group>
    )
}

export default function BaseSection() {
    const floors = []
    const startFloor = 2
    const endFloor = 9

    const shopTypes = [
        { type: 'market', label: 'MARKET', color: '#00ff00' },
        { type: 'cafeteria', label: 'CAFE', color: '#ffaa00' },
        { type: 'clothing', label: 'FASHION', color: '#ff00ff' },
        { type: 'bank', label: 'BANK', color: '#00ffff' },
        { type: 'tech', label: 'TECH', color: '#0000ff' },
        { type: 'books', label: 'BOOKS', color: '#ffffff' },
        { type: 'market', label: 'MARKET', color: '#00ff00' },
        { type: 'cafeteria', label: 'CAFE', color: '#ffaa00' },
    ]

    for (let i = startFloor; i <= endFloor; i++) {
        const y = (i - 1) * FLOOR_HEIGHT + FLOOR_HEIGHT / 2
        const progress = (i - startFloor) / (endFloor - startFloor)
        // Wider inner void logic
        const innerRadius = 30 + progress * 20
        const outerRadius = BUILDING_RADIUS - 2

        const shopConfig = shopTypes[(i - startFloor) % shopTypes.length]

        floors.push(
            <group key={i} position={[0, y, 0]}>
                {/* Floor Plate */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -FLOOR_HEIGHT / 2 + 0.25, 0]}>
                    <ringGeometry args={[innerRadius, outerRadius, 64]} />
                    <meshStandardMaterial color="#666" side={2} />
                </mesh>

                {/* Ceiling/Floor Underside */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -FLOOR_HEIGHT / 2 + 0.2, 0]}>
                    <ringGeometry args={[innerRadius, outerRadius, 64]} />
                    <meshStandardMaterial color="#ddd" side={2} />
                </mesh>

                {/* Balcony Railing */}
                <mesh position={[0, -FLOOR_HEIGHT / 2 + 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[innerRadius, innerRadius + 0.5, 64]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>

                {/* Escalators (connecting to floor above, except top floor) */}
                {i < endFloor && (
                    <>
                        <Escalator position={[innerRadius + 5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                        <Escalator position={[-(innerRadius + 5), 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                    </>
                )}

                {/* Shops */}
                {Array.from({ length: 6 }).map((_, k) => {
                    const angle = (k / 6) * Math.PI * 2
                    const r = outerRadius - 12
                    const x = Math.cos(angle) * r
                    const z = Math.sin(angle) * r

                    return (
                        <group key={`shop-${k}`} position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
                            <Room type={shopConfig.type as any || 'office'} width={20} depth={15} height={FLOOR_HEIGHT * 0.9} />
                            <ShopSign text={shopConfig.label} color={shopConfig.color} />
                        </group>
                    )
                })}

                {/* People */}
                {Array.from({ length: 8 }).map((_, k) => {
                    const angle = Math.random() * Math.PI * 2
                    const r = innerRadius + 2 + Math.random() * (outerRadius - innerRadius - 20)
                    return (
                        <Human key={`human-${k}`} position={[Math.cos(angle) * r, -FLOOR_HEIGHT / 2, Math.sin(angle) * r]} rotation={[0, Math.random() * Math.PI * 2, 0]} />
                    )
                })}
            </group>
        )
    }

    return <group>{floors}</group>
}
