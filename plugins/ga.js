/* eslint-disable */
import Cookies from 'js-cookie'

// const gtmKey = 'GTM-TBSDKBH' // <- insert your GTM key here

export default () => {
  /*
  ** Only run on client-side and only in production mode
  */
  // if (process.env.environment !== 'prod') return
  /*
  ** Only run if it's not prevented by user
  */
  // if (Cookies.get('disable-gtm')) return
  /*
  ** Include Google Tag Manager OPTIMIZE
  */
  // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  //   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  //   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  // })(window,document,'script','https://www.google-analytics.com/analytics.js','gtag');
  
  // /* Google Tag Manager */
  // (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  // })(window,document,'script','dataLayer', gtmKey)
  // gtag('create', 'UA-72880502-20', 'auto');
  // gtag('require', 'GTM-52KD5JT');

  // Global site tag (gtag.js) - Google Analytics
  // (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  // h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  // (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  // })(window,document.documentElement,'async-hide','dataLayer',500,
  // {'GTM-52KD5JT':true});

}