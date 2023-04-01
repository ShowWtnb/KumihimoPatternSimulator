import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FifoQueue from "../../../utils/FifoQueue";
import ColorPickButton from "../ColorPickButton/ColorPickButton";

export default function ColorSelectors({ initColors, selectedColorsChanged }) {
    var numCnt = initColors.length;
    const [colors, setColors] = useState(initColors);
    const [recentColors, setRecentColors] = useState(new FifoQueue({ max: numCnt, isRepeatable: false }));
    const [flag, setFlag] = useState(-1);

    // 初回だけ実行される（[numCnt, initColors]が変更された時）
    useEffect(() => {
        console.log('initColors.forEach', initColors);
        initColors.forEach(color => {
            recentColors.push(color);
        });
        console.log('ColorSelectors recentColors', recentColors.get())
    }, [numCnt, initColors]);

    // // 更新selectedColorsChangedしたいときにsetFlag(flag+1)して更新する
    // useEffect(() => {
    //     if (selectedColorsChanged !== undefined) {
    //         console.log('ColorSelectors', 'useEffect', 'selectedColorsChanged',)
    //         selectedColorsChanged(colors);
    //     }
    // }, [flag]);

    // ColorPickButtonで色が変更された時
    const selectedColorChanged = (event) => {
        // 選択されている色を更新する
        var tmpColors = colors;
        tmpColors[event.id] = event.color;
        setColors(tmpColors);

        // 最近使った色を追加する
        recentColors.push(event.color);
        localStorage.setItem('RECENT_COLORSET_NARAGUMI', recentColors.get());

        // selectedColorsChangedイベントを起こす
        // setFlag(flag + 1);
        if (selectedColorsChanged !== undefined) {
            console.log('ColorSelectors', 'useEffect', 'selectedColorsChanged',)
            selectedColorsChanged(colors);
        }
    }
    var i = 0;
    return initColors ? (
        <div>
            <Grid item xs={12}>
                {
                    colors.map((color) => (
                        // GetColorPicker(color)
                        <Grid container item xs={6}>
                            <Grid item xs={2} />
                            <Grid item xs={3}>
                                <Typography fontSize={'2em'}>{i + 1}</Typography>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={3}>
                                <ColorPickButton initColor={color} onSelectedColorChanged={selectedColorChanged} id={i++} recentColors={recentColors.get()} />
                            </Grid>
                            <Grid item xs={2} />
                        </Grid>
                    ))
                }
            </Grid>

        </div>
    ) : (<div />);
}