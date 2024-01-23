import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

function BackBtn() {
    return (
        <div className='flex'>
            <Link to={"/"} className='bg-sky-800 text-white px-4 rounded-lg w-fit'>
                <BsArrowLeft className='text-2xl' />
            </Link>
        </div>
    )
}

export default BackBtn