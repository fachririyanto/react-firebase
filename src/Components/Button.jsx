import { Link } from 'react-router-dom';

export const Button = ({ children, className, type, ...props}) => {
    switch (type) {
        case 'link':
            return (
                <Link className={ `flex w-full h-11 bg-black text-white rounded-lg font-semibold justify-center items-center ${className}` } { ...props }>
                    { children }
                </Link>
            )
        default:
            return (
                <button className={ `flex w-full h-11 bg-black text-white rounded-lg font-semibold justify-center items-center ${className}` } { ...props }>
                    { children }
                </button>
            )
    }
}