import { Canvas } from '@react-three/fiber'
import { FlyControls } from '@react-three/drei'
import Skyscraper from './components/Skyscraper'
import Environment from './components/Environment'
import CameraManager from './components/CameraManager'
import InstructionsOverlay from './components/InstructionsOverlay'

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <Canvas camera={{ position: [0, 400, 600], fov: 45, far: 15000 }}>
                <color attach="background" args={['#113355']} />
                <CameraManager />
                <FlyControls movementSpeed={50} rollSpeed={0.2} dragToLook />

                <ambientLight intensity={0.8} />
                <directionalLight
                    position={[100, 100, 50]}
                    intensity={1}
                />

                <Environment />
                <Skyscraper />
            </Canvas>
            <InstructionsOverlay />
        </div>
    )
}

export default App
