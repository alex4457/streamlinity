import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {

  const [items, setItems] = useState([]);
  const [details, setDetails] = useState();
  const [shortName, setShortName] = useState('');

  useEffect(() => {
    axios
      .get("http://stream-restaurant-menu-svc.herokuapp.com/category")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);


  const handleDetails = (short_name) => {

    axios
      .get(`http://stream-restaurant-menu-svc.herokuapp.com/item?category=${short_name}`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));

    setShortName(short_name);
  }



  return (

    <div className="wrapper">
      <div className="menu">
        <h4>Menu Categories</h4>
      </div>
      <div className="list">
        <ul>
          {items.map(({ id, name, short_name }) => (
            <li key={id} onClick={() => handleDetails(short_name)} >{name} - ({short_name})</li>
          ))}
        </ul>
      </div>
      <div className="table">

        {details && (
          <div>
            <h4>Items in Category: ({shortName}) </h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {details.map(({ id, name, description }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        }

      </div>
    </div>

  )
}

export default App;