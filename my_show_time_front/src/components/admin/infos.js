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
    console.log(dataUsers);

    useEffect(() => {
        axios.get('http://localhost:3000/users/?isAdmin=true')
            .then(response => setDataAdmins(response.data.length))
            .then((response) => response)
            .catch(error => console.error(error));
    }, []);
    console.log(dataAdmins);

    
    return (
        <div class="admin_infos">
                <h1>ADMINISTRATOR PANEL</h1>
            <table>
                <tbody>
                    <thead>
                        <tr>
                            <Link href="/admin/categories/">
                            <th colspan="2">CATEGORIES</th>
                            </Link>
                            <td>{ dataCategories }</td>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <Link href="/admin/concerts/">
                            <th colspan="2">CONCERTS</th>
                            </Link>
                            <td>{ dataConcerts }</td>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <Link href="/admin/users/">
                            <th colspan="2">USERS</th>
                            </Link>
                            <td>{ dataUsers }</td>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <Link href="/admin/admins/">
                            <th colspan="2">ADMINS</th>
                            </Link>
                            <td>{ dataAdmins }</td>
                        </tr>
                    </thead>
                </tbody>
            </table>
        </div>
    );
}

export default adminInfos;
  