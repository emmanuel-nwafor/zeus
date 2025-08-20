blumdate-admin/
├── app/                              # Next.js App Router directory
│   ├── (admin)/                     # Route group for admin routes
│   │   ├── dashboard/               # Admin dashboard overview
│   │   │   ├── page.js              # Dashboard UI (metrics, quick actions)
│   │   │   └── layout.js            # Dashboard-specific layout
│   │   ├── all-users/               # Manage all platform users
│   │   │   ├── page.js              # List all users with actions (view, suspend)
│   │   │   └── [userId]/            # Dynamic route for user details
│   │   │       └── page.js          # User profile view/edit
│   │   ├── suspended-users/         # Manage suspended users
│   │   │   ├── page.js              # List suspended users with actions (unsuspend, delete)
│   │   │   └── [userId]/            # Dynamic route for suspended user details
│   │   │       └── page.js          # Suspended user profile view/edit
│   │   ├── verification/            # Handle user verification
│   │   │   ├── page.js              # List pending verifications with approve/reject
│   │   │   └── [userId]/            # Dynamic route for verification details
│   │   │       └── page.js          # Verification details and actions
│   │   ├── layout.js                # Shared admin layout (sidebar, auth checks)
│   │   └── loading.js               # Loading state for admin routes
│   ├── api/                         # Route handlers for proxying API calls
│   │   ├── users/route.js           # Proxy for user-related API calls (all, suspended)
│   │   └── verification/route.js    # Proxy for verification-related API calls
│   ├── _components/                 # Shared admin components
│   │   ├── Sidebar.js               # Admin sidebar with navigation
│   │   ├── UserTable.js             # Reusable table for user lists
│   │   ├── VerificationCard.js      # Card for verification requests
│   │   └── DashboardMetrics.js      # Dashboard metrics display
│   ├── _hooks/                      # Custom hooks
│   │   ├── useAuth.js               # Firebase admin auth management
│   │   └── useApi.js                # API call wrapper (axios)
│   ├── _lib/                        # Utility functions
│   │   └── api.js                   # API call helpers
│   ├── globals.css                  # Global Tailwind styles
│   └── layout.js                    # Root layout (minimal)
├── public/                          # Static assets
│   ├── favicon.ico
│   └── logo.png
├── .env.local                       # Env vars (API_URL, Firebase config)
├── next.config.js                   # Next.js config
├── package.json                     # Dependencies and scripts
├── tailwind.config.js               # Tailwind CSS config
└── README.md                        # Project docs