import TinTucSingle from '@components/tintuc-single';
import PageDefaultPg from '@components/page-default';
import { LANGUAGES, SLUG_TYPE } from '@constants/constants';
import { getPageContextProps, getPostContextProps, getTypeSlug } from '@js_dir/utils/middlewareProps';
import { getArticlesPathsList } from '@lib/getArticlesPathsListApi';
import React from 'preact/compat'
export default function MiddleWareRouter({ pageContext }) {
  const {type} = pageContext;
    return (
        <>
          {type === SLUG_TYPE.POST ? (
            <TinTucSingle pageContext={pageContext} />
          ) : null}
          {type === SLUG_TYPE.PAGE ? (
            <PageDefaultPg pageContext={pageContext} />
          ) : null}
        </>
    )
}

export async function getStaticProps(context) { 
    const {params} = context;
    const {slug} = params;
    const {locale} = context;
    const typeSlugObj = await getTypeSlug(slug, locale);
    if ( typeSlugObj === SLUG_TYPE.POST ) {
      return await getPostContextProps(slug, locale);
    }
    if ( typeSlugObj === SLUG_TYPE.PAGE ) {
      return await getPageContextProps(slug, locale);
    }
    return {
      notFound: true
    };
}

export async function getStaticPaths() {
    const travsel = (paths, locale) => {
      return paths.map(e => {        
        return {
          params: {
            slug: e.slug
          },
          locale
        }
      })
    }
    /*const {getTaxonomiesList : taxPathsVi} = await getTaxPathsList(LANGUAGES.vi, process.env.NEWS_TAX);
    const {getTaxonomiesList : taxPathsJa} = await getTaxPathsList(LANGUAGES.ja, process.env.NEWS_TAX);*/
    //
    const {articlesPathList : postsPathVi} = await getArticlesPathsList(process.env.NEWS_POST_TYPE, LANGUAGES.vi);
    const {articlesPathList : postsPathJa} = await getArticlesPathsList(process.env.NEWS_POST_TYPE, LANGUAGES.ja);
    //
    const {articlesPathList : pagesPathVi} = await getArticlesPathsList(process.env.PAGES_POST_TYPE, LANGUAGES.vi);
    const {articlesPathList : pagesPathJa} = await getArticlesPathsList(process.env.PAGES_POST_TYPE, LANGUAGES.ja);
    //
    const pathListsTravsel = travsel(postsPathVi, LANGUAGES.vi).concat(travsel(postsPathJa, LANGUAGES.ja),
                                                                        travsel(pagesPathVi, LANGUAGES.vi),
                                                                        travsel(pagesPathJa, LANGUAGES.ja));
    return {
      paths : [...pathListsTravsel],
      fallback: 'blocking',
    }
  }
