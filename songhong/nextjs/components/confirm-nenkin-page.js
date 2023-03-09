import { getParamFromURL } from '@js_dir/utils/urlUtils';
import { ConfirmNenkinHoso } from '@lib/mutations/confirm-nenkin-hoso';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { Circles } from 'react-loader-spinner';

export default function ConfirmNenkinPg({ pageContext }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const handleConfirmTodo = async () => {
        setLoading(true);
        const key = getParamFromURL("key");
        const token = getParamFromURL("token");
        if ( !key || !token ) {
            router.push('/', '/');
            return;
        }
        const results = await ConfirmNenkinHoso(key, token);
        if ( !results || !results.confirmNenkinMoney ) {
            return false;
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    useEffect(() => {
        handleConfirmTodo();
    }, [,router.asPath,router.locale]);
    useEffect(() => {
        if ( !loading ) {
           router.push('/', '/');
        }
    }, [loading]);
  return (
    <>
        <div className="grid-loading" style={{ marginTop: 50 }}><Circles color="#3B7CBE" height={80} width={80} /></div>
    </>
  )
}
