import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import MailContext from "../../../context/mail/mailContext";
import CostItem from "../../fordetwocents/CostItem";
import { DateRange } from "react-date-range";
import Navbar from "../../layout/Navbar";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FordeTwoCents = () => {
  const mailContext = useContext(MailContext);

  useEffect(() => {
    setRanges([
      {
        periodStart: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(Date.now())),
        periodEnd: Intl.DateTimeFormat(
          "en-US",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date(Date.now())),
        key: "selection",
      },
    ]);
  }, []);

  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const {
    fetchInvoices,
    invoices,
    getInvoiceList,
    mailCosts,
    getDailyCosts,
  } = mailContext;

  const onClick = (e) => {
    fetchInvoices();
  };

  const onClick2 = (e) => {
    getInvoiceList(ranges);
    getDailyCosts(ranges);
  };

  console.log(invoices);

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (invoices != null) {
      console.log(invoices);

      setFile(
        URL.createObjectURL(
          new Blob([invoices[1]], { type: "application/pdf" })
        )
      );
    }
  }, [invoices, mailContext]);

  console.log(invoices);

  console.log(mailCosts);
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div>
        <button onClick={onClick}>FETCHEROONI</button>

        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRanges([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={ranges}
        />

        <button onClick={onClick2}>SKETCHAROONI</button>
        {file ? <iframe src={file} type='application/pdf' title='title' /> : ""}
      </div>
      <div>
        {mailCosts.length > 0
          ? mailCosts.map((mailCost) => (
              <CostItem key={mailCost.mailer} mailCost={mailCost} />
            ))
          : ""}
      </div>
    </Fragment>
  );
};

export default FordeTwoCents;
