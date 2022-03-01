import * as THREE from "three";
import { TOrientation } from "../commons/types";

export const PLACE_BG_URLS = {
    bot1: "/images/bottom-1.jpg",
    bot2: "/images/bottom-2.jpg",
    bot3: "/images/bottom-3.jpg",
    bot4: "/images/bottom-4.jpg",
    bot5: "/images/bottom-5.jpg",
    theHouse: "/images/the-house.jpg",
    theC: "/images/C-midB-rightTop.jpg",
    theB: "/images/B-leftTop-rightC.jpg",
    theTop: "/images/top-leftC-rightB.jpg",
};

export type TTrack = {
    orientation: TOrientation;
    name?: string;
    to: number;
};

export interface IPlace {
    id: number;
    bgUrl: string;
    texture: THREE.Texture;
    tracks: TTrack[];
}
