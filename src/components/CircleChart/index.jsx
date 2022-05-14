import React from 'react'

import {CanvasJSChart} from 'canvasjs-react-charts'

export default function CircleChart() {
    let customY = ""
    const options = {
        animationEnabled: true,
        backgroundColor: "#0c205c",
        data: [{
            type: "doughnut",
            showInLegend: false,
            indexLabel: `{name}: {y}`,
            indexLabelFontColor:"#fff",
            indexLabelFontWeight: "bold",
            indexLabelFontSize: 16,
            yValueFormatString: "#'%'",
            dataPoints: [
                { name: "Aridrop", y: 2 },
                { name: "Pool Reward", y: 40 },
                { name: "Presale", y: 25 },
                { name: "Liquid", y: 25 },
                { name: "Marketing", y: 3 },
                { name: "Team", y: 5 },
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
