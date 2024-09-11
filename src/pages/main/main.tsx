import { Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AreaChartOutlined, BarChartOutlined, BugOutlined } from '@ant-design/icons';
import './main.scss'
const Main: FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    navigate(`/${e.key}`);
  };

  return (
    <div style={{ display: 'flex', height: '90vh' }} className='font-mono'>
      <Menu
        onClick={handleClick}
        style={{ width: '18%' }}
        defaultSelectedKeys={['data']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <AreaChartOutlined />
              <span>软件缺陷预测</span>
            </span>
          }
        >
          <Menu.Item key="data">
            <span>
              <BarChartOutlined />
            </span>
            数据训练
          </Menu.Item>
          <Menu.Item key="code">
            <span> 
              <BugOutlined />
            </span>
            代码测试
          </Menu.Item>
        </SubMenu>
      </Menu>
      <div style={{ width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;