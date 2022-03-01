import * as THREE from "three";
import { IPlace, PLACE_BG_URLS } from "./classes/Place";

export const PLACES: {
    [key: number]: IPlace;
    1: IPlace;
    2: IPlace;
    3: IPlace;
} = {
    1: {
        id: 1,
        bgUrl: PLACE_BG_URLS.bot1,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.bot1),
        tracks: [
            {
                orientation: {
                    yaw: 90,
                    pitch: 0,
                },
                name: "GO",
                to: 2,
            },
        ],
    },
    2: {
        id: 2,
        bgUrl: PLACE_BG_URLS.bot2,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.bot2),
        tracks: [
            {
                orientation: {
                    yaw: 90,
                    pitch: 0,
                },
                name: "GO",
                to: 3,
            },
            {
                orientation: {
                    yaw: 225,
                    pitch: 0,
                },
                name: "BACK",
                to: 1,
            },
        ],
    },
    3: {
        id: 3,
        bgUrl: PLACE_BG_URLS.bot3,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.bot3),
        tracks: [
            {
                orientation: {
                    yaw: 270,
                    pitch: 0,
                },
                name: "BACK",
                to: 2,
            },
            {
                orientation: {
                    yaw: 45,
                    pitch: 0,
                },
                name: "GO",
                to: 4,
            },
        ],
    },
    4: {
        id: 4,
        bgUrl: PLACE_BG_URLS.bot4,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.bot4),
        tracks: [
            {
                orientation: {
                    yaw: 270,
                    pitch: 0,
                },
                name: "BACK",
                to: 3,
            },
            {
                orientation: {
                    yaw: 45,
                    pitch: 0,
                },
                name: "GO",
                to: 5,
            },
        ],
    },
    5: {
        id: 5,
        bgUrl: PLACE_BG_URLS.bot5,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.bot5),
        tracks: [
            {
                orientation: {
                    yaw: 270,
                    pitch: 0,
                },
                name: "GO",
                to: 7,
            },
            {
                orientation: {
                    yaw: 180,
                    pitch: 0,
                },
                name: "HOUSE",
                to: 6,
            },
            {
                orientation: {
                    yaw: 45,
                    pitch: 0,
                },
                name: "BACK",
                to: 4,
            },
        ],
    },
    6: {
        id: 6,
        bgUrl: PLACE_BG_URLS.theHouse,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.theHouse),
        tracks: [
            {
                orientation: {
                    yaw: 90,
                    pitch: 0,
                },
                name: "BACK",
                to: 5,
            },
        ],
    },
    7: {
        id: 7,
        bgUrl: PLACE_BG_URLS.theC,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.theC),
        tracks: [
            {
                orientation: {
                    yaw: 90,
                    pitch: 0,
                },
                name: "BACK",
                to: 5,
            },
            {
                orientation: {
                    yaw: 225,
                    pitch: 0,
                },
                name: "TO B",
                to: 8,
            },
            {
                orientation: {
                    yaw: 315,
                    pitch: 0,
                },
                name: "TO TOP",
                to: 9,
            },
        ],
    },
    8: {
        id: 8,
        bgUrl: PLACE_BG_URLS.theB,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.theB),
        tracks: [
            {
                orientation: {
                    yaw: 45,
                    pitch: 0,
                },
                name: "TO TOP",
                to: 9,
            },
            {
                orientation: {
                    yaw: 180,
                    pitch: 0,
                },
                name: "TO C",
                to: 7,
            },
        ],
    },
    9: {
        id: 9,
        bgUrl: PLACE_BG_URLS.theTop,
        texture: new THREE.TextureLoader().load(PLACE_BG_URLS.theTop),
        tracks: [
            {
                orientation: {
                    yaw: 90,
                    pitch: 0,
                },
                name: "TO C",
                to: 7,
            },
            {
                orientation: {
                    yaw: 180,
                    pitch: 0,
                },
                name: "TO B",
                to: 8,
            },
        ],
    },
};
