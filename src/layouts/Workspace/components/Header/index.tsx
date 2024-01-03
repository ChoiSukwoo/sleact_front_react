import Menu from "@components/Menu";
import gravatar from "gravatar";
import { HeaderStyle, ProfileImg, ProfileModal, LogOutButton } from "./styles";
import { useQuery } from "react-query";
import { getFetcher } from "@utils/fetcher";
import { FC, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPost from "@utils/useAxiosPost";
import { LogoutFailToken, LogoutSuccessToken } from "@const/Toast";
import { currentModalState } from "@recoil/atom/modal";
import { useRecoilState } from "recoil";

interface Prop {}

const Header: FC<Prop> = ({}) => {
  const postRequest = useAxiosPost();
  const navigate = useNavigate();

  const { data: userData, refetch: userDataRefetch } = useQuery<IUser | false, Error>("userInfo", () =>
    getFetcher("/api/users")
  );
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);

  const isShow = currentModal === "userMenu";

  const onClickUserProfile = useCallback(() => {
    setCurrentModal("userMenu");
  }, []);

  useEffect(() => {
    console.log(currentModal);
  }, [currentModal]);

  const onLogOut = useCallback(() => {
    setCurrentModal(undefined);
    postRequest("/api/users/logout", null, { withCredentials: true })
      .then(() => {
        toast.success(LogoutSuccessToken.msg, { toastId: LogoutSuccessToken.id });
        navigate("/");
      })
      .catch((error: ApiErrorDto | undefined) => {
        if (error) {
          toast.error(LogoutFailToken.msg, { toastId: LogoutFailToken.id });
          console.log(error.message || "로그아웃에 실패하엿습니다.");
        } else {
          toast.error(LogoutFailToken.msg, { toastId: LogoutFailToken.id });
        }
      })
      .finally(() => {
        userDataRefetch();
      });
  }, []);

  return (
    <HeaderStyle>
      {userData && (
        <>
          <ProfileImg
            onClick={onClickUserProfile}
            src={gravatar.url(userData.email, { s: "28px", d: "retro" })}
            alt={userData.nickname}
          />
          {isShow && (
            <Menu style={{ right: 5, top: "calc(100% + 5px)" }}>
              <ProfileModal>
                <img src={gravatar.url(userData.email, { s: "36px", d: "retro" })} alt={userData.nickname} />
                <div>
                  <span id="profile-name">{userData.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
              </ProfileModal>
              <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
            </Menu>
          )}
        </>
      )}
    </HeaderStyle>
  );
};

export default Header;
