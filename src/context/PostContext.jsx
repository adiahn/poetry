import { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Path of Virtue',
      content: 'Through winding roads of life we tread\nGuided by the light of virtue ahead\nEach step we take, each choice we make\nShapes the path that we partake',
      likes: 5,
      comments: [
        { 
          id: 1, 
          text: 'Beautiful message!', 
          author: 'John', 
          date: new Date('2024-02-20'),
          replies: [] 
        }
      ],
      date: new Date('2024-02-20')
    }
  ]);

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

  const addPost = (post) => {
    setPosts([...posts, { 
      ...post, 
      id: posts.length + 1, 
      likes: 0, 
      comments: [], 
      date: new Date() 
    }]);
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

export const usePosts = () => useContext(PostContext);