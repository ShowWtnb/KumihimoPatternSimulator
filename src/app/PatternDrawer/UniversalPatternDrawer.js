import { Tooltip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Button, IconButton } from "@mui/material";
import { Save } from '@mui/icons-material';
import { useState } from "react";
import { useEffect } from "react";
import { useWindowSize } from "../../utils/useWindowSize";
import { Stage, Layer, Shape, Text } from 'react-konva';
import ColorPickDialog from "../../components/elements/ColorPickButton/ColorPickDialog";

const init_colors = [
    '#b8fff9',
    '#aabbcc',
    '#05083b',
    '#dde0a6',

    '#05083b',
    '#aabbcc',
    '#b8fff9',
    '#ff6e6e',

    '#b8fff9',
    '#aabbcc',
    '#05083b',
    '#dde0a6',

    '#05083b',
    '#aabbcc',
    '#b8fff9',
    '#ff6e6e',
];

// const jsonPattern = {
//     'key': 'NARAGUMI',
//     'name': '奈良組',
//     'points': [
//         [[0, 3], [3, 0], [4, 1], [0, 5]],
//         [[3, 2], [4, 1], [7, 4], [7, 6]],
//     ],
//     'repeatCount': 8,
//     'divideRate': (35 * (1.0 / 7)),
//     'color_index_convertor': [
//         8, 16, 7, 15, 6, 14, 5, 13, 4, 12, 3, 11, 2, 10, 1, 9
//     ]
// }
// const jsonPatterns = [
//     {
//         'key': 'NARAGUMI',
//         'name': '奈良組',
//         'points': [
//             {
//                 'points': [[0, 3], [3, 0], [4, 1], [0, 5]],
//                 'index': 8,
//                 'label': '8',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 4], [7, 6], [3, 2], [4, 1]],
//                 'index': 16,
//                 'label': '16',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 5], [3, 2], [4, 3], [0, 7]],
//                 'index': 7,
//                 'label': '7',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 6], [7, 8], [3, 4], [4, 3]],
//                 'index': 15,
//                 'label': '15',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 7], [3, 4], [4, 5], [0, 9]],
//                 'index': 6,
//                 'label': '6',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 8], [7, 10], [3, 6], [4, 5]],
//                 'index': 14,
//                 'label': '14',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 9], [3, 6], [4, 7], [0, 11]],
//                 'index': 5,
//                 'label': '5',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 10], [7, 12], [3, 8], [4, 7]],
//                 'index': 13,
//                 'label': '13',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 11], [3, 8], [4, 9], [0, 13]],
//                 'index': 4,
//                 'label': '4',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 12], [7, 14], [3, 10], [4, 9]],
//                 'index': 12,
//                 'label': '12',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 13], [3, 10], [4, 11], [0, 15]],
//                 'index': 3,
//                 'label': '3',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 14], [7, 16], [3, 12], [4, 11]],
//                 'index': 11,
//                 'label': '11',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 15], [3, 12], [4, 13], [0, 17]],
//                 'index': 2,
//                 'label': '2',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 16], [7, 18], [3, 14], [4, 13]],
//                 'index': 10,
//                 'label': '10',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[0, 17], [3, 14], [4, 15], [0, 19]],
//                 'index': 1,
//                 'label': '1',
//                 'labelPosition': 'left',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//             {
//                 'points': [[7, 18], [7, 20], [3, 16], [4, 15]],
//                 'index': 9,
//                 'label': '9',
//                 'labelPosition': 'right',
//                 'type': 'rect',
//                 'selectedColor': '',
//             },
//         ],
//         'verticalCompressionRatio': ((1.0 / 20)),
//         'horizontalCompressionRatio': ((1.0 / 7)),
//         'fontSize': 25,
//         'fontColor': "#404040",
//     }
//     , {
//         "key": "MARUGENJI_16",
//         "name": "丸源氏(16)",
//         "points": [
//             {
//                 "points": [
//                     [0, 1],
//                     [0, 3],
//                     [1, 4],
//                     [1, 2]
//                 ],
//                 "index": 0,
//                 "label": "A4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [1, 2],
//                     [1, 4],
//                     [2, 3],
//                     [2, 1]
//                 ],
//                 "index": 0,
//                 "label": "B4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [2, 0],
//                     [2, 2],
//                     [3, 3],
//                     [3, 1]
//                 ],
//                 "index": 0,
//                 "label": "D4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [3, 1],
//                     [3, 3],
//                     [4, 2],
//                     [4, 0]
//                 ],
//                 "index": 0,
//                 "label": "C4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [4, 1],
//                     [4, 3],
//                     [5, 4],
//                     [5, 2]
//                 ],
//                 "index": 0,
//                 "label": "B2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [5, 2],
//                     [5, 4],
//                     [6, 3],
//                     [6, 1]
//                 ],
//                 "index": 0,
//                 "label": "A2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [6, 0],
//                     [6, 2],
//                     [7, 3],
//                     [7, 1]
//                 ],
//                 "index": 0,
//                 "label": "C2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [7, 1],
//                     [7, 3],
//                     [8, 2],
//                     [8, 0]
//                 ],
//                 "index": 0,
//                 "label": "D2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [0, 3],
//                     [0, 5],
//                     [1, 6],
//                     [1, 4]
//                 ],
//                 "index": 0,
//                 "label": "A3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [1, 4],
//                     [1, 6],
//                     [2, 5],
//                     [2, 3]
//                 ],
//                 "index": 0,
//                 "label": "B3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [2, 2],
//                     [2, 4],
//                     [3, 5],
//                     [3, 3]
//                 ],
//                 "index": 0,
//                 "label": "D3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [3, 3],
//                     [3, 5],
//                     [4, 4],
//                     [4, 2]
//                 ],
//                 "index": 0,
//                 "label": "C3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [4, 3],
//                     [4, 5],
//                     [5, 6],
//                     [5, 4]
//                 ],
//                 "index": 0,
//                 "label": "B1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [5, 4],
//                     [5, 6],
//                     [6, 5],
//                     [6, 3]
//                 ],
//                 "index": 0,
//                 "label": "A1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [6, 2],
//                     [6, 4],
//                     [7, 5],
//                     [7, 3]
//                 ],
//                 "index": 0,
//                 "label": "C1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [7, 3],
//                     [7, 5],
//                     [8, 4],
//                     [8, 2]
//                 ],
//                 "index": 0,
//                 "label": "D1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [0, 5],
//                     [0, 7],
//                     [1, 8],
//                     [1, 6]
//                 ],
//                 "index": 0,
//                 "label": "A2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [1, 6],
//                     [1, 8],
//                     [2, 7],
//                     [2, 5]
//                 ],
//                 "index": 0,
//                 "label": "B2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [2, 4],
//                     [2, 6],
//                     [3, 7],
//                     [3, 5]
//                 ],
//                 "index": 0,
//                 "label": "D2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [3, 5],
//                     [3, 7],
//                     [4, 6],
//                     [4, 4]
//                 ],
//                 "index": 0,
//                 "label": "C2",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [4, 5],
//                     [4, 7],
//                     [5, 8],
//                     [5, 6]
//                 ],
//                 "index": 0,
//                 "label": "B4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [5, 6],
//                     [5, 8],
//                     [6, 7],
//                     [6, 5]
//                 ],
//                 "index": 0,
//                 "label": "A4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [6, 4],
//                     [6, 6],
//                     [7, 7],
//                     [7, 5]
//                 ],
//                 "index": 0,
//                 "label": "C4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [7, 5],
//                     [7, 7],
//                     [8, 6],
//                     [8, 4]
//                 ],
//                 "index": 0,
//                 "label": "D4",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [0, 7],
//                     [0, 9],
//                     [1, 10],
//                     [1, 8]
//                 ],
//                 "index": 0,
//                 "label": "A1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [1, 8],
//                     [1, 10],
//                     [2, 9],
//                     [2, 7]
//                 ],
//                 "index": 0,
//                 "label": "B1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [2, 6],
//                     [2, 8],
//                     [3, 9],
//                     [3, 7]
//                 ],
//                 "index": 0,
//                 "label": "D1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [3, 7],
//                     [3, 9],
//                     [4, 8],
//                     [4, 6]
//                 ],
//                 "index": 0,
//                 "label": "C1",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [4, 7],
//                     [4, 9],
//                     [5, 10],
//                     [5, 8]
//                 ],
//                 "index": 0,
//                 "label": "B3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [5, 8],
//                     [5, 10],
//                     [6, 9],
//                     [6, 7]
//                 ],
//                 "index": 0,
//                 "label": "A3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [6, 6],
//                     [6, 8],
//                     [7, 9],
//                     [7, 7]
//                 ],
//                 "index": 0,
//                 "label": "C3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             },
//             {
//                 "points": [
//                     [7, 7],
//                     [7, 9],
//                     [8, 8],
//                     [8, 6]
//                 ],
//                 "index": 0,
//                 "label": "D3",
//                 "labelPosition": "left",
//                 "type": "rect",
//                 "selectedColor": ""
//             }
//         ],
//         "verticalCompressionRatio": 0.1,
//         "horizontalCompressionRatio": 0.125,
//         "fontSize": 20,
//         "fontColor": "#404040"
//     }
// ];

export default function UniversalPatternDrawer({ jsonPattern }) {
    var [winWidth, winHeight] = useWindowSize();
    const [colors, setColors] = useState(init_colors);
    const [jsonPatterns, setJsonPatterns] = useState(jsonPattern);
    useEffect(() => {
        setJsonPatterns(jsonPattern);
        // console.log('UniversalPatternDrawer useEffect', jsonPatterns);
    }, [jsonPattern]);

    // const [rects, setRect] = useState([]);

    // ローカルストレージに前回の色が保存されている場合は読みだす
    const keyDEFAULT_COLORSET = 'DEFAULT_COLORSET';
    // const keyDEFAULT_COLORSET = 'DEFAULT_COLORSET_' + jsonPattern.key;
    useEffect(() => {
        var defaultColorsArray = init_colors;
        // local storageから既定の色の組み合わせを取得する
        var defaultColors = localStorage.getItem(keyDEFAULT_COLORSET);
        // 値が保存されていたら読み込んでdefaultColorsArrayに設定する
        if (!(defaultColors === null || defaultColors === undefined)) {
            defaultColorsArray = defaultColors.split(',');
        }

        // 色の更新
        setColors([...defaultColorsArray]);
    }, []);

    // // 繰り返しがないPatternでもpointsは二層の配列として、repeatCountを1とすることとする
    // var array = [];
    // useEffect(() => {
    //     var size = jsonPattern.divideRate;
    //     for (let k = 0; k < jsonPattern.repeatCount; k++) {
    //         for (let i = 0; i < jsonPattern.points.length; i++) {
    //             const element = jsonPattern.points[i];
    //             var pointSetStr = '';
    //             for (let j = 0; j < element.length; j++) {
    //                 const p = element[j];
    //                 var pointsStr = String((p[0] * size) + ',' + ((p[1] + 2 * k) * size))
    //                 pointSetStr += pointsStr + ' ';
    //             }
    //             array.push(pointSetStr);
    //         }
    //     }
    //     setRect(array);
    // }, []);

    // 

    const [patternLabels, setPatternLabels] = useState([]);
    const [selectedPattern, setSelectedPattern] = useState([]);
    const [selectedJson, setSelectedJson] = useState();
    useEffect(() => {
        var pattern_list = [];
        if (jsonPatterns === undefined) {
            console.log('UniversalPatternDrawer jsonPatterns undefined', jsonPatterns);
            return;
        }
        for (let i = 0; i < jsonPatterns.length; i++) {
            const j_pattern = jsonPatterns[i];
            pattern_list.push({ 'key': j_pattern.key, 'value': j_pattern.name });
            // console.log('UniversalPatternDrawer pattern_list', pattern_list);
        }
        setPatternLabels(pattern_list);
    }, [jsonPatterns]);
    // }, [jsonPatterns]);

    const handleSelectChange = (event) => {
        // console.log('UniversalPatternDrawer handleSelectChange', event);
        // console.log('UniversalPatternDrawer handleSelectChange', event.target);
        setSelectedPattern(event.target.value);
    }
    useEffect(() => {
        if (jsonPatterns === undefined) {
            console.log('UniversalPatternDrawer jsonPatterns undefined', jsonPatterns);
            return;
        }
        for (let i = 0; i < jsonPatterns.length; i++) {
            const j_pattern = jsonPatterns[i];
            // console.log('UniversalPatternDrawer useEffect selectedPattern', selectedPattern);
            if (j_pattern.key === selectedPattern) {
                // console.log('UniversalPatternDrawer useEffect selectedPattern', j_pattern);
                setSelectedJson(j_pattern);
                break;
            }
        }
    }, [selectedPattern, jsonPatterns]);


    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogColor, setIsDialogColor] = useState('transparent');
    const [clickedId, setClickedId] = useState();
    const onClickRect = (event) => {
        // console.log('UniversalPatternDrawer onClickRect', event);
        // console.log('UniversalPatternDrawer onClickRect', event.target);
        // console.log('UniversalPatternDrawer onClickRect', event.target.id());
        // console.log('UniversalPatternDrawer onClickRect', event.target.fill());
        setIsDialogColor(event.target.fill());
        setClickedId(event.target.id());
        setIsDialogOpen(true);
    }

    const GetShapes = (json) => {
        // winWidth, winHeight
        // console.log('UniversalPatternDrawer GetShapes', json);
        if (json === undefined) {
            return (<></>);
        }

        const width_rate = json.horizontalCompressionRatio * LayerWidth;
        const height_rate = json.verticalCompressionRatio * LayerHeight;
        const points = json.points;
        const fontsize = json.fontSize;
        return (
            <>
                {points.map((point, i = 0) => (
                    <>
                        <Shape
                            sceneFunc={(context, shape) => {
                                const points = point.points;
                                context.beginPath();
                                context.moveTo(points[0][0] * width_rate, points[0][1] * height_rate);
                                for (let i = 1; i < points.length; i++) {
                                    const element = points[i];
                                    context.lineTo(element[0] * width_rate, element[1] * height_rate);
                                }
                                context.closePath();
                                context.fillStrokeShape(shape);
                            }}
                            key={point.label}
                            id={point.label}
                            fill={(point.selectedColor === undefined || point.selectedColor === '') ? colors[(point.index - 1) % colors.length] : point.selectedColor}
                            stroke="#eeeeee"
                            strokeWidth={1.0}
                            onMouseUp={onClickRect}
                        />
                        <Text text={point.label} fill={selectedJson?.fontColor === undefined ? "#404040" : selectedJson?.fontColor} fontStyle="bold" x={(point.labelPosition === 'left') ? (point.points[0][0] * width_rate) : (point.points[0][0] * width_rate - fontsize * 1.1)} y={point.points[0][1] * height_rate + fontsize * 0.8} fontSize={fontsize} />
                    </>

                ))}
            </>
        );
    }

    function onSelectedColorChanged(event) {
        setIsDialogOpen(false);
        if (event.canceled) {
            return;
        }
        console.log('UniversalPatternDrawer onSelectedColorChanged', clickedId, event);
        var copySelectedJson = { ...selectedJson };
        for (let i = 0; i < copySelectedJson.points.length; i++) {
            const element = copySelectedJson.points[i];
            // console.log('UniversalPatternDrawer onSelectedColorChanged', element.label, clickedId);
            if (element.label === clickedId) {
                // console.log('UniversalPatternDrawer onSelectedColorChanged', element.label);
                copySelectedJson.points[i].selectedColor = event.selected;
                // break;
            }
        }
        console.log('UniversalPatternDrawer onSelectedColorChanged', copySelectedJson);
        // setSelectedJson(...copySelectedJson);
    };

    const [LayerWidth, setLayerWidth] = useState(0);
    const [LayerHeight, setLayerHeight] = useState(0);
    useEffect(() => {
        if (selectedJson === undefined) {
            return;
        }
        // Gridを6にしているので0.5*
        const rate = 8 / 12;
        setLayerWidth(winWidth * rate);
        setLayerHeight(winWidth * rate * (selectedJson.horizontalCompressionRatio / selectedJson.verticalCompressionRatio))
    }, [winWidth, winHeight, selectedJson])

    return (
        <div>
            <Grid container justifyItems={'center'} alignContent={'center'} justifyContent={'center'}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ m: 1, width: '15rem' }}>
                        <InputLabel >Type</InputLabel>
                        <Select
                            value={selectedPattern}
                            onChange={handleSelectChange}
                            input={<OutlinedInput label="Type" />}
                        >
                            {patternLabels.map((type) => (
                                <MenuItem
                                    key={type.key}
                                    value={type.key}
                                // style={getStyles(name, personName, theme)}
                                >
                                    {type.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    {/* <FormControl sx={{ m: 1 }}>
                        <Tooltip title="Save this as default">
                            <IconButton>
                                <Save />
                            </IconButton>
                        </Tooltip>
                    </FormControl> */}
                </Grid>

                <Grid item xs={8}>
                    <Stage width={LayerWidth} height={LayerHeight}>
                        <Layer>
                            {GetShapes(selectedJson)}
                        </Layer>
                    </Stage>
                </Grid>
            </Grid>

            <ColorPickDialog isOpen={isDialogOpen} defaultColor={dialogColor} onSelectedColorChanged={onSelectedColorChanged} />
        </div>
    );
}