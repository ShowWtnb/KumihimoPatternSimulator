import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField, Select, Stack, Button, Grid } from '@mui/material';

const ColorPickButton = ({ onSelectedColorChanged, initColor, id, recentColors }) => {
    const [color, setColor] = useState("#aabbcc");

    // OKボタンが押された
    const onSelectClosed = (event, reason) => {
        // setColor -> onClosedの間には描画の更新が行われていないので、ここでcolorを返しても前の色になってしまう
        console.log("onSelectClosed", event, reason);
        console.log("onSelectClosed", { color, id });

        // buttonが押されて閉じたときはsetColorが間に合わない
        if (event.target.localName === 'button') {
            console.log("event.target.localName === 'button'", { color, id });
        } else {
            // それ以外の時は都度描画変更すると重すぎるので閉じられたときに変更する
            console.log("else", { color, id });
            // 色が変更されたイベントを返す
            onSelectedColorChanged({ color, id });
        }
        // // 閉じる
        // setOpen(false);
    };

    // 初回だけ実行する
    useEffect(() => {
        // console.log('useEffect', initColor);
        if (initColor) {
            // console.log('initColor', initColor);
            setColor(initColor);
        } else {
            // console.log('not initColor', initColor);
        }
    }, []);

    function onTextFieldChange(event) {
        var str = event.target.value;
        // textの入力が色のフォーマット#XXXXXXならsetColorしたい
        const abcPattern = /^#[0-9a-f]{6}/gi;   // フォーマットと文字数を指定（#から始まって、0-9a-fで構成され、6文字で、大文字小文字は区別しない）
        if (str.match(abcPattern)) {
            setColor(str);
        } else {
            // console.log("not matched", str);
        }
    }
    function onHexColorPickerChange(event) {
        console.log("onHexColorPickerChange", event);
        setColor(event);
    }
    function onRecentColorSelected(event) {
        var c = event.target.id
        console.log("onRecentColorSelected event.target.id", c);
        // setColorStr(c);
        setColor(c);

        // 色が変更されたイベントを返す
        onSelectedColorChanged({ color: c, id: id });
    }
    return (
        <div >
            <Select
                sx={{
                    bgcolor: color,
                    width: '3em',
                    height: '3em',
                    color: 'transparent',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: color,
                    },
                    '.MuiSvgIcon-root ': {
                        fill: "transparent",
                    }
                }}
                onClose={onSelectClosed}
            >
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: '5em' }}>
                        <HexColorPicker color={color} onChange={onHexColorPickerChange} />
                    </FormControl>
                </Box>
                {
                    (recentColors) ? (
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: '5em' }}>
                                <Stack
                                    spacing={{ xs: 0.1, sm: 2, md: 4 }}
                                    direction="row"
                                    useFlexGap
                                    flexWrap="wrap"
                                    sx={{ width: 200, '& > *': { flexGrow: 1 } }}
                                >
                                    {
                                        recentColors.map((color, i = 0) => (
                                            <Box key={i++} component="form" sx={{ display: 'flex', flexWrap: 'wrap' }} >
                                                <FormControl sx={{ m: 0, minWidth: '1em' }}>
                                                    <Button id={color} onClick={onRecentColorSelected}
                                                        sx={{
                                                            bgcolor: color,
                                                            width: '0.5em',
                                                            height: '2em',
                                                            color: 'transparent',
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: color,
                                                                bgcolor: color,
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: color,
                                                                bgcolor: color,
                                                            },
                                                            '.MuiSvgIcon-root ': {
                                                                fill: "transparent",
                                                            }
                                                        }}>
                                                    </Button>
                                                </FormControl>
                                            </Box>
                                        ))
                                    }
                                </Stack>
                            </FormControl>
                        </Box>
                    ) : (<div />)/* not have recentColors */
                }
                <TextField label='#RRGGBB' defaultValue={color} value={color} onChange={onTextFieldChange}></TextField>
            </Select>
        </div>
    );
}

export default ColorPickButton;
