
export function AppDynHeader() {
  const board = useSelector((storeState) => storeState.boardModule.curBoard);
  const user = useSelector((storeState) => storeState.userModule.user);

  const [avgColorBg, setAvgColorBg] = useState("#FFFFFF");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    async function setColorAsync() {
      const avgColor = await getBoardAvgColor(board);
      setAvgColorBg(avgColor);
    }
    setColorAsync();
  }, [board]);

  async function getBoardAvgColor(board) {
    if (board?.style?.backgroundImage) {
      const imgPath = board.style.backgroundImage;
      const cleanImgUrl = utilService.getCleanURL(imgPath);
      return utilService.getImgAvgColor(cleanImgUrl);
    } else if (board?.style?.backgroundColor) {
      const bgColor = board.style.backgroundColor;
      return new Promise((resolve, reject) => resolve(bgColor));
    } else {
      return new Promise((resolve, reject) => resolve("#FFFFFF"));
    }
  }


  const isDarkBgColor = utilService.isDarkColor(avgColorBg, 80)

  const headerStyleProps = {}
  headerStyleProps.backgroundColor = avgColorBg
  headerStyleProps.color = isDarkBgColor ? "#FFFFFF" : "#172b4d";


  return <div style={headerStyleProps} className="app-header-container">
    <div className="app-header-content">
      ...
    </div>
  </div>
}








function isDarkColor(hexColor, midVal = 50) {
  const rgbColor = _hexToRgb(hexColor);

  let vR = rgbColor.r / 255;
  let vG = rgbColor.g / 255;
  let vB = rgbColor.b / 255;

  // Step 2
  vR = _sRGBtoLin(vR);
  vG = _sRGBtoLin(vG);
  vB = _sRGBtoLin(vB);

  // Step 3
  const Y = 0.2126 * vR + 0.7152 * vG + 0.0722 * vB;

  // Step 4
  const Lstar = _YtoLstar(Y);

  if (Lstar < midVal) {
    return true;
  }
  return false;
}

function _hexToRgb(hex) {
  hex = hex.toLowerCase();
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

function _sRGBtoLin(colorChannel) {
  // Send this function a decimal sRGB gamma encoded color value
  // between 0.0 and 1.0, and it returns a linearized value.
  if (colorChannel <= 0.04045) {
    return colorChannel / 12.92;
  } else {
    return Math.pow((colorChannel + 0.055) / 1.055, 2.4);
  }
}

function _YtoLstar(Y) {
  // Send this function a luminance value between 0.0 and 1.0,
  // and it returns L* which is "perceptual lightness"
  if (Y <= 216 / 24389) {
    // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
    return Y * (24389 / 27); // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
  } else {
    return Math.pow(Y, 1 / 3) * 116 - 16;
  }
}


































function handleAccountClick(ev) {
  dispatch(openModal("accountMenu", ev.target));
}

function openModalDropdown(ev) {
  dispatch(openModal("BoardsDropdown", ev.target));
}

function openModalDropdownStarred(ev) {
  dispatch(openModal("BoardsDropdown", ev.target, "starred"));
}

function openModalCreateBoard(ev) {
  dispatch(openModal("createBoard", ev.target))
}
