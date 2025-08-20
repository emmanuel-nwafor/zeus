Flight Booking MVP Fullstack Project Structure (Complex)
flight-booking-mvp/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js        # API for user login
│   │   │   ├── register/route.js     # API for user registration
│   │   │   └── logout/route.js       # API for user logout
│   │   ├── flights/
│   │   │   └── route.js              # API to fetch flight data
│   │   ├── seats/
│   │   │   └── route.js              # API to fetch/update seat data
│   │   ├── bookings/
│   │   │   └── route.js              # API to create/view bookings
│   │   └── payment/
│   │       └── route.js              # API for mock payment processing
│   ├── layout.js                     # Root layout for app-wide styling
│   ├── page.js                       # Landing page with hero and search entry
│   ├── search/
│   │   └── page.js                   # Flight search form page
│   ├── results/
│   │   └── page.js                   # Flight results page
│   ├── seat-selection/
│   │   └── page.js                   # Seat selection page with react-seat-picker
│   ├── booking/
│   │   └── page.js                   # Booking confirmation page
│   ├── profile/
│   │   └── page.js                   # User profile with booking history
│   ├── login/
│   │   └── page.js                   # Login page
│   ├── register/
│   │   └── page.js                   # Registration page
│   └── globals.css                   # Tailwind CSS global styles
├── components/
│   └── ui/
│       ├── button.js                 # Aceternity UI Button component
│       ├── card.js                   # Aceternity UI Card components
│       ├── input.js                  # Aceternity UI Input component
│       ├── select.js                 # Aceternity UI Select component
│       ├── modal.js                  # Aceternity UI Modal for confirmations
│       ├── navbar.js                 # Navigation bar component
│       ├── footer.js                 # Footer component
│       └── utils.js                  # Utility function for class names
├── lib/
│   ├── data.js                       # Mock data store (flights, seats, users, bookings)
│   ├── auth.js                       # Auth utilities (e.g., JWT simulation)
│   └── api.js                        # API client for frontend requests
├── public/
│   ├── favicon.ico                   # Placeholder favicon
│   ├── logo.png                      # Logo for landing page and navbar
│   └── plane.png                     # Image for landing page hero
├── package.json                      # Project dependencies and scripts
├── tailwind.config.js                # Tailwind CSS configuration
└── next.config.js                    # Next.js configuration