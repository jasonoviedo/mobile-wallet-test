# AresPay Mobile Wallet

AresPay is a secure digital wallet application focused on providing USDC transactions and banking services for Latin American users.

## Features

- **Secure Authentication**: User-friendly login system with token-based authentication
- **Dashboard**: Real-time balance overview and transaction history
- **Send & Receive**: Easy USDC transfers to other wallet addresses
- **Profile Management**: Manage your account settings and preferences
- **Help Center**: Support resources and documentation

## Tech Stack

- **Framework**: Next.js 15
- **UI Components**: Radix UI with custom Tailwind CSS styling
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with theme support
- **State Management**: React hooks and context

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/JaguarTechnologyLabs/mobile-wallet-test.git
cd mobile-wallet
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `/app`: Main application pages and routes
  - `/dashboard`: User dashboard with balance and transactions
  - `/send`: USDC sending functionality
  - `/receive`: Wallet address for receiving USDC
  - `/profile`: User profile management
  - `/help`: Support resources

- `/components`: Reusable UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and data fetching
- `/styles`: Global styles and theme configuration
- `/public`: Static assets

## Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) 