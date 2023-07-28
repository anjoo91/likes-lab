
import {Card} from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard'


export default function PostGallery({posts, itemsPerRow, isProfile}){

    const postCards = posts.map((post) => {
        return <PostCard post={post} key={post._id} isProfile={isProfile}/> 
    })

    return (
       <Card.Group itemsPerRow={itemsPerRow}>
        {postCards}
       </Card.Group>
    )
}