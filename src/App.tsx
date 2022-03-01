import * as THREE from "three";
import React, { useCallback, useEffect, useState } from "react";
import GameCanvas from "./components/GameCanvas";
import GameViewPort from "./components/GameViewPort";
import AppContext, { TAppContext } from "./contexts/AppContext";
import { TCameraConfig } from "./commons/types";
import { IPlace } from "./classes/Place";
import { PLACES } from "./data";

function App(): React.ReactElement {
    const [webGLRenderer, setWebGLRenderer] = useState<THREE.WebGLRenderer>(
        new THREE.WebGLRenderer()
    );
    const [scene, setScene] = useState<THREE.Scene>(new THREE.Scene());
    const [cameraConfig, setCameraConfig] = useState<TCameraConfig>({
        fov: 75,
        aspect: 16 / 9,
        near: 1,
        far: 1000,
    });

    const [place, setPlace] = useState<IPlace>(PLACES[1]);
    const [yaw, setYaw] = useState<number>(180);

    const initTitle = useCallback(() => {
        document.title = "Huy Pham - SotaTek Test";
    }, []);

    const initAppContext = useCallback((): TAppContext => {
        return {
            state: {
                webGLRenderer,
                scene,
                cameraConfig,
                place,
                yaw,
            },
            setWebGLRenderer,
            setScene,
            setCameraConfig,
            setPlace,
            setYaw,
        };
    }, [cameraConfig, place, scene, webGLRenderer, yaw]);

    useEffect(() => {
        initTitle();
    }, [initTitle]);

    return (
        <AppContext.Provider value={initAppContext()}>
            <div className="w-full h-[100vh] flex flex-row justify-center items-center">
                <GameViewPort>
                    <GameCanvas />
                </GameViewPort>
            </div>
        </AppContext.Provider>
    );
}

export default App;
