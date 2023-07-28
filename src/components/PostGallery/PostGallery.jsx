
import {Card} from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard'


export default function PostGallery({posts, itemsPerRow, isProfile, addLike, removeLike, user}){

    const postCards = posts.map((post) => {
        return <PostCard 
                    post={post} 
                    key={post._id} 
                    isProfile={isProfile}
                    addLike={addLike}
                    removeLike={removeLike}
                    user={user}
                /> 
    })

    return (
       <Card.Group itemsPerRow={itemsPerRow}>
        {postCards}
       </Card.Group>
    )
}