import { Cylinder } from '@react-three/drei'
import { DoubleSide } from 'three'
import { FLOOR_HEIGHT, BUILDING_RADIUS, TOTAL_FLOORS } from '../constants'

export default function BuildingShell() {
    const height = (TOTAL_FLOORS || 167) * (FLOOR_HEIGHT || 4)
    const radius = BUILDING_RADIUS || 60

    return (
        <group position={[0, height / 2, 0]}>
            {/* Main glass cylinder */}
            {/* Main glass cylinder */}
            <Cylinder args={[radius, radius, height, 32, 1, true]}>
                <meshStandardMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.3}
                    roughness={0.2}
                    metalness={0.5}
                    side={DoubleSide}
                />
            </Cylinder>

            {/* Structural Frame */}
            {/* Vertical Columns */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                return (
                    <Cylinder key={`col-${i}`} args={[1, 1, height, 8]} position={[x, 0, z]}>
                        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.2} />
                    </Cylinder>
                )
            })}

            {/* Horizontal Rings every 10 floors */}
            {Array.from({ length: Math.floor(TOTAL_FLOORS / 10) }).map((_, i) => (
                <Cylinder
                    key={`ring-${i}`}
                    args={[radius + 0.5, radius + 0.5, 2, 32, 1, true]}
                    position={[0, (i * 10 * FLOOR_HEIGHT) - height / 2 + 2, 0]}
                >
                    <meshStandardMaterial color="#444" metalness={0.7} roughness={0.2} side={DoubleSide} />
                </Cylinder>
            ))}
        </group>
    )
}
