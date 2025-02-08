import {Html, useProgress} from "@react-three/drei";
import styles from "@/pages/three/index.less";

export default () => {
  const {progress} = useProgress()
  return (
    <Html center>
      <div className={styles.loader}>
        <span className={styles.text}>loading...</span>
        <div className={styles.progressBox}>
          <div
            className={styles.progress}
            style={{width: `${progress}%`}}
          />
        </div>
      </div>
    </Html>
  )
}
