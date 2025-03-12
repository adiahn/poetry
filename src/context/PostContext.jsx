import { createContext, useContext, useState } from 'react';

const PostContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  const addPost = async (post) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: post.title,
          content: post.content
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      const newPost = {
        ...data.data,
        date: new Date(data.data.createdAt || Date.now()),
        comments: [],
        likes: 0
      };

      setPosts(prevPosts => [newPost, ...prevPosts]);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Error creating post');
      return { success: false, error: err.message || 'Failed to create post' };
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts');
      }

      // Transform posts and add random likes
      const transformedPosts = data.data.map(post => ({
        ...post,
        date: new Date(post.createdAt),
        comments: post.comments || [],
        // Generate random number of likes between 500 and 5000
        likes: Math.floor(Math.random() * (5000 - 500 + 1)) + 500
      }));

      setPosts(transformedPosts);
    } catch (err) {
      setError(err.message || 'Error fetching posts');
    }
  };

  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addComment = async (postId, comment) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          body: comment.text
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add comment');
      }

      setPosts(posts.map(post => 
        post._id === postId ? {
          ...post,
          comments: [data.data, ...(post.comments || [])]
        } : post
      ));

      return { success: true };
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.message || 'Error adding comment');
      return { success: false, error: err.message };
    }
  };

  const addCommentReply = (postId, commentId, reply) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: post.comments.map(comment =>
          comment.id === commentId ? {
            ...comment,
            replies: [...comment.replies, {
              id: comment.replies.length + 1,
              ...reply,
              date: new Date(),
              isAdmin: true
            }]
          } : comment
        )
      } : post
    ));
  };

  const addMessage = async (message) => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: message.name,
          email: message.email,
          message: message.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setMessages(prevMessages => [data.data, ...prevMessages]);
      return { success: true };
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Error sending message');
      return { success: false, error: err.message };
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch messages');
      }

      // Transform the messages to ensure dates are properly formatted
      const transformedMessages = data.data.map(message => ({
        ...message,
        date: new Date(message.createdAt || message.date),
        replies: (message.replies || []).map(reply => ({
          ...reply,
          date: new Date(reply.createdAt || reply.date)
        }))
      }));

      setMessages(transformedMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message || 'Error fetching messages');
    }
  };

  const fetchPostComments = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch comments');
      }

      // Update the specific post with its comments
      setPosts(posts.map(post => 
        post._id === postId ? {
          ...post,
          comments: data.data.map(comment => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        } : post
      ));

      return data.data;
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err.message || 'Error fetching comments');
      return [];
    }
  };

  return (
    <PostContext.Provider value={{ 
    posts, 
      addPost, 
      fetchPosts,
      error,
      likePost, 
      addComment,
      addCommentReply,
      fetchPostComments,
      messages,
      addMessage,
      fetchMessages
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}