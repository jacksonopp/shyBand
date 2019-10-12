import React from 'react';
import { useParams } from "react-router";
import ReactDOM from "react-dom";
import UserProflie from "./UserProfile";

export default function IdFetch() {
    // let { id } = useParams();
    return (
        <>
            <p>UserProflie {id}</p>
        </>
    )
}
