import { getTranslation } from '@js_dir/utils/translations';
import { getPageUrlByLocale, getParamFromURL } from '@js_dir/utils/urlUtils'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, {useState, useEffect, useRef} from 'preact/compat'
import { connect } from 'react-redux';

function FormSearch({ translationStrings }) {
    const router = useRouter();
    const [keyword, setKeyWord] = useState('');
    const searchRef = useRef(null);
    useEffect(() => {
        const s = getParamFromURL("s") || router.query.s || '';
        searchRef.current.value = s;
        setKeyWord(s);
   }, [,router.locale,translationStrings, router.query.s]);
   const handleSubmit = (e) => {
        e.preventDefault();
        const s = searchRef.current.value;
        const url = getPageUrlByLocale("search", router.locale) + `?s=${s}`;
        router.push(url);
   }
  return (
    <form method="get" 
            autoComplete="Off"
            onSubmit={handleSubmit}>
        <input type="text" 
                name="s" 
                className="s" 
                ref={searchRef}
                placeholder={getTranslation(translationStrings, "search_label")} value={keyword} />
        <button><Image src="/static/images/search-sidebar-news.svg" width={19} height={19} layout="fixed" /></button>
    </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);