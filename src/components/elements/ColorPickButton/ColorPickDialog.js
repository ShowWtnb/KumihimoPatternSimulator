import { HexColorPicker } from "react-colorful";
import { useState } from 'react';
import { TextField, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useEffect } from "react";

const ColorPickDialog = ({ isOpen, defaultColor, onSelectedColorChanged }) => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#aabbcc");
    const [colorStr, setColorStr] = useState("#aabbcc");
    const [preColor, setPreColor] = useState("#aabbcc");
    const [recentColors, setRecentColors] = useState([]);
    const [recentColorsMax, setRecentColorsMax] = useState(9);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])
    useEffect(() => {
        console.log('ColorPickDialog', defaultColor);
        setColor(defaultColor);
    }, [defaultColor])

    // ダイアログを開く
    const handleClickOpen = () => {
        // キャンセル用に現在の色を保存しておく
        setPreColor(color);
        setColorStr(color);
        setOpen(true);
    };

    // ダイアログが閉じられ用とするときのイベント
    const handleClose = (event, reason) => {
        // console.log(event, reason);
        if (reason !== 'backdropClick') {
            setOpen(false);
        } else {
            // console.log("backdropClick", event);
            // ダイアログ外がクリックされた場合
            handleCancel(event, reason);
        }
    };
    // キャンセルボタンが押された
    const handleCancel = (event, reason) => {
        // キャンセルされたら元の色に戻す
        setColorStr(preColor);
        setColor(preColor);
        // 閉じる
        setOpen(false);
        onSelectedColorChanged({ 'canceled': true });
    };
    // OKボタンが押された
    const handleOk = (event, reason) => {
        // 色が変更されたイベントを返す
        onSelectedColorChanged({ 'canceled': false, 'selected': color });
        if (!recentColors.includes(color)) {
            setRecentColors([color, ...recentColors]);
            if (recentColors.length > recentColorsMax) {
                setRecentColors(recentColors.slice(0, recentColorsMax));
            }
        }
        // 閉じる
        setOpen(false);
    };

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
        } else {
            // console.log("not matched", str);
        }
    }
    function onHexColorPickerChange(event) {
        // setColor(event);
        // onSelectedColorChanged(event);
        setColorStr(event);
        setColor(event);
    }
    function onRecentColorSelected(event) {
        var c = event.target.id
        console.log("onRecentColorSelected event.target.id", c);
        // setColorStr(c);
        setColor(c);

        // 色が変更されたイベントを返す
        // onSelectedColorChanged({ color: c, id: id });
    }
    return (
        <div >
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Color</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                    <TextField label='#RRGGBB' value={colorStr} onChange={onTextFieldChange}></TextField>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleCancel}>Cancel</Button> */}
                    <Button onClick={handleOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ColorPickDialog;
