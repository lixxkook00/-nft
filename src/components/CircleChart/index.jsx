import React from 'react'

import {CanvasJSChart} from 'canvasjs-react-charts'


export default function CircleChart() {

    const options = {
        animationEnabled: true,
        backgroundColor: "#0c205c",
        data: [{
            type: "doughnut",
            showInLegend: false,
            colorSet: "greenShades",
            indexLabel: `{name}: {y}`,
            indexLabelFontColor:"#fff",
            indexLabelFontWeight: "bold",
            indexLabelFontSize: 16,
            yValueFormatString: "#'%'",
            dataPoints: [
                { name: "Pool Reward", y: 40 ,color: "#FDC206"},
                { name: "Presale", y: 25 ,color: "#73D6C1"},
                { name: "Liquid", y: 25 ,color: "#01BCF3"},
                { name: "Team", y: 5,color: "#F44D68" },
                { name: "Marketing", y: 3 ,color: "#C156C9"},
                { name: "Airdrop", y: 2 ,color: "#F99804"},
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
