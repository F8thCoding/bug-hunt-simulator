import { useState } from "react";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/VulnerableEcommerce/SearchBar";
import { ProductCard } from "@/components/VulnerableEcommerce/ProductCard";
import { Cart } from "@/components/VulnerableEcommerce/Cart";
import { ExposedUserData } from "@/components/VulnerableEcommerce/ExposedUserData";
import { ExposedStoreInfo } from "@/components/VulnerableEcommerce/ExposedStoreInfo";
import { Product, User, StoreInfo } from "@/types/ecommerce";

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
  store_info: {
    total_revenue: 15000.00,
    total_profit: 5000.00,
    established_date: "2023-01-01",
    bank_account: "1234-5678-9012-3456",
    admin_notes: "Remember to update prices next week"
  }
};

const VulnerableEcommerce = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>(mockDatabase.products);
  const [exposedUsers, setExposedUsers] = useState<User[] | null>(null);
  const [exposedStoreInfo, setExposedStoreInfo] = useState<StoreInfo | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();

  const executeSQLQuery = (query: string) => {
    console.log("Raw SQL query:", query);
    
    // Reset exposed data
    setExposedUsers(null);
    setExposedStoreInfo(null);
    
    // Check for users table injection
    if (query.toLowerCase().includes("users")) {
      console.log("Exposing users data");
      setExposedUsers(mockDatabase.users);
      return;
    }
    
    // Check for store_info table injection
    if (query.toLowerCase().includes("store")) {
      console.log("Exposing store info");
      setExposedStoreInfo(mockDatabase.store_info);
      return;
    }

    // Default to searching products
    const results = mockDatabase.products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const searchProducts = () => {
    const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%' OR description LIKE '%${searchQuery}%'`;
    executeSQLQuery(sqlQuery);

    if (searchResults.length === 0) {
      toast({
        title: "No Results Found",
        description: `No items match "${searchQuery}". Try a different search term.`,
      });
    }
  };

  const resetSearch = () => {
    setSearchResults(mockDatabase.products);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  const addToCart = (product: Product) => {
    const productInDb = mockDatabase.products.find(p => p.id === product.id);
    if (productInDb && productInDb.stock > 0) {
      setCart([...cart, product]);
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
    mockDatabase.store_info.total_revenue += total;
    setCart([]);
    toast({
      title: "Purchase Successful",
      description: `Total: $${total.toFixed(2)}`,
    });
  };

  const renderSearchResults = () => {
    if (exposedUsers) {
      return <ExposedUserData users={exposedUsers} />;
    }

    if (exposedStoreInfo) {
      return <ExposedStoreInfo info={exposedStoreInfo} />;
    }

    if (!searchResults.length) return <p>No results found</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    );
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

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={searchProducts}
          onReset={resetSearch}
          handleKeyDown={handleKeyDown}
        />

        {renderSearchResults()}

        <Cart cart={cart} onCheckout={checkout} />
      </main>
      <Footer />
    </div>
  );
};

export default VulnerableEcommerce;
