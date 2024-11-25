// import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ui/product-card";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import useFetchDataCustomHook from "../hooks/server/fetch-data-hook";
import { useAppDispatch } from "../redux/store";
import { setProducts } from "../redux/slices/product-slice";

// const getAllProducts = async (): Promise<any[]> => {
//   const response = await fetch("https://dummyjson.com/products");
//   const data = await response.json();
//   return data.products;
// };

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Queries
  // const {
  //   isLoading,
  //   error,
  //   data: products,
  // } = useQuery<any[]>({ queryKey: ["products"], queryFn: getAllProducts });

  const {
    isLoading: productsLoading,
    error: productsError,
    data: products,
  } = useFetchDataCustomHook<any>({
    queryKey: ["products"],
    url: "https://dummyjson.com/products",
    queryOptions: {
      select: (data) => data.products,
    }
  });

  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categories,
  } = useFetchDataCustomHook<any>({
    queryKey: ["categories"],
    url: "https://dummyjson.com/products/categories",
    queryOptions: {
      select: (data) => data,
    }
  });

  const dispatch =useAppDispatch();
  useEffect(()=>{
    dispatch(setProducts(products));
  },[])
  
  if (productsLoading || categoriesLoading) return <div>Loading...</div>;
  if (productsError) return <div>Error loading products: {productsError.message}</div>;
  if (categoriesError) return <div>Error loading categories: {categoriesError.message}</div>;

  // const filteredProducts = selectedCategory 
  // ? products?.filter((product: any) => product.category === selectedCategory) 
  // : products;

  return (
    <div>
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Select Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Select Category"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories?.map((category: any) => (
          <MenuItem key={category} value={category?.slug}>
            {category?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {products?.map((product: any) => (
        <Grid item xs={2} sm={4} md={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  </div>
  );
}

export default Home;
