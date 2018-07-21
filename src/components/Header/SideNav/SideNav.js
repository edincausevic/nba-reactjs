import React from 'react';
import SideNav from 'react-simple-sidenav';

// components
import SideNavItems from './SideNavItems';

const SideNavigation = (props) => {
  return (
    <div>
      <SideNav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          background: '#242424',
          maxWidth: '220px'
        }}
      >
        <SideNavItems {...props}/>
      </SideNav>
    </div>
  );
};

export default SideNavigation;