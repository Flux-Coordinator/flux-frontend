// @flow
import * as React from "react";
import ContentBox from "../contentBox/ContentBox";

type Props = {
	info?: string
};

function NotFound({ info }: Props) {
	return <ContentBox heading="Route nicht gefunden!">{info}</ContentBox>;
}

NotFound.defaultProps = {
	info:
		"Die Rute, auf die Sie zugreifen wollten existiert nicht oder ist geschützt."
};

export default NotFound;
