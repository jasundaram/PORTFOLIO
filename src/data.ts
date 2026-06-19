import { ProjectItem, Testimonial, GearItem } from './types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'secure-analytics-vault',
    title: 'Secure Analytics Vault',
    category: 'design',
    subCategory: 'Quantitative Cryptography',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000',
    description: 'Architected a secure data processing framework integrating advanced mathematical concepts (hashing, primality testing, GCD) with functional Python code to ensure data integrity.',
    year: '2026',
    metadata: {
      'Language': 'Python 3.11',
      'Methodology': 'Applied Number Theory',
      'Cryptographic Base': 'Miller-Rabin, GCD Schema',
      'Code Complexity': 'O(log n) Verification'
    },
    tags: ['Python', 'Cryptography', 'Number Theory', 'Security Vault', 'Data Integrity'],
    palette: ['#0B132B', '#1C2541', '#3A506B', '#5BC0BE', '#FFFFFF'],
    caseStudy: {
      goal: 'Architect a secure cryptographic validation sandbox to enforce raw analytical transit security between independent worker nodes.',
      process: '1. Phase 1 - Integer Checking: Deployed high-speed randomized primality testing modules (Miller-Rabin verification) to guarantee secure prime generation.\n2. Phase 2 - Custom Hashing: Integrated modular Greatest Common Divisor (GCD) math calculations into standard key hashing iterations preventing replay injections.\n3. Phase 3 - Integration: Compiled rigorous Python algorithms with an interactive command CLI for visual telemetry audits.',
      outcome: 'Successfully guaranteed absolute zero transactional bit-shifting during high-latency transfers across distributed simulation networks.'
    }
  },
  {
    id: 'data-analytics-capstone',
    title: 'Data Analytics Capstone Project',
    category: 'design',
    subCategory: 'AI-Driven Business Intelligence',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    beforeImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b446d2e4?q=80&w=1000', // Beautiful data grid comparison
    description: 'Engineered applications resolving complex analytical challenges using AI. Transformed raw datasets into strategic value via rigorous data modeling and delivered comprehensive visual dashboards using Power BI, SQL, and Excel.',
    year: '2025',
    metadata: {
      'Analytical Stack': 'Power BI, SQL, Excel',
      'Modeling Schema': 'Star Schema, DAX Layout',
      'AI Capabilities': 'Predictive Regressors',
      'Dataset Scale': '250K Transactional Rows'
    },
    tags: ['Data Modeling', 'Power BI', 'SQL Queries', 'Business Intelligence', 'DAX Metrics', 'Excel'],
    palette: ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'],
    caseStudy: {
      goal: 'Transform highly disorganized real-world sales and supply logistics datasets into accessible strategic business indicators.',
      process: '1. Phase 1 - SQL Schema pipeline: Refined raw transactional entries via dynamic subqueries to construct standardized star-schema models.\n2. Phase 2 - AI-driven modeling: Programmed statistical regression models in Python to predict cyclical inventory demand drops.\n3. Phase 3 - Power BI Rendering: Authored complex DAX metrics to render highly fluid, live-reporting operations matrices.',
      outcome: 'Enabled leadership executives to quickly isolate up to 14% of unnecessary operational expenditures, turning dead data into immediately actionable intelligence.'
    }
  },
  {
    id: 'medical-clinic-portal',
    title: 'Medical Clinic Web Portal',
    category: 'photography',
    subCategory: 'Web Portal Design',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000',
    description: 'Designed and deployed a fully functional, professional medical clinic website optimizing layout and responsiveness using WordPress and Elementor.',
    year: '2025',
    metadata: {
      'Tooling': 'WordPress, Elementor Custom',
      'Core Focus': 'UX Design & Responsive Layout',
      'Performance Score': '98% Core Web Vitals',
      'Integration': 'Live Grid Calendaring'
    },
    tags: ['WordPress', 'Elementor', 'Responsive UI', 'Web Portal', 'UX Design', 'Medical Systems'],
    palette: ['#023E8A', '#0077B6', '#0096C7', '#00B4D8', '#ADE8F4'],
    caseStudy: {
      goal: 'Establish high-speed appointment registration layouts and a secure client medical portal with optimized mobile response speeds.',
      process: '1. Phase 1 - Wireframing: Styled intuitive UX patterns to guide patients effortlessly toward appointment scheduling panels.\n2. Phase 2 - Visual Layout Design: Customized clean responsive container grids inside Elementor to preserve performance curves.\n3. Phase 3 - API integration: Coordinated live database lookups to reflect clinic seat vacancies immediately without site reloads.',
      outcome: 'Achieved a 45% reduction in direct patient booking delays and passed comprehensive core web vitals speed scoring benchmarks with flying performance grades.'
    }
  },
  {
    id: 'algorithmic-asset-optimizer',
    title: 'Algorithmic Yield Optimizer',
    category: 'design',
    subCategory: 'Quantitative Finance Toolkit',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000',
    description: 'A portfolio yield optimization engine implementing mathematical portfolio theory. Minimizes volatility via covariance matrix calculations using Python.',
    year: '2026',
    metadata: {
      'Language': 'Python (NumPy, SciPy)',
      'Framework': 'Streamlit Cloud Engine',
      'Math Basis': 'Mean-Variance Frontier',
      'Pricing Feed': 'Live Yahoo Finance API'
    },
    tags: ['Python', 'Financial Engineering', 'Covariance Matrix', 'Streamlit', 'Exploratory Data Analysis'],
    palette: ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#74C69D'],
    caseStudy: {
      goal: 'Build an elegant mathematical rebalancing program that dynamically optimizes stock holdings to maximize predicted Sharpe ratios.',
      process: '1. Phase 1 - Mathematical Modeling: Parsed Markowitz Mean-Variance equations into dynamic matrix formulations.\n2. Phase 2 - Data Pipelines: Structured live-fetching workers to scrape actual stock performance histories.\n3. Phase 3 - Frontend Interaction: Rendered visual efficient frontiers using Python visualization libraries.',
      outcome: 'Successfully maximized simulation risk-adjusted yield figures by 18% during rigorous historical backtesting runs.'
    }
  },
  {
    id: 'bioplastic-predictor',
    title: 'Statistical Bioplastic Predictor',
    category: 'photography',
    subCategory: 'Sustainable Business Modeling',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=1000',
    description: 'Formulated a predictive cost and material resilience matrix for bioplastic manufacturing, comparing cornstarch variables and PLA structural parameters.',
    year: '2025',
    metadata: {
      'Database': 'PostgreSQL, Excel Model',
      'Regression': 'Multivariate Polynomial',
      'Industry': 'Sustainable Bioplastics',
      'Validation': 'R-squared of 0.94'
    },
    tags: ['Bioplastics', 'Statistical Modeling', 'Excel', 'Python', 'Analytical Modeling'],
    palette: ['#2F5A4F', '#1B332C', '#0E4435', '#D8F3DC', '#A8E5C2'],
    caseStudy: {
      goal: 'Determine optimal mechanical blending formulas for bioplastics while reducing material pricing and securing biodegradable rates.',
      process: '1. Phase 1 - Data Curation: Gathered elasticity, moisture-decay, and additive ratios into structured spreadsheets.\n2. Phase 2 - Modeling: Programmed multiple regressions in Jupyter notebooks to identify maximum tensile thresholds.\n3. Phase 3 - Scaling: Transformed the findings into an interactive business estimation slider inside standard Excel sheets.',
      outcome: 'Pinpointed an additive formula that reduces direct composite pricing by 7% with zero mechanical structural degradation.'
    }
  },
  {
    id: 'drone-path-stabilizer',
    title: 'Drone Path PID Stabilizer',
    category: 'photography',
    subCategory: 'Aerodynamics & Physics Simulation',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1000',
    description: 'Programmed aerodynamic stabilizer algorithms solving differential equations to maintain steady hovering trajectories under intense simulated turbulence inputs.',
    year: '2026',
    metadata: {
      'Language': 'Python (SciPy, Matplotlib)',
      'Physics Model': 'Numerical Integration',
      'Error Feedback': 'PID Constant Matrix',
      'Hardware Match': 'Pixhawk Cube Avionics'
    },
    tags: ['Drone Physics', 'Numerical Analysis', 'Python Simulations', 'Kinematics', 'Aerodynamics'],
    palette: ['#242423', '#333533', '#E85D04', '#F48C06', '#FAA307'],
    caseStudy: {
      goal: 'Resolve real-time rotor thrust corrections under sudden wind sheer vectors during remote autonomous navigation phases.',
      process: '1. Phase 1 - System Kinematics: Formulated rigid 2D drone displacement state matrices in python.\n2. Phase 2 - Loop Tuning: Structured proportional-integral-derivative feedback controllers mapping error limits.\n3. Phase 3 - Visualization: Plotted stabilized flight lines against wind-gust timelines in scientific charts.',
      outcome: 'Secured flight path hovering accuracy to under 2.5 centimeters during gale-force vector gust models.'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Sundaram brings a rare, peerless mathematical foundation to the quantitative engineering pipeline. He translated our highly unstructured transaction datasets into high-performing relational schemas with amazing clarity.",
    author: "Dr. Ravindra Nath",
    role: "Academic Project Advisor & Quantitative Scholar",
    avatar: "https://picsum.photos/seed/scholar/100/100"
  },
  {
    id: 'test-2',
    quote: "Sundaram engineered our medical clinic portal with immense care and precision. Patient appointment times immediately stabilized and our Google Core Web Vitals rose to perfection.",
    author: "Dr. S. K. Upadhyay",
    role: "Chief Practitioner at Lifeline Clinic Lucknow",
    avatar: "https://picsum.photos/seed/doctor/100/100"
  }
];

export const GEAR: GearItem[] = [
  { name: 'Apple MacBook Room & Console', category: 'Computing Hardware', specs: '16GB Unified RAM, M-Series System, 512GB SSD' },
  { name: 'Python Statistical Stack', category: 'Data & Analytics Tools', specs: 'Pandas, NumPy, SciPy, Matplotlib, Jupyter Lab' },
  { name: 'Microsoft Power BI Engine', category: 'Data & Analytics Tools', specs: 'Dynamic M-Queries, Star Schemas, Enterprise DAX' },
  { name: 'SQL & Relational Databases', category: 'Data & Analytics Tools', specs: 'Complex Relational Schema design, High-Speed SQLite' },
  { name: 'WordPress & Elementor Editor', category: 'Quantitative Web Portals', specs: 'Custom UI Block styling, fully responsive layouts' },
  { name: 'Pixhawk Avionics & Arduino', category: 'Drone Construction Physics', specs: 'PID stabilization modules, sensor parsing microcontrollers' }
];
