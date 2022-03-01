import React from "react";
import * as THREE from "three";
import { IPlace } from "../classes/Place";
import { TCameraConfig } from "../commons/types";
import { PLACES } from "../data";

export type TAppContext = {
    state: {
        webGLRenderer: THREE.WebGLRenderer;
        scene: THREE.Scene;
        cameraConfig: TCameraConfig;
        place: IPlace;
        yaw: number;
    };
    setWebGLRenderer?: React.Dispatch<React.SetStateAction<THREE.WebGLRenderer>>;
    setScene?: React.Dispatch<React.SetStateAction<THREE.Scene>>;
    setCameraConfig?: React.Dispatch<React.SetStateAction<TCameraConfig>>;
    setPlace?: React.Dispatch<React.SetStateAction<IPlace>>;
    setYaw?: React.Dispatch<React.SetStateAction<number>>;
};

const AppContext: React.Context<TAppContext> = React.createContext<TAppContext>({
    state: {
        webGLRenderer: new THREE.WebGLRenderer(),
        scene: new THREE.Scene(),
        cameraConfig: {
            fov: 50,
            aspect: 16/9,
            near: 1,
            far: 1000,
        },
        place: PLACES[1],
        yaw: 180,
    },
});

export default AppContext;
