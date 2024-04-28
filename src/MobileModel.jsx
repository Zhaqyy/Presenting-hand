
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function MobileModel(props) {
  const { nodes, materials } = useGLTF("./MobileModel.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mhand_1.geometry}
        material={materials.main}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mhand_2.geometry}
        material={materials.cover}
      />
    </group>
  );
}

useGLTF.preload("./MobileModel.glb");
