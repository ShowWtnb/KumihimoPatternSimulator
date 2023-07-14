import { HexColorPicker } from "react-colorful";
import { useState } from 'react';
import { TextField, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

const ColorPickDialog = ({ onSelectedColorChanged }) => {
    const [open, setOpen] = useState(false);

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
    };
    // OKボタンが押された
    const handleOk = (event, reason) => {
        // 色が変更されたイベントを返す
        onSelectedColorChanged(color);
        // 閉じる
        setOpen(false);
    };

    const [color, setColor] = useState("#aabbcc");
    const [colorStr, setColorStr] = useState("#aabbcc");
    const [preColor, setPreColor] = useState("#aabbcc");
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
    return (
        <div >
            <Button onClick={handleClickOpen}
                sx={{
                    bgcolor: color,
                    width: '5rem',
                    height: '5rem',
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
                }}></Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Color</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <HexColorPicker color={color} onChange={onHexColorPickerChange} />
                        </FormControl>
                    </Box>
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
