# CORS Troubleshooting Guide

## 🚨 **Current Issue: CORS Error**

Your backend is running and responding (HTTP 200), but the browser is blocking the request due to **CORS policy**.

## 🔍 **What's Happening**

- ✅ Backend server: Running at `localhost:5246`
- ✅ API endpoint: Responding with HTTP 200
- ❌ Browser: Blocking request due to CORS
- ❌ Frontend: Can't access the response

## 🛠️ **How to Fix CORS**

### **Option 1: Backend CORS Configuration (Recommended)**

Add CORS headers to your backend to allow requests from `localhost:3000`:

#### **If using .NET Core/5/6:**
```csharp
// In Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// In app configuration
app.UseCors("AllowFrontend");
```

#### **If using Express.js:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

#### **If using other frameworks:**
Add these headers to your API responses:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

### **Option 2: Frontend Proxy (Quick Fix)**

Add a proxy in your React app's `package.json`:

```json
{
  "proxy": "http://localhost:5246"
}
```

Then update your config to use relative URLs:
```typescript
API_BASE_URL: '/api'  // Instead of http://localhost:5246/api
```

### **Option 3: Browser CORS Disable (Development Only)**

**⚠️ Only for development! Never use in production!**

Launch Chrome with CORS disabled:
```bash
# macOS
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

# Windows
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

# Linux
google-chrome --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

## 🧪 **Test Your Fix**

1. **Apply CORS fix** to your backend
2. **Restart backend server**
3. **Click "API Mode"** in the frontend
4. **Check console** for success messages

## 📋 **Expected Success Response**

When CORS is fixed, you should see:
```
✅ API connection successful! Found X users.
✅ Users displayed in the list
✅ No more CORS errors in console
```

## 🆘 **Still Having Issues?**

1. **Check backend logs** for CORS-related errors
2. **Verify backend is accessible** at `http://localhost:5246/api/users`
3. **Test with Postman/curl** to confirm API works
4. **Check browser Network tab** for detailed error info

## 💡 **Quick Test**

Test your API directly in the browser:
```
http://localhost:5246/api/users
```

If you see JSON data, the API works. If you see CORS errors, the backend needs CORS configuration.
