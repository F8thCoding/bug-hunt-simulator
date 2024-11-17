import { useEffect, useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Intentionally vulnerable e-commerce app with SQL injection and XSS vulnerabilities
const VulnerableEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 999.99, description: "<script>alert('XSS vulnerability')</script>", stock: 5 },
    { id: 2, name: "Phone", price: 599.99, description: "Latest smartphone", stock: 10 },
    { id: 3, name: "Tablet", price: 299.99, description: "10-inch display", stock: 8 },
    { id: 4, name: "Smart Watch", price: 199.99, description: "Fitness tracker", stock: 15 },
    { id: 5, name: "Wireless Earbuds", price: 149.99, description: "Noise cancelling", stock: 20 },
    { id: 6, name: "Gaming Console", price: 499.99, description: "4K gaming", stock: 3 },
    { id: 7, name: "Camera", price: 799.99, description: "Mirrorless camera", stock: 6 },
    { id: 8, name: "Speaker", price: 249.99, description: "Bluetooth speaker", stock: 12 },
    { id: 9, name: "Monitor", price: 349.99, description: "27-inch 4K", stock: 7 },
    { id: 10, name: "Keyboard", price: 129.99, description: "Mechanical keyboard", stock: 25 },
    { id: 11, name: "Mouse", price: 79.99, description: "Gaming mouse", stock: 30 },
    { id: 12, name: "Headphones", price: 179.99, description: "Over-ear headphones", stock: 18 },
    { id: 13, name: "Printer", price: 299.99, description: "Color laser printer", stock: 4 }
  ]);
  const [cart, setCart] = useState([]);
  const [userBalance, setUserBalance] = useState(1000); // Vulnerable: Client-side balance
  const { toast } = useToast();
  const { user } = useAuth();

  // Vulnerable search implementation (SQL injection possible)
  const searchProducts = () => {
    // Intentionally vulnerable: Direct string concatenation
    const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%'`;
    console.log("Vulnerable SQL query:", query);
    
    // Simulate filtering (vulnerable to XSS)
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filtered);
  };

  // Vulnerable add to cart (no input validation)
  const addToCart = (product) => {
    // Vulnerable: No stock validation
    setCart([...cart, product]);
    eval(`console.log('Added ${product.name} to cart')`); // Vulnerable: eval usage
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  // Vulnerable checkout process
  const checkout = () => {
    // Vulnerable: No server-side validation
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (total <= userBalance) {
      setUserBalance(userBalance - total);
      setCart([]);
      toast({
        title: "Purchase Successful",
        description: `Your order total was $${total}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: "You don't have enough funds",
      });
    }
  };

  // Vulnerable: Allows HTML injection
  const renderDescription = (description) => {
    return { __html: description };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vulnerable E-commerce Store</h1>
          <div className="flex items-center gap-4">
            <div className="text-lg">Balance: ${userBalance}</div>
            <Badge variant="secondary" className="text-lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {cart.length}
            </Badge>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={searchProducts}>Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 bg-muted"
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-2">${product.price}</p>
              <div 
                className="mb-2"
                dangerouslySetInnerHTML={renderDescription(product.description)} 
              />
              <p className="text-sm text-muted-foreground mb-4">
                Stock: {product.stock}
              </p>
              <Button
                className="w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 p-4 border rounded-lg bg-muted">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">
                  ${cart.reduce((sum, item) => sum + item.price, 0)}
                </span>
              </div>
              <Button className="w-full" onClick={checkout}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VulnerableEcommerce;