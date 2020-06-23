import React, { useContext } from "react";
import LeadContext from "../../../context/lead/leadContext";

const LienItem = ({ lien }) => {
  const leadContext = useContext(LeadContext);
  const { name, address, city, state, zip, plaintiff, amount, _id } = lien;
  const lienid = _id;
  const { setLien, deleteLien } = leadContext;
  const onDelete = () => {
    deleteLien(_id);
  };

  return (
    <div className='card bg-light'>
      <h5 className='text-danger text-left'>{name}</h5>
      <ul className='list'>
        <li>
          Address:
          <br />
          {address}
        </li>
        <li>
          Lien Amount:
          <br /> ${amount}.00
        </li>
        <li>
          Plaintiff:
          <br /> {plaintiff}
        </li>
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm my-1'
          onClick={() =>
            setLien({
              name,
              address,
              city,
              state,
              zip,
              plaintiff,
              amount,
              lienid,
            })
          }>
          Set Lead
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Do Not Contact
        </button>
      </p>
    </div>
  );
};

export default LienItem;
