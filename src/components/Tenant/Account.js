import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TenantContext from '../../context/TenantContext';

function Account() {
    const { tenantData, setTenantData } = useContext(TenantContext);
    const [homes, setHomes] = useState([])

    useEffect(() => {
        console.log("here", tenantData.tenant)
        if (tenantData.tenant)
            Axios.get(`https://mighty-temple-22601.herokuapp.com/api/properties/applied/${tenantData.tenant.id}`)
                .then((res) => {
                    setHomes(res.data)
                })
                .catch(err => console.log(err))
    }, [])

    return (
        <div className="card profile border-secondary m-5">
            <h4 className="card-header">Account Overview</h4>
            <div className="card-body text-center">
                <img width="100px" src="https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg" alt="profile icon" />
                <h5 className="card-title mt-2">{tenantData.tenant.name}</h5>
                <p className="card-text">
                    <strong>
                        E-mail:&nbsp;&nbsp;
                    </strong>
                    <span>
                        {
                            tenantData.tenant.email
                        }
                    </span>
                    <br/>
                    <strong>
                        Contact:&nbsp;&nbsp;
                    </strong>
                    <span>
                        {
                            tenantData.tenant.contact
                        }
                    </span>
                </p>
                <h5>PROPERTIES APPLIED:</h5>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Location</th>
                            <th scope="col">Image</th>
                            <th scope="col">Rent</th>
                            <th scope="col">Type</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            homes.length === 0
                                ?
                                <>No Records Found</>
                                :
                                homes.map((home, i) => (
                                    <tr className="vertical">
                                        <td>
                                            {home.location.city + ", " + home.location.state + ", " + home.location.country}
                                        </td>
                                        <td>
                                            <img height="100px" src={home.property_details.homeImage} />
                                        </td>
                                        <td>
                                            {home.property_details.rent}
                                        </td>
                                        <td>
                                            {
                                                home.isFeatured
                                                    ?
                                                    "FEATURED"
                                                    :
                                                    "REGULAR"
                                            }
                                        </td>
                                        <td>
                                            {
                                                home.applicants[0]
                                                    ?
                                                    home.applicants[0].status == "rejected"
                                                        ?
                                                        <span class="badge p-2 badge-danger">
                                                            {home.applicants[0].status.toUpperCase()}
                                                        </span>
                                                        :
                                                        home.applicants[0].status == "accepted"
                                                            ?
                                                            <span class="badge p-2 badge-success">
                                                                {home.applicants[0].status.toUpperCase()}
                                                            </span>
                                                            :
                                                            home.applicants[0].status == "pending"
                                                                ?
                                                                <span class="badge p-2 badge-warning">
                                                                    {home.applicants[0].status.toUpperCase()}
                                                                </span>
                                                                :
                                                                <span class="badge p-2 badge-info">
                                                                    {home.applicants[0].status.toUpperCase()}
                                                                </span>
                                                    :
                                                    ""
                                            }
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Account
