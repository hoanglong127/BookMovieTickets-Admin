import React, { Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./style.css";
import { logOut } from "../../store/actions/authAction";
import { Avatar, Button, Typography } from "antd";

const { Text } = Typography;

const AdminAvatar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const adminInfo = useSelector((state) => state.authReducer.adminInfo);

  const handleLogout = () => {
    dispatch(
      logOut(() => {
        history.push("/");
      })
    );
  };

  return (
    <Fragment>
      {adminInfo && (
        <div className="adminAvatar">
          <Avatar
            icon={
              <img
                src="https://source.unsplash.com/50x50/?portrait"
                alt="avatar-admin"
              />
            }
          />
          <Text className="adminAvatar-name">{adminInfo?.hoTen}</Text>
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </div>
      )}
    </Fragment>
  );
};

export default memo(AdminAvatar);
