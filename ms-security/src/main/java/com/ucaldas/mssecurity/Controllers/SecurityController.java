package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Permission;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Services.NotificationsService;
import com.ucaldas.mssecurity.Services.EncryptionService;
import com.ucaldas.mssecurity.Services.JwtService;
import com.ucaldas.mssecurity.Services.ValidatorsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

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
    private ValidatorsService theValidatorsService;

    //THE USER LOGS SERVER GENERATES A RANDOM NUMBER AND SAVES IN SESSION -> USER POST NUMBER -> SERVER COMPARES -> IF EQUAL, GENERATE TOKEN

    @PostMapping("/login")
    public User login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());
        if (theActualUser != null &&
                theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))
        ){
            System.out.println(theActualUser.get_id());
            String number = this.generateRandom();
            Session theSession = new Session(number, theActualUser);
            this.theSessionRepository.save(theSession);
            theNotificationsService.sendCodeByEmail(theActualUser, number);
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
            
        }
        response.setStatus(HttpServletResponse.SC_OK);

        return theActualUser;
    }

    @PostMapping("login/2FA/{idUser}")
    public String secondFactor(@RequestBody Session theNewSession, @PathVariable String idUser, final HttpServletResponse response) throws IOException {

        User theUser = this.theUserRepository.findById(idUser).orElse(null);
        Session theOldSession = this.theSessionRepository.getSession(theUser.get_id(), theNewSession.getCode2fa());

        if (theUser != null && theOldSession != null) {
            if (theNewSession.getCode2fa().equals(theOldSession.getCode2fa()) && !theOldSession.isActive()) {
                String token = theJwtService.generateToken(theUser);
                theOldSession.setActive(true);  
                this.theSessionRepository.save(theOldSession);
                response.setStatus(HttpServletResponse.SC_OK);
                return "message: "+ token;
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED); 
            }
        }

        return null;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/singout/session/{idSession}")
    public void closeSession(@PathVariable String idUser, @PathVariable String idSession, final HttpServletResponse response)throws IOException {
        Session theSession = this.theSessionRepository.findById(idSession).orElse(null);
        if (theSession != null) {
            this.theSessionRepository.delete(theSession);
        }
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

    @PostMapping("permissions-validation")
    public boolean permissionsValidation(final HttpServletRequest request, @RequestBody Permission thePermission){
        boolean succes = this.theValidatorsService.validationRolePermission(request, thePermission.getUrl(), thePermission.getMethod());
        return succes;
    }

    public String generateRandom() {
        int number = (int)(Math.random()*90000+10000);
        return String.valueOf(number);
    }

}
