import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ColorPickButton from "../../components/elements/ColorPickButton/ColorPickButton";
import ColorSelectors from "../../components/elements/ColorsSelector/ColorsSelector";
import { Spacer } from "../../components/elements/Spacer";
// import { Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle } from 'react-shapes';
import dummy from "../../naragumi_img5.jpg"

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

const one_seventh = 1.0 / 7.0;

const naragumi_pattern_points = [
    [[0, 3], [3, 0], [4, 1], [0, 5]],
    [[3, 2], [4, 1], [7, 4], [7, 6]],
];
const color_index_convertor = [
    8, 16, 7, 15, 6, 14, 5, 13, 4, 12, 3, 11, 2, 10, 1, 9
];

const keyDEFAULT_COLORSET_NARAGUMI = 'DEFAULT_COLORSET_NARAGUMI';
const keyIS_DEFAULT_COLORSET_NARAGUMI = 'IS_DEFAULT_COLORSET_NARAGUMI';

const SaveDefaultColorSet = (ColorSet) => {
    console.log('SaveDefaultColorSet', ColorSet);
    localStorage.setItem(keyDEFAULT_COLORSET_NARAGUMI, ColorSet);
    console.log('SaveDefaultColorSet', localStorage.getItem(keyDEFAULT_COLORSET_NARAGUMI).split(','));
}

export default function NaraGumiPatternDrawer() {
    const [colors, setColors] = useState();
    const [flag, setFlag] = useState(-1);

    // 初回だけ
    useEffect(() => {
        var initFlag = localStorage.getItem(keyIS_DEFAULT_COLORSET_NARAGUMI);
        console.log('IS_DEFAULT_COLORSET_NARAGUMI initFlag', initFlag);
        // 既定の色の組み合わせが保存されていなければ
        if (!initFlag) {
            console.log('initFlag || initFlag === null', initFlag);
            // init_colorsを既定の色の組み合わせとして保存して
            SaveDefaultColorSet(init_colors);

            // 既定の色の組み合わせが保存されていることにする
            localStorage.setItem(keyIS_DEFAULT_COLORSET_NARAGUMI, true);
        } else {
            // 既定の色の組み合わせが保存されている場合
            console.log('seikou');
            // 読み込んで
            var defaultColors = localStorage.getItem(keyDEFAULT_COLORSET_NARAGUMI);
            var defaultColorsArray = defaultColors.split(',');
            console.log('DEFAULT_COLORSET_NARAGUMI defaultColors', defaultColorsArray);
            // 設定する
            setColors([...defaultColorsArray]);
        }
        setFlag(flag + 1);
    }, []);

    const selectedColorChanged = (event) => {
        console.log('selectedColorChanged', event);
        // // console.log("NaraGumiPatternDrawer selectedColorChanged ", event);
        // //   setColor(event);
        // var tmpColors = colors;
        // tmpColors[event.id] = event.color;
        // // console.log("NaraGumiPatternDrawer selectedColorChanged ", tmpColors);
        // setColors(tmpColors);
        // // console.log("NaraGumiPatternDrawer selectedColorChanged ", colors);
        setColors(event);
        SaveDefaultColorSet(event);

        setFlag(flag + 1);
    }

    const GetPattern = (colors) => {
        // console.log("GetPattern ", colors);
        var [rects, setRect] = useState([]);
        var array = [];
        useEffect(() => {
            console.log("GetPattern useEffect ", colors);
            var size = 35 * one_seventh;
            for (let index = 0; index < 8; index++) {
                naragumi_pattern_points.map((pointsSet) => {
                    var pointSetStr = '';
                    pointsSet.map((points) => {
                        // console.log('pointsSet.map', points);
                        var pointsStr = String((points[0] * size) + ',' + ((points[1] + 2 * index) * size))
                        // console.log('pointsSet.map', pointsStr);
                        pointSetStr += pointsStr + ' ';
                    });
                    // console.log('pointsSet.map', pointSetStr);
                    array.push(pointSetStr);
                });
            }
            // console.log('GetPattern', array);
            // testFIFO();
            setRect(array);
        }, [flag, colors]);

        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0 0 36 100">
                    {rects.map((rect, i = 0) => (
                        <polygon points={rect} stroke="#eeeeee" strokeWidth={0.1} fill={colors[color_index_convertor[i++] - 1]} />
                    ))}
                </svg>
            </div>
        );
    }
    const GetColorSelectors = () => {
        var [tmpC, setTmpC] = useState();
        var array = [];
        useEffect(() => {
            if (colors) {
                array = [...colors];
            } else {
                array = undefined;
            }
            setTmpC(array);
        }, [flag, colors]);
        console.log('tmpC', tmpC);
        return (tmpC) ? (
            <ColorSelectors initColors={tmpC ? tmpC : init_colors} selectedColorsChanged={selectedColorChanged} />
        ) : (<div />)
    }
    return (
        <div>
            <Grid container>
                <Grid container item xs={6}>
                    <Grid item xs={12}>
                        <div>
                            <Grid container >
                                <Grid item xs={2}>
                                    <Spacer size={'3em'} />
                                    <Typography fontSize={'1.5em'} right={0} >8</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >7</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >6</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >5</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >4</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >3</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >2</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >1</Typography>
                                </Grid>

                                <Grid item xs={8} >
                                    {GetPattern(colors)}
                                </Grid>
                                <Grid item xs={2}>
                                    <Spacer size={'4.5em'} />
                                    <Typography fontSize={'1.5em'} right={0} >16</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >15</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >14</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >13</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >12</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >11</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >10</Typography>
                                    <Typography fontSize={'1.5em'} right={0} >9</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <img src={dummy} width={'200rem'} height={'200rem'} />
                        </div>
                    </Grid>



                </Grid>
                <Grid item xs={6}>
                    {GetColorSelectors()}
                </Grid>
            </Grid>
        </div>
    );
}
