#!/bin/bash

# TravelAgent Platform - Quick Start Script
# This script helps you set up the project quickly

set -e

echo "🚀 TravelAgent Platform - Quick Start"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check Node.js
echo -e "${BLUE}Step 1: Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version must be 18 or higher${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"
echo ""

# Step 2: Check npm
echo -e "${BLUE}Step 2: Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v) detected${NC}"
echo ""

# Step 3: Install dependencies
echo -e "${BLUE}Step 3: Installing dependencies...${NC}"
echo "This may take a few minutes..."
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 4: Environment setup
echo -e "${BLUE}Step 4: Setting up environment variables...${NC}"
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env file from .env.example${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env with your credentials${NC}"
    else
        echo -e "${RED}❌ .env.example not found!${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi
echo ""

# Step 5: Generate Prisma Client
echo -e "${BLUE}Step 5: Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"
echo ""

# Step 6: Database setup prompt
echo -e "${BLUE}Step 6: Database setup${NC}"
echo "Do you want to push the schema to your database now? (y/N)"
read -r SETUP_DB

if [[ $SETUP_DB =~ ^[Yy]$ ]]; then
    echo "Pushing schema to database..."
    npx prisma db push
    echo -e "${GREEN}✅ Database schema pushed${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping database setup${NC}"
    echo "Run 'npx prisma db push' when ready"
fi
echo ""

# Step 7: Build check
echo -e "${BLUE}Step 7: Checking build...${NC}"
echo "This will verify that everything is configured correctly"
npm run build
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Final message
echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Configure your environment variables in .env:"
echo "   - Database URL (PostgreSQL)"
echo "   - Redis URL"
echo "   - Stripe keys"
echo "   - Resend API key"
echo "   - Other credentials"
echo ""
echo "2. Start the development server:"
echo -e "   ${GREEN}npm run dev${NC}"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "4. Read the documentation:"
echo "   - README.md - Project overview"
echo "   - DEPLOYMENT.md - Deployment guide"
echo "   - DEVELOPER_GUIDE.md - Code patterns"
echo ""
echo -e "${BLUE}Useful commands:${NC}"
echo -e "  ${GREEN}npm run dev${NC}         - Start development server"
echo -e "  ${GREEN}npm run build${NC}       - Build for production"
echo -e "  ${GREEN}npm run start${NC}       - Start production server"
echo -e "  ${GREEN}npx prisma studio${NC}  - Open database GUI"
echo ""
echo "Happy coding! 🚀"
