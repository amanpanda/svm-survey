import React from 'react';
import _ from 'lodash';
import './SideBar.css';
import { AppRouteInfo } from 'constants/navigation';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const SideBarPresenter = (props) => {
  const { 
    onLogOut,
    currPath,
  } = props;
  return (
    <div className='sidebar-container'>
      <div className='side-bar-top'>
        {_.map(AppRouteInfo, (route, i) => {
          const routeClass = 'route-name ' + (currPath === route.path ? 'selected' : '')
          return (
            <div key={i} className='link-wrapper'>
              <Link 
                to={route.path}
                className={'sidebar-link'}
              >
                <div>
                  <h3 className={routeClass}>
                    {route.name}
                  </h3>
                  <p className='route-description'>
                    {route.description}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      <div className='side-bar-bottom'>
        <Button 
          block 
          ghost
          onClick={onLogOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default SideBarPresenter;
