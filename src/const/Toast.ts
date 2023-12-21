interface ToastTokenDto {
  id: string;
  msg: string;
}

export const SignUpSuccessToken: ToastTokenDto = {
  id: "SignUpSuccessToken",
  msg: "회원가입되었습니다! 로그인해주세요.",
};
