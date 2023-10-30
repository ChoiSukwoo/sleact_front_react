interface RegistUserDTO {
  email: string;
  nickname: string;
  password: string;
}

interface SignUpDTO extends RegistUserDTO {
  passwordCheck: string;
}
