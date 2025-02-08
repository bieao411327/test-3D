import {Outlet} from "umi";
import {useEffect, useRef, useState} from "react";
import styles from './index.less'

export default () => {
    const [ratioX, setRatioX] = useState(1)
    const [ratioY, setRatioY] = useState(1)
    const resizeFull = () => {
        const ratioX = window.innerWidth / 1920
        const ratioY = window.innerHeight / 1080
        setRatioX(ratioX)
        setRatioY(ratioY)
    }

    useEffect(() => {
        window.onresize = function () {
            resizeFull()
        }
    },[])

    return (
        <div
            className={styles.container}
            style={{
                transform: `scale(${ratioX},${ratioY})`
            }}
        >
            <Outlet/>
        </div>
    )
}
