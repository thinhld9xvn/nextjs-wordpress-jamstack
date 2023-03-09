import React from 'preact/compat'
import Email from './templates/email';
import Hotline from './templates/hotline';
import Logo from './templates/logo';
import Search from './templates/search';

export default function CenterHeader({ data }) {
    const {logo, hotline, email} = data;
  return (
    <>
        <div className="center-headers">
            <div className="container">
                <Logo data = {logo} />
                <div className="all-center__headers">
                    <div className="intros-center__headers">
                        <Hotline data = {hotline} />
                        <Email data = {email} />
                    </div>                    
                    <Search />
                </div>
            </div>
        </div>
        
    </>
  )
}
