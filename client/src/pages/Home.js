import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Swal from 'sweetalert2'
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

function Home({ Toast }) {
    const [books, setBooks] = useState([]);
    const [showType, setShowType] = useState("table");

    // Barcha kitoblarni olish funksiyasi
    function getBook() {
        axios.get("http://localhost:5000/books")
            .then(res => {
                setBooks(res.data.data);
            }).catch(error => console.log(error))
    };

    useEffect(() => {
        getBook();
    }, []);

    // Kitobni o'chirib yuborish funksiyasi
    function handleDeleteBook(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/books/${id}`)
                    .then(() => {
                        getBook();
                        Toast.fire({
                            icon: "success",
                            title: "Book deleted successfully!"
                        });
                    })
                    .catch(error => console.log(error))
            };
        });
    };

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType("table")}>
                    Table
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType("card")}>
                    Card
                </button>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Book List</h1>
                <Link to={"/books/create"}>
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>

            {
                showType === "table" ? (<BooksTable books={books} handleDeleteBook={handleDeleteBook} />)
                    : (<BooksCard books={books} handleDeleteBook={handleDeleteBook} />)
            }
        </div>
    )
}

export default Home