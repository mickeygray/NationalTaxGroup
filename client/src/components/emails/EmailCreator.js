import React, { Fragment, useContext, useEffect, useState } from "react";
import EmailContext from "../../context/email/emailContext";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import {
  Email,
  Item,
  Box,
  Span,
  A,
  Image,
  renderEmail,
} from "react-html-email";
import { v4 as uuidv4 } from "uuid";

const EmailCreator = () => {
  const emailContext = useContext(EmailContext);

  const { saveEmail } = emailContext;

  const headCss = `#outlook a{padding:0}.ExternalClass{width:100%!important}.ExternalClass,.ExternalClass font,.ExternalClass p,.ExternalClass span,img{outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}a img{border:none}.appleLinksGrey a{color:#919191!important;text-decoration:none!important}.ExternalClass img[class^=Emoji]{width:10px!important;height:10px!important;display:inline!important}.CTA:hover{background-color:#5fdbc4!important}@media screen and (max-width:640px){.mobilefullwidth{width:100%!important;height:auto!important}.logo{padding-left:30px!important;padding-right:30px!important}.h1{font-size:36px!important;line-height:48px!important;padding-right:30px!important;padding-left:30px!important;padding-top:30px!important}.h2{font-size:18px!important;line-height:27px!important;padding-right:30px!important;padding-left:30px!important}.p{font-size:16px!important;line-height:28px!important;padding-left:30px!important;padding-right:30px!important;padding-bottom:30px!important}.CTA_wrap{padding-left:30px!important;padding-right:30px!important;padding-bottom:30px!important}.footer{padding-left:30px!important;padding-right:30px!important}.number_wrap{padding-left:30px!important;padding-right:30px!important}.unsubscribe{padding-left:30px!important;padding-right:30px!important}}`;

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

  const scope = {
    Email,
    Item,
    Box,
    Span,
    A,
    Image,
    renderEmail,
    headCss,
    varFields,
  };

  const keyVal = uuidv4();

  useEffect(() => {
    setEmail({
      reactstring: "",
      title: "",
      html: "",
      text: "",
      subject: "",
      from: "",
      campaignName: "",
      reactstring: "",
      key: keyVal,
    });
  }, []);

  const [email, setEmail] = useState({
    reactstring: "",
    title: "",
    html: "",
    text: "",
    subject: "",
    from: "",
    campaignName: "",
    reactstring: "",
    key: keyVal,
  });

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    saveEmail(email);
    setEmail({
      reactstring: "",
      title: "",
      html: "",
      text: "",
      subject: "",
      from: "",
      campaignName: "",
      reactstring: "",
      key: keyVal,
    });
  };

  const {
    title,
    html,
    text,
    subject,
    from,
    campaignName,
    reactstring,
    key,
  } = email;

  return (
    <Fragment>
      <form action='post' onSubmit={onSubmit}>
        <LiveProvider scope={scope}>
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <input
          value={title}
          placeholder='Title'
          type='text'
          name='title'
          onChange={onChange}
        />

        <input
          placeholder='Text'
          type='text'
          name='text'
          onChange={onChange}
          value={text}
        />
        <input
          value={subject}
          placeholder='Subject'
          type='text'
          name='subject'
          onChange={onChange}
        />
        <input
          placeholder='From'
          type='text'
          name='from'
          onChange={onChange}
          value={from}
        />
        <input
          value={campaignName}
          placeholder='Campaign Name'
          type='text'
          name='campaignName'
          onChange={onChange}
        />

        <textarea
          value={html}
          placeholder='Html'
          type='text'
          name='html'
          onChange={onChange}
        />
        <textarea
          value={reactstring}
          placeholder='reactstring'
          type='text'
          name='reactstring'
          onChange={onChange}
        />
        <button className='btn btn-block' onSubmit={onSubmit}>
          Create Email
        </button>
      </form>
    </Fragment>
  );
};

export default EmailCreator;
