import { Position, Handle } from "reactflow";

export function BranchNode({ data }: any) {
  return (
    <>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "10px",
            width: "200px",
            height: "60px",
            margin: "10px",
          }}
        >
          <Handle type="target" position={Position.Top} isConnectable={true} />
          <div style={{ marginLeft: "70px" }}>Node {data.id}</div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            isConnectable={true}
          />
        </div>
      </div>
    </>
  );
}
