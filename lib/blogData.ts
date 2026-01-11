// Blog posts data
export const categoryColors: Record<string, string> = {
    'Laravel': '#FF2D20',
    'React': '#61DAFB',
    'Spring Boot': '#6DB33F',
    'DevOps': '#FF6B35',
    'Tips & Tricks': '#A855F7',
};

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    featured: boolean;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'xay-dung-rest-api-voi-laravel',
        title: 'Xây dựng REST API với Laravel và Best Practices',
        excerpt: 'Hướng dẫn chi tiết cách xây dựng REST API chuẩn với Laravel.',
        category: 'Laravel',
        date: '10/01/2026',
        readTime: '8 phút đọc',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        tags: ['Laravel', 'API', 'PHP'],
        featured: true,
        content: `
## Giới thiệu

REST API là phương thức phổ biến để giao tiếp giữa frontend và backend. Laravel cung cấp các công cụ mạnh mẽ để xây dựng API một cách nhanh chóng và bảo mật.

## 1. Cấu trúc thư mục API

\`\`\`
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       └── UserController.php
│   ├── Requests/
│   │   └── StoreUserRequest.php
│   └── Resources/
│       └── UserResource.php
\`\`\`

## 2. Tạo API Controller

\`\`\`php
<?php
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Resources\\UserResource;
use App\\Models\\User;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::paginate(15));
    }
    
    public function show(User $user)
    {
        return new UserResource($user);
    }
}
\`\`\`

## 3. API Resources

API Resources giúp transform data trước khi trả về client:

\`\`\`php
<?php
namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('d/m/Y'),
        ];
    }
}
\`\`\`

## 4. Request Validation

\`\`\`php
<?php
namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ];
    }
}
\`\`\`

## 5. Error Handling

Tạo response format nhất quán cho errors:

\`\`\`php
// app/Exceptions/Handler.php
public function render($request, Throwable $e)
{
    if ($request->expectsJson()) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], $this->getStatusCode($e));
    }
    
    return parent::render($request, $e);
}
\`\`\`

## Kết luận

Laravel cung cấp bộ công cụ hoàn chỉnh để xây dựng REST API chuyên nghiệp. Áp dụng các best practices trên sẽ giúp code của bạn sạch, dễ maintain và scale.
    `
    },
    {
        id: 2,
        slug: 'react-hooks-tu-co-ban-den-nang-cao',
        title: 'React Hooks: Từ cơ bản đến nâng cao',
        excerpt: 'Tìm hiểu sâu về React Hooks - useState, useEffect, useContext, useMemo.',
        category: 'React',
        date: '05/01/2026',
        readTime: '12 phút đọc',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        tags: ['React', 'Hooks', 'JavaScript'],
        featured: true,
        content: `
## React Hooks là gì?

Hooks cho phép bạn sử dụng state và các tính năng React khác mà không cần viết class component.

## 1. useState - Quản lý State

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tăng
      </button>
    </div>
  );
}
\`\`\`

## 2. useEffect - Side Effects

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
    
    return () => {
      // Cleanup function
    };
  }, [userId]);
  
  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
\`\`\`

## 3. useContext - Chia sẻ Data

\`\`\`jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Toolbar</div>;
}
\`\`\`

## 4. useMemo & useCallback

\`\`\`jsx
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, onSelect }) {
  // Chỉ tính lại khi items thay đổi
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);
  
  // Callback ổn định
  const handleClick = useCallback((id) => {
    onSelect(id);
  }, [onSelect]);
  
  return sortedItems.map(item => (
    <div key={item.id} onClick={() => handleClick(item.id)}>
      {item.name}
    </div>
  ));
}
\`\`\`

## 5. Custom Hooks

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
\`\`\`

## Kết luận

React Hooks giúp code gọn gàng hơn và dễ tái sử dụng logic. Hãy bắt đầu với useState và useEffect, sau đó mở rộng sang các hooks khác khi cần.
    `
    },
    {
        id: 3,
        slug: 'spring-boot-microservices-docker',
        title: 'Spring Boot Microservices với Docker',
        excerpt: 'Triển khai kiến trúc microservices với Spring Boot và Docker.',
        category: 'Spring Boot',
        date: '28/12/2025',
        readTime: '15 phút đọc',
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
        tags: ['Spring Boot', 'Docker', 'Microservices'],
        featured: false,
        content: `
## Microservices là gì?

Kiến trúc chia ứng dụng thành các service nhỏ, độc lập, có thể deploy riêng biệt.

## 1. Cấu trúc Project

\`\`\`
microservices/
├── user-service/
├── order-service/
├── gateway-service/
└── docker-compose.yml
\`\`\`

## 2. User Service

\`\`\`java
@SpringBootApplication
@RestController
public class UserServiceApplication {
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("User not found"));
    }
    
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
\`\`\`

## 3. Dockerfile

\`\`\`dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## 4. Docker Compose

\`\`\`yaml
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports:
      - "8081:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      
  order-service:
    build: ./order-service
    ports:
      - "8082:8080"
    depends_on:
      - user-service
      
  gateway:
    build: ./gateway-service
    ports:
      - "8080:8080"
\`\`\`

## 5. API Gateway

\`\`\`yaml
# application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: http://user-service:8080
          predicates:
            - Path=/api/users/**
        - id: order-service
          uri: http://order-service:8080
          predicates:
            - Path=/api/orders/**
\`\`\`

## Chạy với Docker

\`\`\`bash
docker-compose up --build
\`\`\`

## Kết luận

Docker giúp đơn giản hóa việc deploy microservices. Mỗi service chạy trong container riêng, dễ scale và maintain.
    `
    },
    {
        id: 4,
        slug: 'cicd-pipeline-github-actions',
        title: 'CI/CD Pipeline với GitHub Actions',
        excerpt: 'Hướng dẫn thiết lập CI/CD pipeline tự động với GitHub Actions.',
        category: 'DevOps',
        date: '20/12/2025',
        readTime: '10 phút đọc',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
        tags: ['DevOps', 'CI/CD', 'GitHub'],
        featured: false,
        content: `
## GitHub Actions là gì?

GitHub Actions giúp tự động hóa workflow: test, build, deploy ngay trong GitHub repository.

## 1. Tạo Workflow File

\`\`\`yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Run linting
        run: npm run lint
\`\`\`

## 2. Build & Deploy

\`\`\`yaml
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build application
        run: npm run build
        
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v4
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

## 3. Environment Secrets

Vào Settings > Secrets để thêm:
- VERCEL_TOKEN
- ORG_ID
- PROJECT_ID

## 4. Status Badge

Thêm vào README.md:

\`\`\`markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
\`\`\`

## Kết luận

GitHub Actions giúp automate workflow dễ dàng, tích hợp trực tiếp với repository, không cần cấu hình server riêng.
    `
    },
    {
        id: 5,
        slug: 'vscode-extensions-khong-the-thieu',
        title: '10 VS Code Extensions không thể thiếu',
        excerpt: 'Tổng hợp các extension VS Code giúp tăng năng suất coding.',
        category: 'Tips & Tricks',
        date: '15/12/2025',
        readTime: '5 phút đọc',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        tags: ['VS Code', 'Tools', 'Productivity'],
        featured: false,
        content: `
## Top 10 VS Code Extensions

### 1. **ESLint**
Phát hiện lỗi JavaScript/TypeScript, tự động fix code style.

### 2. **Prettier**
Format code tự động, đảm bảo consistency trong team.

### 3. **GitLens**
Xem lịch sử git, ai đã sửa dòng code, blame annotations.

### 4. **Auto Rename Tag**
Đổi tên HTML tag tự động đồng bộ cả tag mở và đóng.

### 5. **Bracket Pair Colorizer**
Tô màu các cặp ngoặc giúp dễ đọc code hơn.

### 6. **Path Intellisense**
Autocomplete đường dẫn file khi import.

### 7. **Thunder Client**
REST API client ngay trong VS Code, thay thế Postman.

### 8. **Error Lens**
Hiển thị lỗi ngay trên dòng code, không cần hover.

### 9. **GitHub Copilot**
AI assistant giúp gợi ý code thông minh.

### 10. **Material Icon Theme**
Icon đẹp cho files và folders.

## Cài đặt nhanh

\`\`\`bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
\`\`\`

## Settings gợi ý

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
\`\`\`

## Kết luận

Những extensions trên là must-have cho mọi web developer. Hãy thử và tùy chỉnh theo workflow của bạn!
    `
    },
    {
        id: 6,
        slug: 'authentication-laravel-sanctum',
        title: 'Authentication với Laravel Sanctum',
        excerpt: 'Cách implement authentication cho SPA và Mobile App với Laravel Sanctum.',
        category: 'Laravel',
        date: '10/12/2025',
        readTime: '7 phút đọc',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
        tags: ['Laravel', 'Auth', 'Security'],
        featured: false,
        content: `
## Laravel Sanctum là gì?

Sanctum là package authentication đơn giản cho SPAs, mobile apps và API tokens.

## 1. Cài đặt

\`\`\`bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate
\`\`\`

## 2. Cấu hình User Model

\`\`\`php
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
\`\`\`

## 3. Login API

\`\`\`php
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);
    
    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }
    
    $user = Auth::user();
    $token = $user->createToken('auth-token')->plainTextToken;
    
    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}
\`\`\`

## 4. Protected Routes

\`\`\`php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    });
});
\`\`\`

## 5. Frontend Integration

\`\`\`javascript
// Login
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();
localStorage.setItem('token', token);

// Authenticated request
fetch('/api/user', {
  headers: {
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`
  }
});
\`\`\`

## Kết luận

Sanctum là giải pháp đơn giản, hiệu quả cho authentication trong Laravel. Phù hợp cho cả SPA và mobile apps.
    `
    }
];
