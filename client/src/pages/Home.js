import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Swal from 'sweetalert2'
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

function Home({ Toast }) {
    const [books, setBooks] = useState([]);
    const [showType, setShowType] = useState(localStorage.getItem("showType") || "table");

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

    // Kitoblar ro'yhatini table ko'rinishiga o'tkazuvchi funksiya
    function handleShowTable() {
        localStorage.setItem("showType", "table")
        setShowType(localStorage.getItem("showType") || "table");
    };

    // Kitoblar ro'yhatini card ko'rinishiga o'tkazuvchi funksiya
    function handleShowCard() {
        localStorage.setItem("showType", "card");
        setShowType(localStorage.getItem("showType") || "card");
    };

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={handleShowTable}>
                    Table
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={handleShowCard}>
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
                books.length > 0 ?
                    showType === "table" ? (<BooksTable books={books} handleDeleteBook={handleDeleteBook} />)
                        : (<BooksCard books={books} handleDeleteBook={handleDeleteBook} />)
                    : <h1 className="text-red-500 text-center text-3xl">Unfortunately, no books were found!</h1>
            }
        </div >
    )
}

export default Home