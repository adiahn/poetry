import { createContext, useContext, useState } from 'react';

const PostContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      message: 'Your poems have truly inspired me. Would love to collaborate!',
      date: new Date('2024-02-20'),
      read: false,
      replies: []
    }
  ]);

  const addPost = async (post) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/posts', {
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

      setPosts(prevPosts => [...prevPosts, data.data]);
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

      setPosts(data.data);
    } catch (err) {
      setError(err.message || 'Error fetching posts');
    }
  };

  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, { 
          id: post.comments.length + 1, 
          ...comment,
          date: new Date(),
          replies: []
        }]
      } : post
    ));
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

  const addMessage = (message) => {
    setMessages([...messages, { 
      id: messages.length + 1, 
      ...message, 
      date: new Date(),
      read: false 
    }]);
  };

  const addMessageReply = (messageId, reply) => {
    setMessages(messages.map(message =>
      message.id === messageId ? {
        ...message,
        replies: [...(message.replies || []), {
          id: (message.replies?.length || 0) + 1,
          text: reply,
          date: new Date(),
          isAdmin: true
        }]
      } : message
    ));
  };

  const markMessageAsRead = (messageId) => {
    setMessages(messages.map(message =>
      message.id === messageId ? { ...message, read: true } : message
    ));
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
      messages,
      addMessage,
      addMessageReply,
      markMessageAsRead
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}