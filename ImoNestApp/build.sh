#!/bin/bash
set -e

echo "🚀 Installing dependencies with legacy-peer-deps"
npm install --legacy-peer-deps

echo "📦 Building web version with expo export:web"
npx expo export:web
