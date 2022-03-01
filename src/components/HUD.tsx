import * as THREE from "three";
import { useCallback, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { PLACES } from "../data";

export default function HUD() {
    const { state, setPlace, setWebGLRenderer } = useContext(AppContext);

    const findTrack = useCallback(() => {
        let result;
        state.place.tracks.forEach((track) => {
            const minYaw = track.orientation.yaw - 10;
            const maxYaw = track.orientation.yaw + 10;
            // const yaw = Math.abs(state.yaw) % 360;
            const yaw = state.yaw;

            if (yaw >= minYaw && yaw <= maxYaw)
                result = (
                    <div
                        onClick={() => {
                            setPlace && setPlace(PLACES[track.to]);
                            setWebGLRenderer && setWebGLRenderer(new THREE.WebGLRenderer());
                            // setYaw && setYaw(180);
                        }}
                        className="absolute bottom-4 left-0 right-0 mx-auto w-[80px] h-[80px] border-4 border-white flex justify-center items-center grow-0 shrink-0 text-white cursor-pointer animate-pulse"
                    >
                        <strong>GO</strong>
                    </div>
                );
        });
        return result || <div>{state.yaw}</div>;
    }, [setPlace, setWebGLRenderer, state.place.tracks, state.yaw]);

    useEffect(() => {
        console.log("Global Yaw: ", state.yaw);
    }, [state.yaw]);

    return (
        <div className="absolute top-0 left-0 z-50 w-full h-full select-none">
            {findTrack()}
        </div>
    );
}
