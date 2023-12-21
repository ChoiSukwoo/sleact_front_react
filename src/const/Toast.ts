interface ToastTokenDto {
  id: string;
  msg: string;
}

export const SignUpSuccessToken: ToastTokenDto = {
  id: "SignUpSuccessToken",
  msg: "회원가입되었습니다! 로그인해주세요.",
};

export const LogoutSuccessToken: ToastTokenDto = {
  id: "LogoutSuccessToken",
  msg: "로그아웃이 성공적으로 진행되었습니다.",
};

export const LogoutFailToken: ToastTokenDto = {
  id: "LogoutFailToken",
  msg: "로그아웃에 실패하엿습니다.",
};

export const CreateWorkspaceSuccssToken: ToastTokenDto = {
  id: "CreateWorkspaceSuccssToken",
  msg: "워크스페이스 생성에 성공했습니다.",
};

export const CreateWorkspaceFailToken: ToastTokenDto = {
  id: "CreateWorkspaceFailToken",
  msg: "워크스페이스 생성에 실패하엿습니다.",
};
