import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { openModal } from "../store/actions/app.actions";
import { UserAvatar } from "./UserAvatar";
import { useLocation } from "react-router-dom";

export function AppDynHeader() {
  const board = useSelector((storeState) => storeState.boardModule.curBoard);
  const user = useSelector((storeState) => storeState.userModule.user);

  const [avgColorBg, setAvgColorBg] = useState("#FFFFFF");

  const dispatch = useDispatch();
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


  const isDarkBgColor = (pathname !== "/board") && utilService.isDarkColor(avgColorBg, 80)

  const headerStyleProps = {}
  if (pathname !== "/board") {
    headerStyleProps.backgroundColor = avgColorBg
    headerStyleProps.color = isDarkBgColor ? "#FFFFFF" : "#172b4d";
  }


  return (
    <div style={headerStyleProps} className="app-header-container">
      <div className="app-header-content">
        <Link className="app-header-logo-link transparent-btn-black" to="/">
          <div className={"app-header-logo-container" + (isDarkBgColor ? "-white" : "")}></div>
        </Link>

        <div onClick={openModalDropdown} className="header-dropdown transparent-btn-black" title="All Boards">
          All boards
          <i className={"icon-show-more" + (isDarkBgColor ? "" : "-dark")}></i>
        </div>

        <div onClick={openModalDropdownStarred} className="header-dropdown transparent-btn-black" title="Starred Boards">
          Starred boards
          <i className={"icon-show-more" + (isDarkBgColor ? "" : "-dark")}></i>
        </div>

        <div className="create-button-container">
          <div onClick={openModalCreateBoard} className="header-create-button transparent-btn-black " to="" title="Create">
            Create
          </div>
        </div>

        <div className="app-header-avatar" onClick={handleAccountClick}>
          <UserAvatar userFullName={user?.fullname} userImg={user?.imgUrl} />
        </div>
      </div>
    </div>
  );
}
