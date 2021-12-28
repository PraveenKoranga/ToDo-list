import React, { useState, useEffect } from "react";
import "./style.css";

// const getLocalData = ()=>{
//   const lists = localStorage.getItem("mytodolist");
//   if(lists){
//     return JSON.parse({lists});
//   }else{
//     return [];
//   }
// }

const App = () => {
  const [inputData, setInputData] = useState("");
  const [items, setitems] = useState([]);
  const [isEditItem, setisEditItem] = useState("");
  const [toggleButton, settoggleButton] = useState(false);

  // add items
  const addItem = () => {
    if (!inputData) {
      alert("please Fill the data");
    } else if (inputData && toggleButton) {
      setitems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setisEditItem(null);
      settoggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setitems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setisEditItem(index);
    settoggleButton(true);
  };

  // delete items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setitems(updatedItems);
  };

  // remove all items
  const removeAll = () => {
    setitems([]);
  };

  // useEffect(() => {
  //   localStorage.setItem("mytodolist",JSON.stringify({items}));
  // }, [items]);
  return (
    <>
      <div className="main_div">
        <div className="inner_box">
          <figure className="page_image">
            <img src="./images/ToDoImage.jpeg" alt="ToDoImage" />
            <figcaption>Add Your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              name="AddItem"
              id="addItem"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i
                className="fa fa-edit"
                aria-hidden="true"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItems" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fa fa-edit"
                      aria-hidden="true"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="fa fa-trash-alt"
                      aria-hidden="true"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="show_item">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>remove LISt</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
