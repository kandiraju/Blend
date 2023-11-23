import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductAddScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostCode] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const product = {
        name,
        price,
        image,
        address,
        city,
        postcode,
        date,
        time,
        category,
        description,
        countInStock,
      };
      console.log('product', product);
      await createProduct(product).unwrap();

      toast.success('Event added successfully!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add New Event</h1>
        {loadingCreate && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              label='Choose File'
              onChange={uploadFileHandler}
              type='file'
            ></Form.Control>
            {loadingUpload && <Loader />}
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postcode'>
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postcode'
              value={postcode}
              onChange={(e) => setPostCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='date'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type='date'
              placeholder='Enter date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='time'>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
            Add Event
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddScreen;
