package com.ucaldas.mssecurity.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Session {
  @Id private String _id;
  private String token;
  private String code2fa;
  private Boolean active = false;
  @DBRef private User user;

  public Session() {}

  public Session(String code2fa, User user) {
    this.code2fa = code2fa;
    this.user = user;
  }

  public Session(String code2fa) {
    this.code2fa = code2fa;
  }

  public Session(String code2fa, String token, Boolean active) {
    this.code2fa = code2fa;
    this.token = token;
    this.active = active;
  }

  public String get_id() {
    return this._id;
  }

  public String getCode2fa() {
    return this.code2fa;
  }

  public void setCode2fa(String code2fa) {
    this.code2fa = code2fa;
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public Boolean isActive() {
    return this.active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}