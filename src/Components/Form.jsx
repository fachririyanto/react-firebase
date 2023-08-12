export const Textbox = ({ className, ...props}) => {
    return (
        <input className="block w-full h-11 border border-gray-400 rounded-lg bg-white px-3" { ...props } />
    )
}