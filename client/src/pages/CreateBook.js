import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackBtn from '../components/BackBtn';

function CreateBook({ Toast }) {
    // Input-dan olingan ma'lumotlar \/ Yangi kitob
    const [inputValue, setInputValue] = useState({
        title: "",
        author: "",
        publishYear: "",
    });

    const navigate = useNavigate();

    // Input-dan ma'lumot olish funksiyasi
    function getInputValue(e) {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    };

    // Yangi kitob qo'shish funksiyasi
    function handleSaveBook() {
        axios.post("http://localhost:5000/books", inputValue)
            .then(() => {
                navigate("/");
                Toast.fire({
                    icon: "success",
                    title: "Book created successfully!"
                });
            })
            .catch(error => {
                Toast.fire({
                    icon: "error",
                    title: error.response.data.message
                });
            })
    };


    return (
        <div className='p-4'>
            <BackBtn />
            <h1 className="text-3xl my-4">Create Book</h1>
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="title" className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type="text"
                        value={inputValue.title}
                        onChange={(e) => getInputValue(e)}
                        className='border-2 border-gray-500 px-4 w-full'
                        name='title'
                        id='title'
                    />
                </div>

                <div className="my-4">
                    <label htmlFor="author" className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type="text"
                        value={inputValue.author}
                        onChange={(e) => getInputValue(e)}
                        className='border-2 border-gray-500 px-4 w-full'
                        name='author'
                        id='author'
                    />
                </div>

                <div className="my-4">
                    <label htmlFor="publishYear" className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type="number"
                        value={inputValue.publishYear}
                        onChange={(e) => getInputValue(e)}
                        className='border-2 border-gray-500 px-4 w-full'
                        name='publishYear'
                        id='publishYear'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
            </div>
        </div>
    )
}

export default CreateBook