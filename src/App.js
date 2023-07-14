// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
// import ColorPickButton from './components/elements/ColorPickButton/ColorPickButton';
// import PatternSelector, { pattern_types } from './app/PatternSelector/PatternSelector';
// import PatternDrawer from './app/PatternDrawer/PatternDrawer';
import UniversalPatternDrawer from './app/PatternDrawer/UniversalPatternDrawer';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Paper, Menu, MenuList, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Edit, ContentCopy, ContentPaste, Cloud, Settings, ArrowForwardIos, LibraryAdd } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AddJsonDialog from './components/elements/Dialog/AddJsonDialog';
import { GetLocalStorage, SaveLocalStorage } from './utils/LocalStorage';
import EditJsonDialog from './components/elements/Dialog/EditJsonDialog';
import { default_pattern } from './const/default_pattern';
function App() {
  // const [colors, setColor] = useState("#aabbcc");
  // const [pattern, setPattern] = useState('');
  // const selectedColorChanged = (event) => {
  //   console.log("selectedColorChanged ", event);
  //   setColor(event);
  // }
  // const selectedPatternChanged = (event) => {
  //   console.log("selectedPatternChanged ", event);
  //   setPattern(event);
  // }
  // useEffect(() => {
  //   setPattern(pattern_types.at(0).name);
  // }, [/* 任意の変数 */]);
  const [jsonSavedPattern, setJsonSavedPattern] = useState({});
  useEffect(() => {
    const key = 'SAVED_PATTERNS';
    const savedJsonStr = localStorage.getItem(key);
    if (!(savedJsonStr === null || savedJsonStr === undefined)) {
      const savedJson = JSON.parse(savedJsonStr);
      // console.log('App useEffect', savedJson);
      setJsonSavedPattern(savedJson);
    } else {
      // TODO SAVED_PATTERNSになにも保存されていない場合
      SaveLocalStorage(key, JSON.stringify(default_pattern));
    }
  }, []);

  // Menu
  // const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuClose(event) {
    setAnchorEl(null);
    // setAnchorEl(true);
  }
  function handleMenuClick(event) {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
    // setAnchorEl(false);
  }

  // 編集用ダイアログ
  const [isOpenAddJsonDialog, setIsOpenAddJsonDialog] = useState(false);
  const [isOpenEditJsonDialog, setIsOpenEditJsonDialog] = useState(false);
  function onClickAdd(event) {
    setIsOpenAddJsonDialog(true);
  }
  function onClickEdit(event) {
    setIsOpenEditJsonDialog(true);
  }
  function onClosedAddDialog(event) {
    // console.log('App onClosedDialog', event);
    setIsOpenAddJsonDialog(false);
    if (event?.reason !== 'OK') {
      return;
    }
    const val = event?.event?.value;
    if (val === undefined) {
      return;
    }
    const split = val.split('\n').join('');
    // console.log('App onClosedDialog', split);
    const json = JSON.parse(split);
    // console.log('App onClosedDialog', json);
    const keySAVED_PATTERNS = 'SAVED_PATTERNS';
    var SAVED_PATTERNS = GetLocalStorage(keySAVED_PATTERNS);
    if ((SAVED_PATTERNS === null || SAVED_PATTERNS === undefined)) {
      // まだ一度も保存されていない
      const jsons = [json];
      SaveLocalStorage(keySAVED_PATTERNS, JSON.stringify(jsons));
      setJsonSavedPattern(jsons);
    } else {
      // 既に保存されているものがあるのでそれに足す
      const pre_jsons = JSON.parse(SAVED_PATTERNS);
      // TODO 重複の管理
      pre_jsons.push(json);
      SaveLocalStorage(keySAVED_PATTERNS, JSON.stringify(pre_jsons));
      setJsonSavedPattern(pre_jsons);
    }
  }
  function onClosedEditDialog(event) {
    // console.log('App onClosedEditDialog', event);
    setIsOpenEditJsonDialog(false);
    if (event?.reason !== 'OK') {
      return;
    }
    // TODO 保存されているものの更新
    const val = event?.event?.value;
    if (val === undefined) {
      return;
    }
    const split = val.split('\n').join('');
    const json = JSON.parse(split);
    const keySAVED_PATTERNS = 'SAVED_PATTERNS';
    SaveLocalStorage(keySAVED_PATTERNS, JSON.stringify(json));
    setJsonSavedPattern(json);
  }

  return (
    <div className="App">

      {/* <ColorPickDialog onSelectedColorChanged={selectedColorChanged} /> */}
      {/* <ColorPickButton onSelectedColorChanged={selectedColorChanged} /> */}

      {/* <PatternSelector onSelectedPatternChanged={selectedPatternChanged} />
      <PatternDrawer selectedPattern={pattern} /> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}>
              <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <MenuList>
                  <MenuItem onClick={onClickAdd}>
                    <ListItemIcon>
                      <LibraryAdd fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new Pattern</ListItemText>
                    {/* <Typography variant="body2" color="text.secondary">
                      ⌘X
                    </Typography> */}
                  </MenuItem>
                  <MenuItem onClick={onClickEdit}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit Existing Pattern</ListItemText>
                    {/* <Typography variant="body2" color="text.secondary">
                      ⌘C
                    </Typography> */}
                  </MenuItem>
                  {/* <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      ⌘V
                    </Typography>
                  </MenuItem> */}
                  <Divider />
                  {/* <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Web Clipboard</ListItemText>
                  </MenuItem> */}
                  {/* <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Setting</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                      <ArrowForwardIos fontSize="small" />
                    </Typography>
                  </MenuItem> */}
                </MenuList>
              </Paper>

            </Menu>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      <UniversalPatternDrawer jsonPattern={jsonSavedPattern} />
      <AddJsonDialog isOpen={isOpenAddJsonDialog} onClosedDialog={onClosedAddDialog} />
      <EditJsonDialog isOpen={isOpenEditJsonDialog} onClosedDialog={onClosedEditDialog} />
    </div>
  );
}

export default App;
