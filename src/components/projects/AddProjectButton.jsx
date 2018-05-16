// @flow
import * as React from "react";
import Anchor from "grommet/components/Anchor";
import AddIcon from "grommet/components/icons/base/Add";

export default function AddProjectButton() {
	return <Anchor icon={<AddIcon />} path="/editProject" />;
}
