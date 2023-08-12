export const Alert = ({ message, type }) => {
    let color = ''

    switch (type) {
        case 'success':
            color = 'bg-green-500'
            break
        case 'error':
            color = 'bg-red-500'
            break
        case 'warning':
            color = 'bg-yellow-500'
            break
        default:
            color = 'bg-red-500'
            break
    }

    return (
        <div className={ color + " mb-3 p-3 text-white text-sm rounded-lg text-center" }>
            { message }
        </div>
    )
}