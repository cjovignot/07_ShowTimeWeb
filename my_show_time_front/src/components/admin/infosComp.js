import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function adminInfos() {
    const [dataCategories, setDataCategories] = useState(null);
    const [dataConcerts, setDataConcerts] = useState(null);
    const [dataUsers, setDataUsers] = useState(null);
    const [dataAdmins, setDataAdmins] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/categories')
            .then(response => setDataCategories(response.data.length))
            .then((response) => response)
            .catch(error => console.error(error));
        }, []);
        console.log(dataCategories);

    useEffect(() => {
        axios.get('http://localhost:3000/concerts')
            .then(response => setDataConcerts(response.data.length))
            .then((response) => response)
            .catch(error => console.error(error));
    }, []);
    console.log(dataConcerts);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => setDataUsers(response.data.length))
            .then((response) => response)
            .catch(error => console.error(error));
    }, []);
    // console.log(dataUsers);

    useEffect(() => {
        axios.get('http://localhost:3000/users/?isAdmin=true')
            .then(response => setDataAdmins(response.data.length))
            .then((response) => response)
            .catch(error => console.error(error));
    }, []);
    console.log(dataAdmins);

    
    return (
        <div className="admin_infos">
            <h1 className="text-3xl font-bold">ADMINISTRATOR PANEL</h1>
            <table>
                <tbody>
                    <thead>
                        <tr>
                            <Link href="/admin/categories/">
                            <th colspan="2" className="btn btn-wide" >{ dataCategories } GENRES</th>
                            </Link>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <Link href="/admin/concerts/">
                            <th colspan="2" className="btn btn-wide" >{ dataConcerts } CONCERTS</th>
                            </Link>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <Link href="/admin/users/">
                            <th colspan="2" className="btn btn-wide" >{ dataUsers } USERS/ADMINS</th>
                            </Link>
                        </tr>
                    </thead>
                </tbody>
            </table>
        </div>
    );
}

export default adminInfos;
  