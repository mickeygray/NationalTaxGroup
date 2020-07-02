import React, { Fragment } from "react";
import EmployeeItem from "./EmployeeItem";
import employee1 from "../../../../images/employee1.jpg";
import employee2 from "../../../../images/employee2.jpg";
import employee3 from "../../../../images/employee3.png";
import employee4 from "../../../../images/employee4.jpg";

const Company = () => {
  const employees = [
    {
      key: 1,
      name: "Robert Gandy",
      img: employee1,
      office: 18004597124,
      role: "Founder",
      email: "robertgandy@nattaxgroup.com",
      experience: "20 years",
      expertise: "Tax Resolution",
    },
    {
      key: 2,
      name: "Joe Carey",
      img: employee2,
      office: 18004597124,
      role: "Consultant",
      email: "joecarey@nattaxgroup.com",
      experience: "20 years",
      expertise: "State and Federal Personal Tax",
    },
    {
      key: 3,
      name: "Paul Baylor",
      email: "paulbaylor@nattaxgroup.com",
      img: employee3,
      office: 18004597124,
      role: "Consultant",
      experience: "20 years",
      expertise: "State and Federal Business Tax",
    },
    {
      key: 4,
      name: "Steve Bigge",
      email: "steve@nattaxgroup.com",
      img: employee4,
      office: 18004597124,
      role: "Analyst",
      experience: "20 years",
      expertise: "Tax Preparation and Analysis",
    },
  ];

  return (
    <Fragment>
      <h3 className='lead text-center text-primary'>Meet Our Experts</h3>
      <div style={userStyle}>
        {employees.map((employee) => (
          <EmployeeItem key={employee.key} employee={employee} />
        ))}
      </div>
      <div className='container all-center'>
        <p>
          Our committed team of specialists are available Monday - Saturday 6am
          - 6pm. <br />
          Its our mission to provide you with quality tax resolution and
          tremendous savings.
        </p>
      </div>
    </Fragment>
  );
};
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
};

export default Company;
