import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";

function ShowBook() {
    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => setBook(res.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="p-4">
            <BackBtn />
            <h1 className="text-3xl my-4">Show Book</h1>
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                <div className="p-4">
                    <span className="text-xl mr-4 text-gray-500">Id</span>
                    <span>{book._id}</span>
                </div>

                <div className="p-4">
                    <span className="text-xl mr-4 text-gray-500">Title</span>
                    <span>{book.title}</span>
                </div>

                <div className="p-4">
                    <span className="text-xl mr-4 text-gray-500">Author</span>
                    <span>{book.author}</span>
                </div>

                <div className="p-4">
                    <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                    <span>{book.publishYear}</span>
                </div>

                <div className="p-4">
                    <span className="text-xl mr-4 text-gray-500">Create Time</span>
                    <span>{new Date(book.createdAt).toString()}</span>
                </div>

                <div className="p-4">
                    <span className="text-xl mr-4 text-gray-500">Update Time</span>
                    <span>{new Date(book.updatedAt).toString()}</span>
                </div>
            </div>
        </div>
    )
}

export default ShowBook