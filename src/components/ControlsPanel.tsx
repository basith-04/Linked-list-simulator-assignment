import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ListType, Operation } from '@/types/linkedList';
import { 
  Plus, 
  Minus, 
  Search, 
  Play, 
  RotateCcw, 
  Trash2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ControlsPanelProps {
  listType: ListType;
  onListTypeChange: (type: ListType) => void;
  onOperation: (operation: Operation) => void;
  isAnimating: boolean;
  nodeCount: number;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  listType,
  onListTypeChange,
  onOperation,
  isAnimating,
  nodeCount
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [keyValue, setKeyValue] = useState<string>('');
  const [deleteKey, setDeleteKey] = useState<string>('');

  const handleOperation = (type: Operation['type'], value?: number, key?: number) => {
    onOperation({
      type,
      value,
      key
    });
    
    // Clear inputs after operation
    if (type.includes('insert')) {
      setInputValue('');
      setKeyValue('');
    } else if (type === 'search') {
      setSearchValue('');
    } else if (type === 'delete-by-key') {
      setDeleteKey('');
    }
  };

  const listTypeOptions = [
    { value: 'singly', label: 'Singly Linked List' },
    // { value: 'doubly', label: 'Doubly Linked List' },
    { value: 'circular', label: 'Circular Linked List' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          Linked List Controls
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* List Type Selection */}
        <div className="space-y-2">
          <Label>List Type</Label>
          <Select value={listType} onValueChange={(value: ListType) => onListTypeChange(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {listTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Insert Operations */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Insert Operations</Label>
          
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="number"
            />
            <Input
              placeholder="After Key"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              type="number"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('insert-beginning', Number(inputValue))}
              disabled={!inputValue || isAnimating}
              className="flex items-center gap-1"
            >
              <ArrowRight className="w-3 h-3" />
              Start
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('insert-end', Number(inputValue))}
              disabled={!inputValue || isAnimating}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              End
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('insert-after-key', Number(inputValue), Number(keyValue))}
              disabled={!inputValue || !keyValue || isAnimating}
              className="flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              After Key
            </Button>
          </div>
        </div>

        <Separator />

        {/* Delete Operations */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Delete Operations</Label>
          
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Delete by key"
              value={deleteKey}
              onChange={(e) => setDeleteKey(e.target.value)}
              type="number"
              className="flex-1"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('delete-beginning')}
              disabled={nodeCount === 0 || isAnimating}
              className="flex items-center gap-1"
            >
              <Minus className="w-3 h-3" />
              Start
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('delete-end')}
              disabled={nodeCount === 0 || isAnimating}
              className="flex items-center gap-1"
            >
              <Minus className="w-3 h-3" />
              End
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('delete-by-key', undefined, Number(deleteKey))}
              disabled={nodeCount === 0 || !deleteKey || isAnimating}
              className="flex items-center gap-1"
            >
              <Minus className="w-3 h-3" />
              By Key
            </Button>
          </div>
        </div>

        <Separator />

        {/* Utility Operations */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Utility Operations</Label>
          
          <div className="flex gap-2">
            <Input
              placeholder="Search value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="number"
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={() => handleOperation('search', Number(searchValue))}
              disabled={!searchValue || nodeCount === 0 || isAnimating}
              className="flex items-center gap-1"
            >
              <Search className="w-3 h-3" />
              Search
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOperation('traverse')}
              disabled={nodeCount === 0 || isAnimating}
              className="flex items-center gap-1"
            >
              <Play className="w-3 h-3" />
              Traverse
            </Button>
            
            
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleOperation('clear')}
              disabled={nodeCount === 0 || isAnimating}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="text-sm text-muted-foreground">
          Nodes: {nodeCount} | Type: {listTypeOptions.find(opt => opt.value === listType)?.label}
          {isAnimating && (
            <div className="flex items-center gap-1 mt-1 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Animation in progress...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};