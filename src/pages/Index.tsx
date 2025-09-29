import React from 'react';
import { LinkedListCanvas } from '@/components/LinkedListCanvas';
import { ControlsPanel } from '@/components/ControlsPanel';
import { useLinkedList } from '@/hooks/useLinkedList';

const Index = () => {
  const { state, executeOperation, changeListType } = useLinkedList();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Linked List Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive Visualization of  Linked List Operations
by Abdul Basith, Milan Biju, Sreenandu Pradeep
S3 - CSE B - VJEC
         </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <ControlsPanel
              listType={state.type}
              onListTypeChange={changeListType}
              onOperation={executeOperation}
              isAnimating={state.isAnimating}
              nodeCount={state.nodes.length}
            />
          </div>

          {/* Visualization Canvas */}
          <div className="lg:col-span-3">
            <LinkedListCanvas
              nodes={state.nodes}
              head={state.head}
              tail={state.tail}
              type={state.type}
              highlightedNode={state.highlightedNode}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Use the controls on the left to manipulate the linked list. Watch as nodes and pointers update in real-time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
