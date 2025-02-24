export const teams = [
  {
    id: "1",
    name: "Team 1",
    members: [
      { id: "101", name: "Alice" },
      { id: "102", name: "Bob" },
      { id: "103", name: "Charlie" },
    ],
    leader: {
      id: "101",
      name: "Alice",
    },
    projects: [
      { id: "1001", name: "Project 1" },
      { id: "1002", name: "Project 2" },
    ],
    status: "active",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
];

export const list_teams = [
  {
    id: "1",
    name: "Team 1",
    leader: {
      id: "101",
      name: "Alice",
    },
    projects: [
      { id: "1001", name: "Project 1" },
      { id: "1002", name: "Project 2" },
    ],
    members: 2,
    status: "active",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
  {
    id: "2",
    name: "Team 2",
    leader: {
      id: "102",
      name: "Bob",
    },
    projects: [
      { id: "1003", name: "Project 3" },
      { id: "1004", name: "Project 4" },
    ],
    members: 3,
    status: "inactive",
    created_at: "2023-01-02",
    updated_at: "2023-01-02",
  },
  {
    id: "3",
    name: "Team 3",
    leader: {
      id: "103",
      name: "Charlie",
    },
    projects: [
      { id: "1005", name: "Project 5" },
      { id: "1006", name: "Project 6" },
    ],
    members: 1,
    status: "active",
    created_at: "2023-01-03",
    updated_at: "2023-01-03",
  },
];
