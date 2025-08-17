# Docker Setup for User Management System

## 🐳 **Docker Configuration**

This project includes Docker configuration for both development and production environments.

## 📁 **Docker Files**

- `Dockerfile` - Production build with nginx
- `Dockerfile.dev` - Development build with hot reloading
- `docker-compose.yml` - Production services
- `docker-compose.dev.yml` - Development services
- `.dockerignore` - Optimized build exclusions

## 🚀 **Quick Start**

### **Development Mode (Recommended for development)**

```bash
# Build and start development containers
docker-compose -f docker-compose.dev.yml up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5246
```

### **Production Mode**

```bash
# Build and start production containers
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5246
```

## 🛠️ **Development Workflow**

### **1. Start Development Environment**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### **2. Make Code Changes**
- Edit files in `./src` directory
- Changes automatically reload in the browser
- Hot reloading enabled for React components

### **3. View Logs**
```bash
# Frontend logs
docker-compose -f docker-compose.dev.yml logs frontend-dev

# Backend logs
docker-compose -f docker-compose.dev.yml logs backend-dev
```

### **4. Stop Development Environment**
```bash
docker-compose -f docker-compose.dev.yml down
```

## 🏗️ **Production Build**

### **1. Build Production Image**
```bash
docker build -t user-management-frontend .
```

### **2. Run Production Container**
```bash
docker run -p 3000:80 user-management-frontend
```

### **3. With Docker Compose**
```bash
docker-compose up --build
```

## 🔧 **Configuration**

### **Environment Variables**
- `NODE_ENV` - Set to `development` or `production`
- `CHOKIDAR_USEPOLLING` - Enable file watching in Docker

### **Ports**
- **Frontend**: 3000 (mapped to container port 80 in production, 3000 in development)
- **Backend**: 5246 (mapped to container port 80)

### **Networks**
- `app-network` - Internal network for service communication

## 📊 **Service Architecture**

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   (React)       │◄──►│   (API)         │
│   Port: 3000    │    │   Port: 5246    │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                 app-network
```

## 🚨 **Troubleshooting**

### **Port Already in Use**
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

### **Container Won't Start**
```bash
# Check container logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose up --build
```

### **API Connection Issues**
- Ensure backend container is running
- Check network connectivity between containers
- Verify API endpoints in nginx configuration

### **Hot Reload Not Working**
```bash
# Restart development container
docker-compose -f docker-compose.dev.yml restart frontend-dev
```

## 🔄 **Development vs Production**

| Feature | Development | Production |
|---------|-------------|------------|
| **Hot Reload** | ✅ Yes | ❌ No |
| **Source Maps** | ✅ Yes | ❌ No |
| **Build Size** | Large | Optimized |
| **Performance** | Development | Production |
| **Nginx** | ❌ No | ✅ Yes |
| **Gzip** | ❌ No | ✅ Yes |

## 📝 **Customization**

### **Change Ports**
Edit `docker-compose.yml` or `docker-compose.dev.yml`:
```yaml
ports:
  - "8080:80"  # Change 3000 to 8080
```

### **Add Environment Variables**
```yaml
environment:
  - REACT_APP_API_URL=http://localhost:8080/api
```

### **Modify Nginx Configuration**
Edit `nginx.conf` and rebuild:
```bash
docker-compose up --build
```

## 🚀 **Deployment**

### **Build for Production**
```bash
# Create production build
docker build -t user-management-frontend:latest .

# Tag for registry
docker tag user-management-frontend:latest your-registry/user-management-frontend:latest

# Push to registry
docker push your-registry/user-management-frontend:latest
```

### **Deploy to Production Server**
```bash
# Pull latest image
docker pull your-registry/user-management-frontend:latest

# Run production container
docker run -d -p 80:80 --name user-management-frontend user-management-frontend:latest
```

## 📚 **Useful Commands**

```bash
# View running containers
docker ps

# View container logs
docker logs <container_name>

# Execute command in running container
docker exec -it <container_name> sh

# View container resource usage
docker stats

# Clean up unused containers/images
docker system prune -a
```

## 🎯 **Next Steps**

1. **Start development environment**: `docker-compose -f docker-compose.dev.yml up --build`
2. **Test the application**: Open http://localhost:3000
3. **Make changes**: Edit code and see hot reload in action
4. **Build production**: `docker-compose up --build`
5. **Deploy**: Use production image in your deployment pipeline
