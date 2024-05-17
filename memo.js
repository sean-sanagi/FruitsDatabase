import React, { useState, useMemo } from 'react';

const MemoApp = () => {
    const [text, setText] = useState('');
    const [memos, setMemos] = useState([]);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const addMemo = () => {
        if (text.trim()) {
            const newMemo = {
                id: Math.random().toString(36).substr(2, 9),
                text: text,
            };
            setMemos([...memos, newMemo]);
            setText('');
        }
    };

    const deleteMemo = (id) => {
        setMemos(memos.filter((memo) => memo.id !== id));
    };

    // Memoize the list of rendered memos to prevent unnecessary re-renders
    const renderedMemos = useMemo(() => {
        return memos.map((memo) => (
            <li key={memo.id}>
                {memo.text}
                <button onClick={() => deleteMemo(memo.id)}>Delete</button>
            </li>
        ));
    }, [memos]);

    return (
        <div className='container text-center'>
            <h1 className="row align-items-start">メモ帳</h1>
            <input type="text" className='text' value={text} onChange={handleTextChange}
            placeholder='Type memo here' required/>
            <button onClick={addMemo} className='btn btn-warning my-3' >追加</button>
            <ol className='ol' >{renderedMemos}</ol>
        </div>
    );
};

export default MemoApp;
