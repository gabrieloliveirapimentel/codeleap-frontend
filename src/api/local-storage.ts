export interface Comment {
    username: string;
    text: string;
}

export interface LikeData {
    count: number;
    users: string[];
  }
  
function getComments(postId: number): Comment[] {
    const comments = localStorage.getItem(`comments_${postId}`);
    
    return comments ? JSON.parse(comments) : [];
}
  
function addComment(postId: number, comment: Comment) {
    const comments = getComments(postId);

    comments.push(comment);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
}

async function deleteComment(postId: number, comment: Comment) {
    const comments = getComments(postId);

    const updatedComments = comments.filter(
        (c) => c.username !== comment.username || c.text !== comment.text
    );
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
}

function getLikes(postId: number): LikeData {
    const data = localStorage.getItem(`likes_${postId}`);

    return data ? JSON.parse(data) : { count: 0, users: [] };
}

function hasUserLiked(postId: number, username: string): boolean {
    const likes = getLikes(postId);

    return likes.users.includes(username);
}

function toggleLike(postId: number, username: string) {
    const likes = getLikes(postId);
    
    if (hasUserLiked(postId, username)) {
        likes.count -= 1;
        likes.users = likes.users.filter(user => user !== username);
    } else {
        likes.count += 1;
        likes.users.push(username);
    }

    localStorage.setItem(`likes_${postId}`, JSON.stringify(likes));
    return likes;
}

function removeLocalData(postId: number) {
    localStorage.removeItem(`likes_${postId}`);
    localStorage.removeItem(`comments_${postId}`);
}

export {getComments, addComment, deleteComment, getLikes, hasUserLiked, toggleLike, removeLocalData}