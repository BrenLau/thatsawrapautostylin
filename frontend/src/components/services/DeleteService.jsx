const DeleteService = ({ id }) => {
    const onClick = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:5000/api/services/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const res = await response.json()
        }
    }
    return (
        <button onClick={onClick}>Delete</button>
    )
}

export default DeleteService
