import { useEffect, useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Intentionally vulnerable e-commerce app
const VulnerableEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 999.99, description: "<script>alert('XSS vulnerability')</script>" },
    { id: 2, name: "Phone", price: 599.99, description: "Latest smartphone" },
    { id: 3, name: "Tablet", price: 299.99, description: "10-inch display" },
  ]);
  const [cart, setCart] = useState([]);

  // Vulnerable search implementation (SQL injection possible)
  const searchProducts = () => {
    // Intentionally vulnerable: Direct string concatenation
    const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;
    console.log("Vulnerable SQL query:", query);
  };

  // Vulnerable add to cart (no input validation)
  const addToCart = (product: any) => {
    setCart([...cart, product]);
    // Vulnerable: No sanitization of product data
    eval(`console.log('Added ${product.name} to cart')`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Vulnerable E-commerce Store</h1>
        
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
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <Button
                className="w-full mt-4"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VulnerableEcommerce;