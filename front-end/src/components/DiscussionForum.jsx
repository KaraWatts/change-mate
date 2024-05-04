import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, TextField, Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider, InputAdornment, GlobalStyles } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, Image } from 'react-bootstrap';
import { useState, useEffect, useRef, Fragment } from 'react';
import { useOutletContext } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { getEventPosts, postEventPosts, postPostComment, deleteEventPost, deletePostComment } from '../utilities/EventUtilities';

function DiscussionForum({eventDetails, postType}) {
    const { userProfileData } = useOutletContext();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newReply, setNewReply] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const listRef = useRef(null);

    // Fetches posts and sets them to posts for rendering 
    const fetchPosts = async () => {
        try {
            const postsData = await getEventPosts(eventDetails.id, postType);
            setPosts(postsData); // Update the state with fetched posts
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    

    useEffect(() => {
        fetchPosts();
    }, [eventDetails]);
    
    const handlePost = async () => {
        if (newPost.trim()) {
            const newPostData = {
                event: eventDetails.id,
                context: newPost
            };
            const response = await postEventPosts(eventDetails.id, postType, newPostData)
            setNewPost("");
            setOpenPostDialog(false);
            setPosts(response) // Refreshes posts for rendering new post without refreshing the page
        }
    };

    const handleReply = async (postId) => {
        if (newReply.trim()) {
            const newReplyData = {
                post: postId,
                content: newReply,
                user: userProfileData.id
            };
            const response = await postPostComment(eventDetails.id, postId, newReplyData)
            setNewReply("");
            setReplyingTo(null); // Clear the reply state
            setPosts(response) // Refreshes posts for rendering new comment without refreshing the page
        }
    };

    const deletePost = async (postId) => {
        const response = await deleteEventPost(eventDetails.id, postId)
        setPosts(response)
        
        
    }

    const deleteReply = async (postId, replyId) => {
        const response = await deletePostComment(eventDetails.id, replyId)
        setPosts(response)
    }

    const openNewPostDialog = () => {
        setOpenPostDialog(true);
    };

    const closeNewPostDialog = () => {
        setOpenPostDialog(false);
        setNewPost("");
    };

  //styles for card
  const styles = {
    cardCSS: {
        maxWidth: "none",
        margin: "24px",
        width: "100%",
        maxHeight: "1300px",
    },
};

  // Function to scroll the list to the bottom
  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  // Scroll to bottom whenever new content is added
  useEffect(() => {
    scrollToBottom();
  }, [posts]);

    return (
        <Paper className="cardCSS ms-0 me-0" style={styles.cardCSS}>
            <h2>Discussion Forum</h2>
            <hr/>
            
            <List  ref={listRef} style={{overflow:"scroll"}}>
                {posts && posts.length === 0 ? (
                    <h3 className='d-flex justify-content-center pt-5 pb-4'>
                        This event doesn't have any posts yet
                    </h3>
                ) : (
                    posts.map((post, index) => (
                        <Fragment key={post.id}>
                            <ListItem alignItems="flex-start" sx={{ mb: 1 }}>
                                <ListItemAvatar className='me-3' >
                                    {post.user.image ?
                                    <Avatar  alt={post.user.display_name} src={post.user.image} sx={{ width: 70, height: 70 }} /> : 
                                    <Avatar> <PersonIcon /> </Avatar>
                                    }
                                </ListItemAvatar>
                                
                                <ListItemText
                                    primary={<span className='card-body'>{post.context}</span>}
                                    secondary={<div>
                                    <span className='card-body' >
                                    {`${post.user.display_name} - `} 
                                    </span>
                                    <span className='card-body' style={{fontSize:"1rem"}}>
                                    {new Date(post.timestamp).toLocaleString()}
                                    </span>
                                    </div>
                                    }
                                />
                                <IconButton onClick={() => setReplyingTo(post.id === replyingTo ? null : post.id)} edge="end" aria-label="reply">
                                    <ReplyIcon />
                                </IconButton>
                                {userProfileData.id === post.user.id && <IconButton onClick={() => deletePost(post.id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>}
                            </ListItem>
                            {replyingTo === post.id && (
                                <TextField
                                    label="Write a reply..."
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    minRows={1}
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    margin="normal"
                                />
                            )}
                            {replyingTo === post.id && (
                                <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={() => handleReply(post.id)}>
                                    Reply
                                </Button>
                            )}
                            {post.comments && post.comments.map(reply => (
                                <ListItem sx={{ pl: 4 }} key={reply.id}>
                                    <ListItemText
                                        primary={<span style={{ fontStyle: "italic"}} className='card-body'>{reply.content}</span>}
                                        secondary={`${reply.user.display_name} - ${new Date(reply.timestamp).toLocaleString()}`}
                                    />
                                    {userProfileData.id === post.user.id && <IconButton onClick={() => deleteReply(post.id, reply.id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>}
                                </ListItem>
                            ))}
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))
                )}
            </List>

            <Dialog open={openPostDialog} onClose={closeNewPostDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="post"
                        label="What's on your mind?"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeNewPostDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePost} color="primary" endIcon={<SendIcon />}>
                        Post
                    </Button>
                </DialogActions>
            </Dialog>

            <TextField
                label="Message..."
                variant="outlined"
                fullWidth
                multiline
                minRows={1}
                maxRows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                margin="normal"
                inputstyle={{ fontSize: 40 }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handlePost}>
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                }}
            />
        </Paper>
    );
}

export default DiscussionForum;
