import React from "react";
import nftl from "../../../../images/nftl.png";
import arrow from "../../../../images/arrow.png";
import Footer from "../layout/Footer";
import LienHero from "../lienviewer/LienHero";
import LienSearch from "../lienviewer/LienSearch";
import StateItem from "../lienviewer/StateItem";
import StickyNavbar from "../../../layout/StickyNavbar";

const LienViewer = () => {
  const states = [
    {
      state: "Alaska",
      agency: "Tax Division",
      phone: "(907) 465-2320",
      website: "https://www.tax.alaska.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ak-largeflag.png",
    },
    {
      state: "Alabama",
      agency: "Department of Revenue",
      phone: "(334) 242-1170",
      website: "https://revenue.alabama.gov/",
      flag: "https://www.50states.com/images/redesign/flags/al-largeflag.png",
    },
    {
      state: "Arizona",
      agency: "Department of Revenue",
      phone: "(501) 682-5000",
      website: "https://www.dfa.arkansas.gov/",
      flag: "https://www.50states.com/images/redesign/flags/az-largeflag.png",
    },
    {
      state: "Arkansas",
      agency: "Department of Revenue",
      phone: "(602) 542-5551",
      website: "https://www.azdor.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ar-largeflag.png",
    },
    {
      state: "California",
      agency: "Franchise Tax Board",
      phone: "(888) 435 4990",
      website: "https://dof.ca.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ca-largeflag.png",
    },
    {
      state: "Colorado",
      agency: "Department of Revenue",
      phone: "(303) 205-8291",
      website: "https://www.colorado.gov/tax",
      flag: "https://www.50states.com/images/redesign/flags/co-largeflag.png",
    },
    {
      state: "Connecticut",
      agency: "Department of Revenue Services",
      phone: "(860) 297-4936",
      website: "https://portal.ct.gov/DRS",
      flag: "https://www.50states.com/images/redesign/flags/ct-largeflag.png",
    },
    {
      state: "District of Columbia",
      agency: "Office of the Chief Financial Officer",
      phone: "(202) 727-4829",
      website: "https://cfo.dc.gov/",
      flag: "https://www.50states.com/images/redesign/flags/dc-largeflag.png",
    },
    {
      state: "Delaware",
      agency: "Department of Revenue",
      phone: "(302) 577-8585",
      website: "https://revenue.delaware.gov/",
      flag: "https://www.50states.com/images/redesign/flags/de-largeflag.png",
    },
    {
      state: "Georgia",
      agency: "Department of Revenue",
      phone: "(800) 719 9924",
      website: "https://dor.georgia.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ga-largeflag.png",
    },
    {
      state: "Hawaii",
      agency: "Department of Revenue",
      phone: "(808) 587-1600",
      website: "https://tax.hawaii.gov/",
      flag: "https://www.50states.com/images/redesign/flags/hi-largeflag.png",
    },
    {
      state: "Idaho",
      agency: "state Tax Commission",
      phone: "(208) 334-7660",
      website: "https://tax.idaho.gov/",
      flag: "https://www.50states.com/images/redesign/flags/id-largeflag.png",
    },
    {
      state: "Illinois",
      agency: "Department of Revenue",
      phone: "(217) 785-2698",
      website: "https://www2.illinois.gov/rev/",
      flag: "https://www.50states.com/images/redesign/flags/il-largeflag.png",
    },
    {
      state: "Indiana",
      agency: "Department of Revenue",
      phone: "(317) 232-4692",
      website: "http://indiana.gov/dor/",
      flag: "https://www.50states.com/images/redesign/flags/in-largeflag.png",
    },
    {
      state: "Kansas",
      agency: "Department of Revenue",
      phone: "(877) 247-4088",
      website: "https://www.ksrevenue.org/",
      flag: "https://www.50states.com/images/redesign/flags/ks-largeflag.png",
    },
    {
      state: "Kentucky",
      agency: "Department of Revenue",
      phone: "(502) 564-4921 - EXT. 5354",
      website: "https://revenue.ky.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ky-largeflag.png",
    },
    {
      state: "Louisiana",
      agency: "Department of Revenue",
      phone: "(855) 307-3893",
      website: "https://revenue.louisiana.gov/",
      flag: "https://www.50states.com/images/redesign/flags/la-largeflag.png",
    },
    {
      state: "Massachusetts",
      agency: "Department of Revenue",
      phone: "(617) 887-6400",
      website: "https://www.mass.gov/orgs/massachusetts-department-of-revenue",
      flag: "https://www.50states.com/images/redesign/flags/ma-largeflag.png",
    },
    {
      state: "Maryland",
      agency: "Comptroller of Maryland",
      phone: "",
      website: "https://www.marylandtaxes.gov/",
      flag: "https://www.50states.com/images/redesign/flags/md-largeflag.png",
    },
    {
      state: "Maine",
      agency: "Revenue Services",
      phone: "(207) 626-8475",
      website: "https://www.maine.gov/revenue/",
      flag: "https://www.50states.com/images/redesign/flags/me-largeflag.png",
    },
    {
      state: "Michigan",
      agency: "Department of Treasury",
      phone: "(866) 218 7224",
      website: "https://www.michigan.gov/treasury",
      flag: "https://www.50states.com/images/redesign/flags/mi-largeflag.png",
    },
    {
      state: "Minnesota",
      agency: "Department of Revenue",
      phone: "651-556-3003",
      website: "https://www.revenue.state.mn.us/",
      flag: "https://www.50states.com/images/redesign/flags/mn-largeflag.png",
    },
    {
      state: "Missouri",
      agency: "Department of Revenue",
      phone: "(573) 751-4450",
      website: "https://dor.mo.gov/",
      flag: "https://www.50states.com/images/redesign/flags/mo-largeflag.png",
    },
    {
      state: "Montana",
      agency: "Department of Revenue",
      phone: "(406) 444-6900",
      website: "https://mtrevenue.gov/",
      flag: "https://www.50states.com/images/redesign/flags/mt-largeflag.png",
    },
    {
      state: "North Carolina",
      agency: "Department of Revenue",
      phone: "(704) 519 3000",
      website: "https://www.ncdor.gov/",
      flag: "https://www.50states.com/images/redesign/flags/nc-largeflag.png",
    },
    {
      state: "North Dakota",
      agency: "Office of the state Tax Commissioner",
      phone: "(701) 328-7088",
      website: "https://www.nd.gov/tax/",
      flag: "https://www.50states.com/images/redesign/flags/nd-largeflag.png",
    },
    {
      state: "Nebraska",
      agency: "Department of Revenue",
      phone: "(402) 471-5729",
      website: "https://revenue.nebraska.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ne-largeflag.png",
    },
    {
      state: "New Jersey",
      agency: "Department of Revenue",
      phone: "(609) 292 6400",
      website: "https://www.state.nj.us/treasury/taxation/",
      flag: "https://www.50states.com/images/redesign/flags/nj-largeflag.png",
    },
    {
      state: "New Mexico",
      agency: "Department of Revenue",
      phone: "(505) 841-6200",
      website: "https://tax.newmexico.gov/",
      flag: "https://www.50states.com/images/redesign/flags/nm-largeflag.png",
    },
    {
      state: "Nevada",
      agency: "Department of Revenue",
      phone: "(702) 486-2300",
      website: "https://tax.nv.gov/",
      flag: "https://www.50states.com/images/redesign/flags/nv-largeflag.png",
    },
    {
      state: "New York",
      agency: "Department of Revenue",
      phone: "(518) 591-5000",
      website: "https://tax.ny.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ny-largeflag.png",
    },
    {
      state: "Ohio",
      agency: "Department of Taxasion",
      phone: "(330) 762-2411",
      website: "https://tax.ohio.gov/",
      flag: "https://www.50states.com/images/redesign/flags/oh-largeflag.png",
    },
    {
      state: "Oklahoma",
      agency: "Department of Revenue",
      phone: "(405) 521-2212",
      website: "https://www.ok.gov/tax",
      flag: "https://www.50states.com/images/redesign/flags/ok-largeflag.png",
    },
    {
      state: "Pennsylvania",
      agency: "Department of Revenue",
      phone: "(717) 783-3000",
      website: "https://www.revenue.pa.gov/Pages/default.aspx",
      flag: "https://www.50states.com/images/redesign/flags/pa-largeflag.png",
    },
    {
      state: "Rhode Island",
      agency: "Department of Revenue",
      phone: "(401) 574-8941",
      website: "https://tax.ri.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ri-largeflag.png",
    },
    {
      state: "South Carolina",
      agency: "Department of Revenue",
      phone: "(844) 898-8542",
      website: "https://dor.sc.gov/",
      flag: "https://www.50states.com/images/redesign/flags/sc-largeflag.png",
    },
    {
      state: "South Dakota",
      agency: "Department of Revenue",
      phone: "(605) 773-3311",
      website: "https://dor.sd.gov/",
      flag: "https://www.50states.com/images/redesign/flags/sd-largeflag.png",
    },
    {
      state: "Texas",
      agency: "Department of Revenue",
      phone: "(800) 252-5555",
      website: "https://comptroller.texas.gov/",
      flag: "https://www.50states.com/images/redesign/flags/tx-largeflag.png",
    },
    {
      state: "Utah",
      agency: "Department of Revenue",
      phone: "(801) 297-2200",
      website: "https://tax.utah.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ut-largeflag.png",
    },
    {
      state: "Virginia",
      agency: "Department of Taxation",
      phone: "(804) 367-8045",
      website: "https://tax.virginia.gov/",
      flag: "https://www.50states.com/images/redesign/flags/va-largeflag.png",
    },
    {
      state: "Washington",
      agency: "Department of Revenue",
      phone: "(800) 647-7706",
      website: "https://dor.wa.gov/",
      flag: "https://www.50states.com/images/redesign/flags/wa-largeflag.png",
    },
    {
      state: "Wisconsin",
      agency: "Department of Revenue",
      phone: "(608) 266-7879",
      website: "https://www.revenue.wi.gov/",
      flag: "https://www.50states.com/images/redesign/flags/wi-largeflag.png",
    },
    {
      state: "West Virginia",
      agency: "Department of Revenue",
      phone: "(304) 558-8753",
      website: "https://revenue.wv.gov/Pages/default.aspx",
      flag: "https://www.50states.com/images/redesign/flags/wv-largeflag.png",
    },
    {
      state: "Mississippi",
      agency: "Department of Revenue",
      phone: "(601) 923 7700",
      website: "https://dor.ms.gov/",
      flag: "https://www.50states.com/images/redesign/flags/ms-largeflag.png",
    },
    {
      state: "Tennessee",
      agency: "Department of Revenue",
      phone: "(844) 729-8689",
      website: "https://www.tn.gov/revenue/",
      flag: "https://www.50states.com/images/redesign/flags/tn-largeflag.png",
    },
  ];

  return (
    <div>
      <StickyNavbar />
      <LienHero />
      <div className='container'>
        <div className='grid-2'>
          <p className='mx-3'>
            <h2>
              Your <span className='lead text-primary'> Tax Lien</span> <br />
              Resource
            </h2>
          </p>

          <p>
            We know getting a tax lien is scary. Especially when you are
            overwhelmed by correspondance from private companies, thats why we
            like to ensure that anyone who needs to know about their Tax Status
            can download a free summary of their tax lien.
          </p>
        </div>
        <LienSearch />
        <h3> For Your Information...</h3>
        <div className='grid-lien '>
          <div>
            <h5>
              This is a Notice of Federal Tax Lien. If you have debt to the IRS,
              you may have recieved one of these by mail. If you are unsure
              about the status of your lien call us today.
            </h5>
            <img alt='' src={arrow} />
            <h5 className='lead text-danger text-center'>1-213-513-5543</h5>
          </div>
          <div>
            <img
              alt=''
              src={nftl}
              style={{ width: "566px", height: "750px" }}
            />
          </div>
        </div>

        <div className='container'>
          <h3>
            If you are unsure as to whether or not you owe any state taxes and
            have received correspondance from a third party reguarding that
            debt, please take a moment and contact your home state at one of
            these links. If you need help reaching out to the state due to high
            call volume or for any other reason. Contact our office at
            1=800=459=7124 and we will help you walk through process of paying
            your taxes back.
          </h3>
          <div style={userStyle}>
            {states.map((state) => (
              <StateItem key={state.state} state={state} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
const userStyle = {
  display: "grid",

  gridTemplateColumns: "repeat(3, 1fr)",

  gridGap: "1rem",
};

export default LienViewer;
