// @flow
import * as React from "react";
import ContentBox from "../contentBox/ContentBox";

type Props = {
	info?: string
};

function NotFound({ info }: Props) {
	return <ContentBox heading="Route not found!">{info}</ContentBox>;
}

NotFound.defaultProps = {
	info: "The route you tried to access does not exist or is prohibited."
};

export default NotFound;
