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
  elevationAngle: number;
  radius: number;
  angle: number;
  hookHeight: number;
  loadWeight: number;
  isOnline: number;
  baseScale: number;
  modelScale?: number;
  offlineMaterial: any;
  animationInterval?: number
}

const allGlbSizeObj = {
  base: {x: 200.72, y: 10, z: 222.37},
  bodySection: {x: 104.12, y: 129.99, z: 104.51},
  jackingFrame: {x: 226.17, y: 418.14, z: 309.05},
  turnTable: {x: 167.76, y: 505.93, z: 359.17},
  balanceAFrame: {y: 365, z: 190},
  boomFirst: {x: 84.04, y: 85.76, z: 241.94},
  boom: {x: 84.16, y: 85.39, z: 226.016},
  boomEnd: {x: 88.38, y: 85.49, z: 241.82},
  boomPulley: {x: 36.48, y: 37.06, z: 37.05},
  boomLineFirst: {x: 42.88, y: 48.44, z: 428.91},
  boomLineEnd: {x: 27.56, y: 4.07, z: 1019.68},
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
  const {nodes, materials}: any = useGLTF(`/glb/swingArmStandardSection.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmStandardSection.geometry} material={material} position={position}/>
  )
}

// 添加顶升套架
const AddJackingFrameGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmJackingFrame.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmJackingFrame.geometry} material={material} position={position}/>
  )
}

// 添加回转台+驾驶室
const AddTurnTableGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmTurnTable.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmTurnTable.geometry} material={material} position={position}/>
  )
}
// 添加起重臂第一个标准节
const AddBoomArmFirstGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmBoomFirst.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmBoomFirst.geometry} material={material} position={position}/>
  )
}
// 添加起重臂
const AddBoomArmGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmBoom.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmBoom.geometry} material={material} position={position}/>
  )
}
// 添加起重臂最后一个标准节
const AddBoomArmEndGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmBoomEnd.glb`)
  const material = isOnline ? materials.bluePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmBoomEnd.geometry} material={material} position={position}/>
  )
}
// 添加起重臂最后一个标准节
const AddBoomPulleyGLB = ({position, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmBoomPulley.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh geometry={nodes.swingArmBoomPulley.geometry} material={material} position={position}/>
  )
}
// 添加起重臂拉绳（开始）
const AddBoomLineFirstGLB = ({position, rotationX, scaleY, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmLineFirst.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh
      geometry={nodes.swingArmLineFirst.geometry}
      material={material}
      position={position}
      rotation-x={rotationX}
      scale-y={scaleY}
    />
  )
}
// 添加起重臂拉绳（结束）
const AddBoomLineEndGLB = ({position, rotationX, scaleY, isOnline, offlineMaterial}: any) => {
  const {nodes, materials}: any = useGLTF(`/glb/swingArmLineEnd.glb`)
  const material = isOnline ? materials.whitePaint : offlineMaterial
  return (
    <mesh
      geometry={nodes.swingArmLineEnd.geometry}
      material={material}
      position={position}
      rotation-x={rotationX}
      scale-y={scaleY}
    />
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
// 计算拉绳角度以及拉绳端大小
const calcBoomLineAngleAndScale = ({canvasJibArmLength, elevationAngle}: any) => {
  const armVerticalDis = Math.sin(elevationAngle) * canvasJibArmLength
  const armHorizontalDis = Math.cos(elevationAngle) * canvasJibArmLength
  const lineEndToArmEndVerticalDis = armVerticalDis - allGlbSizeObj.balanceAFrame.y
  const LineZAndAFrameZ = allGlbSizeObj.balanceAFrame.z + armHorizontalDis
  const lineRotation = Math.atan(lineEndToArmEndVerticalDis / LineZAndAFrameZ)
  const lineWidthTotal = Math.sqrt(LineZAndAFrameZ ** 2 + Math.abs(lineEndToArmEndVerticalDis ** 2))
  const lineEndWidth = lineWidthTotal - allGlbSizeObj.boomLineFirst.z
  let lineEndScale = 1
  if (lineEndWidth > 0) lineEndScale = lineEndWidth / allGlbSizeObj.boomLineEnd.z
  return {lineRotation, lineEndScale, armVerticalDis, armHorizontalDis}
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
    craneNum,
    baseScale,
    modelScale,
    turnRef,
    lineRef,
    lineEndRef,
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
  // 拉绳
  const lineGroup = []
  const lineEndGroup = []
  // 大臂
  const armGroup = []
  // 小车+吊钩+吊物
  const trolleyGroup = []
  const steelRopeGroup = []
  const hookGroup = []
  const suspendedObjectGroup = []
  const baseY = allGlbSizeObj.base.y
  const bodySectionY = allGlbSizeObj.bodySection.y
  // 0.4：因为动臂塔机的顶升套架比另外另种塔机的大，导致同样的塔机高度显示却不同，所以将两种塔机的顶升套架的高差计算出来，公式如下：（动臂套架高度-平臂套架高度）/ 动臂套架高度
  const canvasCraneHeight = craneHeight / modelScale * baseScale - allGlbSizeObj.jackingFrame.y * 0.4
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
  // 加载回转台+驾驶室+后桥
  turnGroup.push(
    <AddTurnTableGLB key={`turn-table`} position={[0, curBodyHeight, 0]} isOnline={isOnline}
                     offlineMaterial={offlineMaterial}/>
  )
  // 添加拉绳开始端; 0.029、0.035是拉绳链接A字架的微调值
  const lineFirstHeightY = curBodyHeight + allGlbSizeObj.turnTable.y - (allGlbSizeObj.turnTable.y * 0.03)
  const lineGroupZ = allGlbSizeObj.turnTable.z / 2 - (allGlbSizeObj.turnTable.y * 0.048)
  let lineFirstZ = 0
  lineGroup.push(
    <AddBoomLineFirstGLB
      key={`line-first`}
      position={[0, 0, lineFirstZ]}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  lineFirstZ -= allGlbSizeObj.boomLineFirst.z
  lineEndGroup.push(
    <AddBoomLineEndGLB
      key={`line-end`}
      position={[0, 0, 0]}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  turnGroup.push(
    <Word
      key={'craneNum'}
      position={[0, curBodyHeight + allGlbSizeObj.turnTable.y + 100, lineGroupZ]}
    >{craneNum}</Word>
  )
  const canvasJibArmLength = jibArmLength / modelScale * baseScale
  const {
    lineRotation,
    lineEndScale
  } = calcBoomLineAngleAndScale({
    canvasJibArmLength,
    elevationAngle: 0
  })
  lineGroup.push(
    <group
      ref={lineEndRef}
      key={'line-end-group'}
      dispose={null}
      position={[0, 0, lineFirstZ]}
      scale-z={lineEndScale}
    >
      {lineEndGroup}
    </group>
  )
  turnGroup.push(
    <group
      ref={lineRef}
      key={'line-group'}
      dispose={null}
      position={[0, lineFirstHeightY, lineGroupZ]}
      rotation-x={lineRotation}
    >
      {lineGroup}
    </group>
  )

  // 0.051：起重臂标准节微调的尺寸
  curBodyHeight += allGlbSizeObj.turnTable.y / 5 + allGlbSizeObj.turnTable.y * 0.051
  const armGroupZ = -allGlbSizeObj.turnTable.z / 6 + allGlbSizeObj.turnTable.y * 0.051
  let curArmSectionZ = 0
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
  const boomLength = canvasJibArmLength - allGlbSizeObj.boomFirst.z - allGlbSizeObj.boomEnd.z - allGlbSizeObj.boomPulley.z / 2
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
  // 添加起重臂的滑轮
  curArmSectionZ -= allGlbSizeObj.boomEnd.z
  armGroup.push(
    <AddBoomPulleyGLB
      key={`boom-pulley`}
      position={[0, 0, curArmSectionZ]}
      isOnline={isOnline}
      offlineMaterial={offlineMaterial}
    />
  )
  turnGroup.push(
    <group
      ref={armRef}
      key={'arm-group'}
      dispose={null}
      position={[0, curBodyHeight, armGroupZ]}
    >
      {armGroup}
    </group>
  )
  // 添加小车钢绳
  let carPositionY = 0
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
  turnGroup.push(
    <group key={'trolley-group'} dispose={null} position={[0, curBodyHeight, armGroupZ]}>
      <group
        ref={trolleyRef}
        key={'trolley-group-child'}
        dispose={null}
        rotation-y={Math.PI / 2}
      >
        {trolleyGroup}
      </group>
    </group>
  )
  craneGroup.push(<group ref={turnRef} key={'turn-group'} dispose={null}>{turnGroup}</group>)
  return craneGroup
}

export default memo((props: Props) => {
  const {
    x,
    y,
    modelScale = 0.038,
    baseScale,
    jibArmLength,
    angle,
    elevationAngle,
    hookHeight,
    loadWeight,
    isOnline,
    offlineMaterial,
    animationInterval = 5
  } = props

  const curAngleRef = useRef(0);
  const curElevationAngleRef = useRef(0);
  const curSteelRopeRef = useRef(0);

  const turnRef = useRef<any>(null)
  const turnDeltaRef = useRef<any>({targetAngle: 0, angleDelta: 0})
  const trolleyRef = useRef<any>(null)
  const steelRopeRef = useRef<any>(null)
  const steelRopeDeltaRef = useRef<any>({targetSteelRope: 0, steelRopeDelta: 0})
  const hookRef = useRef<any>(null)
  const suspendedObjectRef = useRef<any>(null)
  const lineRef = useRef<any>(null)
  const lineEndRef = useRef<any>(null)
  const armRef = useRef<any>(null)
  const armDeltaRef = useRef<any>({targetElevationAngle: 0, elevationAngleDelta: 0})
  useEffect(() => {
    if (
      !armRef.current ||
      !turnRef.current ||
      !turnDeltaRef.current ||
      !armDeltaRef.current ||
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
    // 处理俯仰角
    let newElevationAngle = elevationAngle
    if (newElevationAngle > 85) {
      newElevationAngle = 85
    } else if (newElevationAngle < 15) {
      newElevationAngle = 15
    }
    const targetElevationAngle = calcRadians(newElevationAngle)
    const elevationAngleDelta = (targetElevationAngle - curElevationAngleRef.current) / frame
    armDeltaRef.current = {targetElevationAngle, elevationAngleDelta}
    // 处理吊绳
    let newHookHeight = hookHeight
    if (hookHeight < 1) {
      newHookHeight = 1
    }
    let targetSteelRope = newHookHeight / modelScale * baseScale
    const canvasJibArmLength = jibArmLength / modelScale * baseScale
    const {
      armVerticalDis
    } = calcBoomLineAngleAndScale({canvasJibArmLength, elevationAngle: targetElevationAngle})
    const hasSuspendedObject = Boolean(loadWeight)
    const suspendedObjectHeight = hasSuspendedObject ? allGlbSizeObj.suspendedObject.y : 0
    const curPulleyHeight = armRef.current.position.y + armVerticalDis
    const fixedHeight = allGlbSizeObj.hook.y + suspendedObjectHeight
    if ((targetSteelRope + fixedHeight) > curPulleyHeight) {
      targetSteelRope = curPulleyHeight - fixedHeight
    }
    const steelRopeDelta = (targetSteelRope - curSteelRopeRef.current) / frame
    steelRopeDeltaRef.current = {targetSteelRope, steelRopeDelta}
  }, [angle, elevationAngle, hookHeight, loadWeight]);

  useFrame(({clock}) => {
    if (
      !turnRef.current ||
      !armRef.current ||
      !lineRef.current ||
      !lineEndRef.current ||
      !trolleyRef.current ||
      !suspendedObjectRef.current ||
      !steelRopeRef.current ||
      !hookRef.current ||
      !turnDeltaRef.current ||
      !armDeltaRef.current ||
      !steelRopeDeltaRef.current
    ) return
    // 处理角度
    const curAngle = curAngleRef.current
    if (Math.abs(turnDeltaRef.current.targetAngle - curAngle) > 0.01) {
      const curAngleAddDelta = curAngle + turnDeltaRef.current.angleDelta
      curAngleRef.current = curAngleAddDelta;
      turnRef.current.rotation.y = curAngleAddDelta;
    }
    // 处理俯仰角
    const curElevationAngle = curElevationAngleRef.current
    if (Math.abs(armDeltaRef.current.targetElevationAngle - curElevationAngle) > 0.01) {
      const elevationAngleAddDelta = curElevationAngle + armDeltaRef.current.elevationAngleDelta
      curElevationAngleRef.current = elevationAngleAddDelta;
      armRef.current.rotation.x = elevationAngleAddDelta
    }
    const canvasJibArmLength = jibArmLength / modelScale * baseScale
    const {
      lineRotation,
      lineEndScale,
      armVerticalDis,
      armHorizontalDis
    } = calcBoomLineAngleAndScale({canvasJibArmLength, elevationAngle: armRef.current.rotation.x})
    lineRef.current.rotation.x = lineRotation
    lineEndRef.current.scale.z = lineEndScale
    trolleyRef.current.position.y = armVerticalDis
    trolleyRef.current.position.z = -armHorizontalDis

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
    if (hasSuspendedObject && (armRef.current.position.y + trolleyRef.current.position.y) + hookRef.current.position.y > allGlbSizeObj.suspendedObject.y) {
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
        {...props}
        modelScale={modelScale}
        turnRef={turnRef}
        armRef={armRef}
        lineRef={lineRef}
        lineEndRef={lineEndRef}
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
  prev.elevationAngle === next.elevationAngle &&
  prev.hookHeight === next.hookHeight &&
  prev.animationInterval === next.animationInterval &&
  prev.loadWeight === next.loadWeight
))
