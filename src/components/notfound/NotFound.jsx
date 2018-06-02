// @flow
import * as React from "react";
import ContentBox from "../contentBox/ContentBox";

type Props = {
	info?: string,
	match: any
};

function NotFound({ info, match }: Props) {
	console.log(match);
	return <ContentBox heading="Seite nicht gefunden!">{info}</ContentBox>;
}

NotFound.defaultProps = {
	info:
		"Die Seite, auf die Sie zugreifen wollten existiert nicht oder ist geschützt."
};

export default NotFound;
