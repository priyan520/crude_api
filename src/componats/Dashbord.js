import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashbord = () => {

    const [data, setdata] = useState([]);
    const [title, settitle] = useState('');
    const [body, setbody] = useState('');
    const [conformer , setconformer] = useState(false);
    const [globle , setgloble] = useState("");

 
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(res => { setdata(res.data); console.log(res.data) })
        .catch(err => console.log(err))
    }, [])

    function add_user(){
        if(conformer == false){
            const temp_obj = {
                id: data[data.length - 1].id + 1,
                title: title,
                body: body
            }
    
            setdata([...data , temp_obj])
    
            settitle('');
            setbody('');
        }else{
            const temp_data_updat = data;

            temp_data_updat[globle].title = title;
            temp_data_updat[globle].body = body;

            setdata([...temp_data_updat]);
            settitle('');
            setbody('');
        }
    }

    function update(index) {
        settitle(data[index].title);
        setbody(data[index].body);
        setconformer(true);
        setgloble(index)
    }

    function delete_fun(index) {
        const temp_data = [...data];
        temp_data.splice(index, 1);
        setdata(temp_data);
    }

    return (
        <div className="App">
            
            <div className="">
                <label htmlFor="title">title</label> :-- 
                <input type="text" name="" id="title" className="inp_1" value={title} placeholder='enter title hear' onChange={(e) => settitle(e.target.value)} />
                <br />
                <br />
                <label htmlFor="body">body</label> :--
                <input type="text" name="" id="body" placeholder='enter body hear' value={body} className="inp_2" onChange={(e) => setbody(e.target.value)} />
                <br />
                <br />
                <input type="button" name="" onClick={add_user} value={"Add"} id="" />
            </div>
            <table border={"1"}>
                <tbody>
                <tr>
                    <th>Index</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>updat</th>
                    <th>delete</th>
                </tr>
                {
                    data.map((v, i, arr) => {
                    return (
                        data[i]["id"] != undefined ? 
                        
                            (<tr key={"row" + i}>
                                <td>{i + 1}</td>
                                <td>{v.id}</td>
                                <td>{v.title}</td>
                                <td>{v.body}</td>
                                <td><input type="button" value="updat" onClick={() => update(i)} /></td>
                                <td><input type="button" value="delete" onClick={() => delete_fun(i)} /></td>
                            </tr>)
                        : ""
                    )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Dashbord;