Here’s a professional and visually appealing README file for your **Dynamic Event Calendar Application**:

---

# Dynamic Event Calendar Application 📅

**Deployed URL**: [Visit Live Application](https://dynamic-event-calender-application-zenrsr.vercel.app/)  
**GitHub Repository**: [View Source Code](https://github.com/zenrsr/dynamic-event-calender-application)

---

## 📖 **Overview**

The **Dynamic Event Calendar Application** is a modern, interactive tool designed for efficient event management. Built with cutting-edge technologies, it allows users to create, edit, and organize events effortlessly. This application is ideal for personal and professional scheduling, providing powerful features like recurrence options, tag-based categorization, and export/import functionalities.

---

## ✨ **Features**

### **Core Features**

- **Calendar View**:
  - Displays a monthly calendar with visually distinct weekends and weekdays.
  - Highlight the current day and selected day for better user experience.
- **Event Management**:
  - Add, edit, and delete events with ease.
  - Support for event recurrence (`daily`, `weekly`, `monthly`, `yearly`).
- **Tag-Based Categorization**:
  - Classify events into tags such as `Work`, `Personal`, `Birthday`, etc.
  - Prevent overlapping events for the same tag on the same day.
- **Data Persistence**:
  - Uses `localStorage` to retain data even after page refresh.

### **Advanced Features**

- **Import/Export**:
  - Export events for the next `3 months`, `6 months`, or all events in `JSON` or `CSV` formats.
  - Import events from a `JSON` or `CSV` file.
- **Search & Filter**:
  - Easily search events by name, description, or tags.
- **Responsive Design**:
  - Fully optimized for both desktop and mobile devices.

### **Bonus Features**

- **Event Notifications**:
  - Get reminders for events happening today.
  - Notifications are optimized to prevent duplicates.

---

## 🛠 **Tech Stack**

### **Frontend**

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://shadcn.dev/)

### **State Management**

- **Hooks**: [usehooks-ts](https://usehooks-ts.vercel.app/) for localStorage management.

### **Deployment**

- **Platform**: [Vercel](https://vercel.com/)

---

## 🚀 **Getting Started**

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/)

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/zenrsr/dynamic-event-calender-application.git
   cd dynamic-event-calender-application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application locally:

   ```bash
   npm run dev
   ```

4. Visit the application at:
   ```
   http://localhost:3000
   ```

---

## 📂 **Project Structure**

```
.
├── components        # Reusable UI components
├── app               # App routes (App Router)
├── public            # Static assets
├── styles            # Global styles
├── utils             # Helper functions
├── README.md         # Project documentation
└── package.json      # Project metadata and dependencies
```

---

## 🌟 **How to Use**

1. **View Events**:

   - Navigate through the calendar and view events for any selected day.

2. **Add/Update Events**:

   - Click on a date and fill in event details using the drawer.

3. **Search & Filter**:

   - Use the search bar to find events by name, description, or tag.

4. **Export/Import Events**:
   - Export your events to share or back them up.
   - Import events from supported files (`JSON` or `CSV`).

---

## 🙌 **Contributing**

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📧 **Contact**

If you have any questions or suggestions, feel free to reach out in the [issues](https://github.com/zenrsr/dynamic-event-calender-application/issues).

---

## 📝 **License**

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
