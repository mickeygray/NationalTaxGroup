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

  console.log(invoices);

  console.log(mailCosts);
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <div className='container'>
        <div>
          <button className='btn btn-dark p-1' onClick={onClick}>
            Check for new invoices
          </button>
          <button className='btn btn-dark p-1' onClick={onClick2}>
            Pull invoices
          </button>
        </div>

        <div>
          Select a date or date range to view invoices and cost estimates <br />
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRanges([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={ranges}
          />
        </div>
      </div>
      <div className='grid-2 container'>
        <div>
          {invoices
            ? invoices.map((invoice) => (
                <div>
                  <p>Invoices</p>
                  <iframe
                    style={{ width: "400px", height: "600px" }}
                    src={URL.createObjectURL(
                      new Blob([invoice], { type: "application/pdf" })
                    )}
                    type='application/pdf'
                    title='title'
                  />
                </div>
              ))
            : ""}
        </div>
        <div className='container'>
          {mailCosts.length > 0
            ? mailCosts.map((mailCost) => (
                <div>
                  <p>Cost Estimates</p>
                  <CostItem key={mailCost.mailer} mailCost={mailCost} />
                </div>
              ))
            : ""}
        </div>
      </div>
    </Fragment>
  );
};

export default FordeTwoCents;
