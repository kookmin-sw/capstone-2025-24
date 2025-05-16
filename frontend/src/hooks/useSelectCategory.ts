import { useState, useCallback } from 'react';

export const useSelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    handleSelectCategory,
  };
};
