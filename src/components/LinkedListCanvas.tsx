import React from 'react';
import { ListNode, ListType } from '@/types/linkedList';
import { NodeVisual } from './NodeVisual';

interface LinkedListCanvasProps {
  nodes: ListNode[];
  head: ListNode | null;
  tail: ListNode | null;
  type: ListType;
  highlightedNode: string | null;
}

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const NODE_SPACING = 150;
const X_OFFSET = 100;
const CANVAS_HEIGHT = 400;

export const LinkedListCanvas: React.FC<LinkedListCanvasProps> = ({
  nodes,
  head,
  type,
  highlightedNode
}) => {
  const canvasWidth = Math.max(800, X_OFFSET + nodes.length * (NODE_WIDTH + NODE_SPACING) + 100);

  return (
    <div className="relative w-full h-96 bg-card rounded-xl border shadow-sm overflow-auto">
      <svg
        width={canvasWidth}
        height={CANVAS_HEIGHT}
        className="absolute inset-0"
        style={{ minWidth: '100%', minHeight: '100%' }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
          </marker>
          <marker id="arrowhead-reverse" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--secondary))" />
          </marker>
        </defs>

        {/* Head pointer - points exactly to first node's left boundary */}
        {head && nodes.length > 0 && (
          <g>
            <line
              x1={X_OFFSET}
              y1={40}
              x2={X_OFFSET}
              y2={CANVAS_HEIGHT / 2 - NODE_HEIGHT / 2}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text
              x={X_OFFSET}
              y={30}
              textAnchor="middle"
              className="text-xs font-medium fill-primary"
            >
              head
            </text>
          </g>
        )}

        {/* Connection lines between nodes */}
        {nodes.map((node, index) => {
          const currentNodeX = index * (NODE_WIDTH + NODE_SPACING) + X_OFFSET;
          const currentNodeY = CANVAS_HEIGHT / 2;
          
          if (index === nodes.length - 1) {
            // Handle circular connections - from last node back to first
            if (type === 'circular' && nodes.length > 1) {
              const linkPartX = currentNodeX + NODE_WIDTH - 8; // From link partition
              const firstNodeX = X_OFFSET; // To first node's left boundary
              
              return (
                <g key={`circular-${node.id}`}>
                  <path
                    d={`M ${linkPartX} ${currentNodeY} Q ${linkPartX + 80} ${currentNodeY - 80} ${firstNodeX} ${currentNodeY - NODE_HEIGHT/2}`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            }
            return null;
          }

          const nextNodeX = (index + 1) * (NODE_WIDTH + NODE_SPACING) + X_OFFSET;
          const linkPartStartX = currentNodeX + NODE_WIDTH - 8; // From link partition
          const nextNodeLeftX = nextNodeX; // To next node's left boundary

          return (
            <g key={`connection-${node.id}`}>
              {/* Next pointer line */}
              <line
                x1={linkPartStartX}
                y1={currentNodeY}
                x2={nextNodeLeftX}
                y2={currentNodeY}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              
              {/* Previous pointer line for doubly linked lists */}
              {type === 'doubly' && (
                <line
                  x1={nextNodeX + 8} // From next node's Llink partition  
                  y1={currentNodeY - 20}
                  x2={currentNodeX + NODE_WIDTH - 8} // To current node's Rlink partition
                  y2={currentNodeY - 20}
                  stroke="hsl(var(--secondary))"
                  strokeWidth="2"
                  markerStart="url(#arrowhead-reverse)"
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {nodes.map((node, index) => {
        const position = {
          x: index * (NODE_WIDTH + NODE_SPACING) + X_OFFSET,
          y: CANVAS_HEIGHT / 2 - NODE_HEIGHT / 2
        };
        
        return (
          <NodeVisual
            key={node.id}
            node={node}
            position={position}
            isHighlighted={highlightedNode === node.id}
            isHead={head?.id === node.id}
            isTail={false}
            type={type}
          />
        );
      })}
      
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-muted-foreground">Empty List</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add nodes to start visualizing your linked list
            </p>
          </div>
        </div>
      )}
    </div>
  );
};