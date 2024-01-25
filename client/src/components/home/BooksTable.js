import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

function BooksTable({ books, handleDeleteBook }) {
    return (
        <table className="w-full border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600 rounded-md">Num.</th>
                    <th className="border border-slate-600 rounded-md">Title</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                    <th className="border border-slate-600 rounded-md">Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book, index) => (
                        <tr key={book._id} className="h-8">
                            <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                            <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
                            <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
                            <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.publishYear}</td>
                            <td className="border border-slate-700 rounded-md text-center">
                                <div className="flex justify-center gap-x-4">
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className="text-2xl text-green-800" />
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                                    </Link>
                                    <button onClick={() => handleDeleteBook(book._id)}>
                                        <MdOutlineDelete className="text-2xl text-red-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default BooksTable