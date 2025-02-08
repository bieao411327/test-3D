import * as THREE from "three"
import {OrbitControls, useTexture} from "@react-three/drei"
import ground from "../../../public/img/ground.jpg"
import north from "../../../public/img/north.png"
import {memo} from "react";
import {useThree} from "@react-three/fiber";

interface Props {
  craneCoverWidth: number;
  craneCoverHeight: number;
  onChange?: (val: any) => void;
}

// 地板最大和最小值
const maxCover: number = 1500
const minCover: number = 300

// 计算弧度
const calcRadians = (degrees: number) => degrees * (Math.PI / 180)
export default memo((props: Props) => {
  const {craneCoverWidth, craneCoverHeight, onChange} = props
  const {camera} = useThree()
  // 计算地板值
  let planeWidth = craneCoverWidth
  let planeHeight = craneCoverHeight
  let scale = 1
  if (craneCoverWidth > maxCover) {
    planeWidth = maxCover
  } else if (craneCoverWidth < minCover) {
    planeWidth = minCover
  }
  if (craneCoverHeight > maxCover) {
    planeHeight = maxCover
  } else if (craneCoverHeight < minCover) {
    planeHeight = minCover
  }
  // 计算初始视角
  if (planeWidth >= planeHeight) {
    const cameraZ = Math.tan(calcRadians(67.5)) * 50 + planeWidth / 2
    camera.position.set(0, 0, cameraZ)
  } else {
    const cameraX = Math.tan(calcRadians(67.5)) * 50 + planeHeight / 2
    camera.position.set(cameraX, 0, 0)
  }
  // 如果超过最大地板值，则改动比例尺
  if (craneCoverWidth > maxCover || craneCoverHeight > maxCover) {
    const maxSide = Math.max(craneCoverWidth, craneCoverHeight)
    scale = Number((maxCover / maxSide).toFixed(3))
  }
  if (onChange) onChange(scale)
  // 计算最远可移动距离
  const maxDistance = Math.sqrt(Math.pow(Math.sqrt(Math.pow(camera.position.x, 2) + Math.pow((camera.position.z), 2)), 2) + Math.pow(camera.position.y, 2))
  // 加载地板和指北针纹理
  const [texture1, texture2] = useTexture([ground, north])
  texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping
  texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0, -51, 0]}>
        {/*5: 在地板的基础上增加5，避免贴边画圆*/}
        <planeGeometry args={[planeWidth + 5, planeHeight + 5]}/>
        <meshStandardMaterial map={texture1} map-repeat={[20, 20]} side={THREE.DoubleSide}/>
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -50, 0]}>
        {/*0.15: 指北针高占地板的比例；0.28：指北针的宽高比*/}
        <planeGeometry args={[planeHeight * 0.15 * 0.28, planeHeight * 0.15]}/>
        <meshStandardMaterial map={texture2} opacity={0.3} transparent side={THREE.DoubleSide}/>
      </mesh>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
        maxDistance={maxDistance}
        minDistance={5}
        zoomSpeed={0.3}
      />
    </>
  )
}, (prev, next) => (
  prev.craneCoverWidth === next.craneCoverWidth && prev.craneCoverHeight === next.craneCoverHeight
))
