import React from "react";
import AntdMenu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/dropdown/style/index.css';

function runCMD(eventId){
  setTimeout(() => {
    window.postMessage({
      id:eventId
    });
  }, 500);
}

function Menu(props) {
  const menu = (
  <AntdMenu>
    <AntdMenu.Item key="0">
      <a href="/#" onClick={(e) => e.preventDefault() || runCMD('menu.saveAs')}>Print</a>
    </AntdMenu.Item>
    <AntdMenu.Item key="1">
      <a href="/#" onClick={(e) => e.preventDefault() || runCMD('menu.save')}>Save</a>
    </AntdMenu.Item>
  </AntdMenu>
);
  return (
    <div className="menu">
      <a className="o-menu-title" href="https://www.moki-life.com">Home</a>
      <Dropdown overlay={menu} trigger={['click']} overlayClassName="menu-file__overlay">
        <a href="/#" className="ant-dropdown-link o-menu-title" onClick={e => e.preventDefault()}>
          File
        </a>
      </Dropdown>
    </div>
  );
}

export default Menu;
