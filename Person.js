import React, { useEffect, useState } from "react";


function Person() {
    const [person, setPerson] = useState()

    useEffect(() => {
        fetch("http://localhost:8080/")
            .then(res => {
                res.json().then(val => {
                    console.log(val);
                    setPerson(val);
                })
            })
    }, []);

    return (
        <div>
            <h1>Person</h1>
            <p>id : {!person ? "empty" : person.id}</p>
            <p>name : {!person ? "empty" : person.name}</p>
            <p>email : {!person ? "empty" : person.email}</p>
            <p>phone : {!person ? "empty" : person.phone}</p>
            <p>address : {!person ? "empty" : person.address}</p>
            <p>updatetime : {!person ? "empty" : person.updatetime}</p>

        </div>
    )
}
export default Person; 