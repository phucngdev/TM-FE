import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

// Cấu hình layout
const NODE_WIDTH = 150;
const NODE_HEIGHT = 100;
const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 150;

// Tính vị trí PM ngang hàng
const getPMPositions = (numPMs) => {
  const mid = Math.floor(numPMs / 2);
  const positions = [];

  for (let i = 0; i < numPMs; i++) {
    let x = (i - mid) * (HORIZONTAL_SPACING * 2);
    if (numPMs % 2 === 0) {
      x += HORIZONTAL_SPACING;
    }
    positions.push(x);
  }

  return positions;
};

// Tính vị trí Leader cân bằng hai bên PM
const getLeaderPositions = (numLeaders, pmX) => {
  const mid = Math.floor(numLeaders / 2);
  const positions = [];

  for (let i = 0; i < numLeaders; i++) {
    let x = pmX + (i - mid) * HORIZONTAL_SPACING;
    if (numLeaders % 2 === 0) {
      x += HORIZONTAL_SPACING / 2;
    }
    positions.push(x);
  }

  return positions;
};

// Hàm tạo nodes & edges
const generateFlowData = (data, parentId = null, x = 0, y = 0, level = 0) => {
  let nodes = [];
  let edges = [];

  // Tạo node hiện tại
  nodes.push({
    id: data.id,
    position: { x, y },
    data: { label: data.label },
    type: "default",
  });

  // Nếu có parentId, tạo đường nối
  if (parentId) {
    edges.push({
      id: `e-${parentId}-${data.id}`,
      source: parentId,
      target: data.id,
    });
  }

  // Xử lý Leader (cấp 1)
  if (level === 0 && data.children) {
    const leaderPositions = getLeaderPositions(data.children.length, x);
    data.children.forEach((leader, index) => {
      const leaderX = leaderPositions[index];
      const leaderY = y + VERTICAL_SPACING;

      const { nodes: leaderNodes, edges: leaderEdges } = generateFlowData(
        leader,
        data.id,
        leaderX,
        leaderY,
        level + 1
      );

      nodes = [...nodes, ...leaderNodes];
      edges = [...edges, ...leaderEdges];
    });
  }

  // Xử lý Member (cấp 2)
  if (level === 1 && data.children) {
    data.children.forEach((member, index) => {
      const memberY = y + (index + 1) * VERTICAL_SPACING; // Mỗi member xuống một dòng
      const { nodes: memberNodes, edges: memberEdges } = generateFlowData(
        member,
        data.id,
        x, // Giữ nguyên x để Member thẳng hàng dọc dưới Leader
        memberY,
        level + 1
      );

      nodes = [...nodes, ...memberNodes];
      edges = [...edges, ...memberEdges];
    });
  }

  return { nodes, edges };
};

const OrganizationChart = () => {
  const personnels = useSelector((state) => state.personnel.data);
  console.log("🚀 ~ OrganizationChart ~ personnels:", personnels);

  // const dataChart = useMemo(() => {
  //   const organizationData = [];
  //   const unassignedMembers = [];
  //   const unassignedLeaders = [];
  //   const pmMap = new Map();
  //   const leaderMap = new Map();

  //   personnels.forEach((user) => {
  //     if (user.role === "PM") {
  //       pmMap.set(user._id.toString(), {
  //         id: `PM${pmMap.size + 1}`,
  //         label: `PM ${user.name}`,
  //         children: [],
  //       });
  //     } else if (user.role === "Lead") {
  //       leaderMap.set(user._id.toString(), {
  //         id: `L${leaderMap.size + 1}`,
  //         label: `Leader ${user.name}`,
  //         children: [],
  //       });
  //     } else if (user.role === "Member") {
  //       unassignedMembers.push({
  //         id: `M${unassignedMembers.length + 1}`,
  //         label: `Member ${user.name}`,
  //       });
  //     }
  //   });

  //   personnels.forEach((user) => {
  //     if (user.role === "Member" && user.leader) {
  //       const leader = leaderMap.get(user.leader.toString());
  //       if (leader) {
  //         leader.children.push({
  //           id: `M${leader.children.length + 1}`,
  //           label: `Member ${leader.children.length + 1}`,
  //         });
  //       }
  //     } else if (user.role === "Lead" && user.PM) {
  //       const pm = pmMap.get(user.PM.toString());
  //       if (pm) {
  //         pm.children.push(leaderMap.get(user._id.toString()));
  //       }
  //     }
  //   });

  //   pmMap.forEach((pm) => {
  //     organizationData.push(pm);
  //   });

  //   leaderMap.forEach((leader) => {
  //     if (!organizationData.some((pm) => pm.children.includes(leader))) {
  //       unassignedLeaders.push(leader);
  //     }
  //   });

  //   unassignedMembers.forEach((member) => {
  //     if (
  //       !organizationData.some((pm) =>
  //         pm.children.some((leader) => leader.children.includes(member))
  //       )
  //     ) {
  //       unassignedMembers.push(member);
  //     }
  //   });

  //   return {
  //     organizationData,
  //     unassignedMembers,
  //     unassignedLeaders,
  //   };
  // }, [personnels]);

  const dataChart = useMemo(() => {
    const organizationData = [];
    const unassignedMembers = [];
    const unassignedLeaders = [];
    const pmMap = new Map();
    const leaderMap = new Map();

    // Tạo danh sách PM, Leader, Member chưa được gán
    personnels.forEach((user) => {
      if (user.role === "PM") {
        pmMap.set(user._id.toString(), {
          id: `PM${pmMap.size + 1}`,
          label: `PM ${user.name}`,
          children: [],
        });
      } else if (user.role === "Lead") {
        leaderMap.set(user._id.toString(), {
          id: `L${leaderMap.size + 1}`,
          label: `Leader ${user.name}`,
          children: [],
        });
      } else if (user.role === "Member") {
        unassignedMembers.push({
          id: `M${unassignedMembers.length + 1}`,
          label: `Member ${user.name}`,
        });
      }
    });

    // Gán member vào leader
    personnels.forEach((user) => {
      if (user.role === "Member" && user.leader) {
        const leader = leaderMap.get(user.leader.toString());
        if (leader) {
          leader.children.push({
            id: `M${leader.children.length + 1}`,
            label: `Member ${user.name}`,
          });
        }
      } else if (user.role === "Lead" && user.PM) {
        const pm = pmMap.get(user.PM.toString());
        if (pm) {
          pm.children.push(leaderMap.get(user._id.toString()));
        }
      }
    });

    // Đưa PM vào danh sách tổ chức
    pmMap.forEach((pm) => {
      organizationData.push(pm);
    });

    // Tìm các Leader chưa có PM quản lý
    leaderMap.forEach((leader) => {
      if (!organizationData.some((pm) => pm.children.includes(leader))) {
        unassignedLeaders.push(leader);
      }
    });

    // Lọc ra các Member chưa có Leader quản lý
    const finalUnassignedMembers = unassignedMembers.filter((member) => {
      return !organizationData.some((pm) =>
        pm.children.some((leader) =>
          leader.children.some((m) => m.id === member.id)
        )
      );
    });

    return {
      organizationData,
      unassignedMembers: finalUnassignedMembers,
      unassignedLeaders,
    };
  }, [personnels]);
  console.log(
    "🚀 ~ dataChart ~ unassignedMembers:",
    dataChart.unassignedMembers
  );

  let nodes = [];
  let edges = [];

  // Xử lý nhiều PM
  const pmPositions = getPMPositions(dataChart.organizationData?.length);
  dataChart.organizationData?.forEach((pm, index) => {
    const x = pmPositions[index];
    const y = 0; // PM nằm trên cùng

    const { nodes: pmNodes, edges: pmEdges } = generateFlowData(pm, null, x, y);

    nodes = [...nodes, ...pmNodes];
    edges = [...edges, ...pmEdges];
  });

  // Xử lý các Leader chưa thuộc nhóm nào
  const unassignedLeaderX =
    pmPositions.length > 0
      ? pmPositions[pmPositions.length - 1] + HORIZONTAL_SPACING * 1.5
      : 0;
  dataChart.unassignedLeaders?.forEach((leader, index) => {
    const leaderY = (index + 1) * VERTICAL_SPACING;
    nodes.push({
      id: leader.id,
      position: { x: unassignedLeaderX, y: leaderY },
      data: { label: leader.label },
      type: "default",
    });
  });

  // Xử lý các Member chưa thuộc nhóm nào
  const unassignedMemberX = unassignedLeaderX + HORIZONTAL_SPACING;
  dataChart.unassignedMembers?.forEach((member, index) => {
    const memberY = (index + 2) * VERTICAL_SPACING;
    nodes.push({
      id: member.id,
      position: { x: unassignedMemberX, y: memberY },
      data: { label: member.label },
      type: "default",
    });
  });

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default OrganizationChart;
