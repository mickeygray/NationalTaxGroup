import React, { useState, useContext, useEffect } from "react";
import LeadContext from "../../context/lead/leadContext";
import AuthContext from "../../context/auth/authContext";
const SendDocsModal = (props) => {
  const leadContext = useContext(LeadContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { sendEmail } = leadContext;

  const { prospect } = props;

  const [email, setEmail] = useState({
    subject: "",
    from: "",
    to: "",
    text: "",
    attachments: [],
  });

  const [body, setBody] = useState(null);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    let address;

    if (prospect.emailAddress != null) {
      address = prospect.emailAddress;
    } else if (prospect.emailAddresses && prospect.emailAddresses[0]) {
      address = prospect.emailAddresses[0];
    }
    setEmail({
      subject: prospect.fullName + " important and confidential tax documents",
      from: user.email,
      to: address,
      text: "",
      attachments: [],
    });
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      setEmail({
        subject,
        from,
        to,
        text,
        attachments: files,
      });
    }
  }, [files]);

  useEffect(() => {
    if (body === "welcome") {
      setEmail({
        subject,
        from,
        to,
        text: "welcome",
        attachments: email.attachments,
      });
    } else if (body === "docfollow") {
      setEmail({
        subject,
        from,
        to,
        text: "welcome",
        attachments: email.attachments,
      });
    } else if (body === "urgentcall") {
      setEmail({
        subject,
        from,
        to,
        text: "welcome",
        attachments: email.attachments,
      });
    } else if (body === "prospect") {
      setEmail({
        subject,
        from,
        to,
        text: "welcome",
        attachments: email.attachments,
      });
    } else if (body === "upsell") {
      setEmail({
        subject,
        from,
        to,
        text: "welcome",
        attachments: email.attachments,
      });
    }
  }, [body, email]);

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const onUpload = (e) => {
    let files = e.target.files;

    setFiles(Object.values(files));
  };

  console.log(files);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file) => formData.append(`attachment[]`, file));

    formData.append("to", email.to);
    formData.append("from", email.from);
    formData.append("subject", email.subject);
    formData.append("text", email.text);

    sendEmail(formData);
  };
  const { subject, from, to, text } = email;

  return (
    <div>
      <button onClick={props.toggleEmail}>X</button>
      <form action='post' className='card' onSubmit={onSubmit}>
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
          placeholder='To'
          type='text'
          name='to'
          onChange={onChange}
          value={to}
        />

        <textarea
          placeholder='Message'
          type='text'
          name='text'
          onChange={onChange}
          value={text}
        />
        <select name='body' value={body} onChange={onChange}>
          <option></option>
          <option value='welcome' checked={body === "welcome"}>
            Welcome Email
          </option>

          <option value='docfollow' checked={body === "docfollow"}>
            Document Followup
          </option>
          <option value='urgentcall' checked={body === "urgentcall"}>
            Urgent Call
          </option>
          <option value='prospect' checked={body === "prospect"}>
            Yellow Followup
          </option>
          <option value='upsell' checked={body === "upsell"}>
            Upsell
          </option>
        </select>

        <label htmlFor='file'>Attach updated Tax Document</label>
        <input type='file' name='file' id='file' multiple onChange={onUpload} />
        <input
          type='submit'
          value='Send Email'
          className='btn-light btn-block btn m-1 all-center'
          style={{ width: "200px" }}
        />
      </form>
    </div>
  );
};

export default SendDocsModal;
