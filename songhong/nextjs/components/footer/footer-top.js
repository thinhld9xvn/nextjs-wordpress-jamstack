import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import React from 'preact/compat'
import { connect } from 'react-redux';

function FooterTop({ data, translationStrings }) {
    const {company_name, company_address, hotline, email, fanpage, footer_thongtin_menu_html, footer_dichvu_menu_html} = data;
    const {hotline_vietnam, hotline_nhatban} = hotline;
  return (
    <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="box-footers">
                <h3 className="title-footers fs-14s mb-25s titles-bold__alls titles-transform__alls">
                    {company_name}
                </h3>
                <ul className="list-intros__footers">
                    <li>
                        <div className="items-center__headers">
                            <Image src="/static/images/center-header-1.png" width={40} height={40} layout="fixed" />
                            <div className="intros-items__headers">
                                <p className="fs-13s color-greys">{getTranslation(translationStrings, "hotline_vn_label")}</p>
                                <p><a href={hotline_vietnam.phone_url} className="fs-17s titles-bold__alls">{hotline_vietnam.phone_label}</a></p>
                            </div>
                        </div>
                        <div className="items-center__headers">
                            <div className="intros-items__headers">
                                <p className="fs-13s color-greys">{getTranslation(translationStrings, "hotline_jp_label")}</p>
                                <p><a href={hotline_nhatban.phone_url} className="fs-17s titles-bold__alls">{hotline_nhatban.phone_label}</a></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="intros-items__headers">
                            <p className="fs-13s color-greys mb-5s">{getTranslation(translationStrings, "email_label")}</p>
                            <p><a href={`mailto:${email}`} className="fs-16s titles-bold__alls">{email}</a></p>
                        </div>
                    </li>
                    <li>
                        <div className="intros-items__headers">
                            <p className="fs-13s color-greys mb-5s">{getTranslation(translationStrings, "address_label")}</p>
                            <p>{company_address}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6 col-6">
            <div className="box-footers">
                <h3 className="title-footers fs-14s mb-25s titles-bold__alls titles-transform__alls">
                    {getTranslation(translationStrings, "info_label")}
                </h3>
                <div dangerouslySetInnerHTML={{
                    __html: footer_thongtin_menu_html
                }}></div>
            </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6 col-6">
            <div className="box-footers">
                <h3 className="title-footers fs-14s mb-25s titles-bold__alls titles-transform__alls">
                    {getTranslation(translationStrings, "dichvu_label")}
                </h3>
                <div dangerouslySetInnerHTML={{
                    __html: footer_dichvu_menu_html
                }}></div>
            </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="box-footers mb-30s">
                <h3 className="title-footers fs-14s mb-25s titles-bold__alls titles-transform__alls">                    
                    {getTranslation(translationStrings, "dangkyemaildenhanuudai_label")}
                </h3>
                <div className="search-footers">
                    <form>
                        <input type="text" placeholder="Email" />
                        <button><Image src="/static/images/arrow-search-footers.svg" width={16} height={11} layout="fixed" /></button>
                    </form>
                </div>
            </div>
            <div className="box-footers">
                <h3 className="title-footers fs-14s mb-25s titles-bold__alls titles-transform__alls">
                    {getTranslation(translationStrings, "fanpage_label")}
                </h3>
                <div className="facebook-footers">
                    <div className="fb-page" 
                        data-href={fanpage}
                        data-width="380" 
                        data-hide-cover="false"
                        data-show-facepile="false"></div>
                </div>
            </div>
        </div>
    </div>
  )
}
function mapStateToProps(state) {   
    return { 
        translationStrings : state.globalReducer.translationStrings
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FooterTop);
