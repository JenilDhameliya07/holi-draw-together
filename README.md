
# Rang - Real-Time Collaborative Drawing App

Rang is a vibrant, Holi-inspired collaborative drawing application that allows multiple users to draw together in real-time. Named after the Hindi word for "color," Rang brings the joyful spirit of the Holi festival to digital canvas collaboration.

## Features

- **Simple Authentication**: Join with just a nickname - no complex signup required
- **Room Creation**: Create or join drawing rooms to collaborate with friends
- **Real-Time Collaboration**: See others drawing in real-time with Convex real-time features
- **Drawing Tools**:
  - Brushes with adjustable sizes and colors
  - Eraser tool
  - Canvas clearing (for room owners)
  - Download finished artwork as PNG
- **User Presence**: See who's currently drawing and who's in the room
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Real-Time Backend**: Convex
- **Styling**: Tailwind CSS with custom Holi-inspired color palette

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Convex:
   - Create a Convex account at [convex.dev](https://convex.dev)
   - Initialize Convex in your project: `npx convex dev`
4. Start the development server: `npm run dev`

## How It Works

1. Enter your nickname and create or join a room
2. Use the drawing tools at the bottom of the screen to choose colors and brush sizes
3. Draw on the canvas - everyone in the room will see your strokes in real-time
4. Room owners can clear the canvas, and anyone can download the drawing
5. See who's currently drawing through the user list in the sidebar

## Color Palette

The app features a vibrant Holi-inspired color palette:
- Purple: #9b87f5
- Pink: #ff3f8e
- Blue: #33C3F0
- Green: #59e6a3
- Yellow: #ffd965
- Orange: #F97316
- Red: #ea384c

Enjoy collaborative drawing with Rang!
