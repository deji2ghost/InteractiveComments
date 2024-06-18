
export const fetchComments = async() => {
    const response = await fetch('http://localhost:8000/comments')
    const data = await response.json()
    console.log(data)
    return data.map((data: any)=> {
        return({
            ...data, headId: data.id, isEditing: false, replies: [...data.replies.map((reply: any)=> {
                return ({
                    ...reply,
                    headId: data.id, isEditing: false
                })
            })]
        })
    })
}