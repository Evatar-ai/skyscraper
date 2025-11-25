import { useMemo, useRef } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { FLOOR_HEIGHT, BUILDING_RADIUS } from '../constants'
import Room from './Room'

function ElevatorCar({ x, z }: { x: number, z: number }) {
    const ref = useRef<any>()

    const offset = Math.random() * 1000

    useFrame((state) => {
        if (ref.current) {
            // Simple sine wave movement
            const t = state.clock.elapsedTime * 0.5 + offset
            const y = (Math.sin(t) * 0.5 + 0.5) * (140 * FLOOR_HEIGHT) + 10 * FLOOR_HEIGHT
            ref.current.position.y = y
        }
    })

    return (
        <group ref={ref} position={[x, 0, z]}>
            <Box args={[3, 4, 3]}>
                <meshStandardMaterial color="#ffcc00" metalness={0.8} roughness={0.2} />
            </Box>
            <pointLight intensity={0.5} distance={10} color="#ffaa00" />
        </group>
    )
}

const ROOM_TYPES = ['residential', 'office', 'casino', 'bank', 'restaurant'] as const

export default function ShaftSection() {
    // Floors 10-159
    // "huge open space"
    // "rooms or spaces... situated in random order on each floor... not more than 2 or 3 more often just one"
    // "start from floor say 20 and up to 140"

    const pods = useMemo(() => {
        const items = []
        for (let i = 20; i <= 140; i++) {
            if (Math.random() > 0.3) {
                const numPods = Math.floor(Math.random() * 2) + 1
                for (let j = 0; j < numPods; j++) {
                    const angle = Math.random() * Math.PI * 2
                    const width = Math.random() * 10 + 15 // Wider rooms: 15-25
                    const depth = Math.random() * 10 + 15 // Deeper rooms: 15-25
                    const height = FLOOR_HEIGHT * 0.9

                    const r = BUILDING_RADIUS - depth / 2 - 1
                    const x = Math.cos(angle) * r
                    const z = Math.sin(angle) * r
                    const y = (i - 1) * FLOOR_HEIGHT + 0.1

                    const type = ROOM_TYPES[Math.floor(Math.random() * ROOM_TYPES.length)]

                    items.push(
                        <group key={`${i}-${j}`} position={[x, y, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
                            <Room type={type} width={width} depth={depth} height={height} />

                            {/* Window Glass */}
                            <Box args={[width, height, 0.2]} position={[0, height / 2, depth / 2]}>
                                <meshPhysicalMaterial
                                    color="#aaf"
                                    transmission={0.6}
                                    roughness={0.1}
                                    thickness={0.5}
                                    transparent
                                    opacity={0.3}
                                />
                            </Box>
                        </group>
                    )
                }
            }
        }
        return items
    }, [])

    // Elevators
    const elevators = useMemo(() => {
        const shafts = []
        const numElevators = 4
        for (let k = 0; k < numElevators; k++) {
            const angle = (k / numElevators) * Math.PI * 2
            const r = BUILDING_RADIUS - 4
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r
            // Shaft running full height of this section
            shafts.push(
                <group key={k}>
                    <Cylinder
                        args={[2, 2, (159 - 10) * FLOOR_HEIGHT, 8]}
                        position={[x, ((159 + 10) / 2 - 1) * FLOOR_HEIGHT, z]}
                    >
                        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
                    </Cylinder>
                    <ElevatorCar x={x} z={z} />
                </group>
            )
        }
        return shafts
    }, [])

    return (
        <group>
            {pods}
            {elevators}
        </group>
    )
}
