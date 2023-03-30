import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField, Select } from '@mui/material';

const ColorPickButton = ({ onSelectedColorChanged, initColor, id }) => {
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
                <TextField label='#RRGGBB' defaultValue={colorStr} value={color} onChange={onTextFieldChange}></TextField>
            </Select>
        </div>
    );
}

export default ColorPickButton;
