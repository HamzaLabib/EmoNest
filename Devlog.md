# ImoNest App Devlog

## Week 1
**Update:**  
- Brainstormed the core idea of the app — a safe emotional expression space for children. Outlined initial features, user flows, and the emotional tone the app should evoke.
- Evaluated key technologies (React Native, Expo, Expo Router, AsyncStorage, tsx vs jsx), and made deliberate decisions around simplicity and scalability.
- Designed the app structure on paper and mentally mapped how children would interact with the app — considering empathy, safety, and engagement.
- Planned the multi-page layout, navigation logic, and future scalability for adding adult features.
- Established the MVP scope to prioritize what was truly essential for launch.

**Challenges:**  
- Defining a simple, realistic MVP that still conveyed the emotional intent of the app without falling into feature creep.
- Choosing the right combination of tools and architectural approach early on to avoid major rewrites later.

**Key Learnings:**  
- Learned the importance of investing time in upfront design and planning before touching code.
- Gained clarity on the relationship between app intent (emotional safety) and UX design decisions (color, layout, onboarding flow).

---

## Week 2
**Update:**  
- Designed a scalable folder structure for the frontend including `screens`, `components`, `utils`, `scripts`, `assets`, and `services`.
- Gathered and organized visual resources like images, mood emojis, and animated clips.
- Chose consistent UI patterns for both child and parent experiences and began building reusable components (e.g., `CustomInput`, `MoodButton`, `MessageBubble`).
- Started implementing the UI one screen at a time, frequently pausing to test and refactor for consistency.
- Prioritized accessibility and emotional clarity in visual elements (e.g., large tap targets, playful text, soft visuals).

**Challenges:**  
- Deciding on how to balance design simplicity with features like animated mood feedback, audio input, and chat responses.
- Managing navigation and conditional rendering based on authentication without losing UX flow.

**Key Learnings:**  
- Learned to apply mobile-first UX principles, especially for children, where simplicity and clarity are critical.
- Understood the value of designing with emotion in mind — every icon, word, and transition had to contribute to a sense of safety and fun.

---

## Week 3
**Update:**  
- Finished major frontend screens including mood selection, chatbot interaction, microphone functionality, and drawing placeholders.
- Conducted iterative design-refactor cycles to improve layout, spacing, and responsiveness across devices.
- Wrapped up frontend phase by cleaning unused components and ensuring smooth transitions.
- Started backend development: implemented simple login/signup API using Node.js and tokens.
- Chose MongoDB as the database for its document flexibility and ease of integration with Express.
- Integrated backend with frontend and tested authentication flow.

**Challenges:**  
- UI/UX responsiveness across screen sizes and dynamic keyboard issues (`KeyboardAvoidingView`).
- Linking frontend to backend and updating authenticated screens without forcing a full app reload — required a deep dive into routing logic and async state handling.
- Debugging took two days of testing endpoints, navigation state, and rethinking layout structure.

**Key Learnings:**  
- Learned to architect navigation with reactivity in mind — not just static routes.
- Understood the critical importance of modularizing authentication logic for dynamic updates and reusability.

---

## Additional Challenges
- Simplifying ambitious ideas into practical, iterative tasks
- Creating consistent and clean reusable logic across components
- Managing local state and `AsyncStorage` tokens in a responsive and secure way
- Refactoring navigation state to support dynamic layout re-evaluation post-login
- Balancing time between code quality, app polish, and final delivery goals

---

**Reflection:**  
This project helped me grow as a full-stack mobile developer — from brainstorming and designing an emotionally thoughtful product to executing each phase with flexibility and care. The deliberate focus on planning, folder architecture, UX design, and component structure made development smoother. Every bug, layout issue, and integration hurdle sharpened my debugging and problem-solving skills. Most importantly, I learned how to think from both a child user's perspective and a developer’s mindset — blending empathy with logic.
