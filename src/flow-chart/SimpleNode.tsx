import { useContext } from "react";
import { FlowContext } from "./RootNode";
import { Node, Edge, Position, Handle } from "reactflow";

export function SimpleNode({ data }: any) {
  const flowContext = useContext<any>(FlowContext);
  function addSimpleNode() {
    console.log(flowContext.nodes);
    flowContext.setNodesCount(flowContext.nodesCount + 1);

    const newNodes: Node[] = [
      ...flowContext.nodes,
      {
        id: flowContext.nodesCount.toString(),
        position: { x: 100, y: 100 },
        type: "simple-node",
        data: {
          label: `Node ${flowContext.nodesCount}`,
          id: flowContext.nodesCount.toString(),
        },
        height: 80,
        width: 220,
      },
    ];
    const newEdges = [
      ...flowContext.edges,
      {
        id: flowContext.nodesCount.toString(),
        source: data.id.toString(),
        target: flowContext.nodesCount.toString(),
        animated: true,
        sourceHandle: "a",
      },
    ];

    flowContext.updateLayout(newNodes, newEdges);
  }
  function removeSimpleNode() {
    console.log(flowContext.nodes);
    const newNodes: Node[] = flowContext.nodes.filter(
      (node: Node) => node.id !== data.id.toString(),
    );

    const parentNode = flowContext.edges.find(
      (edge: Edge) => edge.target === data.id.toString(),
    )?.source;
    const newEdges = parentNode
      ? [
          ...flowContext.edges.map((edge: Edge) => {
            if (edge.source === data.id.toString()) {
              return {
                ...edge,
                source: parentNode,
              };
            }
            return edge;
          }),
        ]
      : [
          ...flowContext.edges.filter(
            (edge: Edge) => edge.source !== data.id.toString(),
          ),
        ];
    flowContext.updateLayout(newNodes, newEdges);
  }

  function addBranchNode() {
    flowContext.setNodesCount(flowContext.nodesCount + 3);
    const newNodes: Node[] = [
      ...flowContext.nodes,
      {
        id: flowContext.nodesCount.toString(),
        position: {},
        type: "branch-node",
        data: {
          label: `Node ${flowContext.nodesCount + 2}`,
          id: flowContext.nodesCount.toString(),
        },
        height: 80,
        width: 220,
      },
      {
        id: (flowContext.nodesCount + 2).toString(),
        position: {},
        type: "simple-node",
        data: {
          label: `Node ${flowContext.nodesCount + 2}`,
          id: (flowContext.nodesCount + 2).toString(),
        },
        height: 80,
        width: 220,
      },
      {
        id: (flowContext.nodesCount + 1).toString(),
        position: {},
        type: "simple-node",
        data: {
          label: `Node ${flowContext.nodesCount + 1}`,
          id: (flowContext.nodesCount + 1).toString(),
        },
        height: 80,
        width: 220,
      },
    ];
    const newEdges: Edge[] = [
      ...flowContext.edges,
      {
        id: flowContext.nodesCount.toString(),
        source: data.id.toString(),
        target: flowContext.nodesCount.toString(),
        animated: true,
        sourceHandle: "a",
      },
      {
        id: (flowContext.nodesCount + 1).toString(),
        source: flowContext.nodesCount.toString(),
        target: (flowContext.nodesCount + 1).toString(),
        animated: true,
        sourceHandle: "a",
        label: "true",
        labelStyle: {
          background: "transparent",
        },
      },
      {
        id: (flowContext.nodesCount + 2).toString(),
        source: flowContext.nodesCount.toString(),
        target: (flowContext.nodesCount + 2).toString(),
        animated: true,
        sourceHandle: "a",
        label: "false",
      },
    ];
    flowContext.updateLayout(newNodes, newEdges);
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          borderRadius: "10px",
          width: "200px",
          height: "60px",
          padding: "10px",
        }}
      >
        <Handle type="target" position={Position.Top} isConnectable={true} />
        <div style={{ marginLeft: "70px", color: "white" }}>Node {data.id}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={{ background: "black" }} onClick={addSimpleNode}>
            +
          </button>
          <button style={{ background: "black" }} onClick={addBranchNode}>
            ++
          </button>
          <button style={{ background: "black" }} onClick={removeSimpleNode}>
            x
          </button>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={true}
        />
      </div>
    </>
  );
}
