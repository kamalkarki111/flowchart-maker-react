import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { SimpleNode } from "./SimpleNode";
import { createContext, useState, useCallback, useEffect } from "react";
import { BranchNode } from "./BranchNode";
import Dagre from "@dagrejs/dagre";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  g.setGraph({ rankdir: "TB" });

  edges.forEach((edge: Edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: Node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export const FlowContext = createContext({});

const nodeTypes = { "simple-node": SimpleNode, "branch-node": BranchNode };

function FlowChart() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodeStateChange] = useNodesState<Node[]>([
    {
      id: "0",
      position: { x: 0, y: 0 },
      type: "simple-node",
      data: {
        label: "",
        id: "0",
      },
      height: 80,
      width: 220,
    },
  ]);
  const [edges, setEdges, onEdgeStateChange] = useEdgesState<Edge[]>([]);
  const [nodesCount, setNodesCount] = useState(1);

  const updateLayout = useCallback(
    (newNodes: Node[], newEdges: Edge[]) => {
      const layouted = getLayoutedElements(newNodes, newEdges);

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  useEffect(() => {
    updateLayout(nodes, edges);
  }, []);

  return (
    <FlowContext.Provider
      value={{ nodes, edges, updateLayout, nodesCount, setNodesCount }}
    >
      <div style={{ height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodeStateChange}
          onEdgesChange={onEdgeStateChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </FlowContext.Provider>
  );
}

export function RootNode() {
  return (
    <ReactFlowProvider>
      <FlowChart />
    </ReactFlowProvider>
  );
}
