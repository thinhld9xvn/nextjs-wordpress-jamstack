import ConfirmNenkinPg from '@components/confirm-nenkin-page';
import { LANGUAGES, PAGES } from '@constants/constants'
import React from 'preact/compat'

export default function ConfirmNenkinPage({ pageContext }) {
  return (
    <ConfirmNenkinPg pageContext = {pageContext} />
  )
}

export async function getStaticProps(context) {
  const {params} = context;
  const {slug} = params;
  const {locale} = context;  
  return {
    props : {
      pageContext : {
      }
    },
    revalidate : 60
  }
}

export async function getStaticPaths() {
  const travsel = (objects, locale = LANGUAGES.vi) => {
    return objects.map(e => {        
      return {
        params: {
          slug: e[locale]
        },
        locale
      }
    })
  }
  const pagesObjectList = [PAGES.XAC_NHAN_NENKINS_L2];
  const pagesListPaths = travsel(pagesObjectList, LANGUAGES.vi).concat(travsel(pagesObjectList, LANGUAGES.ja));
  return {
    paths: [...pagesListPaths],
    fallback: 'blocking',
  }
}