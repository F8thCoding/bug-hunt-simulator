import { useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Simulated SQL database (mock)
const mockDatabase = {
  products: [
    { id: 1, name: "Laptop", price: 999.99, description: "High-performance <b>laptop</b>", stock: 5 },
    { id: 2, name: "Phone", price: 599.99, description: "Latest <script>alert('XSS vulnerability')</script> smartphone", stock: 10 },
    { id: 3, name: "Tablet", price: 299.99, description: "Lightweight tablet", stock: 8 },
    { id: 4, name: "Smart Watch", price: 199.99, description: "Track your fitness", stock: 15 },
    { id: 5, name: "Wireless Earbuds", price: 149.99, description: "Noise-cancelling earbuds", stock: 20 },
  ],
  orders: [],
  users: [
    { id: 1, username: "admin", password: "password123", role: "admin" },
    { id: 2, username: "user1", password: "userpass", role: "user" },
  ],
  revenue: 0,
};

const VulnerableEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(mockDatabase.products);
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  // Simulate a vulnerable SQL query
  const executeSQLQuery = (query) => {
    console.log("Executing vulnerable SQL query:", query);

    if (query.includes("SELECT * FROM products")) {
      const condition = query.split("WHERE")[1]?.trim();
      if (condition) {
        try {
          const matches = mockDatabase.products.filter((product) => {
            // Simulate SQL LIKE matching with JavaScript RegExp
            const regexCondition = condition
              .replace(/name\s+LIKE\s+'%(.+?)%'/g, (_, term) => `product.name.includes('${term}')`)
              .replace(/description\s+LIKE\s+'%(.+?)%'/g, (_, term) => `product.description.includes('${term}')`)
              .replace(/'1'='1'/g, "true"); // Simulate SQL injection '1'='1'

            return eval(regexCondition); // Evaluate the SQL-like condition
          });

          setProducts(matches.length > 0 ? matches : []);
          return matches.length > 0;
        } catch (err) {
          console.error("Error processing SQL query:", err);
          setProducts([]);
          return false;
        }
      }
    }

    // Default to showing all products if query is invalid
    setProducts(mockDatabase.products);
    return true;
  };

  // Search functionality (vulnerable to SQL injection)
  const searchProducts = () => {
    const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%'`;
    const hasResults = executeSQLQuery(sqlQuery);

    if (!hasResults) {
      toast({
        title: "No Results Found",
        description: `No products match "${searchQuery}". Click the button below to show all products.`,
      });
    }
  };

  // Reset to show all products
  const resetSearch = () => {
    setProducts(mockDatabase.products);
    setSearchQuery("");
  };

  // Handle Enter key press in the search bar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  // Add to cart (vulnerable: no stock validation or checks)
  const addToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  // Checkout functionality (vulnerable: no backend validation)
  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    mockDatabase.revenue += total; // Update fake revenue
    mockDatabase.orders.push({ items: cart, total }); // Save fake order
    setCart([]);
    toast({
      title: "Purchase Successful",
      description: `Total: $${total}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vulnerable E-commerce Store</h1>
          <Badge variant="secondary" className="text-lg">
            <ShoppingCart className="mr-2 h-4 w-4" />
            {cart.length}
          </Badge>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Enable Enter key functionality
            />
            <Button onClick={searchProducts}>Search</Button>
            <Button variant="secondary" onClick={resetSearch}>
              Show All Items
            </Button>
          </div>
        </div>

        {/* Products listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 bg-muted">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-2">${product.price}</p>
              {/* Vulnerable to HTML injection */}
              <p
                className="text-sm text-muted-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <Button className="w-full" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Shopping cart */}
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
