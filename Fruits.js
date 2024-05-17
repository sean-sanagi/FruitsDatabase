import React, { useState, useEffect } from 'react';
import './Fruits.css';

function Fruits() {
  // dataには何が入る？
  // setDataの呼び出し箇所に注目（※１）
  const [data, setData] = useState(/* ここに初期値。無しだとundefinedになる */);

  useEffect(() => {
    console.log("call useEffect START");
    fetch('http://localhost:8080/fruits').then(response => {
      response.json().then(value => {
        // ※２
        console.log(value);
        setData(value);
      })
      // catchを入れることで、サーバに接続できなくなったときに画面にエラーを出す代わりにコンソールに出す
    })
      .catch(error => {
        console.log(error);
        setData([]);
      });

    console.log("call useEffect END");
    return () => { };
  }, []);

  const fruitData = data && data.map((item, index) => {
    return (<tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.stock}</td>
      <td><button name='delete' onClick={() => deleteFruit(item)}>削除</button></td>
      </tr>);
  })

  // 在庫情報を追加する関数
  const addStock = (formData) => {
    fetch('http://localhost:8080/fruits/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          // 在庫情報が正常に追加された場合、フルーツデータを再取得して更新する
          return fetchFruitData();
        } else {
          // エラーメッセージを表示するなどの処理を行う
          console.error('Failed to add stock');
        }
      })
      .catch(error => {
        console.error('Error adding stock:', error);
      });
  }

  // フルーツデータを再取得する関数
  const fetchFruitData = () => {
    fetch('http://localhost:8080/fruits')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching fruit data:', error);
        setData([]);
      });
  }

  // フォームから送信された際の処理
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newStock = {
      name: formData.get('name'),
      price: parseInt(formData.get('price')),
      stock: parseInt(formData.get('stock'))
    };
    addStock(newStock);
  }

  // データの削除
  const deleteFruit = (item) => {
    fetch('http://localhost:8080/fruits/delete', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => {
        if (response.ok) {
          console.log(data)
          return fetchFruitData();
        } else {
          console.log("failed to delete the data")
        }
      })
      .catch(error => {
        console.error('Error delete stock:', error);
      });
  }





  return (
    <div>
      <h3>フルーツ在庫情報</h3>
      <table border="1">
        <thead>
          <tr>
            <th>商品コード</th>
            <th>商品名</th>
            <th>単価</th>
            <th>在庫数</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {fruitData}
        </tbody>
      </table>
      <h3>在庫情報追加</h3>
      <form onSubmit={handleSubmit}>
        <label>
          商品名:
          <input type="text" name="name" required />
        </label>
        <label>
          単価:
          <input type="number" name="price" required />
        </label>
        <label>
          在庫数:
          <input type="number" name="stock" required />
        </label>
        <button type="submit">追加</button>
      </form>
    </div>
  );
}

export default Fruits;
