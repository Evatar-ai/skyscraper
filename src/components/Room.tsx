import { Box } from '@react-three/drei'
import { Table, Chair, Bed, Desk, SlotMachine } from './Furniture'

type RoomType = 'residential' | 'office' | 'casino' | 'bank' | 'restaurant'

interface RoomProps {
    type: RoomType
    width: number
    depth: number
    height: number
}

export default function Room({ type, width, depth, height }: RoomProps) {
    const renderInterior = () => {
        switch (type) {
            case 'residential':
                return (
                    <group>
                        <Bed position={[-width / 4, 0, -depth / 4]} rotation={[0, Math.PI / 4, 0]} />
                        <Table position={[width / 4, 0, depth / 4]} />
                        <Chair position={[width / 4, 0, depth / 4 - 1]} />
                    </group>
                )
            case 'office':
                return (
                    <group>
                        <Desk position={[-width / 3, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                        <Chair position={[-width / 3 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                        <Desk position={[width / 3, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                        <Chair position={[width / 3 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                        {/* Screens */}
                        <Box args={[0.1, 0.5, 0.8]} position={[-width / 3 + 0.2, 1.8, 0]}>
                            <meshStandardMaterial color="#000" />
                        </Box>
                        <Box args={[0.1, 0.5, 0.8]} position={[width / 3 - 0.2, 1.8, 0]}>
                            <meshStandardMaterial color="#000" />
                        </Box>
                    </group>
                )
            case 'casino':
                return (
                    <group>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SlotMachine key={i} position={[-width / 2 + 2 + i * 2, 0, -depth / 2 + 1]} />
                        ))}
                        <Table position={[0, 0, 2]} />
                        <Chair position={[0, 0, 1]} />
                        <Chair position={[0, 0, 3]} rotation={[0, Math.PI, 0]} />
                    </group>
                )
            case 'bank':
                return (
                    <group>
                        {/* Counter */}
                        <Box args={[width, 1.5, 1]} position={[0, 0.75, -depth / 4]}>
                            <meshStandardMaterial color="#444" />
                        </Box>
                        {/* Vault */}
                        <Box args={[3, 4, 1]} position={[0, 2, -depth / 2 + 0.5]}>
                            <meshStandardMaterial color="#888" metalness={0.8} />
                        </Box>
                    </group>
                )
            case 'restaurant':
                return (
                    <group>
                        <Table position={[-width / 4, 0, -depth / 4]} />
                        <Chair position={[-width / 4, 0, -depth / 4 - 1]} />
                        <Chair position={[-width / 4, 0, -depth / 4 + 1]} rotation={[0, Math.PI, 0]} />

                        <Table position={[width / 4, 0, depth / 4]} />
                        <Chair position={[width / 4, 0, depth / 4 - 1]} />
                        <Chair position={[width / 4, 0, depth / 4 + 1]} rotation={[0, Math.PI, 0]} />
                    </group>
                )
            default:
                return null
        }
    }

    return (
        <group>
            {/* Floor */}
            <Box args={[width, 0.2, depth]} position={[0, 0.1, 0]}>
                <meshStandardMaterial color={type === 'casino' ? '#300' : type === 'office' ? '#ccc' : '#dcb'} />
            </Box>

            {/* Ceiling */}
            <Box args={[width, 0.2, depth]} position={[0, height, 0]}>
                <meshStandardMaterial color="#fff" />
            </Box>

            {/* Walls */}
            <Box args={[width, height, 0.2]} position={[0, height / 2, -depth / 2]}>
                <meshStandardMaterial color="#eee" />
            </Box>
            <Box args={[width, height, 0.2]} position={[0, height / 2, depth / 2]}>
                <meshStandardMaterial color="#eee" />
            </Box>
            <Box args={[0.2, height, depth]} position={[-width / 2, height / 2, 0]}>
                <meshStandardMaterial color="#eee" />
            </Box>
            {/* Front wall is open (glass) or partial */}

            {renderInterior()}
        </group>
    )
}
