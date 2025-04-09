// src/main/java/com/apartment/mapper/UserMapper.java
// MyBatis 用于与数据库进行交互，编写 Mapper 接口和 XML 配置文件。
package com.apartment.mapper;

import com.apartment.entity.User;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface UserMapper {
    List<User> findAll();
    User findById(Long id);
    int insert(User user);
}
