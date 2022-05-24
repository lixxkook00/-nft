import React from 'react'
import './SideBarMarketplace.scss'

import {Link} from 'react-router-dom'

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

export default function SideBartMarketplace() {
  return (
    <div className="marketplace-sidebar">
        <Link to={"/"} className="marketplace-sidebar-logo centering">
            <img src="/images/Artboard 402.png" alt="" />
        </Link>

        <div className="marketplace-sidebar-main">
            <ProSidebar>
                <Menu iconShape="square">
                    {/* <MenuItem >Dashboard</MenuItem> */}
                    <SubMenu title="Rarity" >
                        <MenuItem>Common</MenuItem>
                        <MenuItem>Rare</MenuItem>
                        <MenuItem>Extremely Rare</MenuItem>
                    </SubMenu>
                    <SubMenu title="Prize" >
                        <MenuItem>High to low</MenuItem>
                        <MenuItem>Low to high</MenuItem>
                    </SubMenu>
                    <MenuItem>Continents</MenuItem>
                    <MenuItem>Recently Listed</MenuItem>
                    <SubMenu title="Sale Types" >
                        <MenuItem>Fixed Price</MenuItem>
                        <MenuItem>Auction</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
        </div>

    </div>
  )
}
