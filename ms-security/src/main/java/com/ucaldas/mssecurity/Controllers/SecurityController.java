package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Services.NotificationsService;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;


@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {
    @Autowired
    private SessionRepository theSessionRepository;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private JwtService theJwtService;
    @Autowired
    private NotificationsService theNotificationsService;
    

    //THE USER LOGS SERVER GENERATES A RANDOM NUMBER AND SAVES IN SESSION -> USER POST NUMBER -> SERVER COMPARES -> IF EQUAL, GENERATE TOKEN

    @PostMapping("/login")
    public User login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());
        if (theActualUser != null &&
                theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))
        ){
            String number = this.generateRandom();
            Session theSession = new Session(number, theActualUser);
            this.theSessionRepository.save(theSession);
            theNotificationsService.sendCodeByEmail(theActualUser, number);
            
            
            
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            
        }
        response.setStatus(HttpServletResponse.SC_OK);

        return theActualUser;
    }

    @PostMapping("/login/2FA")
    public String secondFactor(@RequestBody Session requSession , final HttpServletResponse response)throws IOException{
        String token = "";
        String email = requSession.getUser().getEmail();
        String number = requSession.getCode2fa();

        User theActualUser = this.theUserRepository.getUserByEmail(email);
        Session theActualSession = this.theSessionRepository.getSession(theActualUser.get_id(), number);
        //TODO: generar verificacion de que la session no este activa 
        if (theActualSession != null){
            token = theJwtService.generateToken(theActualUser);
            theActualSession.setToken(token);
            theActualSession.setActive(true);

            this.theSessionRepository.save(theActualSession);
        }else{
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        response.setStatus(HttpServletResponse.SC_OK);            
        return "message: "+ token;
    }
    @PostMapping("/resetpassword/{userId}")
    public String resetPassword(@PathVariable String userId, final HttpServletResponse response) throws IOException{
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
            if (theActualUser != null){
                String number = this.generateRandom();
                theActualUser.setResetCode(number);
                this.theUserRepository.save(theActualUser);
                theNotificationsService.sendResetLink(theActualUser, number);
            }else{
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                return "message: User not found";
            }
        return "message: Reset code sent";

    }
        

    @PostMapping("/resetpassword/{userId}/{code}")
    public String resetPassword(@PathVariable String userId , @PathVariable String code, @RequestBody String password, final HttpServletResponse response) throws IOException{
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
            if (theActualUser.getResetcode().equals(code)){
                theActualUser.setPassword(theEncryptionService.convertSHA256(password));
                theActualUser.setResetCode("");
                this.theUserRepository.save(theActualUser);
                return "message: Password reseted";
            }
        return "message: algo salio mal";
        
    }

    public String generateRandom() {
        int number = (int)(Math.random()*90000+10000);
        return String.valueOf(number);
    }

}
