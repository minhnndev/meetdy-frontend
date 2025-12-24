# Meetdy Frontend

## Overview
A React TypeScript frontend application built with Vite. This is a comprehensive platform for managing information, work, and personnel.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS, SASS
- **UI Libraries**: Radix UI, Ant Design, Semi UI
- **State Management**: Redux Toolkit, React Query
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Form Handling**: React Hook Form, Formik

## Project Structure
```
src/
├── api/          # API service layer
├── app/          # App-level components
├── assets/       # Static assets
├── components/   # Reusable UI components
├── config/       # Configuration files
├── constants/    # Application constants
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization setup
├── lib/          # Utility libraries
├── models/       # TypeScript models/types
├── queries/      # React Query hooks
├── redux/        # Redux store and slices
├── routes/       # Route definitions
├── styles/       # Global styles
└── utils/        # Utility functions
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` for production build
- Run `npm run lint` for linting

## External Dependencies
- Backend API: https://api.meetdy.com/
- Google reCAPTCHA integration

## Chat Feature (Lark/Loop-inspired)
The chat feature has been enhanced with modern UI patterns inspired by Lark and Microsoft Loop:

### Components
- **ChatMessage** (`src/app/Chat/components/ChatMessage/`)
  - Real-time message rendering from Redux state
  - Message grouping by user and time
  - Reply message preview
  - Reactions display with tooltips
  - Typing indicator
  
- **MessageActions** - Hover actions for reply, react, forward, pin, delete, copy
- **EmojiPicker** - Quick emoji reaction picker (8 common emojis)
- **MessageReactions** - Displays grouped reactions with user tooltips
- **TypingIndicator** - Shows who is currently typing

- **ChatInput** (`src/app/Chat/components/ChatInput/`)
  - Slash commands (/task, /table, /poll, /code, /file, /meeting)
  - @mentions with autocomplete from conversation members
  - File and image attachment buttons
  - Emoji picker
  - Expand/collapse mode
  - Keyboard navigation for suggestions

- **ChatHeader** (`src/app/Chat/components/ChatHeader/`)
  - Search bar for conversation messages
  - Voice and video call buttons
  - Dropdown menu for pinned messages, members, settings
  - Online status indicator

- **ConversationItem** (`src/app/Chat/components/ConversationItem/`)
  - Active state highlighting
  - Online status indicator
  - Unread badge with 99+ support
  - Context menu (right-click) for pin, mute, more options

### UI Components Added
- `src/components/ui/context-menu.tsx` - Right-click context menu component

## App Sidebar (Lark/Loop/Teams-inspired)
The main sidebar has been simplified to match modern productivity apps:

- **AppSidebar** (`src/components/common/Sidebar/AppSidebar.tsx`)
  - Fixed 64px width icon rail
  - Logo at top, user avatar at bottom
  - Clean, minimal design

- **NavMain** - Icon-only navigation with tooltips
  - Chat, Friends
  - Active state highlighting with blue accent
  - Hover effects

- **NavUser** - Compact user menu with avatar trigger

## Channel Chat Feature
A complete channel chat implementation with the following architecture:

### Hooks
- **useChannelChat** (`src/hooks/channel/useChannelChat.ts`)
  - Infinite scroll message loading with React Query
  - Send text messages with reply support
  - File upload with progress tracking and retry
  - Optimistic updates for pending messages
  - Typing indicator support

- **usePinnedMessages** (`src/hooks/channel/usePinnedMessages.ts`)
  - Fetch pinned messages for a conversation
  - Pin/unpin message functionality
  - Navigation between pinned messages

- **useMediaManager** (`src/hooks/media/useMediaManager.ts`)
  - Fetch all media in a conversation
  - Filter by type (ALL, IMAGE, VIDEO, FILE)
  - Preview modal navigation

### Components (`src/app/Chat/components/ChannelChat/`)
- **ChannelChat** - Main container integrating all components
- **ChannelMessageList** - Virtualized message list with infinite scroll
- **ChannelMessageInput** - Input with file attachments, reply preview
- **ChannelMessageItem** - Individual message with actions (reply, pin, delete)
- **PinnedMessageBar** - Banner showing pinned messages with navigation
- **MediaPreview** - Full-screen media viewer with keyboard navigation

### API Integration
- `channelApi.fetchMessageInChannel` - Paginated message loading
- `messageApi.sendTextMessage` - Send text with optional reply
- `messageApi.sendFileThroughMessage` - Upload files with progress
- `pinMessageApi` - Pin/unpin/fetch pinned messages
- `mediaApi.fetchAllMedia` - Get media files in conversation

## Recent Changes
- December 24, 2025: Implemented Channel Chat feature with hooks and components
- December 23, 2025: Added User and Group Info Panels
  - UserInfoPanel: Shows profile, online status, call/video buttons, conversation settings
  - GroupInfoPanel: Shows group name (editable), member list with roles (leader/admin), add members, notifications, join link settings
  - Collapsible sections for members and settings
  - Info button in ChatHeader and clickable header to open panel
  - Redux state (isInfoPanelOpen) for panel visibility
- December 23, 2025: Connected Chat feature to real APIs
  - ChatInput now sends messages via useSendTextMessage hook
  - Added reply message support with replyMessageId
  - File uploads working with progress indicator
  - MessageActions connected to useDropReaction for emoji reactions
  - Delete message functionality with useRedoMessage (own) and useDeleteMessageClientSide (hide)
  - Added setReplyMessage, clearReplyMessage, deleteMessage Redux actions
- December 23, 2025: Simplified App Sidebar (Lark/Loop/Teams-inspired)
  - Converted to fixed-width icon rail (64px)
  - Removed team switcher and projects section
  - Added tooltip-based navigation
  - Clean, minimal design matching modern productivity apps
- December 16, 2025: Enhanced Chat feature with Lark/Loop-inspired UI
  - Added message actions, reactions, typing indicators
  - Enhanced input with slash commands, mentions, attachments
  - Added search and modern styling to chat header
  - Added context menu and improved conversation list styling
- December 16, 2025: Initial Replit setup
  - Configured Vite to use port 5000 with `allowedHosts: true` for Replit proxy
  - Set host to `0.0.0.0` for external access
