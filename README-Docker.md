# Docker Setup for Mojila Portfolio

This guide explains how to build and run the Mojila Portfolio application using Docker with proper API key configuration.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Environment Setup

1. **Create a `.env` file** in the project root with your API key:
   ```bash
   API_KEY=your_actual_api_key_here
   ```

2. **Important**: Make sure your `.env` file is not committed to version control. The `.gitignore` file should already exclude it.

## Building and Running

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run in one command
docker-compose up -d

# To stop
docker-compose down
```

### Option 2: Using the Build Script

```bash
# Make sure the script is executable
chmod +x build-docker.sh

# Run the build script
./build-docker.sh

# Then run the container
docker run -d -p 80:80 --name mojila-portfolio mojila-portfolio
```

### Option 3: Manual Docker Commands

```bash
# Load environment variables
export $(cat .env | xargs)

# Build with API key
docker build --build-arg API_KEY="$API_KEY" -t mojila-portfolio .

# Run the container
docker run -d -p 80:80 --name mojila-portfolio mojila-portfolio
```

## How It Works

1. **Build Time**: The Dockerfile uses a build argument `API_KEY` to replace the `<API_KEY>` placeholder in `src/openaiService.js` during the build process.

2. **Environment Variables**: The API key is read from the `.env` file and passed as a build argument.

3. **Security**: The API key is embedded into the built application during Docker build, so it's not exposed as a runtime environment variable.

## Accessing the Application

Once the container is running, you can access the portfolio at:
- **Local**: http://localhost
- **Production**: http://your-server-ip

## Troubleshooting

### API Key Not Working
- Ensure your `.env` file exists and contains the correct API key
- Verify the API key format matches what's expected by the OpenRouter API
- Check that the build process completed without errors

### Container Won't Start
- Check if port 80 is already in use: `docker ps` or `lsof -i :80`
- View container logs: `docker logs mojila-portfolio`

### Build Failures
- Ensure all required files are present
- Check Docker daemon is running
- Verify sufficient disk space for the build

## Security Notes

- The `.env` file should never be committed to version control
- In production, consider using Docker secrets or a secure key management system
- The current setup embeds the API key in the built image - ensure proper image security

## Cleanup

```bash
# Stop and remove container
docker stop mojila-portfolio
docker rm mojila-portfolio

# Remove image
docker rmi mojila-portfolio

# Or use docker-compose
docker-compose down --rmi all
```