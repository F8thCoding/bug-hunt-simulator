import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 bg-muted">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-muted-foreground mb-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
      <Button className="w-full" onClick={() => onAddToCart(product)}>
        Add to Cart
      </Button>
    </div>
  );
};