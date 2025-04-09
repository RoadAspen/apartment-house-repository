// src/main/java/com/apartment/service/UserService.java
// 服务层用于业务逻辑处理。
package com.apartment.service;

import com.apartment.entity.User;
import com.apartment.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper; // 这里用到了mapper

    public List<User> findAll() {
        return userMapper.findAll();
    }

    public User findById(Long id) {
        return userMapper.findById(id);
    }

    public void addUser(User user) {
        userMapper.insert(user);
    }
}

