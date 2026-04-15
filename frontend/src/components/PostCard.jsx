import React, { useState } from 'react';
import Modal from 'react-modal';
import { editPost, deletePost } from '../api/client';

Modal.setAppElement('#root');

const modalCustomStyles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'relative',
    width: '600px',
    inset: 'unset' 
  }
}

export function PostCard({ post, onEdit, onDelete }) {

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  
  const [editError, setEditError] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const toggleEditModal = () => {
    setNewTitle(post.post_title);
    setNewContent(post.post_content);
    setIsEdit(!isEdit);
  };

  const toggleDeleteModal = () => setIsDelete(!isDelete);

  async function handleEdit(event) {
    event.preventDefault();
    setEditError(null);

    const post_id = post.post_id;

    if (!post_id) {
      setEditError('Could not edit post - wrong/missing post_id');
      return;
    }
    try {
      await editPost(newTitle, newContent, post_id);
      onEdit({ 
        ...post, 
        post_title: newTitle, 
        post_content: newContent 
      });
      setIsEdit(false);

    } catch (e) {
      setEditError(e.message);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    setDeleteError(null);
    
    const post_id = post.post_id;

    if (!post_id) {
      setDeleteError('Could not delete post - wrong/missing post_id');
      return;
    }
    try {
      await deletePost(post_id);
      onDelete(post_id);
      setIsDelete(false);
      
    } catch (e) {
      setDeleteError(e.message);
      
    }
  }
  
  return (
    <article style={{border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>{post.post_title}</h3>
        <strong>#{post.post_id}</strong>
      </div>
      <p style={{ fontSize: "13px"}}>
        <strong>Published: </strong>
        <time dateTime={post.created_date}>{post.created_date} UTC</time>
      </p>
      <p>{post.post_content}</p>
      <div id='edit-modal' >
        <button onClick={toggleEditModal} id='edit-btn' type='button'>
          Edit
        </button>
        {isEdit && (
          <Modal
            isOpen={isEdit}
            onRequestClose={() => setIsEdit(false)}
            ariaHideApp={!isEdit}
            style={modalCustomStyles}
          >
            <form>
              <div>
                <input
                  id='edit-post-content'
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                ></input>
              </div>
              <div>
                <textarea
                  id="post-content"
                  type="text"
                  value={newContent}
                  style={{width: "600px", resize: 'none'}}
                  rows={10}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>
              <button type='submit' onClick={handleEdit} style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto'}}>Save Edit</button>
            </form>
            
            <button onClick={() => setIsEdit(false)}>No</button>
            {editError && <p style={{ color: 'red' }}>{editError}</p>}
          </Modal>
        )}
      </div>
      <div id='delete-modal'>
        <button
          onClick={toggleDeleteModal}
          id='edit-btn'
          type='button'
        >
          Delete
        </button>
        {isDelete && (
            <Modal
              isOpen={isDelete}
              onRequestClose={() => setIsDelete(false)}
              ariaHideApp={!isDelete}
              style={modalCustomStyles}
            >
              <div>
                <p>Are you sure you want to delete this blog post?</p>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={() => setIsDelete(false)}>No</button>
              </div>
              {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
            </Modal>
          )}
      </div> 
    </article>

    
  );
}