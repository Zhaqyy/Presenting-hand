/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import {
  Environment,
  MeshDistortMaterial,
  GradientTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense, useRef, useEffect } from "react";
import { easing } from "maath";
import { DoubleSide } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import MobileModel from "./MobileModel";
import DesktopModel from "./DesktopModel";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <Light />
      <ambientLight intensity={1} />

      <Suspense>
        <Responsive />
        <Environment files={"./night.hdr"} background={null} />
      </Suspense>
    </>
  );
}

const isMobile = window.innerWidth < 768;

function Responsive() {
  if (isMobile) {
    return (
      <>
        <MobileModel position-y={-0.6} scale={1.45} />;
        <Blob />
      </>
    );
  } else {
    return (
      <CameraRig>
        <DesktopModel />;
        <Ring />
        <Blob />
      </CameraRig>
    );
  }
}

const Light = () => {
  if (isMobile) {
    return (
      <directionalLight
        position={[0, 0, 2]}
        intensity={1.5}
        color={"#800080"}
      />
    );
  } else {
    return (
      <>
        <directionalLight
          castShadow
          position={[0, -5, 0]}
          intensity={0.5}
          color={"#008080"}
          shadow-normalBias={0.04}
        />
        <directionalLight
          castShadow
          position={[0, 5, 0]}
          intensity={0.5}
          color={"#800080"}
          shadow-normalBias={0.04}
        />
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur luminanceThreshold={0.2} radius={0.8} />
        </EffectComposer>
      </>
    );
  }
};

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 25, -state.pointer.x / 25, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

const Ring = () => {
  const RingRef = useRef();
  useEffect(() => {
    RingRef.current.rotation.set(-Math.PI / 0.25, -Math.PI / 2, 0);
  }, []);

  useFrame((state, delta) => {
    const xRotation = state.pointer.x; // Mouse movement along the X-axis
    const yRotation = state.pointer.y; // Mouse movement along the Y-axis

    const targetRotation = [
      -Math.PI / 0.1 - yRotation / 2,
      -Math.PI / 2 - xRotation,
      0,
    ];
    easing.dampE(RingRef.current.rotation, targetRotation, 0.25, delta);
  });

  return (
    <mesh
      rotation={[0, 0, 0]}
      ref={RingRef}
      scale={isMobile ? 0.35 : 1}
      position-y={isMobile ? 0.35 : 0}
    >
      <ringGeometry args={[1.3, 1.35, 64]} />
      <meshBasicMaterial color={"#f53d8a"} side={DoubleSide} />
    </mesh>
  );
};

function Blob() {
  const ref = useRef();
  return (
    <mesh position-y={isMobile ? 0.35 : 0}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <MeshDistortMaterial
        ref={ref}
        factor={0}
        distort={0.7}
        metalness={0.9}
        envMapIntensity={50}
        speed={1}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={["#008080", "#800080", "#008000"]}
          size={100}
        />
      </MeshDistortMaterial>
    </mesh>
  );
}
