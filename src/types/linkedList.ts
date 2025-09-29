export interface ListNode {
  id: string;
  value: number;
  next: ListNode | null;
  prev?: ListNode | null; // For doubly linked lists
}

export type ListType = 'singly' | 'doubly' | 'circular';

export interface LinkedListState {
  head: ListNode | null;
  tail: ListNode | null;
  nodes: ListNode[];
  type: ListType;
  highlightedNode: string | null;
  isAnimating: boolean;
}

export interface Operation {
  type: 'insert-beginning' | 'insert-end' | 'insert-after-key' |
        'delete-beginning' | 'delete-end' | 'delete-by-key' |
        'search' | 'traverse' | 'clear';
  value?: number;
  key?: number;
}