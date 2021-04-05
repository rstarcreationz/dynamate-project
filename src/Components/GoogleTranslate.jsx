import React, { useEffect } from "react";

const GoogleTranslate = () => {

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({pageLanguage: 'en' , includedLanguages : 'fr,en,yy'}, 'google_translate_element');
     }
     
     useEffect(() => {
       var addScript = document.createElement('script');
       addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
       document.body.appendChild(addScript);
       window.googleTranslateElementInit = googleTranslateElementInit;
     }, [])
   
     return (
         <div id="google_translate_element"></div>
     );
   };
   
   export default GoogleTranslate;