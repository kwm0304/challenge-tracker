package com.tracker5.security;

import com.tracker5.entity.User;
import com.tracker5.repository.UserRepository;
import com.tracker5.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRoles()));
        return mapUsertoCustomUserDetails(user, authorities);
    }

    private UserDetailsImpl mapUsertoCustomUserDetails(User user, List<SimpleGrantedAuthority> authorities) {
        UserDetailsImpl customUserDetails = new UserDetailsImpl();
        customUserDetails.setId(user.getId());
        customUserDetails.setUsername(user.getUsername());
        customUserDetails.setPassword(user.getPassword());
        customUserDetails.setAuthorities(authorities);
        return customUserDetails;
    }

}
