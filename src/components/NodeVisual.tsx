import React from 'react';
import { ListNode, ListType } from '@/types/linkedList';
import { cn } from '@/lib/utils';

interface NodeVisualProps {
  node: ListNode;
  position: { x: number; y: number };
  isHighlighted: boolean;
  isHead: boolean;
  isTail: boolean;
  type: ListType;
}

export const NodeVisual: React.FC<NodeVisualProps> = ({
  node,
  position,
  isHighlighted,
  isHead,
  isTail,
  type
}) => {
  const nodeWidth = 120;
  const nodeHeight = 60;

  const renderSinglyNode = () => (
    <div className="flex h-full w-full border-2 border-primary bg-card">
      {/* Data partition */}
      <div className="flex-1 flex items-center justify-center border-r-2 border-primary">
        <span className="font-semibold text-lg">{node.value}</span>
      </div>
      {/* Link partition */}
      <div className="w-8 flex items-center justify-center bg-muted/30">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  );

  const renderDoublyNode = () => (
    <div className="flex h-full w-full border-2 border-primary bg-card">
      {/* Llink partition */}
      <div className="w-8 flex items-center justify-center bg-muted/30 border-r-2 border-primary">
        <div className="w-2 h-2 bg-secondary rounded-full"></div>
      </div>
      {/* Data partition */}
      <div className="flex-1 flex items-center justify-center border-r-2 border-primary">
        <span className="font-semibold text-lg">{node.value}</span>
      </div>
      {/* Rlink partition */}
      <div className="w-8 flex items-center justify-center bg-muted/30">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  );

  const renderCircularNode = () => (
    <div className="flex h-full w-full border-2 border-primary bg-card">
      {/* Data partition */}
      <div className="flex-1 flex items-center justify-center border-r-2 border-primary">
        <span className="font-semibold text-lg">{node.value}</span>
      </div>
      {/* Link partition */}
      <div className="w-8 flex items-center justify-center bg-muted/30">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "absolute",
        "node-visual",
        {
          "ring-2 ring-primary ring-offset-2": isHighlighted,
          "slide-in": true
        }
      )}
      style={{
        left: position.x,
        top: position.y,
        width: nodeWidth,
        height: nodeHeight,
      }}
    >
      {type === 'singly' && renderSinglyNode()}
      {type === 'doubly' && renderDoublyNode()}
      {type === 'circular' && renderCircularNode()}
    </div>
  );
};