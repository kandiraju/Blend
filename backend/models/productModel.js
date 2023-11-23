import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    postcode: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number],
      },
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },

    reviews: [reviewSchema],
    rating: {
      type: Number,

      default: 0,
    },
    numReviews: {
      type: Number,

      default: 0,
    },
    price: {
      type: Number,

      default: 0,
    },
    countInStock: {
      type: Number,

      default: 0,
    },
    date: {
      type: String,
    },
    time: {
      type: String, // You can adjust the type based on your needs
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
