import BooksSingleCard from "./BooksSingleCard"

function BooksCard({ books, handleDeleteBook }) {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book) => (
                <BooksSingleCard book={book} key={book._id} handleDeleteBook={handleDeleteBook} />
            ))}
        </div>
    )
}

export default BooksCard