import React from 'react'

import './CirclePercent.scss'

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  buildStyles
} from "react-circular-progressbar";

// Radial separators
import RadialSeparators from "./RadialSeparators";

const percentage = 66;

export default function CirclePercent({percent,rate}) {
  return (
    <div className="circle-percent">
        <CircularProgressbarWithChildren
        value={percent}
        strokeWidth={10}
        styles={buildStyles({
            strokeLinecap: "butt",
            trailColor: "RGBA(239,100,33,0.2)",
            pathColor: "#EF6421",
        })}
        >
        <RadialSeparators
            count={7}
            style={{
            background: "#0c205c",
            width: "10px",
            height: `${40}%`
            }}
        />
        </CircularProgressbarWithChildren>
        <div className="circle-percent-num">
            {rate}
        </div>
    </div>
  )
}
