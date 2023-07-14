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

const AddJsonDialog = ({ isOpen, onClosedDialog }) => {
    const [open, setOpen] = useState(false);
    const [closingEvent, setClosingEvent] = useState({});
    const [textValue, setTextValue] = useState('');

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    useEffect(() => {
        if (open) {
            setTextValue('');
        } else {
            // console.log('AddJsonDialog onClosing', closingEvent);
            if (onClosedDialog !== undefined) {
                onClosedDialog(closingEvent);
            }
        }
    }, [open])

    // ダイアログを開く
    const onClosed = () => {

    };

    // ダイアログが閉じられ用とするときのイベント
    const handleClose = (event, reason) => {
        // // console.log(event, reason);
        // if (reason !== 'backdropClick') {
        //     setOpen(false);
        // } else {
        //     handleCancel(event, reason);
        // }        
        setOpen(false);
    };
    // // キャンセルボタンが押された
    // const handleCancel = (event, reason) => {
    //     // 閉じる
    //     setOpen(false);
    //     onSelectedColorChanged({ 'canceled': true });
    // };
    // OKボタンが押された
    const handleOk = (event, reason) => {
        setClosingEvent({ 'reason': 'OK', 'event': { 'value': textValue } })
        // 閉じる
        setOpen(false);
    };
    const textValueChanged = (event) => {
        setTextValue(event.target.value);
    }
    return (
        <div >
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Add new Pattern</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            {/* <HexColorPicker color={color} onChange={onHexColorPickerChange} /> */}
                            <TextField multiline label='JSON' value={textValue} onChange={textValueChanged}></TextField>

                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddJsonDialog;
