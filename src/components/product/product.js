import React, { useEffect, useState } from "react";
import "./product.css"; // Import your product-specific styles if needed
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../redux/productSlice";
import axios from "axios";
import { fetchCategories } from "../../redux/categorySlice";
const Product = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((store) => store.category.list);
  const productList = useSelector((store) => store.product.list);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [selectedCategory,setSelectedCategory]=useState("")

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState();

  const handleShowModal = () => {
    setShowModal(true);
    setEditMode(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct("");
    setEditProduct(null);
  };

  const handleSaveProduct = () => {
    console.log(newProduct, selectedCategory)
    dispatch(addProduct({ categoryName: selectedCategory, productName: newProduct }));
    handleCloseModal();
  };
  

  const handleEditProductSave = () => {
    dispatch(
      updateProduct({ productId: editId, productName: newProduct ,categoryName:selectedCategory})
    ).then(() => setEditMode(false));
    handleCloseModal();
  };

  const handleEditProduct = (id, name,category) => {
    setEditId(id);
    handleShowModal();
    setNewProduct(name);
    setSelectedCategory(category)
    setEditMode(true);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="product-header">
        <h2>Product</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Add Product
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td> {product.categoryName}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() =>
                    handleEditProduct(product._id, product.productName,product.categoryName)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
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
          <Modal.Title>
            {editProduct !== null ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProduct">
              <Form.Label>Select category</Form.Label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryList.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              <br></br>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editMode ? handleEditProductSave : handleSaveProduct}
          >
            {editMode ? "Update Product" : "Save Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
