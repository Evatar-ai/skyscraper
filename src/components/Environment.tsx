import { Plane, Box, Instances, Instance } from '@react-three/drei'
import { useMemo } from 'react'
import Human from './Human'


export default function Environment() {
    // Trees - Instanced
    const trees = useMemo(() => {
        const items = []
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2
            const r = Math.random() * 1200 + 150
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r
            const scale = Math.random() * 0.5 + 0.5
            items.push({ position: [x, 0, z], scale: [scale, scale, scale] })
        }
        return items
    }, [])

    // Buildings - Instanced (More density)
    const buildings = useMemo(() => {
        const items = []
        for (let i = 0; i < 150; i++) {
            const angle = Math.random() * Math.PI * 2
            const r = Math.random() * 1500 + 200
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r
            const width = Math.random() * 50 + 30
            const depth = Math.random() * 50 + 30
            const height = Math.random() * 300 + 50
            items.push({ position: [x, height / 2, z], args: [width, height, depth] })
        }
        return items
    }, [])

    // Traffic - Instanced Cars
    const cars = useMemo(() => {
        const items = []
        // Create traffic on grid lines
        // Main grid roughly every 300 units
        for (let x = -1500; x <= 1500; x += 300) {
            if (Math.abs(x) < 100) continue // Skip center
            for (let j = 0; j < 5; j++) {
                const z = (Math.random() - 0.5) * 3000
                items.push({ position: [x + 10, 1, z], rotation: [0, 0, 0], color: '#ff3333' }) // North
                items.push({ position: [x - 10, 1, z], rotation: [0, Math.PI, 0], color: '#cccccc' }) // South
            }
        }
        for (let z = -1500; z <= 1500; z += 300) {
            if (Math.abs(z) < 100) continue // Skip center
            for (let j = 0; j < 5; j++) {
                const x = (Math.random() - 0.5) * 3000
                items.push({ position: [x, 1, z + 10], rotation: [0, -Math.PI / 2, 0], color: '#ff3333' }) // East
                items.push({ position: [x, 1, z - 10], rotation: [0, Math.PI / 2, 0], color: '#cccccc' }) // West
            }
        }
        return items
    }, [])

    // People - Reduced count, kept as components for detail
    const people = useMemo(() => {
        const items = []
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2
            const r = Math.random() * 150 + 70
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r
            items.push(
                <Human key={`human-${i}`} position={[x, 0, z]} rotation={[0, Math.random() * Math.PI * 2, 0]} />
            )
        }
        return items
    }, [])

    // Street Lamps removed for performance

    return (
        <group>
            {/* Ground (Grass/Earth) */}
            <Plane args={[10000, 10000]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                <meshStandardMaterial color="#2d4c1e" roughness={1} />
            </Plane>

            {/* City Base (Streets/Concrete) */}
            <Plane args={[3000, 3000]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <meshStandardMaterial color="#555566" roughness={0.8} />
            </Plane>

            {/* Roads Grid */}
            {/* We can simulate a grid by just having the dark base and adding lighter stripes or just assuming the empty space between buildings is "road" 
                For performance, let's just use the dark base as asphalt and place cars on it.
            */}

            {/* Instanced Trees */}
            <Instances range={trees.length}>
                <cylinderGeometry args={[1, 1, 5, 8]} />
                <meshStandardMaterial color="#533" />
                {trees.map((data, i) => (
                    <group key={i} position={data.position as any} scale={data.scale as any}>
                        <Instance position={[0, 2.5, 0]} />
                    </group>
                ))}
            </Instances>
            <Instances range={trees.length}>
                <coneGeometry args={[4, 10, 8]} />
                <meshStandardMaterial color="#262" />
                {trees.map((data, i) => (
                    <group key={i} position={data.position as any} scale={data.scale as any}>
                        <Instance position={[0, 7.5, 0]} />
                    </group>
                ))}
            </Instances>

            {/* Buildings */}
            {buildings.map((data, i) => (
                <Box key={`bldg-${i}`} args={data.args as any} position={data.position as any}>
                    <meshStandardMaterial color="#444" roughness={0.2} metalness={0.5} />
                </Box>
            ))}

            {/* Traffic */}
            {cars.map((data, i) => (
                <Box key={`car-${i}`} args={[4, 2, 8]} position={data.position as any} rotation={data.rotation as any}>
                    <meshStandardMaterial color={data.color} />
                </Box>
            ))}

            {people}
        </group>
    )
}
