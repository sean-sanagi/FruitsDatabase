import React, { useState, useEffect } from 'react';

function ApiSample() {
    // 第一引数にuseStateの（）内の情報が渡される。
    // 第二引数の値が入り次第、第一引数に譲渡される。
    // useStateを使うことでreturn以降の文章が再評価される。
    const [time, setTime] = useState(new Date());
    const [data, setData] = useState();

    // useEffectを使うことで適当なタイミングで処理を行える。
    // （第二引数に指定した値）
    //  

        useEffect(() => {
            console.log("call useEffect start")
            const intervalId = setInterval(() => {
                setTime(new Date());
                fetch('http://localhost:8080/').then(res => {
                    res.json().then(val => {
                        console.log(val);
                        setData(val);
                    })
                })
            }, 5000);
            console.log("call useEffect end")
        return () => {
            // clearInterval(intervalId);
        };
    }, []);
    
        return (
            <div>
                <h1>現在の時刻</h1>
                <p>{time.toLocaleTimeString()}</p>
                <h2>じゃんけん</h2>
                <p>HAND : {!data ? 'wait...' : data.hand}</p>
                <p></p>
            </div>
        );
    }
export default ApiSample;
