type ToastMessageFunction = (...args: string[]) => string;

interface ToastTokenDto<T extends ToastMessageFunction = ToastMessageFunction> {
  id: string;
  msg: T;
}

export const SignUpSuccessToken: ToastTokenDto = {
  id: "SignUpSuccessToken",
  msg: () => "회원가입되었습니다! 로그인해주세요.",
};

export const LogoutSuccessToken: ToastTokenDto = {
  id: "LogoutSuccessToken",
  msg: () => "로그아웃이 성공적으로 진행되었습니다.",
};

export const LogoutFailToken: ToastTokenDto<(msg1: string) => string> = {
  id: "LogoutFailToken",
  msg: (msg1) => `로그아웃에 실패하엿습니다. ${msg1}`,
};

export const CreateWorkspaceSuccssToken: ToastTokenDto = {
  id: "CreateWorkspaceSuccssToken",
  msg: () => "워크스페이스 생성에 성공했습니다.",
};

export const CreateWorkspaceFailToken: ToastTokenDto<(msg1: string) => string> = {
  id: "CreateWorkspaceFailToken",
  msg: (msg1) => `워크스페이스 생성에 실패하엿습니다. ${msg1}`,
};

export const CreateChannelSuccssToken: ToastTokenDto = {
  id: "CreateChannelSuccssToken",
  msg: () => "채널 생성에 성공했습니다.",
};

export const CreateChannelFailToken: ToastTokenDto<(msg1: string) => string> = {
  id: "CreateChannelFailToken",
  msg: (msg1) => `채널 생성에 실패하엿습니다. ${msg1}`,
};

export const InviteWorkspaceSuccessToken: ToastTokenDto = {
  id: "InviteWorkspaceSuccessToken",
  msg: () => "해당 유저를 워크스페이스에 성공적으로 초대했습니다.",
};

export const InviteWorkspaceFailToken: ToastTokenDto<(msg1: string) => string> = {
  id: "InviteWorkspaceFailToken",
  msg: (msg1) => `해당 유저를 워크스페이스에 초대하는데 실패 했습니다. ${msg1}`,
};

export const InviteChannelSuccessToken: ToastTokenDto = {
  id: "InviteChannelSuccessToken",
  msg: () => "해당 유저를 채널에 성공적으로 초대했습니다.",
};

export const InviteChannelFailToken: ToastTokenDto<(msg1: string) => string> = {
  id: "InviteChannelFailToken",
  msg: (msg1) => `해당 유저를 채널에 초대하는데 실패 했습니다. ${msg1}`,
};

export const InvalidWorkspacesToken: ToastTokenDto<(msg1: string, msg2: string) => string> = {
  id: "InvalidWorkspacesToken",
  msg: (msg1, mgs2) => `${msg1}은 허용되지 않은 워크스페이스 입니다. ${mgs2}으로 이동합니다.`,
};
