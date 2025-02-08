import {Billboard, Text, useGLTF} from "@react-three/drei";
import {memo, useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";

interface Props {
  x: number;
  y: number;
  craneNum: string;
  jibArmLength: number;
  craneHeight: number;
  balanceArmLength: number;
  angle: number;
  isOnline: number;
  hookHeight: number;
  radius: number;
  loadWeight: number;
  baseScale: number;
  modelScale?: number;
  offlineMaterial: any;
  animationInterval?: number
}

// 起重臂长拉绳链接点占臂长的比例
const longLinePointRate = 0.8
const shortLinePointRate = 0.26

const allGlbSizeObj = {
  base: {x: 200.72, y: 10, z: 222.37},
  bodySection: {x: 62.47, y: 78, z: 62.71},
  jackingFrame: {x: 135.7, y: 250.88, z: 185.43},
  pilothouse: {x: 136.2, y: 115.7, z: 141.27},
  towerHead: {x: 63.4, y: 366.17, z: 62},
  boomLongLine: {x: 18.92, y: 1208.05, z: 9.98},
  boomShortLine: {x: 10.71, y: 523.77, z: 9.98},
  boomFirst: {x: 63.04, y: 47, z: 127.01},
  boom: {x: 63.04, y: 47, z: 120},
  boomEnd: {x: 63.04, y: 47, z: 127.01},
  rearAxle: {x: 69.25, y: 43.34, z: 80},
  counterWeightArea: {x: 140.05, y: 115.56, z: 183.03},
  balanceLine: {x: 46.7, y: 571.74, z: 9.98},
  trolley: {x: 97.03, y: 38.09, z: 44.61},
  carSteelRope: {x: 3, y: 139.33, z: 23.55},
  hook: {x: 14.27, y: 104.72, z: 74.57},
  suspendedObject: {x: 100.63, y: 300.76, z: 100.2},
}
// 计算弧度
const calcRadians = (degrees: number) => degrees * (Math.PI / 180)

// 添加基础
const AddBaseGLB = ({isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/base.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.base.geometry} material={material}/>
  )
}

// 添加塔身标准节
const AddBodySectionGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/standardSection.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.standardSection.geometry} material={material} position={position}/>
  )
}

// 添加顶升套架
const AddJackingFrameGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/jackingFrame.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.jackingFrame.geometry} material={material} position={position}/>
  )
}

// 添加回转台+驾驶室
const AddPilothouseGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/pilothouse.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.pilothouse.geometry} material={material} position={position}/>
  )
}
// 添加塔帽
const AddTowerHeadGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHead.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.towerHead.geometry} material={material} position={position}/>
  )
}
// 添加起重臂第一个标准节
const AddBoomArmFirstGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHeadBoomFirst.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.towerHeadBoomFirst.geometry} material={material} position={position}/>
  )
}
// 添加起重臂（粗）
const AddBoomArmGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/boom.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.boom.geometry} material={material} position={position}/>
  )
}
// 添加起重臂最后一个标准节
const AddBoomArmEndGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHeadBoomEnd.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.towerHeadBoomEnd.geometry} material={material} position={position}/>
  )
}
// 添加塔帽起重臂长拉绳
const AddHeadBoomLongLineGLB = ({position, rotationX, scaleY, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHeadBoomLongLine.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh
      geometry={nodes.towerHeadBoomLongLine.geometry}
      material={material}
      position={position}
      rotation-x={rotationX}
      scale-y={scaleY}
    />
  )
}
// 添加塔帽起重臂短拉绳
const AddHeadBoomShortLineGLB = ({position, rotationX, scaleY, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHeadBoomShortLine.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh
      geometry={nodes.towerHeadBoomShortLine.geometry}
      material={material}
      position={position}
      rotation-x={rotationX}
      scale-y={scaleY}
    />
  )
}
// 添加后桥标准节
const AddRearAxleGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHeadRearAxle.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.towerHeadRearAxle.geometry} material={material} position={position}/>
  )
}

// 添加配重
const AddCounterWeightAreaGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/counterWeightArea.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.towerHeadCounterWeightArea.geometry} material={material} position={position}/>
  )
}

// 添加配重拉绳
const AddBalanceLineGLB = ({position, rotationX, scaleY, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/towerHeadBalanceLine.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh
      geometry={nodes.towerHeadBalanceLine.geometry}
      material={material}
      position={position}
      rotation-x={rotationX}
      scale-y={scaleY}
    />
  )
}

// 添加小车
const AddTrolleyGLB = ({isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/trolley.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.trolley.geometry} material={material}/>
  )
}

// 添加小车钢绳
const AddCarSteelRopeGLB = ({isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/carSteelRope.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.carSteelRope.geometry} material={material}/>
  )
}

// 添加小车钢绳
const AddHookGLB = ({isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/hook.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.hook.geometry} material={material}/>
  )
}

// 添加吊物
const AddSuspendedObjectGLB = ({isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/suspendedObject.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.suspendedObject.geometry} material={material}/>
  )
}

// 文字
function Word({children, ...props}: any) {
  const fontProps = {
    font: './fonts/Inter-Bold.woff',
    fontSize: 100,
    fontWeight: 'bold',
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false
  }

  return (
    <Billboard {...props}>
      <Text {...fontProps} color={'white'}>{children}</Text>
    </Billboard>
  )
}

// 加载塔机
const LoadGLB = (
  {
    craneHeight,
    jibArmLength,
    balanceArmLength,
    craneNum,
    baseScale,
    modelScale,
    turnRef,
    armRef,
    trolleyRef,
    steelRopeRef,
    hookRef,
    suspendedObjectRef,
    isOnline,
    offlineMaterial
  }: any): any => {
  // 塔机
  const craneGroup = []
  // 回转台
  const turnGroup = []
  const armGroup = []
  // 小车+吊钩+吊物
  const trolleyGroup = []
  const steelRopeGroup = []
  const hookGroup = []
  const suspendedObjectGroup = []
  const baseY = allGlbSizeObj.base.y
  const bodySectionY = allGlbSizeObj.bodySection.y
  const canvasCraneHeight = craneHeight / modelScale * baseScale
  const bodySectionSize = Math.floor(canvasCraneHeight / bodySectionY)
  const bodySectionExtra = canvasCraneHeight % bodySectionY
  // 不满一节标准节的不再绘制后续塔机部件，认定为存在异常
  if (!bodySectionSize) return;
  for (let i = 0; i < bodySectionSize; i++) {
    craneGroup.push(
      <AddBodySectionGLB key={`bodySection-${i}`} position={[0, baseY + (bodySectionY * i), 0]} isOnline={isOnline}
                         offlineMaterial={offlineMaterial}/>
    )
  }
  // 塔机高度
  let curBodyHeight = baseY + (bodySectionY * bodySectionSize)
  if (bodySectionExtra) {
    // 如果存在未满bodySectionHeight的标准节做缩紧操作
    craneGroup.push(
      <AddBodySectionGLB
        key={`bodySection-extra`}
        position={[0, curBodyHeight - (bodySectionY - bodySectionExtra), 0]}
        isOnline={isOnline}
        offlineMaterial={offlineMaterial}
      />
    )
  }
  curBodyHeight += bodySectionExtra
  // 加载顶升套架
  craneGroup.push(
    <AddJackingFrameGLB key={`jacking-frame`} position={[0, curBodyHeight, 0]} isOnline={isOnline}
                        offlineMaterial={offlineMaterial}/>
  )
  curBodyHeight += allGlbSizeObj.jackingFrame.y
  // 加载回转台+驾驶室
  turnGroup.push(
    <AddPilothouseGLB key={`pilothouse`} position={[0, curBodyHeight, 0]} isOnline={isOnline}
                      offlineMaterial={offlineMaterial}/>
  )
  // 0.1642：是顶部链接部件在回转台顶部的高度/回转台模型的高度
  curBodyHeight += allGlbSizeObj.pilothouse.y - allGlbSizeObj.pilothouse.y * 0.1642
  // 添加塔帽
  turnGroup.push(
    <AddTowerHeadGLB key={`tower-head`} position={[0, curBodyHeight, 0]} isOnline={isOnline}
                     offlineMaterial={offlineMaterial}/>
  )
  let curArmSectionZ = -allGlbSizeObj.towerHead.z / 2
  const canvasJibArmLength = jibArmLength / modelScale * baseScale - allGlbSizeObj.towerHead.z / 2
  // 添加塔帽起重臂长拉绳; 0.068是拉绳端往下降的比例；0.078是拉绳往大臂方向挪的比例;0.127是拉绳角度的微调值
  const lineHeightY = allGlbSizeObj.towerHead.y * (1 - 0.068)
  let lineHeightZ = -allGlbSizeObj.towerHead.z / 2 - (allGlbSizeObj.towerHead.z * 0.078)
  const longLinePointWidth = canvasJibArmLength * longLinePointRate
  const longLineLength = Math.sqrt(longLinePointWidth ** 2 + (lineHeightY - allGlbSizeObj.boom.y) ** 2)
  const longLineRotation = Math.atan(longLinePointWidth / (lineHeightY - allGlbSizeObj.boom.y * (1 - 0.127)))
  turnGroup.push(
    <AddHeadBoomLongLineGLB
      key={`towerHeadBoomLongLine`}
      position={[0, curBodyHeight + lineHeightY, lineHeightZ]}
      rotationX={longLineRotation}
      scaleY={longLineLength / allGlbSizeObj.boomLongLine.y}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  // 添加塔帽起重臂短拉绳;;0.255是拉绳角度的微调值
  const shortLinePointWidth = canvasJibArmLength * shortLinePointRate
  const shortLineLength = Math.sqrt(shortLinePointWidth ** 2 + (lineHeightY - allGlbSizeObj.boom.y) ** 2)
  const shortLineRotation = Math.atan(shortLinePointWidth / (lineHeightY - allGlbSizeObj.boom.y * (1 - 0.255)))
  turnGroup.push(
    <AddHeadBoomShortLineGLB
      key={`towerHeadBoomShortLine`}
      position={[0, curBodyHeight + lineHeightY, lineHeightZ]}
      rotationX={shortLineRotation}
      scaleY={shortLineLength / allGlbSizeObj.boomShortLine.y}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  // 添加第一个标准节
  armGroup.push(
    <AddBoomArmFirstGLB
      key={`boom-first`}
      position={[0, 0, curArmSectionZ]}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  curArmSectionZ -= allGlbSizeObj.boomFirst.z
  const boomLength = canvasJibArmLength - allGlbSizeObj.boomFirst.z - allGlbSizeObj.boomEnd.z
  const boomSize = Math.floor(boomLength / allGlbSizeObj.boom.z)
  const boomExtra = boomLength % allGlbSizeObj.boom.z
  // 不满一节标准节的不拼接，认定为异常
  if (!boomSize) return;
  // 添加大臂
  {
    for (let i = 0; i < boomSize; i++) {
      armGroup.push(
        <AddBoomArmGLB
          key={`boom-${i}`}
          position={[0, 0, curArmSectionZ - allGlbSizeObj.boom.z * i]}
          isOnline={isOnline}
          offlineMaterial={offlineMaterial}
        />
      )
    }
  }
  curArmSectionZ -= allGlbSizeObj.boom.z * boomSize
  if (boomExtra) {
    armGroup.push(
      <AddBoomArmGLB
        key={`boom-extra`}
        position={[0, 0, curArmSectionZ + (allGlbSizeObj.boom.z - boomExtra)]}
        isOnline={isOnline}
        offlineMaterial={offlineMaterial}
      />
    )
  }
  // 添加最后一个标准节
  curArmSectionZ -= boomExtra
  armGroup.push(
    <AddBoomArmEndGLB
      key={`boom-end`}
      position={[0, 0, curArmSectionZ]}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  // 添加后桥标准节
  let curBalanceSectionZ = allGlbSizeObj.towerHead.z / 2
  const canvasBalanceCraneLength = balanceArmLength / modelScale * baseScale - allGlbSizeObj.towerHead.z / 2
  const canvasBalanceSectionLength = canvasBalanceCraneLength - allGlbSizeObj.counterWeightArea.z
  const balanceSectionSize = Math.floor(canvasBalanceSectionLength / allGlbSizeObj.rearAxle.z)
  // 如果存在后桥长度小于模型长度，则直接拼接模型
  if (canvasBalanceSectionLength > 0 && balanceSectionSize >= 1) {
    const balanceExtra = canvasBalanceSectionLength % allGlbSizeObj.rearAxle.z
    {
      for (let i = 0; i < balanceSectionSize; i++) {
        armGroup.push(
          <AddRearAxleGLB
            key={`rearAxle-${i}`}
            position={[0, 0, curBalanceSectionZ + allGlbSizeObj.rearAxle.z * i]}
            isOnline={isOnline}
            offlineMaterial={offlineMaterial}
          />
        )
      }
    }
    curBalanceSectionZ += allGlbSizeObj.rearAxle.z * balanceSectionSize
    if (balanceExtra) {
      armGroup.push(
        <AddRearAxleGLB
          key={`rearAxle-extra`}
          position={[0, 0, curBalanceSectionZ - (allGlbSizeObj.rearAxle.z - balanceExtra)]}
          isOnline={isOnline}
          offlineMaterial={offlineMaterial}
        />
      )
    }
    curBalanceSectionZ += balanceExtra
  }
  // 添加平衡臂的拉绳 0.135是拉绳往后桥方向挪的比例
  lineHeightZ = -allGlbSizeObj.towerHead.z / 2 + (allGlbSizeObj.towerHead.z * 0.135)
  const balanceLinePointWidth = curBalanceSectionZ - lineHeightZ
  const balanceLineLength = Math.sqrt(balanceLinePointWidth ** 2 + lineHeightY ** 2)
  const balanceLineRotation = -Math.atan(balanceLinePointWidth / lineHeightY)
  turnGroup.push(
    <AddBalanceLineGLB
      key={`towerBalanceLine`}
      position={[0, curBodyHeight + lineHeightY, lineHeightZ]}
      rotationX={balanceLineRotation}
      scaleY={balanceLineLength / allGlbSizeObj.balanceLine.y}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  // 添加配重块
  armGroup.push(
    <AddCounterWeightAreaGLB
      key={`counterWeightArea`}
      position={[0, 0, curBalanceSectionZ]}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )

  // 添加小车
  trolleyGroup.push(
    <AddTrolleyGLB
      key={`trolley`}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  // 添加小车钢绳
  let carPositionY = -allGlbSizeObj.trolley.y / 2
  steelRopeGroup.push(
    <AddCarSteelRopeGLB
      key={`carSteelRope`}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  trolleyGroup.push(
    <group
      ref={steelRopeRef}
      key={'steelRope-group'}
      dispose={null}
      position={[0, carPositionY, 0]}
    >
      {steelRopeGroup}
    </group>
  )
  // 添加吊钩
  carPositionY -= allGlbSizeObj.carSteelRope.y
  hookGroup.push(
    <AddHookGLB
      key={`hook`}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  trolleyGroup.push(
    <group
      ref={hookRef}
      key={'hook-group'}
      dispose={null}
      position={[0, carPositionY, 0]}
    >
      {hookGroup}
    </group>
  )
  // 添加吊物
  carPositionY -= allGlbSizeObj.hook.y
  suspendedObjectGroup.push(
    <AddSuspendedObjectGLB
      key={`suspendedObject`}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  trolleyGroup.push(
    <group
      ref={suspendedObjectRef}
      key={'suspendedObject-group'}
      dispose={null}
      position={[0, carPositionY, 0]}
    >
      {suspendedObjectGroup}
    </group>
  )
  armGroup.push(
    <group
      ref={trolleyRef}
      key={'trolley-group'}
      dispose={null}
    >
      {trolleyGroup}
    </group>
  )
  armGroup.push(
    <Word
      key={'craneNum'}
      position={[0, allGlbSizeObj.towerHead.y + 100, -allGlbSizeObj.towerHead.z / 2]}
    >{craneNum}</Word>
  )
  turnGroup.push(
    <group
      ref={armRef}
      key={'arm-group'}
      dispose={null}
      position={[0, curBodyHeight, 0]}
    >
      {armGroup}
    </group>
  )
  craneGroup.push(<group ref={turnRef} key={'arm-group'} dispose={null}>{turnGroup}</group>)
  return craneGroup
}

export default memo((props: Props) => {
  const {
    x,
    y,
    craneNum,
    jibArmLength,
    craneHeight,
    balanceArmLength,
    baseScale,
    modelScale = 0.038,
    angle,
    hookHeight,
    radius,
    loadWeight,
    isOnline,
    offlineMaterial,
    animationInterval = 5
  } = props

  const curAngleRef = useRef(0);
  const curTrolleyRef = useRef(0);
  const curSteelRopeRef = useRef(0);

  const turnRef = useRef<any>(null)
  const armRef = useRef<any>(null)
  const turnDeltaRef = useRef<any>({targetAngle: 0, angleDelta: 0})
  const trolleyRef = useRef<any>(null)
  const trolleyDeltaRef = useRef<any>({targetTrolley: 0, trolleyDelta: 0, canvasJibArmLength: 0})
  const steelRopeRef = useRef<any>(null)
  const steelRopeDeltaRef = useRef<any>({targetSteelRope: 0, steelRopeDelta: 0})
  const hookRef = useRef<any>(null)
  const suspendedObjectRef = useRef<any>(null)

  useEffect(() => {
    if (
      !armRef.current ||
      !turnRef.current ||
      !turnDeltaRef.current ||
      !trolleyDeltaRef.current ||
      !steelRopeDeltaRef.current
    ) return
    const frame = animationInterval * 60 - 20
    // 处理角度
    let targetAngle = -calcRadians(Math.abs(angle % 360))
    let currentAngle = turnRef.current.rotation.y % (Math.PI * 2)
    if (Math.abs(currentAngle - targetAngle) > Math.PI) {
      if (currentAngle < targetAngle) {
        targetAngle -= Math.PI * 2
      } else {
        currentAngle -= Math.PI * 2
        curAngleRef.current = currentAngle
      }
    }
    const angleDelta = (targetAngle - currentAngle) / frame
    turnDeltaRef.current = {targetAngle, angleDelta}
    // 处理小车
    let newRadius = radius
    if (radius < 3) {
      newRadius = 3
    } else if (radius > jibArmLength) {
      newRadius = jibArmLength
    }
    let targetTrolley = newRadius / modelScale * baseScale
    const canvasJibArmLength = jibArmLength / modelScale * baseScale - allGlbSizeObj.trolley.z / 2
    if (targetTrolley > canvasJibArmLength) {
      targetTrolley = canvasJibArmLength
    }
    const trolleyDelta = (-targetTrolley - curTrolleyRef.current) / frame
    trolleyDeltaRef.current = {targetTrolley, trolleyDelta, canvasJibArmLength}
    // 处理吊绳
    let newHookHeight = hookHeight
    if (hookHeight < 1) {
      newHookHeight = 1
    }
    let targetSteelRope = newHookHeight / modelScale * baseScale
    const hasSuspendedObject = Boolean(loadWeight)
    let canvasCraneHeight = armRef.current.position.y - allGlbSizeObj.trolley.y / 2 - allGlbSizeObj.hook.y
    if (hasSuspendedObject) canvasCraneHeight -= allGlbSizeObj.suspendedObject.y
    if (targetSteelRope > canvasCraneHeight) {
      targetSteelRope = canvasCraneHeight
    }
    const steelRopeDelta = (targetSteelRope - curSteelRopeRef.current) / frame
    steelRopeDeltaRef.current = {targetSteelRope, steelRopeDelta}
  }, [angle, radius, hookHeight, loadWeight]);

  useFrame(({clock}) => {
    if (
      !turnRef.current ||
      !armRef.current ||
      !trolleyRef.current ||
      !suspendedObjectRef.current ||
      !steelRopeRef.current ||
      !hookRef.current ||
      !turnDeltaRef.current ||
      !trolleyDeltaRef.current ||
      !steelRopeDeltaRef.current
    ) return
    // 处理角度
    const curAngle = curAngleRef.current
    if (Math.abs(turnDeltaRef.current.targetAngle - curAngle) > 0.01) {
      const curAngleAddDelta = curAngle + turnDeltaRef.current.angleDelta
      curAngleRef.current = curAngleAddDelta;
      turnRef.current.rotation.y = curAngleAddDelta;
    }
    // 处理小车
    const curTrolley = curTrolleyRef.current
    if (Math.abs(-trolleyDeltaRef.current.targetTrolley - curTrolley) > 0.01 && curTrolley > -trolleyDeltaRef.current.canvasJibArmLength) {
      const curTrolleyAddDelta = curTrolley + trolleyDeltaRef.current.trolleyDelta
      curTrolleyRef.current = curTrolleyAddDelta;
      trolleyRef.current.position.z = curTrolleyAddDelta;
    }
    // 处理吊绳
    const curSteelRope = curSteelRopeRef.current
    const hasSuspendedObject = Boolean(loadWeight)
    if (Math.abs(steelRopeDeltaRef.current.targetSteelRope - curSteelRope) > 0.01 && curSteelRope >= 0) {
      const curSteelRopeAddDelta = curSteelRope + steelRopeDeltaRef.current.steelRopeDelta
      const steelRopeScale = Math.abs(curSteelRopeAddDelta / allGlbSizeObj.carSteelRope.y)
      curSteelRopeRef.current = curSteelRopeAddDelta;
      steelRopeRef.current.scale.y = steelRopeScale;
      hookRef.current.position.y = -allGlbSizeObj.carSteelRope.y * steelRopeScale
      suspendedObjectRef.current.position.y = -allGlbSizeObj.carSteelRope.y * steelRopeScale - allGlbSizeObj.hook.y
    }
    // 处理吊物
    if (hasSuspendedObject && armRef.current.position.y + hookRef.current.position.y > allGlbSizeObj.suspendedObject.y) {
      suspendedObjectRef.current.visible = true
    } else {
      suspendedObjectRef.current.visible = false
    }
  })

  // 加载塔机基础
  return (
    <group position={[x, -50, y]} scale={modelScale} dispose={null}>
      <AddBaseGLB isOnline={isOnline} offlineMaterial={offlineMaterial}/>
      <LoadGLB
        craneHeight={craneHeight}
        jibArmLength={jibArmLength}
        balanceArmLength={balanceArmLength}
        craneNum={craneNum}
        baseScale={baseScale}
        modelScale={modelScale}
        turnRef={turnRef}
        armRef={armRef}
        trolleyRef={trolleyRef}
        steelRopeRef={steelRopeRef}
        hookRef={hookRef}
        suspendedObjectRef={suspendedObjectRef}
        isOnline={isOnline}
        offlineMaterial={offlineMaterial}
      />
    </group>
  );
}, (prev, next) => (
  prev.angle === next.angle &&
  prev.hookHeight === next.hookHeight &&
  prev.radius === next.radius &&
  prev.animationInterval === next.animationInterval &&
  prev.loadWeight === next.loadWeight
))
