import React, { useState, useContext, useEffect } from "react";
import EmailContext from "../../context/email/emailContext";

const EmailModal = (props) => {
  const emailContext = useContext(EmailContext);
  const { sendEmail } = emailContext;

  console.log(props);

  const { prospect, user, caseWorker } = props;

  console.log(user);
  useEffect(() => {
    setEmail({
      subject: prospect.fullName,
      from: user.email,
      to: caseWorker.email,
      text: "",
    });
  }, []);

  const [email, setEmail] = useState({
    subject: "",
    from: "",
    to: "",
    text: "",
  });

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const { subject, from, to, text } = email;

  return (
    <div>
      <button onClick={props.toggleEmailModal}>X</button>
      <form>
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

        <button>Send Email</button>
      </form>
    </div>
  );
};

export default EmailModal;
