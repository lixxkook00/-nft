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
                { name: "Liquid", y: 25 },
                { name: "Pool Reward", y: 40 },
                { name: "Team", y: 5 },
                { name: "Marketing", y: 3 },
                { name: "Aridrop", y: 2 },
                { name: "Presale", y: 25 },
            ]
        }]
    }
  return (
    <div className="circhart">
        <CanvasJSChart options = {options}
        />
    </div>
  )
}
