import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// ! ADD TO CART
export const addToCart = createAsyncThunk("cart/addToCart", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/product/add-to-cart", info);

		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// ! Total Cart Products

export const totalCartProducts = createAsyncThunk("cart/totalCartProducts", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/product/total-cartProducts", info);

		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// ! GET CART PRODUCT

export const getCartProducts = createAsyncThunk("cart/getCartProducts", async (userId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`frontend/product/get-cart-products/${userId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const deleteCartProduct = createAsyncThunk("cart/getCartProducts", async (cartId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.delete(`frontend/product/delete-cartProduct/${userId}`);
		console.log(data);
		return fulfillWithValue(data);
	} catch (e) {
		console.log(e.response.data);
		return rejectWithValue(e.response.data);
	}
});

export const cartReducer = createSlice({
	name: "cart",
	initialState: {
		loader: false,
		cartProducts: [],
		totalCartProductsCount: 0,
		cartProductCount: 0,
		buyProductItem: 0,
		wishListProducts: [],
		wishListCount: 0,
		price: 0,
		successMessage: "",
		errorMessage: "",
		shippingFee: 0,
		outOfStockProducts: [],
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addToCart.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
			state.loader = false;
		});
		builder.addCase(addToCart.fulfilled, (state, {payload}) => {
			state.successMessage = payload.message;
			state.loader = false;
			// state.totalCartProductsCount = state.totalCartProductsCount + 1
			state.cartProductCount = state.cartProductCount + 1;
		});
		builder.addCase(addToCart.pending, (state, {payload}) => {
			state.loader = true;
		});
		builder.addCase(totalCartProducts.fulfilled, (state, {payload}) => {
			state.totalCartProductsCount = payload.payload;
		});
		builder.addCase(totalCartProducts.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
		});
		// ! GET CART PRODUCTS
		builder.addCase(getCartProducts.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.price = payload.payload.price;
			state.cartProducts = payload.payload.cartProducts;
			state.cartProductCount = payload.payload.cartProductCount;
			state.shippingFee = payload.payload.shippingFee;
			state.outOfStockProducts = payload.payload.outOfStockProducts;
			state.buyProductItem = payload.payload.buyProductItem;
		});
		builder.addCase(getCartProducts.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getCartProducts.pending, (state, _) => {
			state.loader = true;
		});
	},
});

export const {messageClear} = cartReducer.actions;
export default cartReducer.reducer;
