import React, { useEffect, useState } from "react";
import todo from "./images/todolist.svg";

const get_item_from_strorage = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }
}
const Todo = () => {
    const [inputdata, setinputdata] = useState("");
    const [items, setitems] = useState(get_item_from_strorage());
    const [toggle, settoggle] = useState(true);
    const [edit_item, set_edit_item] = useState(null);
    const additem = () => {
        if (inputdata === "") {
            alert("Plz Write the item");
        }
        else if (inputdata && !toggle) {
            setitems(
                items.map((ele) => {
                    if (ele.id === edit_item) {
                        return { ...ele, name: inputdata };
                    }
                    return ele;
                })
            )
            settoggle(true);
            setinputdata("");
            set_edit_item(null);
        }
        else {
            const allinputdata = { id: new Date().getTime().toString(), name: inputdata }
            setitems([...items, allinputdata]);
            setinputdata("");
        }
    }
    const deleteitem = (index) => {
        const updateitem = items.filter((ele) => {
            return (index !== ele.id);
        })
        setitems(updateitem);
    }
    const delall = () => {
        if (items.length === 0) {
            alert("There is no item to delete");
        }
        else {
            const x = window.confirm("Are Your Sure Wish to delete all items?")
            if (x === true) { setitems([]); }
        }
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items])
    const edititem = (id) => {
        let chnaged_item = items.find((ele) => {
            return ele.id === id;
        })
        settoggle(false);
        setinputdata(chnaged_item.name);
        set_edit_item(id);
    }
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo"></img>
                        <figcaption>Make Your Todo List 📝</figcaption>
                        <h3 className="credits">Created By Anurag Mohit 😁</h3>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="Add Items..." value={inputdata} onChange={(e) => { setinputdata(e.target.value) }}></input>
                        {toggle ? <i className="fa fa-plus add-btn" title="Add Item" onClick={additem}></i> : <i className="far fa-edit add-btn" title="Update Item" onClick={additem}></i>}
                        {/* <i className="fa fa-plus add-btn" title="Add Item" onClick={additem}></i> */}
                    </div>
                    <div className="showItems">
                        {
                            items.map((ele) => {
                                return (
                                    <div className="eachItem" key={ele.in}>
                                        <h3>{ele.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => edititem(ele.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteitem(ele.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="eachItem">
                            <h3>Apple</h3>
                            <i className="far fa-trash-alt add-btn" title="delete item"></i>
                        </div> */}
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={delall}><span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;