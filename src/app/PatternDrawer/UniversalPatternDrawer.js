import { Tooltip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Button, IconButton, Paper, Typography } from "@mui/material";
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

export default function UniversalPatternDrawer({ jsonPattern, onSelectedColorsChanged }) {
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
                            onTouchEnd={onClickRect}
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
        if (onSelectedColorsChanged !== undefined) {
            onSelectedColorsChanged({ 'value': copySelectedJson });
        }
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

                </Grid>
                <Grid item xs={8}>
                    <Stage width={LayerWidth} height={LayerHeight}>
                        <Layer>
                            {GetShapes(selectedJson)}
                        </Layer>
                    </Stage>
                </Grid>
                <Grid item xs={12}>
                    {/* <FormControl sx={{ m: 1 }}>
                        <Tooltip title="Save this as default">
                            <IconButton>
                                <Save />
                            </IconButton>
                        </Tooltip>
                    </FormControl> */}
                </Grid>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <Typography align='center' variant="body2" color="text.secondary">Copyright (c) 2023 ShowWtnb</Typography>
                    <Typography align='center' variant="body2" color="text.secondary">This Software is in no way affiliated with 世界のヨコサワ or 株式会社POKER ROOM.</Typography>
                </Paper>
            </Grid>

            <ColorPickDialog isOpen={isDialogOpen} defaultColor={dialogColor} onSelectedColorChanged={onSelectedColorChanged} />
        </div>
    );
}