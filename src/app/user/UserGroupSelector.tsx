import React from "react";
import { NativeSelect } from "@material-ui/core";
import styled from "styled-components";
import { useUserData } from "lib/hooks/useUserData";
import useAuthActions from "lib/hooks/useAuthActions";

const StyledNativeSelect = styled(NativeSelect)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`;

export const GroupSelector = (props: any) => {
  const { onChange, value = "", groups = [], className } = props;
  return (
    <StyledNativeSelect
      className={className}
      value={value}
      onChange={e => {
        onChange(e.target.value);
      }}
    >
      {groups.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </StyledNativeSelect>
  );
};

export const ConnectedUserGroupSelector = ({ className }: { className? }) => {
  const user = useUserData();
  const { setCurrentGroup } = useAuthActions();

  if (!user) {
    return null;
  }

  return (
    <GroupSelector
      className={className}
      value={user.currentGroupId}
      onChange={value => setCurrentGroup(value)}
      groups={user.groups}
    />
  );
};

export default ConnectedUserGroupSelector;
