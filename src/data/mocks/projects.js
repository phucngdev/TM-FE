export const projects = [
  {
    id: "1",
    name: "Task Manager",
    description:
      "A project management tool for managing tasks and teams efficiently.",
    project_manager: {
      id: "101",
      name: "John Doe",
    },
    teams: [
      {
        id: "201",
        name: "Development Team",
        members: [
          { id: "301", name: "Alice", role: "Developer" },
          { id: "302", name: "Bob", role: "Developer" },
        ],
      },
      {
        id: "202",
        name: "Design Team",
        members: [
          { id: "303", name: "Charlie", role: "Developer" },
          { id: "304", name: "Dave", role: "Developer" },
        ],
      },
    ],
    start_date: "2023-01-01",
    due_date: "2023-01-01",
    expected_completion_date: "2023-06-01",
    status: "in_progress", // ["not_started", "in_progress", "completed"]
    technologies: ["ReactJS", "Node.js", "MongoDB", "TailwindCSS"],
    tasks: [
      {
        id: "401",
        title: "Set up project structure",
        status: "done", // ["todo", "in_progress", "done"]
        priority: "high",
        due_date: "2023-01-15",
      },
      {
        id: "402",
        title: "Design database schema",
        status: "in_progress",
        priority: "medium",
        due_date: "2023-02-01",
      },
    ],
  },
  {
    id: "2",
    name: "E-commerce Platform",
    description: "An online platform for buying and selling products.",
    project_manager: {
      id: "102",
      name: "Jane Smith",
    },
    teams: [
      {
        id: "203",
        name: "Backend Team",
        members: [
          { id: "305", name: "Eve", role: "Developer" },
          { id: "306", name: "Frank", role: "Developer" },
        ],
      },
    ],
    start_date: "2023-02-01",
    due_date: "2023-02-01",
    expected_completion_date: "2023-08-01",
    status: "not_started",
    technologies: ["Angular", "Spring Boot", "MySQL"],
    tasks: [
      {
        id: "403",
        title: "Requirement analysis",
        status: "todo",
        priority: "high",
        due_date: "2023-02-10",
      },
    ],
  },
];

export const project = {
  id: "1",
  name: "Task Manager",
  description:
    "A project management tool for managing tasks and teams efficiently.",
  project_manager: {
    id: "101",
    name: "John Doe",
  },
  teams: [
    {
      id: "201",
      name: "Development Team",
      members: [
        { id: "301", name: "Alice", role: "member" },
        { id: "302", name: "Bob", role: "member" },
      ],
    },
    {
      id: "202",
      name: "Design Team",
      members: [
        { id: "303", name: "Charlie", role: "member" },
        { id: "304", name: "Dave", role: "member" },
      ],
    },
  ],
  start_date: "2023-01-01",
  due_date: "2023-01-01",
  expected_completion_date: "2023-06-01",
  status: "in_progress",
  tech: [
    {
      id: 367,
      title: "Front-end",
      list: [
        { id: 233, name: "React", version: "active" },
        { id: 234, name: "Redux", version: "active" },
        { id: 235, name: "TypeScript", version: "inactive" },
      ],
    },
    {
      id: 347,
      title: "Back-end",
      list: [
        { id: 236, name: "Spring Boot", version: "active" },
        { id: 237, name: "Java", version: "active" },
        { id: 238, name: "MySQL", version: "inactive" },
      ],
    },
  ],
  tasks: {
    todo: [
      {
        id: "401",
        title: "Set up project structure",
        description:
          "Set up project structure for React components and framework components",
        status: "todo",
        team: [
          {
            id: "201",
            name: "Front-end",
            member: [
              { id: "301", name: "Alice", role: "member" },
              { id: "302", name: "Bob", role: "member" },
            ],
          },
          {
            id: "202",
            name: "UI/UX",
            member: [{ id: "303", name: "Charlie", role: "member" }],
          },
        ],
        priority: "high",
        comments: [
          {
            id: "501",
            comment: "This task is important",
            created_at: "2023-01-01T10:00:00Z",
            user: { id: "301", name: "Alice" },
          },
        ],
        viewed: [
          {
            id: "601",
            user: { id: "302", name: "Bob" },
            created_at: "2023-01-02T12:00:00Z",
          },
        ],
        created_by: {
          id: "101",
          name: "John Doe",
        },
        created_at: "2023-01-01T09:00:00Z",
        status_history: [
          {
            status: "todo",
            created_at: "2023-01-01T09:00:00Z",
          },
          {
            status: "in_progress",
            created_at: "2023-01-10T12:00:00Z",
          },
        ],
        start_date: "2023-01-01",
        due_date: "2023-01-15",
      },
    ],
    in_progress: [],
    review: [
      {
        id: "402",
        title: "Set up project structure",
        description:
          "Set up project structure for React components and framework components",
        status: "todo",
        team: [
          {
            id: "201",
            name: "Front-end",
            member: [
              { id: "301", name: "Alice", role: "member" },
              { id: "302", name: "Bob", role: "member" },
            ],
          },
          {
            id: "202",
            name: "UI/UX",
            member: [{ id: "303", name: "Charlie", role: "member" }],
          },
        ],
        priority: "high",
        comments: [
          {
            id: "501",
            comment: "This task is important",
            created_at: "2023-01-01T10:00:00Z",
            user: { id: "301", name: "Alice" },
          },
        ],
        viewed: [
          {
            id: "601",
            user: { id: "302", name: "Bob" },
            created_at: "2023-01-02T12:00:00Z",
          },
        ],
        created_by: {
          id: "101",
          name: "John Doe",
        },
        created_at: "2023-01-01T09:00:00Z",
        status_history: [
          {
            status: "todo",
            created_at: "2023-01-01T09:00:00Z",
          },
          {
            status: "in_progress",
            created_at: "2023-01-10T12:00:00Z",
          },
        ],
        start_date: "2023-01-01",
        due_date: "2023-01-15",
      },
      {
        id: "403",
        title: "Set up project structure",
        description:
          "Set up project structure for React components and framework components",
        status: "todo",
        team: [
          {
            id: "201",
            name: "Front-end",
            member: [
              { id: "301", name: "Alice", role: "member" },
              { id: "302", name: "Bob", role: "member" },
            ],
          },
          {
            id: "202",
            name: "UI/UX",
            member: [{ id: "303", name: "Charlie", role: "member" }],
          },
        ],
        priority: "high",
        comments: [
          {
            id: "501",
            comment: "This task is important",
            created_at: "2023-01-01T10:00:00Z",
            user: { id: "301", name: "Alice" },
          },
        ],
        viewed: [
          {
            id: "601",
            user: { id: "302", name: "Bob" },
            created_at: "2023-01-02T12:00:00Z",
          },
        ],
        created_by: {
          id: "101",
          name: "John Doe",
        },
        created_at: "2023-01-01T09:00:00Z",
        status_history: [
          {
            status: "todo",
            created_at: "2023-01-01T09:00:00Z",
          },
          {
            status: "in_progress",
            created_at: "2023-01-10T12:00:00Z",
          },
        ],
        start_date: "2023-01-01",
        due_date: "2023-01-15",
      },
      {
        id: "404",
        title: "Set up project structure",
        description:
          "Set up project structure for React components and framework components",
        status: "todo",
        team: [
          {
            id: "201",
            name: "Front-end",
            member: [
              { id: "301", name: "Alice", role: "member" },
              { id: "302", name: "Bob", role: "member" },
            ],
          },
          {
            id: "202",
            name: "UI/UX",
            member: [{ id: "303", name: "Charlie", role: "member" }],
          },
        ],
        priority: "high",
        comments: [
          {
            id: "501",
            comment: "This task is important",
            created_at: "2023-01-01T10:00:00Z",
            user: { id: "301", name: "Alice" },
          },
        ],
        viewed: [
          {
            id: "601",
            user: { id: "302", name: "Bob" },
            created_at: "2023-01-02T12:00:00Z",
          },
        ],
        created_by: {
          id: "101",
          name: "John Doe",
        },
        created_at: "2023-01-01T09:00:00Z",
        status_history: [
          {
            status: "todo",
            created_at: "2023-01-01T09:00:00Z",
          },
          {
            status: "in_progress",
            created_at: "2023-01-10T12:00:00Z",
          },
        ],
        start_date: "2023-01-01",
        due_date: "2023-01-15",
      },
      {
        id: "401",
        title: "Set up project structure",
        description:
          "Set up project structure for React components and framework components",
        status: "todo",
        team: [
          {
            id: "201",
            name: "Front-end",
            member: [
              { id: "301", name: "Alice", role: "member" },
              { id: "302", name: "Bob", role: "member" },
            ],
          },
          {
            id: "202",
            name: "UI/UX",
            member: [{ id: "303", name: "Charlie", role: "member" }],
          },
        ],
        priority: "high",
        comments: [
          {
            id: "501",
            comment: "This task is important",
            created_at: "2023-01-01T10:00:00Z",
            user: { id: "301", name: "Alice" },
          },
        ],
        viewed: [
          {
            id: "601",
            user: { id: "302", name: "Bob" },
            created_at: "2023-01-02T12:00:00Z",
          },
        ],
        created_by: {
          id: "101",
          name: "John Doe",
        },
        created_at: "2023-01-01T09:00:00Z",
        status_history: [
          {
            status: "todo",
            created_at: "2023-01-01T09:00:00Z",
          },
          {
            status: "in_progress",
            created_at: "2023-01-10T12:00:00Z",
          },
        ],
        start_date: "2023-01-01",
        due_date: "2023-01-15",
      },
      {
        id: "401",
        title: "Set up project structure",
        description:
          "Set up project structure for React components and framework components",
        status: "todo",
        team: [
          {
            id: "201",
            name: "Front-end",
            member: [
              { id: "301", name: "Alice", role: "member" },
              { id: "302", name: "Bob", role: "member" },
            ],
          },
          {
            id: "202",
            name: "UI/UX",
            member: [{ id: "303", name: "Charlie", role: "member" }],
          },
        ],
        priority: "high",
        comments: [
          {
            id: "501",
            comment: "This task is important",
            created_at: "2023-01-01T10:00:00Z",
            user: { id: "301", name: "Alice" },
          },
        ],
        viewed: [
          {
            id: "601",
            user: { id: "302", name: "Bob" },
            created_at: "2023-01-02T12:00:00Z",
          },
        ],
        created_by: {
          id: "101",
          name: "John Doe",
        },
        created_at: "2023-01-01T09:00:00Z",
        status_history: [
          {
            status: "todo",
            created_at: "2023-01-01T09:00:00Z",
          },
          {
            status: "in_progress",
            created_at: "2023-01-10T12:00:00Z",
          },
        ],
        start_date: "2023-01-01",
        due_date: "2023-01-15",
      },
    ],
    done: [],
  },
  requests: [
    {
      id: "701",
      request: "Add new feature",
      created_at: "2023-01-01T15:00:00Z",
    },
    {
      id: "702",
      request: "Add new feature 2",
      created_at: "2023-01-01T15:00:00Z",
    },
  ],
  target_user: [
    {
      id: "301",
      name: "Startups",
    },
    {
      id: "302",
      name: "Mid-size companies",
    },
  ],
  todo: 3,
  in_progress: 5,
  review: 1,
  done: 3,
  task_total: 12,
  progress: 25,
};
