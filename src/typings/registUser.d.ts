interface RegistUserDTO {
  email: string;
  nickname: string;
  password: string;
}

interface SignUpFromEntity extends RegistUserDTO {
  passwordCheck: string;
}
