import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashbord = () => {

    const [data, setdata] = useState([]);
    const [userdata , setuserdata] = useState([]); 
    const [title, settitle] = useState('');
    const [body, setbody] = useState('');
    const [owner , setowner] = useState('')
    const [conformer , setconformer] = useState(false);
    const [globle , setgloble] = useState("");

 
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(res => { setdata(res.data); console.log(res.data) })
        .catch(err => console.log(err))

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {setuserdata(res.data); console.log(res.data) })
        .catch(err => console.log(err))

     }, [])

    function add_user(){
        if(conformer == false){
            const temp_obj = {
                id: data[data.length - 1].id + 1,
                title: title,
                body: body,
                owner: owner
            }
    
            setdata([...data , temp_obj])
    
            settitle('');
            setbody('');
            setowner('')
        }else{
            const temp_data_updat = data;

            temp_data_updat[globle].title = title;
            temp_data_updat[globle].body = body;
            temp_data_updat[globle].owner = owner;

            setdata([...temp_data_updat]);
            settitle('');
            setbody('');
            setowner('');
        }
    }

    function update(index) {
        settitle(data[index].title);
        setbody(data[index].body);
        if(data[index].owner == undefined){
            for(var i = 0 ; i < 10 ; i ++){
                if(userdata[i].id == data[index].userId){
                    setowner(userdata[i].name);
                }            
            }
        }else{
            setowner(data[index].owner)
        }
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
                <label htmlFor="owner">owner</label> :-- 
                <input type="text" name="" id="owner" className="inp_1" value={owner} placeholder='enter owner name hear' onChange={(e) => setowner(e.target.value)} />
                <br />
                <br />
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
                    <th>Owenr</th>
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
                                <td>{ v.owner == undefined ? userdata.map((v_2 , i_2 ,arr_2) => {
                                    return(
                                        v_2.id == data[i].userId ? v_2.name : ""
                                    )
                                }) : v.owner}</td>
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