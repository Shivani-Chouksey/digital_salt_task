import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Fetch product details
const getProductDetail = async (id: string) => {
  const responseData = await axios.get(`https://dummyjson.com/products/${id}`);
  return responseData.data; // Returning product data
};

// Update product
const updateProduct = async (editData: { id: string; title: string }) => {
  const responseData = await axios.put(
    `https://dummyjson.com/products/${editData.id}`,
    { title: editData.title }
  );
  return responseData.data; // Returning updated product data
};

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Fetch the product details
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id!),
    enabled: !!id, // Ensure query only runs if `id` is available
  });

  // Mutation for updating product
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      setOpen(true); // Assuming `setOpen` is a function to show a modal or notification
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  return (
    <div>
      {mutation.isError && (
        <div>An error occurred: {mutation.error.message}</div>
      )}
      {/* {mutation.isSuccess && <div>Product Updated!</div>} */}

      <Box
        component="section"
        sx={{
          width: 555,
          height: 100,

          borderRadius: 1,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <Card>
          <CardMedia
            sx={{ height: 200 }}
            image={product?.thumbnail}
            title={product?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product?.description}
            </Typography>
          </CardContent>
          <Button
            onClick={() => {
              if (product?.id) {
                // Mutate with updated data
                mutation.mutate({ id: product.id, title: "Updated Name" });
              }
            }}
          >
            {mutation.isPending ? "Updating product..." : "Edit Product"}
          </Button>
        </Card>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product Updated!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductDetail;
