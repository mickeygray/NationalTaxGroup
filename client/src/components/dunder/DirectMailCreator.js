import React, { useContext, useEffect, useState } from "react";
import MailContext from "../../context/mail/mailContext";
import { v4 as uuidv4 } from "uuid";
const DirectMailCreator = () => {
  const mailContext = useContext(MailContext);

  const { createDirectMailItem } = mailContext;
  useEffect(() => {
    setLetter({
      title: "",
      mailHouse: "",
      vendor: "",
      type: "",
      colorPaper: "",
      colorInk: "",
      image: "",
      key: uuidv4(),
      taxChart: "",
      lienType: "",
      lienAmount: "",
      zipCodeSuppress: "",
      postageCeiling: "",
      unitCost: "",
      theme: "",
      tracking: "",
      startDate: Date.now(),
    });
  }, []);

  const [letter, setLetter] = useState({
    title: "",
    mailHouse: "",
    vendor: "",
    type: "",
    colorPaper: "",
    colorInk: "",
    image: "",
    taxChart: "",
    lienType: "",
    lienAmount: "",
    zipCodeSuppress: "",
    key: "",
    postageCeiling: "",
    unitCost: "",
    tracking: "",
    theme: "",
    startDate: Date.now(),
  });

  const {
    title,
    mailHouse,
    vendor,
    type,
    colorPaper,
    colorInk,
    image,
    taxChart,
    key,
    lienType,
    lienAmount,
    zipCodeSuppress,
    postageCeiling,
    unitCost,
    tracking,
    startDate,
  } = letter;
  const [zipCode, setZipCode] = useState([]);
  const [file, setFile] = useState("");
  const onChange = (e) => {
    setLetter({
      ...letter,
      [e.target.name]: e.target.value,
    });
  };

  const onChange2 = (e) => {
    function filterByCount(array, count) {
      return array.filter(function (value) {
        return (
          array.filter(function (v) {
            return v === value;
          }).length === count
        );
      });
    }

    setZipCode(filterByCount([...zipCode, e.target.value], 1));
  };

  const onChange3 = (e) => {
    setFile(e.target.files[0]);
  };

  const clearAll = () => {
    setLetter({
      title: "",
      mailHouse: "",
      vendor: "",
      type: "",
      colorPaper: "",
      colorInk: "",
      image: "",
      taxChart: "",
      lienType: "",
      lienAmount: "",
      zipCodeSuppress: "",
      theme: "",
      postageCeiling: "",
      unitCost: "",
      tracking: "",
      startDate: "",
    });
    setFile("");
    setZipCode([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", letter.title);
    formData.append("fs", file);
    formData.append("mailHouse", letter.mailHouse);
    formData.append("vendor", letter.vendor);
    formData.append("type", letter.type);
    formData.append("key", letter.key);
    formData.append("colorPaper", letter.colorPaper);
    formData.append("colorInk", letter.colorInk);
    formData.append("image", letter.image);
    formData.append("taxChart", letter.taxChart);
    formData.append("lienType", letter.lienType);
    formData.append("lienAmount", letter.lienAmount);
    formData.append("zipCodeSuppress", letter.zipCodeSuppress);
    formData.append("zipCode", zipCode);
    formData.append("postageCeiling", letter.postageCeiling);
    formData.append("unitCost", letter.unitCost);
    formData.append("tracking", letter.tracking);

    formData.append("startDate", new Date(letter.startDate));
    createDirectMailItem(formData);
    clearAll();
  };

  return (
    <div className='card'>
      <form action='post' onSubmit={onSubmit}>
        <div className='grid-2'>
          <div>
            <label htmlFor='title'>Piece Title</label>
            <input
              placeholder='Title'
              type='text'
              name='title'
              onChange={onChange}
            />
            <label htmlFor='title'>Mail House</label>
            <select onChange={onChange} name='mailHouse' id='mailHouse'>
              <option value=''></option>
              <option value='adv'>Advantage</option>
              <option value='csp'>CSP</option>
              <option value='wb'>Wizbang!</option>
            </select>
            <label htmlFor='title'>Data Vendor</label>
            <select onChange={onChange} name='vendor' id='vendor'>
              <option value=''></option>

              <option value='enverus'>
                I bet you let this contact die you apes
              </option>
              <option value='any'>Any Available Data Types</option>
            </select>
            <label htmlFor='title'>Shell Type</label>
            <select onChange={onChange} name='type' id='type'>
              <option value=''></option>
              <option value='dblwndw'>Double Window Letter</option>
              <option value='snglwndw'>Single Window Letter</option>
              <option value='lgwndw'>Large Window Letter</option>
              <option value='smltr'>Small Letter</option>
              <option value='csnap'>C-Snap</option>
              <option value='zsnap11'>Z-Snap 11 inch</option>
              <option value='zsnap14'>Z-Snap 14 inch</option>
              <option value='dblpc'>Double Postcard</option>
            </select>
            <label htmlFor='title'>Paper Color</label>
            <select onChange={onChange} name='colorPaper' id='colorPaper'>
              <option value=''></option>
              <option value='red'>Red</option>
              <option value='yellow'>Yellow</option>
              <option value='pink'>Pink</option>
              <option value='green'>Green</option>
              <option value='orange'>Orange</option>
            </select>
            <label htmlFor='title'>Ink Color</label>
            <select onChange={onChange} name='colorInk' id='colorInk'>
              <option value=''></option>
              <option value='color'>Color</option>
              <option value='black'>Black and White</option>
            </select>
            <label htmlFor='title'>Uses Image/Stamp/Seal</label>
            <select onChange={onChange} name='image' id='image'>
              <option value=''></option>
              <option value='graph'>Has Graphic</option>
              <option value='nograph'>No Graphic</option>
            </select>
            <label htmlFor='title'>Uses Tax Lien Info Chart</label>
            <select onChange={onChange} name='taxchart' id='taxchart'>
              <option value=''></option>
              <option value='taxchart'>Uses Lien Info Chart</option>
              <option value='notaxchart'>Does Not Use Lien Info Chart</option>
            </select>
            <label htmlFor='title'>Marketing Theme</label>
            <select onChange={onChange} name='theme' id='theme'>
              <option value=''></option>
              <option value='offer'>Offer / Benefit Appeal</option>
              <option value='response'>Response / Urgency Appeal</option>
            </select>
          </div>
          <div>
            <label htmlFor='title'>Lien Type</label>
            <select onChange={onChange} name='lienType' id='lienType'>
              <option value=''></option>
              <option value='state'>State Tax Lien Only</option>
              <option value='federal'>Federal Tax Lien Only</option>
              <option value='both'>Both State and Federal Tax Liens</option>
              <option value='any'>Any Available Mailing Address</option>
            </select>
            <label htmlFor='title'>Lien Amount</label>
            <select onChange={onChange} name='lienAmount' id='lienAmount'>
              <option value=''></option>
              <option value='any'>All Lien Amounts</option>
              <option value='15000'>$5,000-$15,000</option>
              <option value='25000'>$15,000-$25,000</option>
              <option value='50000'>$25,000-$50,000</option>
              <option value='100000'>$50,000-$100,000</option>
              <option value='10000000'>$100,000 plus</option>
            </select>

            <label htmlFor='tracking'>Toll Free Number</label>
            <input type='text' name='tracking' onChange={onChange} />
            <label htmlFor='startDate'>Start Date</label>
            <input
              type='date'
              name='startDate'
              value={
                letter.startDate &&
                Intl.DateTimeFormat("fr-CA", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(new Date(letter.startDate))
              }
              id='startDate'
              onChange={onChange}
            />
            <label htmlFor='title'>Unit Cost</label>
            <input
              type='text'
              name='unitCost'
              id='unitCost'
              onChange={onChange}
            />
            <br />
            <label htmlFor='title'>Postage Ceiling</label>
            <select
              onChange={onChange}
              name='postageCeiling'
              id='postageCeiling'>
              <option value=''></option>
              <option value='.439'>42.9 Cents</option>

              <option value='.276'>27.6 Cents</option>
            </select>
            <label htmlFor='file'>Attach PDF Proof</label>
            <input type='file' name='fs' id='fs' onChange={onChange3} />
            <input
              type='submit'
              value='Create Direct Mail Campaign'
              className='btn-light btn-block btn m-1 all-center'
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <div>
          <label htmlFor='title'>Zip Code Suppression Type</label>
          <select
            onChange={onChange}
            name='zipCodeSuppress'
            id='zipCodeSuppress'>
            <option value=''></option>
            <option value='all'>All Zip Codes</option>
            <option value='suppressSelect'>Remove Selected Areas</option>
            <option value='keepSelect'>Keep Only Selected Areas</option>
          </select>
          <label htmlFor='title'>Zip Code Suppression Area</label>
          <select name='zipCode' id='zipCode' onChange={onChange2} multiple>
            <option value='highDensity0x'>
              High Density 0x - CT, MA, ME, NH, NJ, PR, RI, VT
            </option>
            <option value='lowDensity0x'>
              Low Density 0x - CT, MA, ME, NH, NJ, PR, RI, VT
            </option>
            <option value='highDensity1x'>High Density 1x - DE, NY, PA</option>
            <option value='lowDensity1x'>Low Density 1x - DE, NY, PA</option>
            <option value='highDensity2x'>
              High Density 2x - DC, MD, NC, SC, VA, WV
            </option>
            <option value='lowDensity2x'>
              Low Density 2x - DC, MD, NC, SC, VA, WV
            </option>
            <option value='highDensity3x'>
              High Density 3x - AL, FL, GA, MS, TN
            </option>
            <option value='lowDensity3x'>
              Low Density 3x - AL, FL, GA, MS, TN
            </option>
            <option value='highDensity4x'>
              High Density 4x - IN, KY, MI, OH
            </option>
            <option value='lowDensity4x'>
              Low Density 4x - IN, KY, MI, OH
            </option>
            <option value='highDensity5x'>
              High Density 5x - IA, MN, MT, ND, SD, WI
            </option>
            <option value='lowDensity5x'>
              Low Density 5x - IA, MN, MT, ND, SD, WI
            </option>
            <option value='highDensity6x'>
              High Density 6x - IL, KS, MS, NE
            </option>
            <option value='lowDensity6x'>
              Low Density 6x - IL, KS, MS, NE
            </option>
            <option value='highDensity7x'>
              High Density 7x - AR, LA, OK, TX
            </option>
            <option value='lowDensity7x'>Low Density 7x - AR,LA,OK,TX</option>
            <option value='highDensity8x'>
              High Density 8x - AZ, CO ,ID, NM, NV, UT, WY
            </option>
            <option value='lowDensity8x'>
              Low Density 8x - AZ, CO ,ID, NM, NV, UT, WY
            </option>
            <option value='highDensity9x'>
              High Density 9x - AK, CA, HI, OR, WA{" "}
            </option>
            <option value='lowDensity9x'>
              Low Density 9x - AK, CA, HI, OR, WA Wyoming
            </option>
          </select>
          <div>
            Currently Selected Areas:{" "}
            <b>
              {" "}
              {zipCode.map(
                (zipCode) =>
                  zipCode
                    .replace(/([A-Z])/g, (match) => ` ${match}`)
                    .replace(/^./, (match) => match.toUpperCase())
                    .replace(/([0-9])/, (match) => ` ${match}`) + ", "
              )}
            </b>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DirectMailCreator;
