import React from "react";
import { Avatar } from "@material-ui/core";

interface UserAvatarProps {
  className?;
  photoURL?;
  displayName?;
  style?;
  onClick?;
}


export function UserAvatar({
  className,
  photoURL,
  displayName,
  ...other
}: UserAvatarProps) {
  if (photoURL) {
    return (
      <Avatar
        className={className}
        alt={displayName}
        src={photoURL}
        {...other}
      />
    );
  }

  return (
    <Avatar className={className} {...other}>
      {displayName ? displayName[0] : "?"}
    </Avatar>
  );
}

export default UserAvatar;