import { useState, useCallback } from 'react';
import { ListNode, ListType, LinkedListState, Operation } from '@/types/linkedList';
import { toast } from 'sonner';

export const useLinkedList = () => {
  const [state, setState] = useState<LinkedListState>({
    head: null,
    tail: null,
    nodes: [],
    type: 'singly',
    highlightedNode: null,
    isAnimating: false
  });

  const createNode = useCallback((value: number): ListNode => ({
    id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    value,
    next: null,
    prev: null
  }), []);

  const updateConnections = useCallback((nodes: ListNode[], type: ListType) => {
    if (nodes.length === 0) return [];

    const updatedNodes = nodes.map(node => ({ ...node, next: null, prev: null }));

    // Set up connections based on list type
    for (let i = 0; i < updatedNodes.length; i++) {
      // Set next pointers
      if (i < updatedNodes.length - 1) {
        updatedNodes[i].next = updatedNodes[i + 1];
      }

      // Set prev pointers for doubly linked lists
      if (type === 'doubly' && i > 0) {
        updatedNodes[i].prev = updatedNodes[i - 1];
      }
    }

    // Handle circular connections
    if (type === 'circular') {
      if (updatedNodes.length > 0) {
        updatedNodes[updatedNodes.length - 1].next = updatedNodes[0];
        updatedNodes[0].prev = updatedNodes[updatedNodes.length - 1];
      }
    }

    return updatedNodes;
  }, []);

  const setAnimating = useCallback((isAnimating: boolean) => {
    setState(prev => ({ ...prev, isAnimating }));
  }, []);

  const setHighlight = useCallback((nodeId: string | null) => {
    setState(prev => ({ ...prev, highlightedNode: nodeId }));
  }, []);

  const insertAtBeginning = useCallback(async (value: number) => {
    setAnimating(true);
    const newNode = createNode(value);
    
    setState(prev => {
      const newNodes = [newNode, ...prev.nodes];
      const updatedNodes = updateConnections(newNodes, prev.type);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });

    toast.success(`Inserted ${value} at the beginning`);
    
    setTimeout(() => setAnimating(false), 500);
  }, [createNode, updateConnections, setAnimating]);

  const insertAtEnd = useCallback(async (value: number) => {
    setAnimating(true);
    const newNode = createNode(value);
    
    setState(prev => {
      const newNodes = [...prev.nodes, newNode];
      const updatedNodes = updateConnections(newNodes, prev.type);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });

    toast.success(`Inserted ${value} at the end`);
    
    setTimeout(() => setAnimating(false), 500);
  }, [createNode, updateConnections, setAnimating]);


  const deleteFromBeginning = useCallback(async () => {
    setState(prev => {
      if (prev.nodes.length === 0) {
        toast.error('List is empty');
        return prev;
      }

      setAnimating(true);
      const deletedValue = prev.nodes[0].value;
      const newNodes = prev.nodes.slice(1);
      const updatedNodes = updateConnections(newNodes, prev.type);
      
      toast.success(`Deleted ${deletedValue} from the beginning`);
      
      setTimeout(() => setAnimating(false), 500);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });
  }, [updateConnections, setAnimating]);

  const deleteFromEnd = useCallback(async () => {
    setState(prev => {
      if (prev.nodes.length === 0) {
        toast.error('List is empty');
        return prev;
      }

      setAnimating(true);
      const deletedValue = prev.nodes[prev.nodes.length - 1].value;
      const newNodes = prev.nodes.slice(0, -1);
      const updatedNodes = updateConnections(newNodes, prev.type);
      
      toast.success(`Deleted ${deletedValue} from the end`);
      
      setTimeout(() => setAnimating(false), 500);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });
  }, [updateConnections, setAnimating]);


  const searchNode = useCallback(async (value: number) => {
    const nodeIndex = state.nodes.findIndex(node => node.value === value);
    
    if (nodeIndex === -1) {
      toast.error(`Value ${value} not found in the list`);
      return;
    }

    const nodeId = state.nodes[nodeIndex].id;
    setHighlight(nodeId);
    toast.success(`Found ${value} at position ${nodeIndex}`);
    
    // Clear highlight after 3 seconds
    setTimeout(() => setHighlight(null), 3000);
  }, [state.nodes, setHighlight]);

  const traverseList = useCallback(async () => {
    if (state.nodes.length === 0) {
      toast.error('List is empty');
      return;
    }

    setAnimating(true);
    
    for (let i = 0; i < state.nodes.length; i++) {
      setHighlight(state.nodes[i].id);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setHighlight(null);
    setAnimating(false);
    toast.success('Traversal completed');
  }, [state.nodes, setHighlight, setAnimating]);

  const reverseList = useCallback(async () => {
    if (state.nodes.length === 0) {
      toast.error('List is empty');
      return;
    }

    setAnimating(true);
    
    setState(prev => {
      const reversedNodes = [...prev.nodes].reverse();
      const updatedNodes = updateConnections(reversedNodes, prev.type);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });

    toast.success('List reversed');
    
    setTimeout(() => setAnimating(false), 500);
  }, [updateConnections, setAnimating]);

  const clearList = useCallback(async () => {
    setState(prev => ({
      ...prev,
      head: null,
      tail: null,
      nodes: [],
      highlightedNode: null
    }));
    
    toast.success('List cleared');
  }, []);

  const changeListType = useCallback((newType: ListType) => {
    setState(prev => {
      const updatedNodes = updateConnections(prev.nodes, newType);
      
      return {
        ...prev,
        type: newType,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });
    
    toast.info(`Changed to ${newType} linked list`);
  }, [updateConnections]);

  const insertAfterKey = useCallback(async (key: number, value: number) => {
    setAnimating(true);
    
    setState(prev => {
      const keyIndex = prev.nodes.findIndex(node => node.value === key);
      
      if (keyIndex === -1) {
        toast.error(`Key ${key} not found in the list`);
        return prev;
      }

      const newNode = createNode(value);
      const newNodes = [...prev.nodes];
      newNodes.splice(keyIndex + 1, 0, newNode);
      const updatedNodes = updateConnections(newNodes, prev.type);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });

    toast.success(`Inserted ${value} after key ${key}`);
    setTimeout(() => setAnimating(false), 500);
  }, [createNode, updateConnections, setAnimating]);

  const deleteByKey = useCallback(async (key: number) => {
    setAnimating(true);
    
    setState(prev => {
      const keyIndex = prev.nodes.findIndex(node => node.value === key);
      
      if (keyIndex === -1) {
        toast.error(`Key ${key} not found in the list`);
        setTimeout(() => setAnimating(false), 100);
        return prev;
      }

      const newNodes = [...prev.nodes];
      newNodes.splice(keyIndex, 1);
      const updatedNodes = updateConnections(newNodes, prev.type);
      
      toast.success(`Deleted node with key ${key}`);
      setTimeout(() => setAnimating(false), 500);
      
      return {
        ...prev,
        nodes: updatedNodes,
        head: updatedNodes[0] || null,
        tail: updatedNodes.length > 0 ? updatedNodes[updatedNodes.length - 1] : null
      };
    });
  }, [updateConnections, setAnimating]);

  const executeOperation = useCallback(async (operation: Operation) => {
    switch (operation.type) {
      case 'insert-beginning':
        if (operation.value !== undefined) {
          await insertAtBeginning(operation.value);
        }
        break;
      case 'insert-end':
        if (operation.value !== undefined) {
          await insertAtEnd(operation.value);
        }
        break;
      case 'insert-after-key':
        if (operation.key !== undefined && operation.value !== undefined) {
          await insertAfterKey(operation.key, operation.value);
        }
        break;
      case 'delete-beginning':
        await deleteFromBeginning();
        break;
      case 'delete-end':
        await deleteFromEnd();
        break;
      case 'delete-by-key':
        if (operation.key !== undefined) {
          await deleteByKey(operation.key);
        }
        break;
      case 'search':
        if (operation.value !== undefined) {
          await searchNode(operation.value);
        }
        break;
      case 'traverse':
        await traverseList();
        break;
      case 'clear':
        await clearList();
        break;
    }
  }, [
    insertAtBeginning,
    insertAtEnd,
    insertAfterKey,
    deleteFromBeginning,
    deleteFromEnd,
    deleteByKey,
    searchNode,
    traverseList,
    clearList
  ]);

  return {
    state,
    executeOperation,
    changeListType
  };
};