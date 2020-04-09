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
      <a href="/#" onClick={(e) => e.preventDefault() || runCMD('menu.saveAs')}>打印</a>
    </AntdMenu.Item>
    <AntdMenu.Item key="1">
      <a href="/#" onClick={(e) => e.preventDefault() || runCMD('menu.save')}>保存</a>
    </AntdMenu.Item>
  </AntdMenu>
);
  return (
    <div className="menu">
      <Dropdown overlay={menu} trigger={['click']} overlayClassName="menu-file__overlay">
        <a href="/#" className="ant-dropdown-link o-menu-title" onClick={e => e.preventDefault()}>
          文件
        </a>
      </Dropdown>
      <a className="o-menu-title" href="https://www.moki-life.com">主页</a>
    </div>
  );
}

export default Menu;
