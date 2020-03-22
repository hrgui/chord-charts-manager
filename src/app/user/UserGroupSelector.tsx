import React from "react";
import { NativeSelect } from "@material-ui/core";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useUserData } from "lib/hooks/useUserData";
import { SET_CURRENT_GROUP } from "lib/auth/queries";

const StyledNativeSelect = styled(NativeSelect)`
  margin-right: ${({ theme }) => theme.spacing()}px;
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
  const [setCurrentGroup] = useMutation(SET_CURRENT_GROUP);

  if (!user) {
    return null;
  }

  return (
    <GroupSelector
      className={className}
      value={user.currentGroupId}
      onChange={value =>
        setCurrentGroup({ variables: { currentGroupId: value } })
      }
      groups={user.groups}
    />
  );
};

export default ConnectedUserGroupSelector;
