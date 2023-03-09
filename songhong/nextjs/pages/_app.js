import React, {useEffect, useState} from 'preact/compat'
import { wrapper } from "@redux/store"
import NProgress from 'nprogress'
import Router, {useRouter} from 'next/router'
//
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
//
import '@css_dir/animate.css';
import '@css_dir/font-awesome.css';
import '@css_dir/bootstrap.min.css';
import '@css_dir/swiper.min.css';
import '@css_dir/select-2.css';
import '@css_dir/main.css';
import '@css_dir/reset.css';
import '@css_dir/gioithieu.css';
import '@css_dir/banggia.css';
import '@css_dir/cauhoithuonggap.css';
import '@css_dir/lienhe.css';
import '@css_dir/tintuc.css';
import '@css_dir/taikhoan.css';
import '@css_dir/form-chi-tiet.css';
import '@css_dir/accountpass.css';
import '@css_dir/responsive.css';
//
import 'nprogress/nprogress.css'; //styles of nprogress
import 'toastr/build/toastr.min.css';
import Header from '@components/header';
import Footer from '@components/footer';
import { SessionProvider, getProviders } from "next-auth/react"
Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
})
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, providers, pageProps }) {
  const router = useRouter();
  const authSession = typeof(session) === 'undefined' ? undefined : session;
  const myPageProps = {providers, session : authSession, ...pageProps};  
  return (
    <>
      <SessionProvider session={authSession}>
        <div id="wrapper" className="wrapper">
          <Header />
          <Component {...myPageProps} />   
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}
MyApp.getInitialProps = async (ctx) => {
  const providers = await getProviders();
  return { providers }
}
export default wrapper.withRedux(MyApp)
