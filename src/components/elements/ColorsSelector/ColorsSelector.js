import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FifoQueue from "../../../utils/FifoQueue";
import ColorPickButton from "../ColorPickButton/ColorPickButton";

export default function ColorSelectors({ initColors, selectedColorsChanged }) {
    var numCnt = initColors.length;
    const [colors, setColors] = useState([...initColors]);
    const [recentColors, setRecentColors] = useState(new FifoQueue({ max: numCnt, isRepeatable: false }));
    // const [flag, setFlag] = useState(-1);

    // 初回だけ実行される（[numCnt, initColors]が変更された時）
    useEffect(() => {
        console.log('initColors.forEach', initColors);
        initColors.forEach(color => {
            recentColors.push(color);
        });
        console.log('ColorSelectors recentColors', recentColors.get());
        setRecentColors(recentColors);
        setColors([...initColors])
    }, [initColors]);

    // ColorPickButtonで色が変更された時
    const selectedColorChanged = (event) => {
        console.log('ColorSelectors selectedColorsChanged', event)
        // 選択されている色を更新する
        // var tmpColors = colors;
        // tmpColors[event.id] = event.color;
        setColors((prev) => {
            prev[event.id] = event.color;
            return [...prev];
        });

        // 最近使った色を追加する
        recentColors.push(event.color);
        localStorage.setItem('RECENT_COLORSET_NARAGUMI', recentColors.get());

        // selectedColorsChangedイベントを起こす
        // setFlag(flag + 1);
        if (selectedColorsChanged !== undefined) {
            console.log('ColorSelectors selectedColorsChanged selectedColorsChanged !== undefined', colors)
            // console.log('ColorSelectors selectedColorsChanged selectedColorsChanged !== undefined', tmpColors)
            selectedColorsChanged(colors);
        }
    }

    const GetColorPickButtonComp = ({ i, color }) => {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography fontSize={'2em'} right={0}>{i + 1}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <ColorPickButton key={i} initColor={color} onSelectedColorChanged={selectedColorChanged} id={i} recentColors={recentColors.get()} />
                    </Grid>
                </Grid>
            </div>
        );
    }
    var i = 0;
    return (
        <div>
            {
                colors.map((color) => (
                    <GetColorPickButtonComp key={i++} i={i} color={color} />
                ))
            }
        </div>
    );
}