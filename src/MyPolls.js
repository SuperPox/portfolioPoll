import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import {
    collection,
    getDocs
} from "firebase/firestore";

export default function MyPolls() {
    
    const [polls, setPolls] = useState([]);
    const pollsCollectionRef = collection(db, "polls");

    useEffect(() => {
        const getPolls = async () => 
        {
            const data = await getDocs(pollsCollectionRef);
            setPolls(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };
        getPolls();
    }, []);

    
    return (
        <div>
            <h4>My Polls:</h4>
            <div>
                {polls.map((polls) => {
                    return (
                        <div>
                            {" "}
                            <ul>Title: {polls.title}</ul>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
