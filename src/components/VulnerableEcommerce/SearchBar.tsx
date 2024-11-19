import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onReset: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onReset, 
  handleKeyDown 
}: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={onSearch}>Search</Button>
        <Button variant="secondary" onClick={onReset}>
          Show All Items
        </Button>
      </div>
    </div>
  );
};