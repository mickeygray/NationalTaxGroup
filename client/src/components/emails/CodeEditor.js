import React from "react";
import {
  Email,
  Item,
  Box,
  Span,
  A,
  Image,
  renderEmail,
} from "react-html-email";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

import parse from "html-react-parser";
const varFields = {
  firstName: "{{firstName}}",
  lastName: "{{lastName}}",
  fullName: "{{fullName}}",
  address: "{{address}}",
  city: "{{city}}",
  state: "{{state}}",
  zip: "{{zip}}",
  county: "{{county}}",
  type: "{{type}}",
  plaintiff: "{{plaintiff}}",
  dmDate: "{{dmDate}}",
  lienDate: "{{lienDate}}",
};
const headCss = `#outlook a{padding:0}.ExternalClass{width:100%!important}.ExternalClass,.ExternalClass font,.ExternalClass p,.ExternalClass span,img{outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}a img{border:none}.appleLinksGrey a{color:#919191!important;text-decoration:none!important}.ExternalClass img[class^=Emoji]{width:10px!important;height:10px!important;display:inline!important}.CTA:hover{background-color:#5fdbc4!important}@media screen and (max-width:640px){.mobilefullwidth{width:100%!important;height:auto!important}.logo{padding-left:30px!important;padding-right:30px!important}.h1{font-size:36px!important;line-height:48px!important;padding-right:30px!important;padding-left:30px!important;padding-top:30px!important}.h2{font-size:18px!important;line-height:27px!important;padding-right:30px!important;padding-left:30px!important}.p{font-size:16px!important;line-height:28px!important;padding-left:30px!important;padding-right:30px!important;padding-bottom:30px!important}.CTA_wrap{padding-left:30px!important;padding-right:30px!important;padding-bottom:30px!important}.footer{padding-left:30px!important;padding-right:30px!important}.number_wrap{padding-left:30px!important;padding-right:30px!important}.unsubscribe{padding-left:30px!important;padding-right:30px!important}}`;

const CodeEditor = () => {
  return (
    <div>
      <LiveProvider scope={scope}>
        <LiveEditor />
        <LivePreview />
      </LiveProvider>
    </div>
  );
};

export default CodeEditor;
