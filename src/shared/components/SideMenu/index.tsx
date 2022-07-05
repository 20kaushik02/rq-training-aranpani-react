import { Col, Divider, Menu, Row } from "antd";
import React, { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidemenu } from "./data";
import "./sideMenu.scss";
import UserService from "../../../services/AuthService/auth.service";
import { AuthContext } from "../../../context/AuthContext";

const SideMenu = () => {
  const { authenticated, user } = AuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const { logoutUser } = UserService();

  const [showInfo, setShowInfo] = useState(false);

  const [pathname, setPathname] = useState<string>(location.pathname);

  const menuHeaderItem = {
    label: <h1>Aran Pani</h1>,
    disabled: true,
    key: '0',
    className: 'heading',
    onClick: () => { }
  }

  const menuItems = sidemenu.map((item) => {
    return {
      label: <span>{item.label}</span>,
      icon: <i className={item.icon} />,
      disabled: item.disabled,
      key: item.path,
      className: `${location.pathname.includes(item.path) ? "ant-menu-item-selected" : ""} ${item.disabled && 'disable'}`,
      onClick: () => handleRedirect(item.path)
    }
  });

  const menuChildren = [menuHeaderItem].concat(menuItems);

  const handleRedirect = (path: string) => {
    navigate(path);
  }
  
  useEffect(() => {
    setPathname(location?.pathname);
  }, [location]);

  const UserInfo = (
    <div className={`user-info ${showInfo ? "fade-in" : "fade-out"}`}>
      <Row>
        <Col span={4} className="user-wrapper">
          <i className="icon-my-account" />
        </Col>
        <Col span={2} />
        <Col span={18}>
          <p className="name">{user?.username}</p>
        </Col>
      </Row>
      <Divider />
      <Row className="mb-5">
        <Col span={4} className="user-wrapper">
          <i className="icon-change-password" />
        </Col>
        <Col span={2} />
        <Col span={18}>
          <p className="name">Change</p>
          <p className="name">&nbsp;password</p>
        </Col>
      </Row>
      <Row onClick={logoutUser} className="user-menu">
        <Col span={4} className="user-wrapper">
          <i className="icon-logout" />
        </Col>
        <Col span={2} />
        <Col span={18}>
          <p className="name">Logout</p>
        </Col>
      </Row>
    </div>
  );

  const handleShowInfo = () => {
    setShowInfo(show => !show);
  }

  return (
    <div className="sidemenu__container">
      {authenticated ?
        <Menu
          mode="inline"
          className="side-menu"
        >
          <Menu className="side-menu__main"
            defaultSelectedKeys={["/projects"]}
            selectedKeys={[pathname]}
            items={menuChildren}
          />
          <Menu className="side-menu__user">
            {showInfo && UserInfo}
            <Row className="user-card cursor-pointer" onClick={handleShowInfo}>
              <Col span={4} className="user-wrapper">
                <i className="icon-profile-placeholder" />
              </Col>
              <Col span={2} />
              <Col span={14}>
                <p className="name">{user?.username}</p>
              </Col>
              <Col span={2} className={`${showInfo ? "deg-180" : "deg-0"}`}>
                <i className="icon-down" />
              </Col>
            </Row>
          </Menu>
        </Menu> : <></>
      }
    </div>
  );
};

export default SideMenu;