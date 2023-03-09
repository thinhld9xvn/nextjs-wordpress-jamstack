import FormSearch from '@components/templates/form-search';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'preact/compat'
import { connect } from 'react-redux';

function Search() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    useEffect(() => {
        router.events.on("routeChangeComplete", function() {
            setShow(false);
        });
    }, []);
    const handleToggleSearchBar = (e) => {
        e.preventDefault();
        setShow(!show);
    }   
  return (
    <>
        <div className="search-headers">
            <p className="btn-search__headers" onClick={handleToggleSearchBar}>
                <Image src="/static/images/search-headers.svg"  width={17} height={17} layout="fixed" />
            </p>
        </div>
        <section className={"search-headers__mains ".concat(show ? 'show' : '')}>
            <div className="container">
                <p className="close-headers__searchs" onClick={handleToggleSearchBar}>
                    <Image src="/static/images/clear-images-changes.svg" width={14} height={14} layout="fixed" />
                </p>
                <div className="form-search__headers">
                    <FormSearch />
                </div>
            </div>
        </section>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);
