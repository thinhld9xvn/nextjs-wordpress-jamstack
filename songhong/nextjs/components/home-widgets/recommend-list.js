import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { connect } from 'react-redux'

function RecommendList({ data, translationStrings }) {
    const router = useRouter();
  const [show, setShow] = useState(false);
  const setHidePopupSlide = (e) => {
    e.preventDefault();
    setShow(false);
  }
  useEffect(() => {
    setTimeout(() => {
        setShow(true);
    }, 1000);
  }, [,router.locale,router.asPath]);
  return (
    <div id="popup-slide__mains" className={"popup-slide__mains ".concat(show ? 'active-popup__slides' : '')}>
        <p className="titles-bold__alls fs-15s">{getTranslation(translationStrings, "cothebanquantam_label")}</p>
        <ul>
            {data.map(item => (
                <li key = {item}>
                    <Link href={item.url}>{item.title}</Link>
                </li>
            ))}
        </ul>
        <span className="close-popup__slide" onClick={setHidePopupSlide}>
            <Image src="/static/images/clear-modals-alls.png" width={16} height={16} layout="fixed" />
        </span>
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
export default connect(mapStateToProps, mapDispatchToProps)(RecommendList);
