import { useEffect, useState } from 'react';
import { linearRegression, costFunction, predict } from "clementreiffers-linear-regression";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ScatterChart, ZAxis, Scatter, Line } from 'recharts';
let data = [
    {
        outlook: "sunny",
        temperature: 85,
        humidity: 85,
        "windy": false,
        "play": "no"
    },
    {
        outlook: "sunny",
        temperature: 80,
        humidity: 90,
        "windy": true,
        "play": "no"
    },
    {
        outlook: "overcast",
        temperature: 83,
        humidity: 86,
        "windy": false,
        "play": "yes"
    },
    {
        outlook: "rainy",
        temperature: 70,
        humidity: 96,
        "windy": false,
        "play": "yes"
    },
    {
        outlook: "rainy",
        temperature: 68,
        humidity: 80,
        "windy": false,
        "play": "yes"
    },
    {
        outlook: "rainy",
        temperature: 65,
        humidity: 70,
        "windy": true,
        "play": "no"
    },
    {
        outlook: "overcast",
        temperature: 64,
        humidity: 65,
        "windy": true,
        "play": "yes"
    },
    {
        outlook: "sunny",
        temperature: 72,
        humidity: 95,
        "windy": false,
        "play": "no"
    },
    {
        outlook: "sunny",
        temperature: 69,
        humidity: 70,
        "windy": false,
        "play": "yes"
    },
    {
        outlook: "rainy",
        temperature: 75,
        humidity: 80,
        "windy": false,
        "play": "yes"
    },
    {
        outlook: "sunny",
        temperature: 75,
        humidity: 70,
        "windy": true,
        "play": "yes"
    },
    {
        outlook: "overcast",
        temperature: 72,
        humidity: 90,
        "windy": true,
        "play": "yes"
    },
    {
        outlook: "overcast",
        temperature: 81,
        humidity: 75,
        "windy": false,
        "play": "yes"
    },
    {
        outlook: "rainy",
        temperature: 71,
        humidity: 91,
        "windy": true,
        "play": "no"
    }
]

const RenderLineChart = (props) => {
    const [charData, setChartdata] = useState(data)
    const [dataCost , setDatacost ] = useState()
    useEffect(() => {
        props.data.length !== 0 && charData.push(props.data)
        let lr = linearRegression(charData.map(x => x.temperature), charData.map(x => x.humidity));
        const pred = predict(charData.map(x => x.temperature), lr);
        const cost = costFunction(charData.map(x => x.humidity), pred);
        charData.forEach((x, idx) => x.pred = pred[idx])
        setDatacost(cost)
        setChartdata([...charData])

    },
        [props.data])
    return <div className='flex justify-center flex-col'>
        <h1 className='text-black text-center'>Cost function {dataCost}</h1>
        <ResponsiveContainer width={1200} height={400}>
            <ComposedChart data={charData} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="temperature" type="number" domain={[40, 120]} />
                <YAxis dataKey="humidity" type="number" domain={[40, 120]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Temp" data={charData} fill="red" />
                <Line name="predictions" dataKey="pred" stroke="blue" />
            </ComposedChart>
        </ResponsiveContainer>
    </div>

};
export default RenderLineChart