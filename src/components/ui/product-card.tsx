import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



type ProductCardProps= {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const viewProductDetail = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.thumbnail}
          title={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
          <Button onClick={() => viewProductDetail(product.id)}>View Detail</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
