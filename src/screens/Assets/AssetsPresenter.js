import React from 'react';
import _ from 'lodash';
import './Assets.css';
import { Header } from '../';
import { Menu, Table, SubMenu, Icon } from 'antd';
import AssetCategories from 'constants/assetCategories';

const AssetsPresenter = (props) => {
  const {
    selectCategory,
    selectedCategory,
    subcategories,
    loading,
    columns,
    surveyList,
  } = props;
  return (
    <div className='assets-wrapper'>
      <Header title='Assets'/>
      <div className='assets-content'>
        <div className='category-wrapper'>
          <div className='asset-categories'>
            <h3>Categories</h3>
            <Menu
              onClick={menuData => selectCategory(menuData)}
            >
              {_.map(AssetCategories, (ac, i) => (
                <Menu.Item key={i}>
                  <b>{ac.formattedName}</b>
                </Menu.Item>
              ))}
            </Menu>
          </div>
          <div className='asset-subcategories'>
            <Table 
              size="middle"
              dataSource={surveyList}
              {...{ loading, columns }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsPresenter;
