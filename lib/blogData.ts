// Blog posts data
export const categoryColors: Record<string, string> = {
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
    slug: 'react-hooks-tu-co-ban-den-nang-cao',
    title: 'React Hooks: Từ cơ bản đến nâng cao',
    excerpt: 'Tìm hiểu sâu về React Hooks - useState, useEffect, useContext, useMemo và cách xây dựng Custom Hooks.',
    category: 'React',
    date: '05/01/2026',
    readTime: '20 phút đọc',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    tags: ['React', 'Hooks', 'JavaScript'],
    featured: true,
    content: `
## React Hooks là gì?

React Hooks là một tính năng được giới thiệu từ React 16.8, cho phép bạn sử dụng state và các tính năng React khác mà không cần viết class component. Hooks giúp code trở nên ngắn gọn, dễ đọc và dễ tái sử dụng logic giữa các component.

### Tại sao nên sử dụng Hooks?

- **Đơn giản hóa code**: Không cần phải viết class, constructor, hay bind methods
- **Tái sử dụng logic**: Dễ dàng chia sẻ stateful logic giữa các component thông qua Custom Hooks
- **Tổ chức code tốt hơn**: Gom nhóm logic liên quan thay vì phân tán theo lifecycle methods
- **Dễ test**: Logic được tách biệt, dễ dàng viết unit test

## 1. useState - Quản lý State

useState là hook cơ bản nhất, cho phép bạn thêm state vào functional component.

### Cú pháp cơ bản

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // Khai báo state với giá trị khởi tạo là 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Tăng
      </button>
      <button onClick={() => setCount(count - 1)}>
        Giảm
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
\`\`\`

### Functional Updates

Khi state mới phụ thuộc vào state cũ, nên sử dụng functional update để tránh bugs:

\`\`\`jsx
// Không nên
setCount(count + 1);

// Nên dùng
setCount(prevCount => prevCount + 1);
\`\`\`

### Lazy Initial State

Nếu initial state cần tính toán phức tạp, truyền function để chỉ chạy một lần:

\`\`\`jsx
// Chạy mỗi lần render
const [items, setItems] = useState(expensiveComputation());

// Chỉ chạy lần đầu
const [items, setItems] = useState(() => expensiveComputation());
\`\`\`

## 2. useEffect - Side Effects

useEffect cho phép bạn thực hiện side effects trong functional component như: fetch data, subscriptions, thay đổi DOM, timers...

### Cú pháp và các trường hợp sử dụng

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset states khi userId thay đổi
    setLoading(true);
    setError(null);
    
    // Tạo AbortController để cancel request
    const abortController = new AbortController();
    
    async function fetchUser() {
      try {
        const response = await fetch('/api/users/' + userId, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error('Không tìm thấy user');
        }
        
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    // Cleanup function - chạy khi component unmount
    // hoặc trước khi effect chạy lại
    return () => {
      abortController.abort();
    };
  }, [userId]); // Dependency array - effect chạy lại khi userId thay đổi
  
  if (loading) return <div className="skeleton">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### Dependency Array

- **Không có []**: Effect chạy sau mọi lần render
- **[] rỗng**: Effect chỉ chạy một lần sau mount
- **[dep1, dep2]**: Effect chạy khi dep1 hoặc dep2 thay đổi

## 3. useContext - Chia sẻ Data

useContext giúp truyền data xuống component tree mà không cần props drilling.

### Tạo và sử dụng Context

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Tạo Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook để sử dụng Context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được sử dụng trong ThemeProvider');
  }
  return context;
}

// 4. Sử dụng trong Component
function Header() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <header className={theme}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        {isDark ? 'Sáng' : 'Tối'}
      </button>
    </header>
  );
}

// 5. Wrap App với Provider
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
\`\`\`

## 4. useMemo & useCallback - Tối ưu Performance

### useMemo - Cache giá trị tính toán

\`\`\`jsx
import { useMemo, useState } from 'react';

function ProductList({ products, searchTerm }) {
  // Chỉ filter lại khi products hoặc searchTerm thay đổi
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  
  // Tính tổng giá chỉ khi filteredProducts thay đổi
  const totalPrice = useMemo(() => {
    return filteredProducts.reduce((sum, p) => sum + p.price, 0);
  }, [filteredProducts]);
  
  return (
    <div>
      <p>Tổng: {totalPrice.toLocaleString()} VND</p>
      <ul>
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### useCallback - Cache function reference

\`\`\`jsx
import { useCallback, useState, memo } from 'react';

// Component con được memo để tránh re-render không cần thiết
const ExpensiveItem = memo(function ExpensiveItem({ item, onSelect }) {
  console.log('Rendering item:', item.id);
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  );
});

function ItemList({ items }) {
  const [selectedId, setSelectedId] = useState(null);
  
  // Callback được cache, không tạo mới mỗi lần render
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
    console.log('Selected:', id);
  }, []); // Không có dependencies vì setSelectedId là stable
  
  return (
    <div>
      <p>Đã chọn: {selectedId}</p>
      {items.map(item => (
        <ExpensiveItem 
          key={item.id} 
          item={item} 
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
\`\`\`

## 5. useRef - Tham chiếu và giá trị bền vững

\`\`\`jsx
import { useRef, useState, useEffect } from 'react';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Lưu giá trị không trigger re-render
  const playCountRef = useRef(0);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      playCountRef.current += 1;
      console.log('Đã play:', playCountRef.current, 'lần');
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
\`\`\`

## 6. Custom Hooks - Tái sử dụng Logic

Custom Hooks là cách mạnh mẽ nhất để chia sẻ logic giữa các component.

### useSessionStorage Hook (Thay thế localStorage)

⚠️ **LƯU Ý QUAN TRỌNG**: localStorage không hoạt động trong môi trường Claude.ai artifacts. Trong production, bạn có thể sử dụng localStorage, nhưng khi test trên Claude.ai, hãy dùng sessionStorage hoặc in-memory storage.

\`\`\`jsx
// ✅ Phiên bản sử dụng React state (hoạt động mọi nơi)
function useInMemoryStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  
  return [value, setValue];
}

// ✅ Phiên bản cho production (sử dụng localStorage)
function useLocalStorage(key, initialValue) {
  // Lazy initialization để tránh đọc localStorage mỗi lần render
  const [value, setValue] = useState(() => {
    // Kiểm tra xem có phải môi trường browser không
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      console.error('Error reading from localStorage');
      return initialValue;
    }
  });
  
  // Sync với localStorage khi value thay đổi
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);
  
  return [value, setValue];
}

// Sử dụng
function Settings() {
  // Trong Claude.ai artifacts, dùng useInMemoryStorage
  // Trong production, dùng useLocalStorage
  const [theme, setTheme] = useInMemoryStorage('theme', 'light');
  const [language, setLanguage] = useInMemoryStorage('lang', 'vi');
  
  return (
    <div>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Sáng</option>
        <option value="dark">Tối</option>
      </select>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
\`\`\`

### useFetch Hook

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    setLoading(true);
    setError(null);
    
    fetch(url, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });
    
    return () => abortController.abort();
  }, [url]);
  
  return { data, loading, error };
}

// Sử dụng
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <ul>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </ul>
  );
}
\`\`\`

## Quy tắc sử dụng Hooks

1. **Chỉ gọi Hooks ở top level** - Không gọi trong loops, conditions, hay nested functions
2. **Chỉ gọi Hooks từ React functions** - Functional components hoặc Custom Hooks
3. **Custom Hooks phải bắt đầu bằng "use"** - Ví dụ: useAuth, useFetch, useLocalStorage

## Kết luận

React Hooks là công cụ mạnh mẽ giúp viết React code hiệu quả hơn. Bắt đầu với useState và useEffect, sau đó mở rộng sang các hooks khác khi cần. Custom Hooks là chìa khóa để tái sử dụng logic một cách elegant.

**Tips cuối cùng:**
- Sử dụng ESLint plugin eslint-plugin-react-hooks để phát hiện lỗi
- Không lạm dụng useMemo/useCallback - chỉ dùng khi thực sự cần
- Tách logic phức tạp thành Custom Hooks riêng
- Khi deploy lên môi trường khác nhau, cần điều chỉnh storage strategy phù hợp
    `
  },
  {
    id: 2,
    slug: 'spring-boot-microservices-docker',
    title: 'Spring Boot Microservices với Docker',
    excerpt: 'Hướng dẫn chi tiết triển khai kiến trúc microservices với Spring Boot, Docker và các best practices.',
    category: 'Spring Boot',
    date: '28/12/2024',
    readTime: '25 phút đọc',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    tags: ['Spring Boot', 'Docker', 'Microservices'],
    featured: true,
    content: `
## Microservices là gì?

Microservices là một kiến trúc phần mềm chia ứng dụng thành các service nhỏ, độc lập, có thể deploy và scale riêng biệt. Mỗi service tập trung vào một chức năng nghiệp vụ cụ thể và giao tiếp với nhau qua API.

### Ưu điểm của Microservices

- **Độc lập deploy**: Cập nhật một service mà không ảnh hưởng các service khác
- **Công nghệ đa dạng**: Mỗi service có thể dùng ngôn ngữ/database riêng
- **Scale linh hoạt**: Scale từng service theo nhu cầu thực tế
- **Fault isolation**: Lỗi một service không làm sập toàn bộ hệ thống
- **Phát triển song song**: Các team có thể làm việc độc lập

### Thách thức

- Phức tạp hơn về mặt vận hành
- Cần xử lý distributed transactions
- Network latency giữa các services
- Debugging và monitoring khó hơn

## 1. Cấu trúc Project

\`\`\`
microservices-demo/
├── api-gateway/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── user-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── order-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── product-service/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── discovery-server/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── docker-compose.yml
└── README.md
\`\`\`

## 2. Discovery Server với Eureka

Service Discovery cho phép các service tự động tìm thấy nhau mà không cần hardcode địa chỉ IP.

### pom.xml

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
\`\`\`

### Application Class

\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(DiscoveryServerApplication.class, args);
    }
}
\`\`\`

### application.yml

\`\`\`yaml
server:
  port: 8761

spring:
  application:
    name: discovery-server

eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false
    fetch-registry: false
\`\`\`

## 3. User Service - Service mẫu

### Entity

\`\`\`java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column
    private String phone;
    
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;
    
    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
\`\`\`

### Repository

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findByRole(@Param("role") UserRole role);
}
\`\`\`

### Service Layer

\`\`\`java
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    
    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email đã tồn tại");
        }
        
        User user = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .fullName(request.getFullName())
            .phone(request.getPhone())
            .role(UserRole.USER)
            .build();
        
        User savedUser = userRepository.save(user);
        log.info("Created new user with id: {}", savedUser.getId());
        
        return userMapper.toResponse(savedUser);
    }
    
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User không tồn tại"));
        return userMapper.toResponse(user);
    }
    
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
            .map(userMapper::toResponse);
    }
    
    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User không tồn tại"));
        
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        
        User updatedUser = userRepository.save(user);
        log.info("Updated user with id: {}", id);
        
        return userMapper.toResponse(updatedUser);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User không tồn tại");
        }
        userRepository.deleteById(id);
        log.info("Deleted user with id: {}", id);
    }
}
\`\`\`

### Controller

\`\`\`java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User API", description = "Quản lý người dùng")
public class UserController {
    
    private final UserService userService;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo user mới")
    public UserResponse createUser(@Valid @RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin user theo ID")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    @GetMapping
    @Operation(summary = "Lấy danh sách users có phân trang")
    public Page<UserResponse> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy
    ) {
        return userService.getAllUsers(PageRequest.of(page, size, Sort.by(sortBy)));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Cập nhật user")
    public UserResponse updateUser(
        @PathVariable Long id, 
        @Valid @RequestBody UpdateUserRequest request
    ) {
        return userService.updateUser(id, request);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Xóa user")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
\`\`\`

## 4. API Gateway với Spring Cloud Gateway

API Gateway là điểm vào duy nhất cho client, routing requests đến các services tương ứng.

### pom.xml

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

### application.yml

\`\`\`yaml
server:
  port: 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - RewritePath=/api/users/(?<segment>.*), /api/users/$\{segment}
        
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - RewritePath=/api/orders/(?<segment>.*), /api/orders/$\{segment}

eureka:
  client:
    service-url:
      defaultZone: http://discovery-server:8761/eureka/
\`\`\`

## 5. Dockerfile tối ưu

### Multi-stage Build

\`\`\`dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Tạo user non-root
RUN addgroup -g 1001 -S appgroup && \\
    adduser -u 1001 -S appuser -G appgroup

# Copy JAR file
COPY --from=build /app/target/*.jar app.jar

# Chuyển sang user non-root
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# JVM tuning cho container
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
\`\`\`

## 6. Docker Compose

### docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: microservices_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - microservices-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    networks:
      - microservices-network

  discovery-server:
    build: ./discovery-server
    container_name: discovery-server
    ports:
      - "8761:8761"
    networks:
      - microservices-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8761/actuator/health"]
      interval: 10s
      timeout: 5s
      retries: 5

  api-gateway:
    build: ./api-gateway
    container_name: api-gateway
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    depends_on:
      discovery-server:
        condition: service_healthy
    networks:
      - microservices-network

  user-service:
    build: ./user-service
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/microservices_db
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=root123
    depends_on:
      mysql:
        condition: service_healthy
      discovery-server:
        condition: service_healthy
    networks:
      - microservices-network
    deploy:
      replicas: 2

  order-service:
    build: ./order-service
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    depends_on:
      discovery-server:
        condition: service_healthy
      user-service:
        condition: service_started
    networks:
      - microservices-network

networks:
  microservices-network:
    driver: bridge

volumes:
  mysql_data:
\`\`\`

## 7. Inter-Service Communication

### Sử dụng OpenFeign

\`\`\`java
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {
    
    @GetMapping("/api/users/{id}")
    UserResponse getUserById(@PathVariable("id") Long id);
    
    @GetMapping("/api/users")
    List<UserResponse> getAllUsers();
}

@Component
@Slf4j
public class UserClientFallback implements UserClient {
    
    @Override
    public UserResponse getUserById(Long id) {
        log.warn("Fallback: Cannot get user with id: {}", id);
        return UserResponse.builder()
            .id(id)
            .fullName("Unknown User")
            .build();
    }
    
    @Override
    public List<UserResponse> getAllUsers() {
        log.warn("Fallback: Cannot get users list");
        return Collections.emptyList();
    }
}
\`\`\`

### Sử dụng trong Order Service

\`\`\`java
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final UserClient userClient;
    
    public OrderResponse createOrder(CreateOrderRequest request) {
        // Verify user exists
        UserResponse user = userClient.getUserById(request.getUserId());
        
        Order order = Order.builder()
            .userId(request.getUserId())
            .totalAmount(request.getTotalAmount())
            .status(OrderStatus.PENDING)
            .build();
        
        Order savedOrder = orderRepository.save(order);
        log.info("Created order {} for user {}", savedOrder.getId(), user.getFullName());
        
        return orderMapper.toResponse(savedOrder);
    }
}
\`\`\`

## 8. Configuration Management

### application.yml cho từng profile

**application.yml (default)**
\`\`\`yaml
spring:
  application:
    name: user-service
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
\`\`\`

**application-docker.yml**
\`\`\`yaml
spring:
  datasource:
    url: jdbc:mysql://mysql:3306/microservices_db
    username: root
    password: root123
  jpa:
    show-sql: true

eureka:
  client:
    service-url:
      defaultZone: http://discovery-server:8761/eureka/
  instance:
    prefer-ip-address: true
\`\`\`

## 9. Chạy và Test

### Build và chạy

\`\`\`bash
# Build tất cả services
docker-compose build

# Khởi động
docker-compose up -d

# Xem logs
docker-compose logs -f user-service

# Scale user-service
docker-compose up -d --scale user-service=3

# Kiểm tra services đang chạy
docker-compose ps

# Dừng
docker-compose down

# Dừng và xóa volumes
docker-compose down -v
\`\`\`

### Test API qua Gateway

\`\`\`bash
# Tạo user
curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phone": "0123456789"
  }'

# Lấy user theo ID
curl http://localhost:8080/api/users/1

# Lấy danh sách users
curl "http://localhost:8080/api/users?page=0&size=10"

# Cập nhật user
curl -X PUT http://localhost:8080/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{
    "fullName": "Updated Name",
    "phone": "0987654321"
  }'

# Xóa user
curl -X DELETE http://localhost:8080/api/users/1
\`\`\`

### Kiểm tra Eureka Dashboard

Truy cập http://localhost:8761 để xem các services đã đăng ký.

## 10. Best Practices

### Logging với Correlation ID

\`\`\`java
@Component
public class CorrelationIdFilter extends OncePerRequestFilter {
    
    private static final String CORRELATION_ID_HEADER = "X-Correlation-ID";
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain filterChain) throws ServletException, IOException {
        String correlationId = request.getHeader(CORRELATION_ID_HEADER);
        if (correlationId == null) {
            correlationId = UUID.randomUUID().toString();
        }
        
        MDC.put("correlationId", correlationId);
        response.setHeader(CORRELATION_ID_HEADER, correlationId);
        
        try {
            filterChain.doFilter(request, response);
        } finally {
            MDC.remove("correlationId");
        }
    }
}
\`\`\`

### Circuit Breaker với Resilience4j

\`\`\`java
@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final UserClient userClient;
    
    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    @Retry(name = "userService")
    public UserResponse getUser(Long userId) {
        return userClient.getUserById(userId);
    }
    
    private UserResponse getUserFallback(Long userId, Exception ex) {
        log.error("Fallback for user {}: {}", userId, ex.getMessage());
        return UserResponse.builder()
            .id(userId)
            .fullName("Unknown")
            .build();
    }
}
\`\`\`

### Health Check cho từng service

\`\`\`yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always
  health:
    circuitbreakers:
      enabled: true
\`\`\`

## Kết luận

Microservices với Spring Boot và Docker mang lại khả năng mở rộng và bảo trì tốt cho hệ thống lớn. Các điểm quan trọng cần nhớ:

- Bắt đầu đơn giản, không cần quá nhiều services ngay từ đầu
- Implement service discovery để services tự động tìm thấy nhau
- Sử dụng API Gateway làm điểm vào duy nhất
- Áp dụng circuit breaker và retry để tăng độ ổn định
- Logging với correlation ID để trace requests qua nhiều services
- Health checks và monitoring là bắt buộc cho production
- Sử dụng Docker Compose cho development, Kubernetes cho production

Hãy thực hành triển khai từng phần một và test kỹ trước khi đưa vào môi trường production!
    `
  },
  {
    id: 3,
    slug: 'cicd-pipeline-github-actions',
    title: 'CI/CD Pipeline với GitHub Actions',
    excerpt: 'Hướng dẫn từng bước thiết lập CI/CD pipeline tự động hóa với GitHub Actions cho dự án thực tế.',
    category: 'DevOps',
    date: '20/12/2025',
    readTime: '18 phút đọc',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
    tags: ['DevOps', 'CI/CD', 'GitHub'],
    featured: false,
    content: `
## GitHub Actions là gì?

GitHub Actions là platform CI/CD tích hợp sẵn trong GitHub, cho phép bạn tự động hóa build, test, và deploy ngay từ repository. Với GitHub Actions, bạn có thể tạo workflows phản ứng với các sự kiện như push, pull request, hoặc theo lịch định kỳ.

### Ưu điểm của GitHub Actions

- **Tích hợp sẵn**: Không cần cấu hình server riêng
- **Marketplace phong phú**: Hàng nghìn actions có sẵn
- **Matrix builds**: Test trên nhiều OS/version cùng lúc
- **Secrets management**: Quản lý credentials an toàn
- **Free tier hào phóng**: 2000 phút/tháng cho public repos

## 1. Cấu trúc cơ bản

### Tạo Workflow File

Tạo file tại .github/workflows/ci.yml:

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  NODE_VERSION: '20'

jobs:
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run ESLint
        run: npm run lint
        
      - name: Check Prettier formatting
        run: npm run format:check
        
      - name: TypeScript type check
        run: npm run typecheck

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: lint
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/
          retention-days: 7
\`\`\`

## 2. Deploy to Vercel

\`\`\`yaml
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    steps:
      - uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: .next/
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: vercel_token_here
          vercel-org-id: org_id_here
          vercel-project-id: project_id_here
          vercel-args: '--prod'
\`\`\`

## 3. Cấu hình Secrets

### Thêm Secrets trong GitHub

1. Vào **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Thêm các secrets cần thiết:

- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- SLACK_WEBHOOK

### Sử dụng Environments

Tạo environments với protection rules:

Cấu hình trong **Settings** > **Environments**:
- Required reviewers: Yêu cầu approve trước khi deploy
- Wait timer: Delay trước khi deploy
- Deployment branches: Giới hạn branches có thể deploy

## 4. Docker Build & Push

### Workflow cho Docker

\`\`\`yaml
name: Docker Build

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: github_actor
          password: github_token
          
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

## 5. Status Badge

Thêm badge vào README.md:

\`\`\`markdown
# My Project

![CI/CD](https://github.com/username/repo/actions/workflows/ci.yml/badge.svg)
\`\`\`

## 6. Best Practices

### Tối ưu Performance

1. **Cache dependencies**: Sử dụng actions/cache
2. **Parallel jobs**: Tách jobs độc lập để chạy song song
3. **Conditional execution**: Dùng if để skip jobs không cần thiết
4. **Tái sử dụng artifacts**: Download thay vì rebuild

### Security

1. **Least privilege**: Chỉ cấp permissions cần thiết
2. **Pin action versions**: Dùng SHA thay vì tag
3. **Rotate secrets**: Đổi secrets định kỳ
4. **Audit logs**: Review workflow runs thường xuyên

## Kết luận

GitHub Actions là công cụ mạnh mẽ để tự động hóa CI/CD. Bắt đầu với workflow đơn giản, sau đó mở rộng dần. Hãy tận dụng cache, matrix builds, và reusable workflows để tối ưu pipeline của bạn.
    `
  },
  {
    id: 4,
    slug: 'vscode-extensions-khong-the-thieu',
    title: '15 VS Code Extensions không thể thiếu cho Developer',
    excerpt: 'Tổng hợp chi tiết các extension VS Code giúp tăng năng suất coding lên gấp nhiều lần.',
    category: 'Tips & Tricks',
    date: '15/12/2025',
    readTime: '12 phút đọc',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: ['VS Code', 'Tools', 'Productivity'],
    featured: false,
    content: `
## Tại sao Extensions quan trọng?

VS Code là text editor mạnh mẽ, nhưng extensions mới là thứ biến nó thành IDE đầy đủ. Với đúng extensions, bạn có thể tăng năng suất lên gấp nhiều lần, giảm lỗi, và làm việc hiệu quả hơn.

## Essential Extensions

### 1. ESLint

**ID**: dbaeumer.vscode-eslint

Extension số 1 cho JavaScript/TypeScript developers. Phát hiện và fix lỗi code style tự động.

**Tính năng:**
- Highlight lỗi real-time
- Auto-fix khi save
- Hỗ trợ custom rules
- Tích hợp với Prettier

**Settings gợi ý:**
\`\`\`json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
\`\`\`

### 2. Prettier - Code Formatter

**ID**: esbenp.prettier-vscode

Format code tự động, đảm bảo consistency trong team. Hỗ trợ nhiều ngôn ngữ.

**Settings gợi ý:**
\`\`\`json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
\`\`\`

### 3. GitLens — Git supercharged

**ID**: eamodio.gitlens

Biến VS Code thành Git client mạnh mẽ. Xem ai đã sửa dòng code nào, khi nào, và tại sao.

**Tính năng chính:**
- **Blame annotations**: Xem ai sửa từng dòng
- **File history**: Lịch sử thay đổi của file
- **Compare branches**: So sánh code giữa branches
- **Interactive rebase**: Rebase trực quan

### 4. Error Lens

**ID**: usernamehw.errorlens

Hiển thị lỗi ngay trên dòng code thay vì phải hover. Tiết kiệm thời gian debug.

**Trước**: Phải hover để xem lỗi
**Sau**: Lỗi hiển thị ngay inline với màu sắc rõ ràng

### 5. Auto Rename Tag

**ID**: formulahendry.auto-rename-tag

Tự động đổi tên cả tag mở và đóng khi bạn sửa một trong hai. Essential cho HTML/JSX development.

## UI & Productivity

### 6. Material Icon Theme

**ID**: PKief.material-icon-theme

Icon đẹp và rõ ràng cho files và folders. Giúp nhận diện file types nhanh hơn.

### 7. One Dark Pro

**ID**: zhuangtongfa.Material-theme

Theme tối phổ biến nhất, dễ nhìn cho coding sessions dài.

### 8. Indent-Rainbow

**ID**: oderwat.indent-rainbow

Tô màu các mức indent khác nhau, cực kỳ hữu ích cho Python, YAML, hoặc nested code.

### 9. Todo Tree

**ID**: Gruntfuggly.todo-tree

Tìm và hiển thị tất cả TODO, FIXME, HACK comments trong project. 

**Tip**: Thêm custom tags:
\`\`\`json
{
  "todo-tree.general.tags": [
    "TODO",
    "FIXME",
    "HACK",
    "XXX",
    "BUG",
    "REVIEW"
  ]
}
\`\`\`

## Development Tools

### 10. GitHub Copilot

**ID**: GitHub.copilot

AI pair programmer. Gợi ý code thông minh dựa trên context.

**Tips sử dụng:**
- Viết comment mô tả function trước
- Tab để accept, Esc để reject
- Ctrl+Enter để xem nhiều suggestions
- Copilot Chat cho Q&A

### 11. Thunder Client

**ID**: rangav.vscode-thunder-client

REST API client ngay trong VS Code. Thay thế Postman, không cần mở app khác.

**Tính năng:**
- Collections & Environments
- Import/Export Postman collections
- Request history
- Scripting support

### 12. REST Client

**ID**: humao.rest-client

Gửi HTTP requests trực tiếp từ file .http. Đơn giản và version-control friendly.

\`\`\`http
### Get all users
GET https://api.example.com/users
Authorization: Bearer token_here

### Create user
POST https://api.example.com/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

### 13. Docker

**ID**: ms-azuretools.vscode-docker

Quản lý Docker containers, images, và compose files trực tiếp từ VS Code.

### 14. Path Intellisense

**ID**: christian-kohler.path-intellisense

Autocomplete file paths khi import. Hỗ trợ alias paths.

### 15. Code Spell Checker

**ID**: streetsidesoftware.code-spell-checker

Kiểm tra chính tả trong code và comments. Tránh typos xấu hổ.

## Settings Tối ưu

### settings.json đề xuất

\`\`\`json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.6,
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "boundary",
  "editor.smoothScrolling": true,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  
  "terminal.integrated.fontSize": 13,
  
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "One Dark Pro",
  "workbench.startupEditor": "none",
  
  "git.autofetch": true,
  "git.confirmSync": false
}
\`\`\`

## Cài đặt nhanh

Tạo file extensions.txt:
\`\`\`
dbaeumer.vscode-eslint
esbenp.prettier-vscode
eamodio.gitlens
usernamehw.errorlens
formulahendry.auto-rename-tag
PKief.material-icon-theme
oderwat.indent-rainbow
Gruntfuggly.todo-tree
rangav.vscode-thunder-client
christian-kohler.path-intellisense
streetsidesoftware.code-spell-checker
ms-azuretools.vscode-docker
\`\`\`

Chạy script cài đặt:
\`\`\`bash
cat extensions.txt | xargs -L 1 code --install-extension
\`\`\`

## Kết luận

Đây là bộ extensions cơ bản mà mọi developer nên có. Tùy chỉnh thêm theo stack và workflow của bạn. Nhớ rằng: ít nhưng chất lượng tốt hơn là cài quá nhiều extensions không cần thiết.

**Pro tip**: Sync settings với GitHub để dùng chung giữa các máy:
- Settings Sync (built-in): Ctrl+Shift+P > "Turn on Settings Sync"
    `
  }
];
