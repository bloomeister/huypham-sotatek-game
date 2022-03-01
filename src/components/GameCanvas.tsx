import React, { useCallback, useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { TOrientation } from "../commons/types";
import AppContext from "../contexts/AppContext";
import { PLACES } from "../data";
import { usePressKey } from "../hooks";

export default function GameCanvas() {
    const yawTimer = useRef<NodeJS.Timeout>();
    const rfContainer = useRef<HTMLDivElement>(null);
    const rfHUD = useRef<HTMLDivElement>(null);
    const rfGoBtn = useRef<HTMLDivElement>(null);

    const { state, setPlace, setWebGLRenderer } = useContext(AppContext);

    const scene = useRef<THREE.Scene>(state.scene);

    const camera = useRef<THREE.PerspectiveCamera>(
        new THREE.PerspectiveCamera(
            state.cameraConfig.fov,
            state.cameraConfig.aspect,
            state.cameraConfig.near,
            state.cameraConfig.far
        )
    );

    const cameraOrientation = useRef<TOrientation>({ yaw: 180, pitch: 0 });

    const easeInOut = useCallback((n) => {
        return 0.5 * (Math.sin((n - 0.5) * Math.PI) + 1);
    }, []);

    const findTrack = useCallback(
        (yaw: number) => {
            console.log(yaw);

            let flag = false;

            state.place.tracks.forEach((track) => {
                const minYaw = track.orientation.yaw - 20;
                const maxYaw = track.orientation.yaw + 20;

                if (yaw >= minYaw && yaw <= maxYaw) {
                    if (rfGoBtn.current) {
                        rfGoBtn.current.classList.remove("hidden");
                        rfGoBtn.current.classList.add("flex");
                        rfGoBtn.current.setAttribute("data-to", track.to.toString());
                        rfGoBtn.current.textContent = track.name || "GO";
                        flag = true;
                        return;
                    }
                }
            });

            if (!flag) {
                rfGoBtn.current?.classList.remove("flex");
                rfGoBtn.current?.classList.add("hidden");
                rfGoBtn.current?.setAttribute("data-to", "");
            }
        },
        [state.place.tracks]
    );

    const handleOnEnterPath = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const d: HTMLDivElement = e.target as HTMLDivElement;
            const to = parseInt(d.getAttribute("data-to") || "0") || 0;
            d.setAttribute("data-to", "");
            d.classList.add("hidden");
            d.classList.remove("flex");
            setPlace && setPlace(PLACES[to]);
            // setWebGLRenderer && setWebGLRenderer(new THREE.WebGLRenderer());
        },
        [setPlace]
    );

    usePressKey(["a"], () => {
        handleOnLeftClicked();
    });

    usePressKey(["d"], () => {
        handleOnRightClicked();
    });

    const handleOnLeftClicked = useCallback(() => {
        if (yawTimer.current) return;
        const pre = cameraOrientation.current;

        let step = 0;
        function left(v: number) {
            let yaw = pre.yaw - easeInOut(v / 20) * 45;
            yaw = yaw > 0 ? yaw : yaw + 360;
            cameraOrientation.current = { ...pre, yaw };
            step++;
            if (step < 20) {
                yawTimer.current = setTimeout(() => {
                    left(step);
                }, 10);
            } else {
                yawTimer.current = undefined;

                findTrack(yaw);
            }
        }
        left(step);
    }, [easeInOut, findTrack]);

    const handleOnRightClicked = useCallback(() => {
        if (yawTimer.current) return;

        const pre = cameraOrientation.current;

        let step = 0;
        function left(v: number) {
            let yaw = pre.yaw + easeInOut(v / 20) * 45;
            yaw = yaw < 360 ? yaw : yaw - 360;
            cameraOrientation.current = { ...pre, yaw };
            step++;
            if (step < 20) {
                yawTimer.current = setTimeout(() => {
                    left(step);
                }, 10);
            } else {
                yawTimer.current = undefined;

                findTrack(yaw);
            }
        }
        left(step);
    }, [easeInOut, findTrack]);

    const renderCanvas = useCallback(() => {
        window.requestAnimationFrame(renderCanvas);

        const pitch = Math.max(-85, Math.min(85, cameraOrientation.current.pitch));

        const x =
            500 *
            Math.sin(THREE.MathUtils.degToRad(90 - pitch)) *
            Math.cos(THREE.MathUtils.degToRad(cameraOrientation.current.yaw));
        const y = 500 * Math.cos(THREE.MathUtils.degToRad(90 - pitch));
        const z =
            500 *
            Math.sin(THREE.MathUtils.degToRad(90 - pitch)) *
            Math.sin(THREE.MathUtils.degToRad(cameraOrientation.current.yaw));

        const cameraTarget = new THREE.Vector3(x, y, z);

        camera.current.lookAt(cameraTarget);

        state.webGLRenderer.render(scene.current, camera.current);
    }, [state.webGLRenderer]);

    useEffect(() => {
        if (!rfContainer.current) return;

        state.webGLRenderer.setSize(
            rfContainer.current.clientWidth,
            rfContainer.current.clientHeight
        );

        // To ensure WebGL context limitation can not reach
        while (rfContainer.current.firstChild) {
            rfContainer.current.lastChild &&
                rfContainer.current.removeChild(rfContainer.current.lastChild);
        }

        rfContainer.current.appendChild(state.webGLRenderer.domElement);

        // Sphere to map
        const sphere = new THREE.SphereGeometry(100, 100, 50);
        sphere.applyMatrix4(new THREE.Matrix4().makeScale(-1, 0.75, 1));

        // Map image to the sphere
        const sphereMaterial = new THREE.MeshBasicMaterial({ map: state.place.texture });

        // Mesh
        const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
        scene.current.add(sphereMesh);

        // renderCanvas();
    }, [state.place.texture, state.webGLRenderer]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWebGLRenderer && setWebGLRenderer(new THREE.WebGLRenderer());
        });
    }, [setWebGLRenderer]);

    useEffect(() => {
        renderCanvas();
    }, [renderCanvas]);

    findTrack(cameraOrientation.current.yaw);

    console.log("render");
    return (
        <div className="relative h-full w-full">
            <div ref={rfContainer} className="w-full h-full bg-green-200"></div>
            <div className="absolute top-0 left-0 z-20 w-full h-full select-none" ref={rfHUD}>
                <div
                    ref={rfGoBtn}
                    className="absolute hidden bottom-4 left-0 right-0 mx-auto w-[80px] h-[80px] border-4 border-white justify-center items-center grow-0 shrink-0 text-white cursor-pointer animate-pulse"
                    onClick={handleOnEnterPath}
                >
                    GO
                </div>
            </div>
            <div className="absolute bottom-40 left-0 z-50 w-full flex flex-row justify-between items-center">
                <button
                    className="p-4 px-1 border bg-white rounded-r-xl shadow w-24 hover:bg-slate-100 active:bg-slate-50"
                    onClick={handleOnLeftClicked}
                >
                    Left (A)
                </button>
                <button
                    className="p-4 px-1 border bg-white rounded-l-xl shadow w-24 hover:bg-slate-100 active:bg-slate-50"
                    onClick={handleOnRightClicked}
                >
                    Right (D)
                </button>
            </div>
        </div>
    );
}
