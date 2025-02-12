# 说明

## 结构

```js
myproject
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── mycompany
    │   │           └── myproject
    │   │               ├── MyProjectApplication.java          // 启动类
    │   │               ├── config                             // 配置类，如数据库、缓存、Swagger 等
    │   │               │   ├── DataSourceConfig.java
    │   │               │   ├── CacheConfig.java
    │   │               │   └── SwaggerConfig.java
    │   │               ├── controller                         // 控制层：处理 HTTP 请求
    │   │               │   └── StudentController.java
    │   │               ├── dto                                // 数据传输对象：与前端交互的 VO/DTO 对象
    │   │               │   └── StudentDTO.java
    │   │               ├── entity                             // 实体类：对应数据库表（JPA 或 MyBatis-Plus 实体）
    │   │               │   └── Student.java
    │   │               ├── exception                          // 自定义异常与全局异常处理
    │   │               │   ├── GlobalExceptionHandler.java
    │   │               │   └── BusinessException.java
    │   │               ├── interceptor                        // 拦截器：如日志、权限、请求预处理等
    │   │               │   └── RequestInterceptor.java
    │   │               ├── mapper                             // MyBatis / MyBatis-Plus 的 Mapper 接口及 XML 文件（如果使用注解方式，XML 文件可在 resources）
    │   │               │   └── StudentMapper.java
    │   │               ├── repository                         // DAO 层（如果使用 Spring Data JPA 或 Repository 方式）
    │   │               │   └── StudentRepository.java
    │   │               ├── security                           // 安全相关：如自定义 UserDetailsService、JWT 过滤器、权限配置等
    │   │               │   ├── JwtAuthenticationFilter.java
    │   │               │   └── SecurityConfig.java
    │   │               ├── service                            // 业务逻辑层
    │   │               │   ├── StudentService.java            // 接口
    │   │               │   └── impl
    │   │               │       └── StudentServiceImpl.java    // 实现类
    │   │               ├── utils                              // 工具类、帮助方法
    │   │               │   └── DateUtils.java
    │   │               └── cache                              // 缓存相关实现（或缓存注解的统一配置）
    │   │                   └── CacheManager.java
    │   └── resources
    │       ├── application.properties                         // Spring Boot 配置文件
    │       └── mapper                                         // 如果使用 XML 映射（MyBatis/MyBatis-Plus）
    │           └── StudentMapper.xml
    └── test
        └── java
            └── com
                └── mycompany
                    └── myproject
                        └── MyProjectApplicationTests.java

```
