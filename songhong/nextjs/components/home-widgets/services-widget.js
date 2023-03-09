import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import Link from 'next/link';
import React from 'preact/compat'
import { connect } from 'react-redux';
function ServiceItemTemplate({ data, translationStrings }) {
    const {id, title, url, thumbnail} = data;
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="items-sevice__mains">
                <div className="img-sevice__mains mb-25s">
                    <Link href={url} >
                        <a><Image src={thumbnail} layout="fill" objectFit="cover" /></a>
                    </Link>
                </div>
                <div className="intros-sevice__mains">
                    <h3>
                        <Link href={url}>
                            <a className="fs-18s mb-25s titles-bold__alls names-sevice__mains">
                                {title}
                            </a>
                        </Link>
                    </h3>
                    <Link href={url}>
                        <a className="btn-greys__alls">{getTranslation(translationStrings, "chitiet_label")}</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
function ServicesWidget({ data, translationStrings }) {
  return (
    <section className="box-before__mains sevice-mains">
        <div className="container">
            <div className="first-box__befores mb-70s">
                <h2 className="titles-box__befores fs-44s titles-transform__alls titles-bold__alls">
                    {getTranslation(translationStrings, "dichvu_label")}
                </h2>
                <div className="infos-first__befores">
                    <p>
                        {getTranslation(translationStrings, "luuyneubancancatien_label")} <span className="color-blues__2">
                        {getTranslation(translationStrings, "nenkinvahoanthues_label")} </span> 
                        <br />
                        {getTranslation(translationStrings, "hayvaomuc_label")} <span className="color-blues__2"> 
                            {getTranslation(translationStrings, "dichvunenkin_label")}
                        </span>
                    </p>
                </div>
            </div>
            <div className="list-sevice__mains">
                <div className="row">
                   {data.map(item => <ServiceItemTemplate key={item.id} data = {item} translationStrings = {translationStrings} />)}
                </div>
            </div>
        </div>
    </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(ServicesWidget);
