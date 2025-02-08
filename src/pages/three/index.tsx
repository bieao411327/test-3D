import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import BaseScene from "./baseScene";
import {Suspense, useEffect, useState} from "react";
import FlatArmCrane from "@/pages/three/flatArmCrane";
import TowerCrane from "@/pages/three/towerCrane";
import SwingArmCrane from "@/pages/three/swingArmCrane";
import Loader from './loader'
import * as THREE from "three";

const aspect = 1920 / 1080

// 离线材质
const offlineColor = new THREE.Color("rgb(0.46, 0.467, 0.5)");
const offlineMaterial = new THREE.MeshStandardMaterial({
  color: offlineColor,
  aoMapIntensity: 1,
  blendDst: 205,
  blendEquation: 100,
  blendSrc: 204,
  blending: 1,
  bumpScale: 1,
  defines: {STANDARD: ''},
  depthFunc: 3,
  envMapIntensity: 1,
  flatShading: true,
  metalness: 1,
  roughness: 0.11,
  stencilFail: 7680,
  stencilFunc: 519,
  stencilFuncMask: 255,
  stencilWrite: false,
  stencilWriteMask: 255,
  stencilZFail: 7680,
  stencilZPass: 7680,
})
const data = {
  projectCraneList: [
    {
      projectCraneId: 1,
      realityJibArmLength: 70,
      realityCraneHeight: 60,
      x: 0,
      y: 0,
      balanceArmLength: 22,
      projectCraneNum: '10#',
      craneType: 'FlatArm',
      angle: 30,
      hookHeight: 1,
      radius: 13,
      loadWeight: 10,
      isOnline: 0
    },
    {
      projectCraneId: 2,
      realityJibArmLength: 70,
      realityCraneHeight: 60,
      x: 100,
      y: 100,
      balanceArmLength: 15,
      projectCraneNum: '2#',
      craneType: 'SwingArm',
      elevationAngle: 30,
      angle: 0,
      hookHeight: 70,
      radius: 40,
      loadWeight: 10,
      isOnline: 0
    },
    {
      projectCraneId: 3,
      realityJibArmLength: 70,
      realityCraneHeight: 60,
      x: -50,
      y: -100,
      balanceArmLength: 12,
      projectCraneNum: '63#',
      craneType: 'FlatArm',
      angle: 0,
      hookHeight: 25.1,
      radius: 58,
      loadWeight: 0,
      isOnline: 0
    },
    {
      projectCraneId: 4,
      realityJibArmLength: 80,
      realityCraneHeight: 45,
      x: 60,
      y: -120,
      balanceArmLength: 17,
      projectCraneNum: '1#',
      craneType: 'Tower',
      angle: 220,
      hookHeight: 20,
      radius: 50,
      loadWeight: 0,
      isOnline: 0
    }
  ],
  scatterGramWidth: 290,
  scatterGramHeight: 370,
  maxBorderX: 170,
  maxBorderY: 170,
  minBorderX: -120,
  minBorderY: -200
}
export default () => {
  const [scatterGram, setScatterGram] = useState({scatterGramWidth: 190, scatterGramHeight: 240})
  const [craneList, setCraneList] = useState<any[]>([])
  const [baseScale, setBaseScale] = useState<number>(1)

  useEffect(() => {
    const {
      projectCraneList,
      scatterGramWidth,
      scatterGramHeight,
      maxBorderX,
      maxBorderY,
      minBorderX,
      minBorderY
    } = data
    const xCenter = (maxBorderX + minBorderX) / 2
    const yCenter = (maxBorderY + minBorderY) / 2
    const newData = projectCraneList.map((res: any) => ({...res, x: res.x - xCenter, y: res.y - yCenter}))
    setScatterGram({scatterGramWidth, scatterGramHeight})
    setCraneList(newData)
  }, []);
  const onChange = (val: any) => {
    setBaseScale(val)
  }

  useEffect(() => {
    let timer: any;
    if (!!craneList.length) {
      timer = setTimeout(() => {
        const newCraneList = craneList.map((res) => ({
          ...res,
          angle: Math.random() * 360,
          elevationAngle: Math.random() * 60,
          hookHeight: Math.random() * res.realityCraneHeight,
          radius: Math.random() * res.realityJibArmLength,
          loadWeight: Math.floor(Math.random() * 2),
          isOnline: 1,
        }))
        setCraneList(newCraneList)
      }, 5000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [craneList])

  return (
    <>
      <Canvas camera={{aspect, fov: 45, far: 10000}}>
        <Suspense fallback={<Loader/>}>
          <Environment files={'/skyBox.hdr'} background/>
          <axesHelper/>
          <BaseScene
            craneCoverWidth={scatterGram.scatterGramWidth}
            craneCoverHeight={scatterGram.scatterGramHeight}
            onChange={onChange}
          />
          {
            craneList.map((res) => {
              const {
                projectCraneId,
                x,
                y,
                balanceArmLength,
                projectCraneNum,
                realityCraneHeight,
                realityJibArmLength,
                craneType,
                elevationAngle = 30,
                isOnline = 0,
                angle = 0,
                radius = 0,
                hookHeight = 0,
                loadWeight = 0,
              } = res
              let ele = null;
              switch (craneType) {
                case 'FlatArm':
                  ele = (
                    <FlatArmCrane
                      key={projectCraneId}
                      x={x}
                      y={y}
                      craneNum={projectCraneNum}
                      jibArmLength={realityJibArmLength}
                      craneHeight={realityCraneHeight}
                      balanceArmLength={balanceArmLength}
                      angle={angle}
                      radius={radius}
                      isOnline={isOnline}
                      hookHeight={hookHeight}
                      loadWeight={loadWeight}
                      baseScale={baseScale}
                      offlineMaterial={offlineMaterial}
                    />
                  )
                  break;
                case 'Tower':
                  ele = (
                    <TowerCrane
                      key={projectCraneId}
                      x={x}
                      y={y}
                      craneNum={projectCraneNum}
                      jibArmLength={realityJibArmLength}
                      craneHeight={realityCraneHeight}
                      balanceArmLength={balanceArmLength}
                      angle={angle}
                      radius={radius}
                      isOnline={isOnline}
                      hookHeight={hookHeight}
                      loadWeight={loadWeight}
                      baseScale={baseScale}
                      offlineMaterial={offlineMaterial}
                    />
                  )
                  break;
                case 'SwingArm':
                  ele = (
                    <SwingArmCrane
                      key={projectCraneId}
                      x={x}
                      y={y}
                      craneNum={projectCraneNum}
                      jibArmLength={realityJibArmLength}
                      craneHeight={realityCraneHeight}
                      balanceArmLength={balanceArmLength}
                      elevationAngle={elevationAngle}
                      angle={angle}
                      radius={radius}
                      hookHeight={hookHeight}
                      loadWeight={loadWeight}
                      isOnline={isOnline}
                      baseScale={baseScale}
                      offlineMaterial={offlineMaterial}
                    />
                  )
                  break;
                default:
                  break;
              }
              return ele
            })
          }
        </Suspense>
      </Canvas>
    </>
  )
}
