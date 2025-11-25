import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Vector3 } from 'three'
import { FLOOR_HEIGHT, BUILDING_RADIUS } from '../constants'

export default function CameraManager() {
    const { camera, controls } = useThree()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle number keys 0-9
            if (!/^[0-9]$/.test(e.key)) return

            let position = new Vector3()
            let target = new Vector3(0, 0, 0)

            switch (e.key) {
                case '1': // Overview
                    position.set(400, 400, 400)
                    target.set(0, 300, 0)
                    break
                case '2': // Entrance
                    position.set(0, 5, BUILDING_RADIUS + 60)
                    target.set(0, 10, 0)
                    break
                case '3': // Atrium (Inside Lobby looking up)
                    position.set(20, 10, 20)
                    target.set(0, 200, 0)
                    break
                case '4': // Hacker's Den (Floor 166)
                    const hY = (166 - 1) * FLOOR_HEIGHT
                    position.set(10, hY + 5, 25) // Behind the user
                    target.set(0, hY + 2, 0) // Looking at desk
                    break
                case '5': // Pool (Floor 167)
                    const pY = (167 - 1) * FLOOR_HEIGHT
                    position.set(0, pY + 5, BUILDING_RADIUS + 25) // On the deck
                    target.set(0, pY - 100, BUILDING_RADIUS + 40) // Looking down/out
                    break
                case '6': // Mall (Floor 5)
                    const mY = (5 - 1) * FLOOR_HEIGHT
                    position.set(BUILDING_RADIUS - 15, mY + 5, 0)
                    target.set(0, mY, 0)
                    break
                case '7': // Helipad (Roof)
                    const rY = 167 * FLOOR_HEIGHT
                    position.set(0, rY + 100, 0) // High above
                    target.set(0, rY, 0) // Looking straight down
                    break
                case '8': // Street Life
                    position.set(50, 2, 50)
                    target.set(0, 10, 0)
                    break
                case '9': // Shaft (Mid-air)
                    position.set(0, 80 * FLOOR_HEIGHT, 0)
                    target.set(0, 0, 0) // Looking down the core
                    break
                case '0': // Worm's Eye
                    position.set(10, 0, 10)
                    target.set(0, 600, 0) // Looking straight up
                    break
            }

            // Apply changes
            camera.position.copy(position)
            camera.lookAt(target)

            // Update controls target if available (OrbitControls/MapControls)
            // For FlyControls, we mainly rely on camera rotation, but setting lookAt helps
            if (controls && 'target' in controls) {
                // @ts-ignore
                controls.target.copy(target)
                // @ts-ignore
                controls.update()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [camera, controls])

    return null
}
