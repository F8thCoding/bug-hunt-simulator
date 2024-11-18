import { useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock SQL Database Tables
const mockDatabase = {
  products: [
    { id: 1, name: "Gaming Laptop", price: 999.99, description: "High-performance gaming laptop", stock: 5, cost: 800 },
    { id: 2, name: "Smartphone Pro", price: 599.99, description: "Latest smartphone model", stock: 10, cost: 400 },
    { id: 3, name: "Tablet Air", price: 299.99, description: "Lightweight tablet", stock: 8, cost: 200 },
    { id: 4, name: "SmartWatch Elite", price: 199.99, description: "Advanced fitness tracking", stock: 15, cost: 100 },
    { id: 5, name: "Wireless Earbuds", price: 149.99, description: "Noise-cancelling earbuds", stock: 20, cost: 80 },
    { id: 6, name: "4K Monitor", price: 349.99, description: "Ultra HD display", stock: 12, cost: 250 },
    { id: 7, name: "Mechanical Keyboard", price: 129.99, description: "RGB gaming keyboard", stock: 25, cost: 70 },
    { id: 8, name: "Gaming Mouse", price: 79.99, description: "High DPI gaming mouse", stock: 30, cost: 40 }
  ],
  users: [
    { id: 1, username: "admin", password: "admin123!", role: "admin", email: "admin@store.com" },
    { id: 2, username: "john_doe", password: "password123", role: "user", email: "john@example.com" },
    { id: 3, username: "jane_smith", password: "userpass456", role: "user", email: "jane@example.com" }
  ],
  orders: [],
  store_info: {
    total_revenue: 15000.00,
    total_profit: 5000.00,
    established_date: "2023-01-01"
  }
};

const VulnerableEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(mockDatabase.products);
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  // Simulate vulnerable SQL query execution
  const executeSQLQuery = (query: string) => {
    console.log("Executing SQL query:", query);

    // Handle SQL injection for products
    if (query.includes("SELECT * FROM products")) {
      if (query.includes("'1'='1'")) {
        // SQL injection successful - return all products
        console.log("SQL Injection detected - returning all products");
        setProducts(mockDatabase.products);
        return true;
      }

      // Handle normal product search
      const searchTerm = query.toLowerCase();
      const results = mockDatabase.products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setProducts(results);
      return results.length > 0;
    }

    // Handle SQL injection for users table
    if (query.includes("SELECT * FROM users")) {
      if (query.includes("'1'='1'")) {
        console.log("SQL Injection detected - exposing user data:", mockDatabase.users);
        // In a real app, this would be a security breach exposing user data
        return mockDatabase.users;
      }
    }

    // Handle SQL injection for store_info
    if (query.includes("SELECT * FROM store_info")) {
      if (query.includes("'1'='1'")) {
        console.log("SQL Injection detected - exposing store info:", mockDatabase.store_info);
        return mockDatabase.store_info;
      }
    }

    return null;
  };

  const searchProducts = () => {
    const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%'`;
    const hasResults = executeSQLQuery(sqlQuery);

    if (!hasResults) {
      toast({
        title: "No Results Found",
        description: `No products match "${searchQuery}". Try a different search term.`,
      });
    }
  };

  const resetSearch = () => {
    setProducts(mockDatabase.products);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  const addToCart = (product) => {
    // Check if product is in stock (but don't show stock level to user)
    const productInDb = mockDatabase.products.find(p => p.id === product.id);
    if (productInDb && productInDb.stock > 0) {
      setCart([...cart, product]);
      // Update stock in mock database
      productInDb.stock -= 1;
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "This item is currently out of stock",
      });
    }
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Update store revenue and create order record
    mockDatabase.store_info.total_revenue += total;
    mockDatabase.orders.push({
      id: mockDatabase.orders.length + 1,
      items: cart,
      total,
      date: new Date().toISOString()
    });

    setCart([]);
    toast({
      title: "Purchase Successful",
      description: `Total: $${total.toFixed(2)}`,
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
              onKeyDown={handleKeyDown}
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
              <p className="text-muted-foreground mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
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
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">
                  ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
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