# 公寓管理系统

## 一、项目简介

公寓管理系统是一个基于 **Spring Boot** 的 RBAC 权限管理系统。通过这个项目，可以实现公寓的区域、楼层、房间、住户管理以及优秀的 RBAC 权限控制。

## 二、技术栈

- Java 8
- Spring Boot 3.x
- Spring Security + JWT 认证和授权
- MyBatis-Plus
- MySQL 8.x
- Redis 缓存
- Docker + Docker Compose

## 三、功能列表

### 【公共功能】

- [x] 用户登录 / 退出
- [x] JWT + Redis 认证
- [x] RBAC 权限管理
- [x] 获取用户的个性化菜单

### 【公寓管理】

- [x] 区域管理
- [x] 楼层管理
- [x] 房间管理
- [x] 住户管理

### 【系统管理】

- [x] 用户管理
- [x] 角色管理
- [x] 权限管理
- [x] 日志查询

## 四、目录结构

```
backend/    # Spring Boot 后端
├── src/
│   ├── main/java/com/apartment/
│   │   ├── controller/    # 控制器
│   │   ├── service/       # 业务层
│   │   ├── mapper/        # MyBatis-Plus 数据层
│   │   ├── entity/        # JPA 实体
│   ├── resources/
│   │   ├── application.yml # 配置文件
├── pom.xml  # Maven 配置
├── Dockerfile  # Docker 定义文件
├── docker-compose.yml  # Docker Compose 配置
```

## 五、部署与运行

### 1. 安装依赖

```sh
cd backend
mvn clean install
```

### 2. 运行项目

```sh
mvn spring-boot:run
```

## 六、 Docker 部署

### 1. 构建镜像

```sh
docker build -t apartment-management .
```

### 2. 启动实例

```sh
docker run -d -p 8080:8080 --name apartment-app apartment-management
```

### 3. 使用 Docker Compose

```sh
docker-compose up -d
```

## 七、接口测试

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- 登录 API:

```http
POST /auth/login
{
    "username": "admin",
    "password": "123456"
}
```

- 用户列表:

```http
GET /user/list
Authorization: Bearer {token}
```
