import React, { useEffect, useState } from 'react';
import './category.css';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, fetchCategories, updateCategory } from '../../redux/categorySlice';
import axios from 'axios';
const Category = () => {
  const dispatch=useDispatch()
  const list =useSelector((store)=>store.category.list)
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [categoryList,setCategoryList]=useState([])
  const [editMode,setEditMdoe]=useState(false)
  const [editId,setEditId]=useState()
  const handleShowModal = () =>{
    setShowModal(true)
    setEditMdoe(false)
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNewCategory('');
    setEditCategory(null);
  };

  const handleSaveCategory = () => {
    dispatch(addCategory(newCategory));
    handleCloseModal();
  };
  const handleEditCategorySave = () => {
    console.log(newCategory)
    dispatch(updateCategory({categoryId:editId, categoryName:newCategory })).then(()=>setEditMdoe(false))

    handleCloseModal();
  };
  

  const handleEditCategory = (id,name) => {
    setEditId(id)
    handleShowModal();
    setNewCategory(name)
    setEditMdoe(true)
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id))
    
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="category-header">
        <h2>Category</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Add Category
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((category, index) => (
            <tr key={index}>
              <td>{category.categoryName}</td>
              <td> {/* Add image column if needed */}</td>
              <td>
                <Button variant="info" onClick={() => handleEditCategory(category._id,category.categoryName)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteCategory(category._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editCategory !== null ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={editMode ? handleEditCategorySave : handleSaveCategory}>
  {editMode ? 'Update Category' : 'Save Category'}
</Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
