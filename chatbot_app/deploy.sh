#!/bin/bash
# Deploy Ramayana Chatbot API to Google Cloud Run
# Project: bengal-ai-swaraj

set -e

PROJECT_ID="bengal-ai-swaraj"
SERVICE_NAME="ramayana-chatbot-api"
REGION="asia-south1"

echo "=== Deploying $SERVICE_NAME to Cloud Run ==="
echo "Project: $PROJECT_ID"
echo "Region:  $REGION"
echo ""

# Set project
gcloud config set project "$PROJECT_ID"

# Enable required APIs
echo "Enabling required APIs..."
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

# Deploy using Cloud Build (source-based deploy)
echo ""
echo "Building and deploying..."
gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=$GEMINI_API_KEY" \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3 \
  --port 8080 \
  --timeout 60

echo ""
echo "=== Deployment complete ==="
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --format 'value(status.url)')
echo "Service URL: $SERVICE_URL"
echo ""
echo "Test with: curl $SERVICE_URL/health"
