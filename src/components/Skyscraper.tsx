import { GroupProps } from '@react-three/fiber'
import BuildingShell from './BuildingShell'
import BaseSection from './BaseSection'
import ShaftSection from './ShaftSection'
import PenthouseSection from './PenthouseSection'
import UndergroundSection from './UndergroundSection'
import LobbySection from './LobbySection'


export default function Skyscraper(props: GroupProps) {
    return (
        <group {...props}>
            {/* The main glass shell covering the whole building or parts of it */}
            <BuildingShell />



            {/* Underground Garage */}
            <UndergroundSection />

            {/* Floor 1: Lobby */}
            <LobbySection />

            {/* Floors 2-9: Amphitheater Base */}
            <BaseSection />

            {/* Floors 10-159: The Atrium / Void */}
            <ShaftSection />

            {/* Floors 160-167: Penthouse */}
            <PenthouseSection />
        </group>
    )
}
