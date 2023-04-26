import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function UnitConcert() {
    const router = useRouter();
    const [concert, setConcert] = useState({});

    useEffect(() => {
        if (router.query.id) {
            axios.get('http://localhost:3000/concerts/' + router.query.id)
                .then(response => setConcert(response.data))
                .catch(error => console.error(error));
        }   
        }, [router.query.id]);
        console.log(concert);
    if (!concert) {
    return <div>Not found</div>;
    }
    
    return (
        <div>
            <h1>{concert.name}</h1>
            <h3>{concert.artist_name}</h3>
            <img src={concert.concert_img} width={250} height={200} />
            <p>Location: {concert.location}</p>
            <h3>Price: {concert.price}€</h3>
        </div>
    );
    }
    
    export default UnitConcert;