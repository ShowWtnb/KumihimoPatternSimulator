import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField, Select, Stack, Button, Grid } from '@mui/material';

const ColorPickButton = ({ onSelectedColorChanged, initColor, id, recentColors }) => {
    // const [open, setOpen] = useState(false);

    // // ダイアログを開く
    // const handleClickOpen = () => {
    //     // キャンセル用に現在の色を保存しておく
    //     setPreColor(color);
    //     setColorStr(color);
    //     setOpen(true);
    // };

    // // ダイアログが閉じられ用とするときのイベント
    // const handleClose = (event, reason) => {
    //     // console.log(event, reason);
    //     if (reason !== 'backdropClick') {
    //         setOpen(false);
    //     } else {
    //         // console.log("backdropClick", event);
    //         // ダイアログ外がクリックされた場合
    //         handleCancel(event, reason);
    //     }
    // };
    // // キャンセルボタンが押された
    // const handleCancel = (event, reason) => {
    //     // キャンセルされたら元の色に戻す
    //     setColorStr(preColor);
    //     setColor(preColor);
    //     // 閉じる
    //     setOpen(false);
    // };
    // OKボタンが押された
    const handleOk = (event, reason) => {
        // 色が変更されたイベントを返す
        onSelectedColorChanged({ color, id });
        // // 閉じる
        // setOpen(false);
    };

    const [color, setColor] = useState("#aabbcc");
    const [colorStr, setColorStr] = useState("#aabbcc");
    // const [preColor, setPreColor] = useState("#aabbcc");

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
        // console.log("onTextFieldChange", str);
        setColorStr(str);
        // textの入力が色のフォーマット#XXXXXXならsetColorしたい
        const abcPattern = /^#[0-9a-f]{6}/gi;
        const matched = str.match(abcPattern);
        if (matched) {
            // console.log("matched", str);
            setColorStr(str);
            setColor(str);
            // handleOk();
        } else {
            // console.log("not matched", str);
        }
    }
    function onHexColorPickerChange(event) {
        // setColor(event);
        // onSelectedColorChanged(event);
        setColorStr(event);
        setColor(event);
        // handleOk();
    }
    function onSelectOpen(event) {
        // console.log("onSelectOpen", color, event);
        // setColorStr(color);
    }
    function onRecentColorSelected(event) {
        // console.log("onRecentColorSelected event", event);
        // console.log("onRecentColorSelected event.target.id", event.target.id);
        var c = event.target.id
        setColorStr(c);
        setColor(c);
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
                onOpen={onSelectOpen}
                onClose={handleOk}
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
                                        recentColors.map((color) => (
                                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }} >
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
                <TextField label='#RRGGBB' defaultValue={colorStr} value={color} onChange={onTextFieldChange}></TextField>
            </Select>
        </div>
    );
}

export default ColorPickButton;
