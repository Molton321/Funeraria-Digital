package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private JwtService theJwtService;
    private int autenticationNumber = 1;
    private int numberGenerated = 0;

    @PostMapping("/login")
    public String login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        String token = "";
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());
        if (theActualUser != null &&
                theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))
        ){
            if (this.numberGenerated == this.autenticationNumber) {
                token = theJwtService.generateToken(theActualUser);
            } else {
                this.numberGenerated = this.generateRandom();
                System.out.println(this.numberGenerated);
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return token;
    }

    @PostMapping("/login/secondFactor")
    public int secondFactor(@RequestBody Map<String, Object> requestBody) {
        int numero = Integer.parseInt(requestBody.get("number").toString());
        this.autenticationNumber = numero;
        return numero;
    }

    public int generateRandom() {
        int number = (int)(Math.random()*90000+10000);
        return number;
    }
}
