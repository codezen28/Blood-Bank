import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';

import moment from 'moment';

const Hospitals = () => {
    const [data, setData] = useState([]);
    const getHospitals = async () => {
      try {
        const { data } = await API.get("/inventory/get-hospitals");
        if (data?.success) {
          setData(data?.hospitals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getHospitals();
    }, []);
    return (
      <>
      <Layout>
       <div className='container mt-4'>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Hospital Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.hospitalName}</td>
  
                <td>{record.email}</td>
                <td>{record.address}</td>
                <td>{record.phone}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Layout>
  
     </>
)};

export default Hospitals;