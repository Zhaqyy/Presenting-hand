/* eslint-disable react/no-unknown-property */

import React from "react";
import { useGLTF } from "@react-three/drei";


export default function DesktopModel(props) {
  const { nodes, materials } = useGLTF("./DesktopModel.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lhand_1.geometry}
        material={materials.main}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lhand_2.geometry}
        material={materials.cover}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rhand_1.geometry}
        material={materials.outer}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rhand_2.geometry}
        material={materials.INSIDE}
      />
    </group>
  );
}

useGLTF.preload("./DesktopModel.glb");
