import { useState, useCallback } from "react";

export const useSelection = () => {
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());

  const toggleSelection = useCallback((leadId: number) => {
    setSelectedLeads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedLeads(new Set());
  }, []);

  const selectAll = useCallback((leadIds: number[]) => {
    setSelectedLeads(new Set(leadIds));
  }, []);

  const isSelected = useCallback((leadId: number) => {
    return selectedLeads.has(leadId);
  }, [selectedLeads]);

  return {
    selectedLeads: Array.from(selectedLeads),
    selectedCount: selectedLeads.size,
    toggleSelection,
    clearSelection,
    selectAll,
    isSelected
  };
};
