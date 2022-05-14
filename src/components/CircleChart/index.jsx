import React from 'react'

import {CanvasJSChart} from 'canvasjs-react-charts'

export default function CircleChart() {
    let customY = ""
    const options = {
        animationEnabled: true,
        backgroundColor: "#0F103B",
        data: [{
            type: "doughnut",
            showInLegend: false,
            indexLabel: `{name}: {y}`,
            indexLabelFontColor:"#fff",
            indexLabelFontWeight: "bold",
            indexLabelFontSize: 26,
            yValueFormatString: "#'%'",
            dataPoints: [
                { name: "Pool Reward", y: 40 },
                { name: "Presale", y: 25 },
                { name: "Aridrop", y: 2 },
                { name: "Liquid", y: 25 },
                { name: "Marketing", y: 3 },
                { name: "Team", y: 5 }
            ]
        }]
    }
  return (
    <div>
        <CanvasJSChart options = {options}
        />
    </div>
  )
}
