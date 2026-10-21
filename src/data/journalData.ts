export interface JournalEntry {
  date: string;
  task: string;
  shift: string;
  area: string;
  category: "Onboarding" | "Performance" | "Tailwind Migration" | "Internationalization" | "QA & Testing" | "Documentation" | "Monitoring";
  content: string;
}

export const journalEntries: JournalEntry[] = [
  {
    date: "May 18, 2026",
    task: "Onboarding & Company Overview",
    shift: "8:00 AM - 5:00 PM",
    area: "Software Engineering",
    category: "Onboarding",
    content: "Today marked the beginning of my internship at Prosperna. My primary focus was on onboarding and getting to know the company. I attended the orientation where we discussed what Prosperna is, its core mission, and its brand identity. It was inspiring to learn about their goal of empowering Philippine MSMEs to succeed in eCommerce. I spent the rest of the day familiarizing myself with the platform's general details and features. I also began exploring the various tools and services they offer to merchants, which gave me a solid foundation for the technical work to come."
  },
  {
    date: "May 19, 2026",
    task: "Platform Familiarization",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Onboarding",
    content: "I continued my onboarding by diving deeper into the Prosperna platform. To truly understand the user experience, I took the time to familiarize myself with the storefront creation process. I utilized MaxAI to create my own mock website on the platform. This hands-on approach allowed me to see exactly how merchants interact with the dashboard, manage products, and customize their online presence. Experiencing the platform from the merchant's perspective was incredibly valuable and provided context that will guide my future software engineering tasks."
  },
  {
    date: "May 20, 2026",
    task: "Environment Setup",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Onboarding",
    content: "After getting a solid grasp of the platform's features, I began setting up my local development environment. I successfully cloned the main repositories, particularly the customer storefront storefront, and installed all necessary dependencies. I did encounter some initial challenges with Node.js version mismatches, but I resolved them by utilizing a node version manager (nvm) as recommended in the documentation. By the end of the day, I managed to run the Next.js storefront locally, bridging the gap between the merchant experience I explored yesterday and the underlying codebase."
  },
  {
    date: "May 21, 2026",
    task: "Styling Systems Review",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Onboarding",
    content: "Today, I focused on studying the customer storefront codebase's styling approach, which relies heavily on Bootstrap and custom SCSS. I learned how Bootstrap classes are integrated into the project and analyzed the global stylesheet to identify where render-blocking resources were being imported. Tracing legacy CSS-in-JS and SCSS module combinations took some time, but I managed to trace class origins using browser developer tools. Cleaning up unused Bootstrap components in the long run will definitely reduce the bundled CSS size."
  },
  {
    date: "May 22, 2026",
    task: "First Week Wrap-up",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Onboarding",
    content: "Today was a wrap-up of my first week, consisting of a meeting with my mentor and preparation for the upcoming Checkout Improvements blitz. During our 1-on-1, I learned how to effectively communicate blockers and status updates in a professional engineering environment. I successfully completed all my onboarding tasks and aligned with my mentor on expectations for next week. While I initially felt slightly overwhelmed by the sheer size of the codebase, breaking tasks down into day-by-day goals really helped. Having a structured mentor guide is incredibly helpful in keeping me focused."
  },
  {
    date: "May 25, 2026",
    task: "Checkout Optimization",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Performance",
    content: "I began my second week by optimizing the Webpack chunking configuration in next.config.js for the storefront. I learned how static imports force heavy libraries into the First Load JS, negatively impacting page speed. I successfully deferred Grafana Faro and OpenTelemetry to dynamic imports, significantly reducing the initial bundle size. Properly configuring Next.js chunking strategies is a crucial skill for ensuring high-performance web applications."
  },
  {
    date: "May 26, 2026",
    task: "PaymentInfo Refactor",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Performance",
    content: "My task for today was to refactor the PaymentInfo.Credit component for better modularity. I learned how to securely mock payment SDK objects for testing environments without triggering live API calls. I successfully decoupled the credit card payment logic and integrated comprehensive Jest tests for the new component. Isolating the component meant carefully managing global objects, which dramatically simplified the overarching testing strategy."
  },
  {
    date: "May 28, 2026",
    task: "Google Maps Utility",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Performance",
    content: "Today, I implemented and refactored the Google Map utility component used for pin locations. I learned how to centralize API loaders to prevent multiple instances from being instantiated across different forms. I created a reusable GoogleMapWithMarker component that can cleanly accept coordinates and interact via callbacks. Extracting third-party integrations into highly focused wrapper components prevents library bleed across the application."
  },
  {
    date: "May 29, 2026",
    task: "Product Details & Lists",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Performance",
    content: "I wrapped up the week by building the new ProductListItem and Product Detail Page layouts. I translated design requirements into responsive Next.js components, managing product rendering and cart interactions. I successfully implemented dynamic button states (loading, out of stock) based on variant data. Handling complex state logic efficiently on the client ensures the user interface remains snappy during cart updates."
  },
  {
    date: "June 1, 2026",
    task: "Transition to Admin Dashboard",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I transitioned my focus to the main merchant dashboard admin dashboard repository. I learned the differences in architecture between the customer-facing storefront and the merchant-facing admin panel. I began familiarizing myself with the dashboard's codebase, studying how various merchant tools are structured. Jumping into a second large codebase highlighted the importance of standardizing design patterns across an organization's projects."
  },
  {
    date: "June 2, 2026",
    task: "Dashboard UI Architecture",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "Today, I started mapping out the architecture for the upcoming dashboard redesign. I learned how to structure reusable React components for a large-scale admin panel. I successfully implemented the base layout wrappers and the global navigation state dropdowns. Building intuitive interfaces for complex merchant tools requires careful state management to ensure smooth transitions between different dashboard modules."
  },
  {
    date: "June 3, 2026",
    task: "Inventory Module Expansion",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "My task was to expand the inventory module by implementing stock adjustment drawers and bulk actions. I practiced managing complex forms and table states for large datasets. I successfully added support for physical, digital, and wholesale product creation workflows in the UI. Giving merchants powerful bulk-editing tools is critical for scaling stores with hundreds of products."
  },
  {
    date: "June 4, 2026",
    task: "Analytics & Mobile Features",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I implemented the new analytics dashboard UI and mobile-responsive navigation components. I learned how to visualize data effectively using charting libraries and tooltip utilities. I successfully updated the dashboard to display website traffic and order metrics cleanly across devices. Data visualization components must be carefully memoized to prevent performance lags when interacting with the dashboard."
  },
  {
    date: "June 5, 2026",
    task: "Media Library Expansion",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I concluded the week by expanding the Media Library components and trial conversion prompts. I gained experience tying frontend components to feature flags and subscription states. I successfully styled the media welcome interface and resolved minor bugs in the file type dropdowns. Providing a polished onboarding experience for new dashboard features is essential for driving user adoption."
  },
  {
    date: "June 8, 2026",
    task: "Tailwind CSS v4 Setup",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I began the week by initializing the Tailwind CSS v4 configuration for the admin dashboard. I learned how to migrate a legacy codebase from Bootstrap by safely introducing Tailwind with custom theme tokens. I successfully configured the base layout resets and resolved conflicts in the navigation bar. Moving to a utility-first CSS framework massively accelerates UI development once the foundation is laid."
  },
  {
    date: "June 9, 2026",
    task: "Design System Refactoring",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "Today, I overhauled the project's DESIGN.md guidelines to mandate unit testing and formalize our verification workflow. I learned how to structure design system tokens in a YAML-based format and standardize color palettes. I successfully updated the primary color tokens and documented the new Tailwind configurations. A strongly documented design system ensures UI consistency across a large team of developers."
  },
  {
    date: "June 10, 2026",
    task: "Order Management UI",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "My task was to implement the new order filter component and message settings dashboard. I practiced translating complex filtering logic into an intuitive drawer interface. I successfully styled the left menu and scaffolded the layout components for the new Orders and Leads pages using shared Tailwind styles. Building reusable filter components drastically reduces code duplication across different data tables."
  },
  {
    date: "June 11, 2026",
    task: "Coupon Code UI Forms",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I implemented the Coupon Code management page, focusing on the frontend form design and table filtering. I learned how to handle complex form validation for discount rules, such as minimum spend and usage limits. I successfully built the forms, integrated the API hooks, and wrote the associated unit tests for the coupon components. Writing comprehensive tests alongside feature development prevents regression bugs from slipping into production."
  },
  {
    date: "June 12, 2026",
    task: "Media Library Scaffolding",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I wrapped up the week by scaffolding the Media Library page. I gained experience building grid/list view switching functionality and managing file type support in the UI. I successfully implemented the media management interface, allowing merchants to easily organize their product images. Building a responsive media grid requires careful consideration of CSS flexbox and aspect-ratio properties."
  },
  {
    date: "June 15, 2026",
    task: "Bootstrap to Tailwind Migration",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I started a major effort to migrate legacy components from react-bootstrap to Tailwind CSS. I learned how to systematically replace Bootstrap classes with equivalent Tailwind utilities without breaking layout structures. I successfully migrated shared components like Buttons, Formik select fields, and Variant pages. Phased migrations are challenging, but strictly isolating the refactored components ensures stability."
  },
  {
    date: "June 16, 2026",
    task: "Inventory Redesign",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "Today, I focused on migrating the Inventory subpages and Create Product modals off react-bootstrap. I deepened my knowledge of Tailwind's responsive prefixes and state variants. I successfully standardized the Inventory module UI and aligned it with the newly documented design system guidelines. Removing bulky Bootstrap dependencies drastically cleans up the DOM and reduces CSS bundle size."
  },
  {
    date: "June 17, 2026",
    task: "Order Details Enhancements",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "My task was to implement the payment link QR code display and additional notes component in the order details view. I learned how to generate QR codes dynamically on the client side based on payment URLs. I successfully updated the order tables, badges, and header styling using unified Tailwind components. Enhancing the order details page directly improves the merchant's ability to process and fulfill orders efficiently."
  },
  {
    date: "June 18, 2026",
    task: "Dashboard Standardization",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I worked on standardizing the dashboard's look and feel using Tailwind utilities. I practiced aligning fields and shapes across the application to match the new design specs perfectly. I successfully migrated leftover Bootstrap fields and pulled specific styling changes into the dashboard branch. Consistent padding, rounded corners, and typography are the hallmarks of a professional SaaS product."
  },
  {
    date: "June 19, 2026",
    task: "Test Alignment & Clean up",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Tailwind Migration",
    content: "I wrapped up the week by aligning our test suites with the redesigned Tailwind markup. I learned how changing CSS frameworks often breaks UI tests that rely on specific class names or DOM structures. I successfully resolved transient typing lags in test files, cleaned up troubleshooting scripts, and finalized the PR merges. Maintaining robust test coverage during a major UI overhaul is absolutely critical."
  },
  {
    date: "June 22, 2026",
    task: "QA & Logic Alignment",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "I began the week by aligning the redesigned components with the development branch's latest business logic. I learned how to resolve merge conflicts that arise when UI redesigns overlap with backend API changes. I successfully asserted element presence to resolve lingering ESLint warnings and finalized the integration of the new components. Constant communication with backend developers is necessary when merging long-lived UI branches."
  },
  {
    date: "June 23, 2026",
    task: "Test Coverage Expansion",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "Today, I added extensive test coverage across the newly refactored components and APIs. I practiced writing robust integration tests that simulate full merchant workflows. I successfully updated the build scripts to enforce stricter linting and formatting rules. Automated linting acts as a first line of defense against messy code creeping into the repository."
  },
  {
    date: "June 24, 2026",
    task: "Refining Dashboard Interactions",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "My task was to refine the micro-interactions across the dashboard, ensuring a premium feel. I learned how to leverage Tailwind's transition and animation utilities to add subtle hover states and focus rings. I successfully polished the button interactions and table row highlights across the inventory and order pages. Attention to detail in micro-interactions significantly elevates the perceived quality of the software."
  },
  {
    date: "June 25, 2026",
    task: "Bug Fixing & Edge Cases",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "I focused on resolving edge-case bugs reported during internal QA of the redesign. I gained experience tracing issues related to state management across deeply nested components. I successfully fixed minor visual glitches on mobile views and ensured the filter drawers behaved correctly when rapidly toggled. Thoroughly testing UI on real mobile devices always reveals issues that desktop emulators miss."
  },
  {
    date: "June 26, 2026",
    task: "Code Handoff Preparation",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "I wrapped up the week by preparing documentation for the react-bootstrap to Tailwind migration handoff. I learned how to effectively summarize architectural changes for the rest of the engineering team. I successfully documented the new design patterns and provided examples of how to build new components using the standardized Tailwind tokens. Good documentation ensures the team can maintain and extend the redesign moving forward."
  },
  {
    date: "June 29, 2026",
    task: "Performance Profiling",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Performance",
    content: "I began the week by profiling the performance of the newly redesigned admin dashboard. I learned how to use React DevTools Profiler to identify components that were rendering unnecessarily. I successfully applied memoization to the complex data tables, ensuring smooth scrolling even with large datasets. Performance tuning is an iterative process that requires careful measurement before and after every change."
  },
  {
    date: "June 30, 2026",
    task: "Analytics Dashboard Polish",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Performance",
    content: "Today, I focused on polishing the Analytics Dashboard integration within the admin panel. I practiced handling edge cases where the data service might return delayed or malformed responses. I successfully improved the error handling and skeleton loading states of the traffic charts, making it feel more resilient. Displaying large datasets requires building robust fallback mechanisms to ensure a seamless user experience."
  },
  {
    date: "July 1, 2026",
    task: "Accessibility Review",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "My task was to review the redesigned pages for accessibility compliance. I learned the importance of proper ARIA labels, keyboard navigation, and color contrast ratios. I successfully updated the form inputs and custom dropdowns to ensure they were fully navigable using only a keyboard. Building accessible software is not just a requirement, but a fundamental aspect of good UI design."
  },
  {
    date: "July 2, 2026",
    task: "E2E Test Planning",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "I started planning the End-to-End (E2E) testing strategy for the critical admin workflows. I deepened my understanding of how to automate tests for complex user journeys, like creating a product and processing an order. I successfully drafted a comprehensive test plan targeting the most fragile integration points. Automated E2E tests provide the ultimate confidence when deploying large architectural changes."
  },
  {
    date: "July 3, 2026",
    task: "Weekly Sync & Review",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Documentation",
    content: "I concluded the week with a comprehensive code review session with my mentor. I learned how to receive feedback gracefully and incorporate it into my final deliverables. I successfully addressed the remaining review comments and merged the final batch of redesign PRs into the main development branch. Regular code reviews are the most effective way to learn standard industry practices."
  },
  {
    date: "July 6, 2026",
    task: "Presentation Preparation",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Documentation",
    content: "I began the week by compiling data for my final internship presentation. I learned how to translate technical achievements, like CSS bundle size reductions and test coverage increases, into business value. I successfully drafted a slide deck summarizing the impact of the Tailwind migration and the new Analytics features. Communicating technical wins effectively is a crucial skill for any software engineer."
  },
  {
    date: "July 7, 2026",
    task: "Finalizing Documentation",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Documentation",
    content: "Today, I focused on finalizing all technical documentation related to my projects. I practiced writing clear, concise guides for maintaining the new Tailwind architecture and extending the UI components. I successfully published the updated DESIGN.md and ensured all code comments were up to date. Leaving behind a well-documented codebase is the best way to ensure the longevity of my contributions."
  },
  {
    date: "July 8, 2026",
    task: "Production Monitoring Setup",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Monitoring",
    content: "My task was to assist with setting up production monitoring for the new admin features. I learned how to configure error tracking tools to catch unhandled exceptions in the React frontend. I successfully created custom alerts for critical failures, ensuring the team would be notified immediately if issues arose. Proactive monitoring is essential for maintaining application stability after a major release."
  },
  {
    date: "July 9, 2026",
    task: "Resolving Final Issues",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Monitoring",
    content: "I spent the day resolving the last few minor issues and technical debt items from my backlog. I gained experience in prioritizing tasks during the final days of a project. I successfully cleared my assigned tickets, ensuring no critical work was left unfinished. A strong finish is just as important as a strong start when delivering software projects."
  },
  {
    date: "July 10, 2026",
    task: "Internship Presentation",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Documentation",
    content: "I wrapped up the week by delivering my final presentation to the engineering team. I successfully demonstrated the new admin dashboard features, highlighted the performance improvements, and walked through the Tailwind migration strategy. It was incredibly rewarding to share my learnings and see the team's positive reaction to the work I had accomplished over the past two months."
  },
  {
    date: "July 13, 2026",
    task: "Production Error Monitoring",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Monitoring",
    content: "I spent the day reviewing our production error monitoring tools to ensure the recent dashboard releases were stable. I learned how to track frontend exceptions and API timeouts in a live environment. I identified a few minor non-breaking errors related to third-party tracking scripts, which I documented for the backlog. Proactively monitoring logs immediately after a major release is crucial for catching silent failures."
  },
  {
    date: "July 14, 2026",
    task: "UI Aesthetics & Polish",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "QA & Testing",
    content: "I refined the UI aesthetics based on final feedback and completed minor outstanding tasks. I focused on the micro-interactions, such as button hover states, transition timings, and focus outlines for accessibility. I polished the dashboard's overall feel, making interactions feel snappier and more premium. Attention to small details like hover states differentiates an average UI from a professional one."
  },
  {
    date: "July 15, 2026",
    task: "Internship Conclusion",
    shift: "8:00 AM - 7:00 PM",
    area: "Software Engineering",
    category: "Onboarding",
    content: "I compiled my internship journals, conducted a final checkout with my mentor, and processed code handoffs. I reflected on the immense growth experienced over the past two months, particularly in React architecture and Tailwind CSS migrations. I successfully documented and handed over all ongoing work and compiled this final internship journal. A clean handoff process is critical to ensure the team can continue seamlessly."
  }
];
