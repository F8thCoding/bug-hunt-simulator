import { Button } from "@/components/ui/button";

interface CartProps {
  cart: any[];
  onCheckout: () => void;
}

export const Cart = ({ cart, onCheckout }: CartProps) => {
  if (cart.length === 0) return null;

  return (
    <div className="mt-8 p-4 border rounded-lg bg-muted">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-bold">Total:</span>
          <span className="font-bold">
            ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </span>
        </div>
        <Button className="w-full" onClick={onCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};